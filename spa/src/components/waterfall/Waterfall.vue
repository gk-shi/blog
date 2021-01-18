<template>
  <div>
    <div
      class="vue3-waterfall-wrapper"
      :style="{
        height: wrapperHeight + 'px',
        width: wrapperWidth + 'px',
      }"
    >
      <div
        class="waterfall-item"
        :style="item.styles || { width: actualColWidth + 'px' }"
        v-for="(item, idx) of actualList"
        :key="'w' + idx"
      >
        <!-- :key="'w' + idx" -->
        <slot :item="item"></slot>
      </div>
    </div>
    <slot v-if="actualLoading && !isOver" name="loading">
      <div class="waterfall-loading">
        <div class="dot-wrapper">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </slot>
    <slot v-if="isOver" name="footer">
      <div class="waterfall-over-message">呀，被看光了！</div>
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import { getDevice } from '/@/utils'

// 自定义属性
// interface any {
//   _height?: number | string;
//   _error?: boolean;
//   [propName: string]: any;
// }


const ERROR_IMG_SRC = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk1M0JCM0QwNkVFNDExRThCNTJCQUQ2RDFGQzg0NzIxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1M0JCM0NGNkVFNDExRThCNTJCQUQ2RDFGQzg0NzIxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTYwRUMyMDE2RUUzMTFFOEJCRTU5RTFDODg1ODgwMjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTYwRUMyMDI2RUUzMTFFOEJCRTU5RTFDODg1ODgwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCACRAJEDASIAAhEBAxEB/8QAZQAAAwEBAQAAAAAAAAAAAAAAAAIDAQQHAQEAAAAAAAAAAAAAAAAAAAAAEAACAQMDBAEFAAMBAAAAAAAAAQIRMQMhQRJRYYEycZHBIkITsdFSYhEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9AAAAAMFnNQWt9kAwkssVbV9CTnKb10XQVtLSyAd5ZuzURW27yfhmX9RlDI+wD4Vf/ZVi41SKCdeNI3YEnOXJtOiBZZr/wBGcMi2Ft7AXjli76PoOcqael0Mpyg9NV0A6QEhNTWl90MBoAAAAAAGGiTlxjXfZAZkycdEqyI3q26sOrd92CTm6bbsA1boh1i3lqPGKiqIZAYklYHY0x6tIDY2B3NdjEBgNJ3NACTxbx0E1TozoYsoqSowI2o06MtjyctGqSItODptsw6NX2YHSaJCXKNd90OAAAAYznnLnJvZWK5pUjRXloiNdwCjk0l9S0YqKohcSpGrvLUcDUBLK23x23FWNtVSAuHch/KXQP5PoBdqq77GJ1XfczFVKjVBcuPk6rXqBQCH8n0D+UugFwZD+bV1oNif5OOzQDyipKjI0cW0/qXYmVVjVXjqAkZcHXZ3OhHNXcthlWNHeOjAoAABDLKs6bISlWl1Busm+42Jfm30At2BmI1gRy+3gpD1XwTy+3gpH1QDASyt8uKdFuJRw1iwOjdBKy+TIutGbK3kAAxtJNuwiywdmA7s/glj9/BV04unQli9l8AWDsBjAhSja6D4pUnTZmZV+afUVOkk+4HUBgAc0bD4v2+fsJGw+L9vn7AVQMEDAjl9vBSHqvgnl9vBSHqvgDJwbfJC8JPSlEO5wTo3qMnUDEqNGz0jXoD08BRSXyBB/m6u2xvFPQ1qjoDAVNxqv1ZuJUnT5BGw9/AFQYAwJZf1+fsJKw+X9fn7CSsB0AAAc7VG13GxP82uoZFSbezFWkkwOgGCBgRy15adDZTaioq7QZPfwZQDFFfPc2MnB0vE1AwCc+WituPjaS4kzU6agPkS9hEVeqJJU0AAh7+ACHv4AqAAwI5X+aXQVKrS7g3WTY2ONZp7IC9AAAJ5lWNf+dSV1XqdL1VGc8lxk47bAUxyqqO60GIpuL5LyuxZNNVVtmAmVfkpbbi1RYAI1QVRYAI1QJ1aRYzdAbJ8Y1I1RZggI1SNxL8uW1NCoAYxckqKiu9Bm0lV23ZFtyfJ+F2Ayyr0K4VSNf8ArUnFcpKO250LRUQABoAYLkhzXdWHMA5u26uNGXF9tx8uOusfYlbTcC6aaqrdTTnTlHVfQrHJF6PRsBwAAC5i9vg0xbgaAIAAxtJVduosskVotWiTcpav6ANKXJ9the27sF9NyuLHTWXsA2OHBd3cYDQAAAAAAAwSeNS1syhgHNRxdJfUK10ujoaTuJLCrp0Amm1Ztdhv6z3Sfkxwmu4leqoBT+1P1f8AkZy4469daEaopllRqPRAH9ZOyp5Fbbu2+xmuyGUJvsAtaaWQUcnSP1Kxwq7dR0krALDGo63Y4GgAAAAAAAAAAAAAAAAAshJ7AAGK6B3YABsNx4gADAAAAAAAAAAAAAf/2Q=='

