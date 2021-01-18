<template>
  <transition name="slide-fade">
    <div v-show="distance >= distanceToShow" class="go-top" @click="goTop"></div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { moveGoTo } from '/@/utils'

export default defineComponent({
  name: 'GoTop',
  props: {
    distance: {
      type: Number,
      default: 0
    },
    distanceToShow: {
      type: Number,
      default: 200
    }
  },
  setup () {
    const goTop = (): void => moveGoTo()
    // const animationFrameHandler = ref(-1)
    // const goTop: () => void = (): void => {
    //   const scrollTop = (document.documentElement || document.body).scrollTop
    //   if (scrollTop === 0) {
    //     window.cancelAnimationFrame(animationFrameHandler.value)
    //     return
    //   }
    //   window.scrollTo(0, scrollTop - scrollTop / 8)
    //   animationFrameHandler.value = window.requestAnimationFrame(goTop)
    // }

    return {
      goTop
    }
  }
})
</script>

<style lang="scss" scoped>
.go-top {
  position: fixed;
  right: 15px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  z-index: 100;
  background: url('../../assets/images/rocket.png') no-repeat;
  background-size: contain;
  background-position: center center;
  animation: sway .4s linear alternate infinite;
}

@keyframes sway {
  from {
    bottom: 30px;
  }
  to {
    bottom: 10px;
  }
}

.slide-fade-enter-active {
  transition: all .4s linear;
}

.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from, .slide-fade-leave-to {
  margin-bottom: -100px;
  opacity: 0;
}
</style>
