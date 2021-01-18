// localStorage 存储
export function setStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getStorage(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

export  function removeStorage(key) {
  window.localStorage.removeItem(key)
}

// 年月日分秒时间组合区分图片
export function getNow () {
  const date = new Date()
  return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
}


// 设置 localStorage
export const setLoginLocalStorage = (data) => {
  const { userInfo, token } = data
  const info = JSON.parse(window.atob(token.split('.')[1]))
  userInfo && window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
  token && window.localStorage.setItem('token', JSON.stringify(token))
  info && info.exp && window.localStorage.setItem('tokenExp', JSON.stringify(info.exp))
}

// 获取 localStorage
// export const getLocalStorage = (key) => {
//   return JSON.parse(window.localStorage.getItem(key))
// }

// 清空相关登录信息
export const clearLoginLocalStorage = () => {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('tokenExp')
  window.localStorage.removeItem('userInfo')
}
