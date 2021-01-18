import axios from 'axios'
import createTip from '/@/utils/createTip'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : 'https://blogapi.gkshi.com'

const timeout = 1000 * 20

const instance = axios.create({
  baseURL,
  timeout
})

instance.interceptors.response.use(response => {
  if (response.status === 204) {
    response.data = { errno: 0 }
  }
  // errno !== 0
  if (parseInt(response.data.errno, 10) !== 0) {
    createTip('error', '服务器开小差啦~')
    console.log(`${response.data.errmsg || response.data.error}:${response.config.url}`)
    Promise.reject(response.data.errmsg || response.data.error)
  }

  return response
}, error => {
  createTip('error', '出错啦~请稍后再试哈~')
  return Promise.reject(error)
})


export default instance
