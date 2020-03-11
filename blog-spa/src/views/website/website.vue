<template>
  <div class="site-container">
    <header>
      <h2 class="vtitle">我的小窝</h2>
      <p><a href="https://github.com/gk-shi/blog" target="_blank">查看源码</a><a href="javascript:void(0)" @click="goHome">回到首页</a></p>
    </header>
    <section class="container">
      <div>
        <h3>1.为什么要写(更新)这个博客</h3>
        <p>这个博客是我第一个完成的完整的项目。从需求分析到 API 设计再到代码实现，从后端服务到前端页面，都是自己摸索着独立完成的。搭建博客的目的起初很单纯：做一个自己的东西。在搭建的过程中，想法一直在变化，从希望它能成功运行就行，到需要一个瀑布流，需要一个丝滑的过渡动画来提升体验度……现在回过头来看，以前的代码真的可以用惨不忍睹来形容，所以，就有了现在的 2.0 版本（其实前台看起来变化不大，主要是以前代码真的太烂，维护增加功能比重写还费劲o(╯□╰)o）。</p>
      </div>
      <div>
        <h3>2.博客结构</h3>
        <div class="img">
          <img :src="prefix + 'structe.png'">
        </div>
          <p>其实博客结构变化不大，前台和控制台共用一套服务逻辑。前端请求进来后用 Nginx 反向代理到同一服务地址，在服务层，对接口做了相应的权限验证和拦截操作。</p>
        </div>
        <div class="update-info">
          <h3>3.此次更新的内容</h3>
          <p>这次更新主要集中在前台和控制台，对于服务层的代码，没有做太大的修改。</p>
          <br />
          <p>共有更新：</p>
          <p>将 <code>http</code> 升级 <code>https</code> 协议。</p>
          <br />
          <p>前台：</p>
          <p>1.对项目结构进行了部分重构，更符合真实项目开发目录。</p>
          <p>2.将接口从各个页面统一提到 <code>service/</code>,方便管理。</p>
          <p>3.对使用到的瀑布流插件 <code>vue-waterfall-easy</code>、emoji 插件<code>vue-emoji-picker</code> 直接使用它的源代码进行了一些组件的定制化开发，也优化了体验。</p>
          <p>4.增加了一个功能：地图查看旅行城市。</p>
          <br />
          <p>控制台：</p>
          <p>1.对控制台直接进行了<span style="font-weight: bold">重写！！！</span>，使用的技术栈为 <code>react + umi + dva + antd</code> ，这同时也是我一次新的尝试，不再使用自己熟悉的 <code>vue</code> 全家桶。</p>
          <p>2.在实现原有功能以及符合前台新增功能的相应模块之余，我还新增了一个控制台的测试账号，让感兴趣的小伙伴可以去我控制台看看~😏😏😏</p>
          <br />
          <p>控制台地址：<a target="_blank" :href="consoleUrl">{{ consoleUrl }}</a></p>
           <br />
          <p>账号、密码：<code>test.admin</code></p>
        </div>
        <div>
          <h3>4.后续打算</h3>
          <p>1.短期来说，关于前台，<code>关于我</code>、<code>关于本站</code>两个页面我需要重新设计，前者需要更新内容，后者我更希望改成支持 markdown ，以后我就能直接在控制台写 markdown 来更新本页面，再也不用像现在这样手写页面。（暴风哭泣！！！o(╥﹏╥)o）</p>
          <p>2.长期来说，我打算将控制台慢慢翻成 <code>ts</code> 版本，前台其实我有在重新设计，将一些功能做的更完善，将体验再提升。准备在 vue 3.x 出来后，作为尝鲜版也写成 <code>ts</code> 版本（希望它到时候对 ts 的支持不会让我翻车~）。</p>
        </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'website',
  data () {
    return {
      prefix: process.env.VUE_APP_IMG_PREFIX,
      consoleUrl: process.env.VUE_APP_CONSOLE
    }
  },
  methods: {
    goHome () {
      console.log('sss')
      this.$router.push({ name: 'home' })
    }
  }
}

</script>
<style lang="scss" scoped>
.site-container {
  width: 100%;
  height: 100%;
}

.update-info {
  a, a:visited {
    color: #1890ff;
  }
}

/* 头部 */
header {
  width: 100%;
  height: 50%;
  padding-top: 10vh;
  background: linear-gradient(to right, #1f3747, #293d31);
  color: #fff;
  text-align: center;
}

header h2 {
  margin-bottom: 30px;
  font-family: Helvetica, STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, Tohoma, Arial;
}

header p a:nth-of-type(1) {
  /* margin-left: -20px; */
  text-decoration: none;
  display: inline-block;
  padding: 5px 3px;
  background-color: #FF9900;
  margin-right: 30px;
  border-radius: 4px;
  color: #fff;
}

/* 主体 */
.container {
  /* height: 100%; */
  padding: 50px 20px;
}

.container h3 {
  margin: 20px 0;
}

.container div p {
  text-indent: 2em;
}

.container div .img {
  overflow-x: auto;
}

@media screen and (min-width: 576px) {
  header {
    height: 350px;
    padding: 100px;
  }

  header p a:nth-of-type(1):hover {
    background-color: #CC6600;
  }

  .container {
    margin-top: -100px;
    background-color: #F8F8FF;
    box-shadow: 0 0 1px #333;
    margin-bottom: 10px;
  }

  .container .img {
    text-align: center;
  }
}

</style>
