import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { moveGoTo } from '../../utils/index'


type Toc = {
  toc: any[];
  maxLevel: number;
  makeToc: () => void;
  goToToc: (idx: number) => void;
  scrollToFixedToc: () => Function;
}


let tocBackup: NodeListOf<Element>

/**
 * @description: 点击目录进行跳转
 * @param {number} idx 点击目录的下标
 * @return {*}
 */
const goToToc = (idx: number): void => {
  const el = tocBackup[idx] as HTMLElement
  const scrollTop = (document.documentElement || document.body).scrollTop
  const target = el.offsetTop - 100 < 0 ? 0 : el.offsetTop - 100
  const direction = scrollTop > target ? 'up' : 'down'
  moveGoTo(target, direction, 12)
}

/**
 * @description: 返回监听滚动的固定函数
 * @return {*} scrollListener
 */
const scrollToFixedToc = (): Function => {
  const tocEl = document.querySelector('.toc-wrapper') as HTMLElement
  const commentEl = document.querySelector('.container footer') as HTMLElement
  const body = document.documentElement || document.body
  const [tocHeight, tocTop] = [tocEl?.offsetHeight, tocEl?.offsetTop]
  const commentTop = commentEl?.offsetTop
  let isFixed = false

  const scrollListener = (): void => {
    if (!isFixed && body.scrollTop >= tocTop && body.scrollTop + tocHeight <= commentTop) {
      isFixed = true
      tocEl.style.cssText = 'position: fixed; top: 0px;'
    } else if (isFixed && (body.scrollTop + tocHeight >= commentTop || body.scrollTop < tocTop)) {
      tocEl.style.cssText = `position: relative;top:${body.scrollTop - tocTop}px`
      isFixed = false
    }
  }
  return scrollListener
}

/**
 * @description: 生成 toc 目录
 * @param {*}
 * @return {*} { toc, maxLevel, makeToc, goToToc, scrollToFixedToc }
 */
export default function generateToc (): Toc {
  const toc = ref<any[]>([])
  const maxLevel = ref(3)

  let scrollHandle

  const makeToc = (): void => {
    const articleContent = document.querySelector('.markdown-body') as HTMLElement
    tocBackup = articleContent.querySelectorAll('h2, h3, h4')
    const logs: any[] = []
    tocBackup.forEach(t => {
      if (Number(t.tagName.toLocaleLowerCase()[1]) < maxLevel.value) {
        maxLevel.value = Number(t.tagName.toLocaleLowerCase()[1])
      }
      const log = {
        text: t.textContent,
        level: Number(t.tagName.toLocaleLowerCase()[1])
      }
      logs.push(log)
    })
    toc.value = logs
    nextTick(() => {
      window.removeEventListener('scroll', scrollHandle)
      scrollHandle = scrollToFixedToc()
      window.addEventListener('scroll', scrollHandle)
    })
  }

  onMounted(makeToc)


  onBeforeUnmount(() => {
    window.removeEventListener('scroll', scrollHandle)
  })

  return {
    toc,
    maxLevel,
    makeToc,
    goToToc,
    scrollToFixedToc
  }
}
