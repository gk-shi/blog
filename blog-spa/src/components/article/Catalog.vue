<template>
  <aside class="catalog">
    <div class="catalog-w">
      <p
        v-for="(item, index) of catalog"
        :class="{
      'catalog-title': item.level === 0,
      'catalog-one': item.level === 1,
      'catalog-two': item.level === 2,
      'active': index === activeIndex
    }"
        :key="item.text"
        @click="scrollTo(index)"
      >{{ item.text }}</p>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'catalog',
  props: {
    catalog: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeIndex: -1
    }
  },
  methods: {
    scrollTo (index) {
      this.activeIndex = index
      window.scrollTo(0, this.catalog[index].top)
    },
    scrollHandler () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.activeIndex = this.getIndex(scrollTop)
      const t = document.querySelectorAll('.catalog-w > p')[this.activeIndex]
      document.querySelector('.catalog').scrollTop = t && t.offsetTop - 150
    },
    getIndex (height) {
      let index = -1
      for (let i = this.catalog.length - 1; i >= 0; i--) {
        if (this.catalog[i].top <= height) {
          index = i
          break
        }
      }
      return index
    }
  },
  created () {
    window.addEventListener('scroll', this.scrollHandler, false)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollHandler)
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  max-height: 300px;
  overflow-y: scroll;
  padding: 5px;
  // box-shadow: 0 0 2px #ccc;
  border-left: 1px solid #ccc;

  p {
    cursor: pointer;
  }

  .active {
    font-weight: bold;
    color: #ffa500;
  }

  &-one {
    margin: 5px 0 0 10px;
  }
  &-two {
    margin: 5px 0 0 20px;
  }
}
</style>
