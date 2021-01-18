<template>
  <div v-cloak>
    <transition name="header-fade">
      <Header v-if="showHeader" :navHasBlank="scrollDistance <= 100" />
    </transition>
    <!-- <transition name="route-fade">
        <router-view></router-view>
    </transition> -->
    <router-view v-slot="{ Component }">
      <transition name="route-fade">
        <keep-alive include="Blog">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <Footer v-if="showFooter" />
    <GoTop :distance="scrollDistance" />
  </div>
</template>

<script lang="ts">
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'
import { defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
    GoTop: defineAsyncComponent(() => import('./components/common/GoTop.vue'))
  },
  setup () {
    const notShowHeaderBarRoute = ['website', 'travel', 'notFound', 'me']
    const notShowFooterRoute = ['travel', 'notFound', 'me']
    const showHeader = ref(true)
    const showFooter = ref(true)
    const route = useRoute()
    watch(() => route.name, (n) => {
      showHeader.value = true
      showFooter.value = true
      if (notShowHeaderBarRoute.includes(n as string)) {
        showHeader.value = false
      }
      if (notShowFooterRoute.includes(n as string)) {
        showFooter.value = false
      }
    })


    const scrollDistance = ref(0)
    const scrollHandle: () => void = (): void => {
      scrollDistance.value = (document.documentElement || document.body).scrollTop
    }

    onMounted(() => {
      // window.addEventListener('resize', resizeHandle)
      window.addEventListener('scroll', scrollHandle)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', scrollHandle)
    })

    return {
      showHeader,
      showFooter,
      scrollDistance
    }
  }
})
</script>

<style  scoped>
[cloak] {
  display: none;
}

/* header 过渡 */
.header-fade-enter-active {
  transition: all 0.3s linear;
}

.header-fade-leave-active {
  transition: all 0.3s linear;
}

.header-fade-enter-from,
.header-fade-leave-to {
  opacity: 0;
}

/* 路由过渡 */
.route-fade-enter-active {
  transition: all .8s linear;
}

.route-fade-leave-active {
  transition: all .4s linear;
}

.route-fade-enter-from,
.route-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
