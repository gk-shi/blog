<template>
  <div class="box">
    <Nav></Nav>
      <transition name="slide-fade" mode="out-in">
        <keep-alive exclude="bArticle">
          <router-view @show-rocket="showOrHide" v-if="isRouterAlive" />
        </keep-alive>
      </transition>
    <transition name="slide-show">
      <GoTop v-show="rocketShow"></GoTop>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '../../components/window/Nav.vue'
import GoTop from '../../components/window/GoTop.vue'

export default {
  name: 'home',
  data () {
    return {
      isRouterAlive: true,
      rocketShow: false
    }
  },
  methods: {
    showOrHide (flag) {
      // 提供给一些特殊页面
      this.rocketShow = flag
    },
    reload () {
      this.isRouterAlive = false
      // 在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    // 控制返回顶部的图标出现
    showGoTop () {
      let scroll = document.documentElement.scrollTop || document.body.scrollTop
      this.rocketShow = (scroll >= 250)
    }
  },
  components: {
    Nav,
    GoTop
  },
  mounted () {
    window.addEventListener('scroll', this.showGoTop)
  }
}

</script>
<style>
.box {
  width: 100%;
  height: 100%;
}

.slide-fade-enter-active {
  transition: all .5s linear;
}

.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to

/* .slide-fade-leave-active for below version 2.1.8 */
  {
  transform: translateX(30px);
  opacity: 0;
}

@keyframes toShow {
  0% {
    margin-bottom: -100px;
  }

  100% {
    margin-bottom: 0;
  }
}

.slide-show-enter-active {
  transition: all .4s linear;
}

.slide-show-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-show-enter, .slide-show-leave-to

/* .slide-fade-leave-active for below version 2.1.8 */
  {
  margin-bottom: -100px;
  opacity: 0;
}

</style>
