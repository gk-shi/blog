<template>
  <div class="site">
    <header>
      <h2 class="vtitle">我的小窝</h2>
      <p>
        <a href="https://github.com/gk-shi/blog" target="_blank">查看源码</a>
        <a href="javascript:void(0)" @click="goHome">回到首页</a>
      </p>
    </header>
    <section class="article markdown-body container" v-html="html"></section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getWebsiteRecordApi } from '../api'

export default defineComponent({
  name: 'Website',
  setup () {
    const router = useRouter()

    const html = ref('数据获取中...')

    const goHome: () => void = (): void => {
      router.push({ name: 'home' })
    }

    const getHtml: () => Promise<void> = async (): Promise<void> => {
      const { data } = await getWebsiteRecordApi()
      if (data && data.errno === 0 && data.data) {
        html.value = data.data[0].html
      }
    }

    onMounted(() => {
      getHtml()
    })

    return {
      html,
      goHome
    }
  }
})
</script>

<style lang="scss">
.site {
  .markdown-body {
    padding: 50px 20px;
    margin: 20px 0;

    p {
      text-indent: 2em;
    }

    img {
      display: flex;
      margin: 0 auto;
    }

    a {
      color: #0366d6;
    }

    code {
      color: #881280;
    }

    .hljs {
      font-size: 18px;
    }

    ul,
    ul > li {
      list-style-type: disc;
    }

    ol,
    ol > li {
      list-style-type: decimal;
    }
  }
}
</style>

<style lang="scss" scoped>
.site {
  width: 100%;
  height: 100%;

  /* 头部 */
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 300px;
    background: linear-gradient(to right, #1f3747, #293d31);
    color: #fff;
    text-align: center;

    h2 {
      margin-bottom: 30px;
      font-family: Helvetica, STHeiti STXihei, Microsoft JhengHei,
        Microsoft YaHei, Tohoma, Arial;
    }

    p a:nth-of-type(1) {
      text-decoration: none;
      display: inline-block;
      padding: 5px 3px;
      background-color: #ff9900;
      margin-right: 30px;
      border-radius: 4px;
      color: #fff;

      &:hover {
        background-color: #cc6600;
      }
    }
  }

  .markdown-body {
    margin: -80px 200px 0;
    background-color: #f8f8ff;
    box-shadow: 0 0 1px #333;
    margin-bottom: 10px;
  }
}

@media screen and(max-width: 1024px) {
  .site {
    .markdown-body {
      margin: -80px 100px 0;
    }
  }
}

@media screen and(max-width: 576px) {
  .site {
    .markdown-body {
      margin: 0;
    }
  }
}
</style>
