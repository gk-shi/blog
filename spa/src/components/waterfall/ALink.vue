
<!-- —————————————↓HTML————————分界线———————————————————————— -->
<template>
  <a class="alink" :href="to" target="_blank">
    <slot></slot>
  </a>
</template>

<!-- ——————————————↓JS—————————分界线———————————————————————— -->
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ALink',
  props: ['to']
})
</script>
