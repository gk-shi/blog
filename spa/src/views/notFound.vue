<template>
  <div class="not-found">
    <img src="/img/404.jpg">
    <a href="javascript:void(0)" @click="goIndex">返回首页</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '../router'

export default defineComponent({
  name: 'NotFound',
  setup () {
    const goIndex: () => void = (): void => {
      router.replace({ path: '/' })
    }

    return {
      goIndex
    }
  }
})
</script>

<style lang="scss" scoped>
.not-found {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.not-found a {
  display: block;
  padding: 40px 0;
}
</style>
