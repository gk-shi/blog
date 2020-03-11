<template>
  <div class="not-found">
    <img src="/img/404.jpg">
    <a href="javascript:void(0)" @click="goIndex">返回首页</a>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  data () {
    return {
    }
  },
  methods: {
    goIndex () {
      this.$router.replace({
        path: '/'
      })
    }
  }
}
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
