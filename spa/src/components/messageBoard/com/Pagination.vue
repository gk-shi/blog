<template>
  <div class="pagination">
    <span
      v-if="pages[0]"
      :class="{ 'can-not disabled': current === 1 }"
      @click="changePage(current - 1)"
      >&lt;</span
    >
    <span
      :class="{ current: current === 1, disabled: current === 1 }"
      v-if="pages[0] && pages[0] !== 1 && !isMobile"
      @click="changePage(1)"
      >1</span
    >
    <span v-if="dotsFlag.front && !isMobile" @click="changePage(pages[0] - 1)">...</span>
    <span
      v-for="p of pages"
      :key="p"
      :class="{ current: current === p, disabled: current === p }"
      @click="changePage(p)"
      >{{ p }}</span
    >
    <span v-if="dotsFlag.behind && !isMobile" @click="changePage(pages.slice(-1)[0] + 1)"
      >...</span
    >
    <span
      :class="{
        current: current === pages.slice(-1)[0],
        disabled: current === pages.slice(-1)[0],
      }"
      v-if="pages.slice(-1)[0] && pages.slice(-1)[0] !== pageCount && !isMobile"
      @click="changePage(pageCount)"
      >{{ pageCount }}</span
    >
    <span v-if="pages[0]" :class="{ 'can-not disabled': current === pageCount }" @click="changePage(current + 1)">&gt;</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import { screenMaxIs } from '../../../utils'


type CalcPage = {
  dots: {
    front: boolean;
    behind: boolean;
  };
  displayPages: number[];
}

/**
 * @description: 计算中间部分页码
 * @param {*} pageCount 总页数
 * @param {*} current 当前页
 * @param {*} defaultLen 默认中间页数的长度
 * @param {*} offset 偏移量，默认长度为偶数时有用，正数为右偏移，默认左偏移
 * @return {*} { start: 开始页, end: 结束页 }
 */
function calcMidPage (pageCount: number, current: number, defaultLen: number, offset: number): Record<string, number> {
  const half = defaultLen / 2
  // 判断是否为奇数
  const isOdd = defaultLen % 2 !== 0
  // 从当前位置计算开始元素的间隔
  const frontSpan = isOdd ? Math.floor(half) : offset > 0 ? half - 1 : half
  // 从当前位置计算末尾元素的间隔
  const behindSpan = isOdd ? Math.floor(half) : offset > 0 ? half : half - 1

  let start = current - frontSpan
  let end = current + behindSpan
  if (start < 1) {
    start = 1
    end = defaultLen
  }
  if (end > pageCount) {
    end = pageCount
    start = pageCount - defaultLen + 1
  }

  return {
    start,
    end
  }
}

/**
 * @description: 计算中间部分页码及前后 ... 的展示
 * @param {*} pageCount 总页数
 * @param {*} current 当前页
 * @param {*} defaultLen 默认中间页数的长度
 * @param {*} offset 偏移量，默认长度为偶数时有用，正数为右偏移，默认左偏移
 * @return {*} { dots: Object, displayPages: number[] }
 */
function calcPages (pageCount = 0, current = 0, defaultLen = 5, offset = 0): CalcPage {
  // 如果是手机端
  if (screenMaxIs(576)) {
    return {
      dots: {
        front: false,
        behind: false
      },
      displayPages: [current]
    }
  }
  // 全部页码数组
  const allPages = Array.from(Array(pageCount), (v, k) => k + 1)
  // 展示 ... 的标志
  const dots = {
    front: false,
    behind: false
  }
  // 中间展示页码的开始页与结束页
  let page: Record<string, number> = {
    start: 1,
    end: pageCount
  }
  if (pageCount > defaultLen + 1) {
    // 会出现 ... 的情况
    page = calcMidPage(pageCount, current, defaultLen, offset)
  }
  dots.front = page.start > 2
  dots.behind = page.end < pageCount - 1
  return {
    dots,
    displayPages: allPages.slice(page.start - 1, page.end)
  }
}



export default defineComponent({
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  setup (props, { emit }) {
    const { total, currentPage } = toRefs(props)

    const pageCount = ref(Math.ceil(total.value / 10)) // 总页数
    const current = ref(0)
    const dotsFlag = ref({
      front: false,
      behind: false
    })

    const pages = ref<number[]>([])
    function changePage (page = 1, first = false): void {
      if (page < 1 || page > pageCount.value || (page === current.value && !first)) return
      const { dots, displayPages } = calcPages(pageCount.value, page)
      dotsFlag.value = dots
      pages.value = displayPages
      current.value = page
      emit('page-change', page)
    }


    watch(total, (newV) => {
      pageCount.value = Math.ceil(newV / 10)
      changePage(1, true)
    })

    watch(currentPage, (newV) => {
      changePage(newV || 1)
    })

    onMounted(() => {
      changePage(1, true)
    })

    return {
      pageCount,
      current,
      dotsFlag,
      pages,
      changePage,
      isMobile: screenMaxIs(576)
    }
  }
})
</script>

<style lang="scss" scoped>
.pagination {
  span {
    display: inline-block;
    text-align: center;
    width: 35px;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
    margin: 0 4px;
    font-size: 20px;
    border-radius: 5px;

    &:not(.disabled):hover {
      background-color: #eee;
    }
  }

  .current {
    color: #fff;
    background-color: #1d77be;
  }

  .disabled {
    cursor: default;
  }

  .can-not {
    color: #aaa;
  }
}
</style>
