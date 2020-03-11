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
