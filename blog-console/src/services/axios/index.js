import axios from 'axios'
import { openNotificationWithIcon } from '../../components/notification/Notification'

const instance = axios.create()


// 对接口请求进行拦截，当请求为除 GET 外，如果是测试账号，拦截其请求
instance.interceptors.request.use(function (config) {
  const { method, url } = config
  const { user } = window.g_app._store.getState()
  /**
   * 目的：拦截测试账号的非 GET 请求，（POST 登录除外）
   * 情况：
   *  1、isTest 默认为 true
   *  2、非登录状态，需要过滤 重置密码的过程，包括发送验证码、修改密码
   *
   * 规则伪代码： isTest && method.toUpperCase !== 'GET'   -   url.includes('session') - (PATCH && admins) - (POST && mails)
   */
  if (user.isTest && method.toUpperCase() !== 'GET') {

    if (!url.includes('session') && !(method.toUpperCase() === 'PATCH' && url.includes('admins')) && !(method.toUpperCase() === 'POST' && url.includes('mails'))) {
      openNotificationWithIcon('warn', '无法请求!', '测试账号没有权限哦~~~')
      throw new Error('测试账号没有权限哦~~~')
    }
  }
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default instance