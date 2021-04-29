import axios from 'axios'
import { openNotificationWithIcon } from '../../components/notification/Notification'
import { getStorage } from '../../utils/utils'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : 'https://blogapi.gkshi.com'
const timeout = 1000 * 20

// 错误状态码对应的错误信息
const code2Message = (error) => {
  const { data, config } = error.response
  switch (error.response.status) {
  case 400:
    return `${data.errmsg || data.error } 地址:${config.url}`
  case 401:
    return '登录信息过期，跳转登录'
  case 403:
    return `${data.errmsg || data.error } 地址:${config.url}`
  case 404:
    return `${config.url}地址未找到`
  case 500:
    return `服务器内部错误：${config.url}`
  case 501:
    return `服务器不具备完成请求的功能(如无法识别请求方法)501 ${config.url}`
  case 502:
    return `错误网关，收到无效响应502 ${config.url}`
  case 503:
    return `服务器暂不可用(超载或停机维护)503 ${config.url}`
  case 504:
    return `网关超时504 ${config.url}`
  case 505:
    return `HTTP 版本不受支持505 ${config.url}`
  default:
    return `错误码:${error.response.status}错误原因: ${data.errmsg || data.error } 未知错误！网址:${config.url}`
  }
}

const instance = axios.create({
  baseURL,
  timeout
})


// 对接口请求进行拦截，当请求为除 GET 外，如果是测试账号，拦截其请求
instance.interceptors.request.use(function (config) {
  const { method, url } = config
  const { user } = window.g_app._store.getState()

  // 忽略高德地图 API 和 七牛云
  if (/(v3\/geocode)|(qiniup)/.test(url)) {
    return config
  }
  /**
   * 目的：拦截测试账号的非 GET 请求，（POST 登录除外）
   * 情况：
   *  1、isTest 默认为 true
   *  2、非登录状态，需要过滤 重置密码的过程，包括发送验证码、修改密码
   *
   * 规则伪代码： isTest && method.toUpperCase !== 'GET'   -   url.includes('login') - (PATCH && admins) - (POST && mails)
   */
  if (user.isTest && method.toUpperCase() !== 'GET') {

    if (!url.includes('login') && !(method.toUpperCase() === 'PATCH' && url.includes('admins')) && !(method.toUpperCase() === 'POST' && url.includes('mails'))) {
      openNotificationWithIcon('warn', '无法请求!', '测试账号没有权限哦~~~')
      throw new Error('测试账号没有权限哦~~~')
    }
  }

  // 带上 token
  if (!/(login)|(oneword)/.test(config.url)) {
    const token = getStorage('token')
    config.headers.Authorization = `Bearer ${token}`
  }
  // Do something before request is sent
  return config
}, function (error) {
  openNotificationWithIcon('error', '请求发生错误！', `请求失败：${error.config.url}`)
  // Do something with request error
  return Promise.reject(error)
})


// 对响应错误进行统一拦截处理，包括 errno !== 0 的情况
instance.interceptors.response.use(response => {
  // 高德地图 API 和 七牛云
  if (/(v3\/geocode)|(qiniup)/.test(response.config.url)) {
    return response
  }
  if (response.status === 204) {
    response.data = { errno: 0 }
  }
  // errno !== 0
  if (parseInt(response.data.errno, 10) !== 0) {
    openNotificationWithIcon('error', '响应发生错误！', `${response.data.errmsg || response.data.error}:${response.config.url}`)
  }

  return response
}, error => {
  console.dir(error)
  if (!error.response) {
    openNotificationWithIcon('error', '响应错误！', `${error.config.url}响应失败，请刷新浏览器重试。原因${error}`)
    return Promise.reject(error)
  }
  openNotificationWithIcon('error', error.response.status + '错误', code2Message(error))
  return Promise.reject(error)
})

export default instance