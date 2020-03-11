<template>
  <div class="pagination mx-auto">
    <div class="phone-pagination">
      <button type="button" :class="['previous', !(page-1) ? 'disabled' : 'active']" @click="(page - 1)?changeCount('-'):''">上一页</button>
      <button type="button" :class="['next', pageCount === 0 || (page === pageCount) || pageCount === undefined ? 'disabled' : 'active']" @click="page !== pageCount?changeCount('+'):''">下一页</button>
    </div>
    <div class="pc-pagination">
      <ul class="pagination">
        <li :class="['page-item', !(page-1) ? 'disabled' : '']" @click="(page - 1)?changeCount('-'):''"><a class="page-link" href="javascript: void(0)">上一页</a></li>
        <li v-for="n in pageIndexArr" :key="n" :class="['page-item', page === n ? 'active' : '']" @click="page !== n ? changeCount(n) : ''"><a class="page-link" href="javascript: void(0)">{{ n }}</a></li>
        <li :class="['page-item', pageCount === 0 || (page === pageCount) || pageCount === undefined ? 'disabled' : '']" @click="page !== pageCount?changeCount('+'):''"><a class="page-link" href="javascript: void(0)">下一页</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pagination',
  data () {
    return {
      page: 1,
      pageIndexArr: []
    }
  },
  watch: {
    pageCount: function (newValue, oldValue) {
      this.changeIndexArr()
    }
  },
  props: ['pageCount'],
  methods: {
    // 上下翻页对页码的修改
    changeCount (direct) {
      if (typeof direct === typeof 'str') {
        direct === '+' ? this.page++ : this.page--
      } else {
        this.page = direct
      }
      this.changeIndexArr()
      this.$emit('changeList', this.page)
    },
    // 页码变动时修改页码数组
    changeIndexArr () {
      // 父组件未传值
      if (this.pageCount === undefined) {
        return
      }
      // 总页码少于5页，全部显示
      if (this.pageCount <= 5) {
        this.pageIndexArr.splice(0)
        for (let i = 1; i <= this.pageCount; i++) {
          this.pageIndexArr.push(i)
        }
      } else {
        // 当页面超过5页后，保持一直渲染5个页码
        // 逻辑：
        // 1.当点击的页码为第二个/倒数第二个，如果前面/后面有页面，需要页码数组整体往前/往后移一个
        // 2.当点击的页码为第一个/最后一个，如果前面/后面有页码，需要把页码数组往前/后移最多两个
        switch (this.page) {
          case 1:
            this.pageIndexArr = [1, 2, 3, 4, 5]
            break
          case this.pageIndexArr[0]:
          // 点击第一个页面且不为1，则需要往前移
            if (this.page !== 1) {
              const n = (this.page - 1 >= 2) ? 2 : 1
              for (let i = 0; i < n; i++) {
                this.pageIndexArr.pop()
                this.pageIndexArr.unshift(this.pageIndexArr[0] - 1)
              }
            }
            break
          case this.pageIndexArr[1]:
          // 点击第二个页面且不为2，则需要往前移
            if (this.page !== 2) {
              this.pageIndexArr.pop()
              this.pageIndexArr.unshift(this.page - 2)
            }
            break
          case this.pageIndexArr[3]:
          // 点击倒数第二个，如果总页码数大于当前最后一个，往后移一个
            if (this.pageCount > this.pageIndexArr[4]) {
              this.pageIndexArr.shift()
              this.pageIndexArr.push(this.pageIndexArr[3] + 1)
            }
            break
          case this.pageIndexArr[4]:
          // 点击倒数第一个，如果总页码数大于当前最后一个，往后移
            if (this.page !== this.pageCount) {
              const n = (this.pageCount - this.page) >= 2 ? 2 : 1
              for (let i = 0; i < n; i++) {
                this.pageIndexArr.shift()
                this.pageIndexArr.push(this.pageIndexArr[3] + 1)
              }
            }
            break
          default:
            break
        }
      }
    }
  },
  created () {
    this.changeIndexArr()
  }
}

</script>
<style>
@media screen and (max-width: 576px) {
  .pc-pagination {
    display: none;
  }
}

div.pagination .phone-pagination button {
  color: #1E90FF;
  padding: 10px;
  margin-bottom: 15px;
  border-width: 0;
  border-radius: 30px;
}

div.pagination .phone-pagination .previous {
  margin-right: 15px;
}

div.pagination .phone-pagination .disabled {
  color: #808080;
}

@media screen and (min-width: 576px) {
  /* ipad/pc端不显示移动端分页 */
  .phone-pagination {
    display: none;
  }
  .pc-pagination {
    margin-bottom: 15px;
  }
}

</style>
