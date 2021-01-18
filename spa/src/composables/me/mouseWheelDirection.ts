import { onMounted, onBeforeUnmount } from 'vue'


const bindListener = (func: Function, target = window): void => {
  const eventName = navigator.userAgent.toLocaleLowerCase().includes('firefox') ? 'DOMMouseScroll' : 'mousewheel'
  target.addEventListener(eventName, func, false)
  // if (navigator.userAgent.toLocaleLowerCase().includes('firefox')) {
  //   target.addEventListener('DOMMouseScroll', wheel, false)
  // }
  // target.addEventListener('mousewheel', wheel, false)
}

const unbindListener = (func: Function, target = window): void => {
  const eventName = navigator.userAgent.toLocaleLowerCase().includes('firefox') ? 'DOMMouseScroll' : 'mousewheel'
  target.removeEventListener(eventName, func, false)
  // if (navigator.userAgent.toLocaleLowerCase().includes('firefox')) {
  //   target.addEventListener('DOMMouseScroll', wheel, false)
  // }
  // target.addEventListener('mousewheel', wheel, false)
}

/**
 * @description: 绑定鼠标滑轮滚动事件
 * @param {*} downHandle 向下滚动事件
 * @param {*} upHandle 向上滚动事件
 * @param {*} target 需要监听的元素
 * @param {*} delay 节流时间 ms
 * @return {*}
 */
export default function mouseWheelScrollHandler (downHandle: Function, upHandle: Function,  delay = 800, target = window): void {
  const throttleDownHandle = downHandle
  const throttleUpHandle = upHandle


  let isWheeling = false
  const wheel = (event: Event): void => {
    if (isWheeling) return
    isWheeling = true
    unbindListener(wheel, target)
    let flag = 0
    if (event?.wheelDelta) {
      // IE、Chrome、Opera
      flag = event.wheelDelta
    } else if (event?.detail) {
      // Firefox 使用 detail ，向下为3,向上为-3
      flag = -event.detail
    }
    if (flag > 0) throttleUpHandle()
    else if (flag < 0) throttleDownHandle()
    setTimeout(() => {
      isWheeling = false
      bindListener(wheel, target)
    }, delay)
  }

  onMounted(() => {
    bindListener(wheel, target)
  })

  onBeforeUnmount(() => {
    unbindListener(wheel, target)
  })
}
