<template>
  <div class="go-top" @click="goTop"></div>
</template>
<script>
export default {
  name: 'goTop',
  data () {
    return {
      animationFrameHandler: -1
    }
  },
  methods: {
    goTop () {
      this.scrollToTop()
    },
    scrollToTop () {
      const sTop = document.documentElement.scrollTop || document.body.scrollTop
      const homePage = document.querySelector('.vue-waterfall-easy-scroll')
      const homePageTop = homePage ? homePage.scrollTop : 0
      if (sTop === 0 && homePageTop === 0) {
        window.cancelAnimationFrame(this.animationFrameHandler)
        return
      }
      if (sTop > 0) {
        this.animationFrameHandler = window.requestAnimationFrame(this.scrollToTop)
        window.scrollTo(0, sTop - sTop / 8)
      } else {
        this.animationFrameHandler = window.requestAnimationFrame(this.scrollToTop)
        homePage.scrollTo(0, homePageTop - homePageTop / 8)
      }
    }
  }
}

// let animationFrameHandler = -1
// const scrollToTop = () => {
//   const sTop = document.documentElement.scrollTop || document.body.scrollTop
//   // const homePage = document.getElementsByClassName('container-fluid')[0]
//   const homePage = null
//   const homePageTop = homePage ? homePage.scrollTop : 0
//   if (sTop === 0 && homePageTop === 0) {
//     window.cancelAnimationFrame(animationFrameHandler)
//     return
//   }
//   if (sTop > 0) {
//     animationFrameHandler = window.requestAnimationFrame(scrollToTop)
//     window.scrollTo(0, sTop - sTop / 8)
//   } else {
//     animationFrameHandler = window.requestAnimationFrame(scrollToTop)
//     homePage.scrollTo(0, homePageTop - homePageTop / 8)
//   }
// }
</script>
<style>
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

</style>
