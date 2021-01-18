/**
 * @description: 插入信息提示框
 * @param {string} tipType 类型：success error warn
 * @param {string} message 提示信息
 * @param {*} time 停留时间
 * @return {*}
 */
const createTip: CreateTip = (tipType: string, message: string, time = 3000): void => {
  const timestamp = Date.now()
  const box = document.createElement('div')
  box.setAttribute('class', `global-tips  t${timestamp}`)
  const icon = document.createElement('span')
  icon.setAttribute('class', `tip-icon ${tipType}`)
  const content = document.createElement('span')
  content.textContent = message
  box.appendChild(icon)
  box.appendChild(content)
  const body = document.documentElement || document.body
  body.appendChild(box)
  setTimeout(() => {
    const boxAfter = document.querySelector('.t' + timestamp)
    const body = document.documentElement || document.body
    body.removeChild(boxAfter)
  }, time)
}


export default  createTip