export default defineComponent({
  name: 'Waterfall',
  props: {
    list: {
      type: Array,
      default: (): Array<any> => []
    },
    colWidth: { // 每列的宽度，不包括两列的间隔
      type: Number,
      default: 250
    },
    srcKey: {  // 图片地址的键值
      type: String,
      default: 'src'
    },
    gap: { // 两列间的间隔，PC 端，px
      type: Number,
      default: 20
    },
    mobileGap: { // 两列间的间隔，手机端，px
      type: Number,
      default: 8
    },
    bottomGap: { // 上下间距, px
      type: Number,
      default: 10
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isOver: {
      type: Boolean,
      default: false
    },
    distanceToScroll: {
      type: Number,
      default: 200
    }
  },
  setup (props, { emit }) {
    const { colWidth, gap, mobileGap, list, isLoading, isOver } = toRefs(props)
    const { srcKey, bottomGap, distanceToScroll } = props

    // 是否为手机端
    let isMobile = getDevice(navigator.userAgent) === 'mobile'
    let actualGap = isMobile ? mobileGap.value : gap.value

    const actualColWidth = ref(colWidth.value)  // 实际列宽
    const actualCols = ref(1)  // 实际列数
    let colsTop: Array<number> = []  // 记录每列的 top 值
    // 计算列数以及手机端的宽度
    const calcualteCols: () => void = (): void => {
      actualColWidth.value = colWidth.value
      actualCols.value = 1
      const parentWidth = document.querySelector('.vue3-waterfall-wrapper')?.parentElement?.offsetWidth || 0
      if (isMobile && parentWidth < (colWidth.value * 2) + mobileGap.value) {
        actualColWidth.value = parentWidth - (2 * mobileGap.value)
        colsTop = Array(actualCols.value).fill(0)
        return
      }

      const g = isMobile ? mobileGap.value : gap.value
      actualCols.value = Math.floor((parentWidth + g) / (colWidth.value + g))
      colsTop = Array(actualCols.value).fill(0)
    }


    const actualList = ref<any>([])  // 实际用来渲染的列表
    let lastPreloadImgIdx = -1  // 上一次最后预加载的图片的下标
    // 图片加载失败占位图片实际高度
    const errorImgHeight = computed(() => actualColWidth.value || 145)  // 默认错误图片的高度
    // 图片预加载
    type ImgPreload = (noPreloadList: Array<any>, preloadedFn: Function | undefined) => void
    const imgPreload: ImgPreload = (noPreloadList: Array<any>, preloadedFn: Function | undefined): void => {
      let tmpIdx = lastPreloadImgIdx === 0 ? 0 : lastPreloadImgIdx + 1
      const tmpArr: any[] = []
      while (tmpIdx < noPreloadList.length) {
        const item = noPreloadList[tmpIdx]
        tmpArr.push(item)
        tmpIdx++
        if (!item[srcKey]) {
          lastPreloadImgIdx++
          item._height = 0
          continue
        }
        const oImg = new Image()
        oImg.src = item[srcKey]
        oImg.onload = oImg.onerror = (e): void => {
          if ((e as Event).type === 'error') {
            item[srcKey] = ERROR_IMG_SRC
            item._height = errorImgHeight.value
          } else if ((e as Event).type === 'load') {
            item._height = Math.round(actualColWidth.value / (oImg.width / oImg.height))
          }
          lastPreloadImgIdx++
          if (lastPreloadImgIdx + 1 === noPreloadList.length) {
            // 预加载完成，开始渲染
            actualList.value = actualList.value.concat(tmpArr as Array<any>)
            // setTimeout(() => {
            //   // 图片预加载完成后的回调
            //   preloadedFn && preloadedFn()
            // }, 500)
            nextTick(() => {
              // 图片预加载完成后的回调
              preloadedFn && preloadedFn()
            })
          }
        }
      }
    }


    let lastLayoutImgIdx = 0  // 上一次排版最后排的元素下标
    const wrapperHeight = ref(0)
    // 布局-调整位置
    const layout: () => void = (): void => {
      const waterfallItems = document.querySelectorAll('.waterfall-item') as NodeListOf<HTMLElement>
      if (waterfallItems.length === 0) return
      let idx = lastLayoutImgIdx === 0 ? 0 : lastLayoutImgIdx + 1
      for (; idx < list.value.length; idx++) {
        const eleHeight = waterfallItems[idx].offsetHeight
        const imgHeight = waterfallItems[idx].querySelector('img')?.offsetHeight || 0
        // 找到现有列最小高度
        const minHeight = Math.min.apply(null, colsTop)
        // 最小高度的列
        const minOfColIdx = colsTop.indexOf(minHeight)
        // 设置决定定位位置
        const left = actualColWidth.value * minOfColIdx + (minOfColIdx - 1 < 0 ? 0 : minOfColIdx - 1) * actualGap + 'px'
        const top = minHeight + 'px'
        colsTop[minOfColIdx] = colsTop[minOfColIdx] + eleHeight - imgHeight + actualList.value[idx]._height + bottomGap
        const marginLeft = actualCols.value !== 1 && minOfColIdx !== 0 ? actualGap + 'px' : '0'
        // 一次修改，减少重排
        actualList.value[idx].styles = {
          width: actualColWidth.value + 'px',
          left,
          top,
          marginLeft,
          visibility: 'visible'
        }
      }
      wrapperHeight.value = Math.max.apply(null, colsTop)
      lastLayoutImgIdx = waterfallItems.length - 1
    }


    // 进行瀑布流计算
    const waterfall: (itemList: Array<any>) => void = (itemList: Array<any>): void => {
      const itemListNew: Array<any> = JSON.parse(JSON.stringify(itemList))
      imgPreload(itemListNew, layout)
    }


    // 容器实际宽度
    const wrapperWidth = computed(() => {
      return actualColWidth.value * actualCols.value + actualGap * (actualCols.value - 1)
    })
    // 加载状态
    const actualLoading = computed(() => {
      return isLoading.value || actualList.value.length !== list.value.length
    })

    // 第一次加载或者重载
    const firstOrReset: () => void = (): void => {
      lastPreloadImgIdx = -1
      lastLayoutImgIdx = 0
      actualList.value = []
      calcualteCols()
      waterfall(list.value as Array<any>)
    }

    watch(list, (newV, oldV) => {
      if (newV[0] !== oldV[0]) {
        firstOrReset()
        return
      }
      waterfall((newV as Array<any>))
    })

    // resize 时的 handle
    let timeHandler: NodeJS.Timeout
    const resizeHandle: () => void = (): void => {
      clearTimeout(timeHandler)
      // 重新计算
      timeHandler = setTimeout(() => {
        isMobile = getDevice(navigator.userAgent) === 'mobile'
        actualGap = isMobile ? mobileGap.value : gap.value
        firstOrReset()
        calcualteCols()
      }, 500)
    }

    // 滚动
    const body =  document.documentElement || document.body
    const scrollFn: () => void = (): void => {
      if (actualLoading.value) return
      if (isOver.value) {
        // window.removeEventListener('scroll', scrollFn, false)
        return
      }
      if (body.offsetHeight <= body.scrollTop + Math.max.apply(null, colsTop) + distanceToScroll) {
        emit('scroll-reach-bottom')
      }
    }



    onMounted(() => {
      if (list.value && list.value.length > 0) {
        firstOrReset()
      }
      window.addEventListener('resize', resizeHandle)
      window.addEventListener('scroll', scrollFn)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandle)
      window.removeEventListener('scroll', scrollFn)
    })

    return {
      isMobile,
      wrapperWidth,
      wrapperHeight,
      actualLoading,
      actualColWidth,
      actualList,
      actualCols
    }
  }
})

</script>

<style lang="scss" scoped>
.vue3-waterfall-wrapper {
  width: 100%;
  position: relative;
  margin: 0 auto;
}

.waterfall-item {
  // visibility: hidden;
  position: absolute;
  transition: all 0.3s;
  animation: scaleItem 0.3s linear forwards;
}

.waterfall-over-message {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #999999;
}

.dot-wrapper {
  padding: 10px 0;
  text-align: center;

  .dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(169, 169, 169, 0.8);
    margin: 0 2px;

    &:nth-of-type(2n) {
      animation: dotScale 0.4s linear infinite alternate;
    }

    &:nth-of-type(2n - 1) {
      animation: dotScale 0.4s linear 0.4s infinite alternate;
    }
  }
}

@keyframes dotScale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}

@keyframes scaleItem {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
