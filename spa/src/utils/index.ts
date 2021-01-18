/**
 * 获取是移动端还是 PC 端
 * @param userAgent
 */
export function getDevice (userAgent: string): string {
  return /(Android|iPhone|iPod|iOS|SymbianOS|Windows Phone)/ig.test(userAgent) ? 'mobile' : /iPad/ig.test(userAgent) ? 'ipad' : 'pc'
}

/**
 * 判断屏幕最大宽度不超过
 * @param width 允许最大屏幕宽度, default: 576
 */
export function screenMaxIs (width = 576): boolean {
  return window.screen.width <= width
}

// 存储本地 Storage
export function setStorage (key: string, val: unknown, type = 'localStorage'): void {
  if (type === 'sessionStorage') window.sessionStorage.setItem(key, JSON.stringify(val))
  else window.localStorage.setItem(key, JSON.stringify(val))
}

// 获取本地 Storage
export function getStorage (key: string, type = 'localStorage'): unknown {
  let val
  if (type === 'sessionStorage') val = JSON.parse(window.sessionStorage.getItem(key))
  else val = JSON.parse(window.localStorage.getItem(key))
  return val
}

/**
 * @description: body匀速回弹
 * @param {*} targetTop 指定滚动到距顶部的位置
 * @param {*} direction 滚动反向
 * @param {*} speed 滚动速度比 几分之一
 * @return {*}
 */
export function moveGoTo (targetTop = 0, direction = 'up', speed = 8): void {
  let animationFrameHandler = -1

  function goTo (): void {
    const scrollTop = (document.documentElement || document.body).scrollTop
    if (direction === 'up') {
      if (scrollTop <= targetTop) {
        window.cancelAnimationFrame(animationFrameHandler)
        return
      }
      const target = scrollTop - scrollTop / speed
      window.scrollTo(0, target < targetTop ? targetTop : target)
    } else if (direction === 'down') {
      if (scrollTop >= targetTop) {
        window.cancelAnimationFrame(animationFrameHandler)
        return
      }
      const target = scrollTop + targetTop / speed
      window.scrollTo(0, target > targetTop ? targetTop : target)
    }
    animationFrameHandler = window.requestAnimationFrame(goTo)
  }
  goTo()
}
