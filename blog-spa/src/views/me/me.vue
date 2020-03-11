<template>
  <div class="body-container">
    <p v-if="reDesign" class="re-design">该页面正在重新设计、翻新~~~</p>
    <header>
      <div class="logo">
        <div class="img-box">
          <img :src="logo" />
        </div>
          <div class="greet">
            <p>Hi<sup>~</sup></p>
            <p>我叫小溪</p>
            <router-link to="/" class="go-home">回到首页</router-link>
          </div>
          <div class="down" @click="moveDown">
            <i class="fa fa-angle-double-down fa-3x"></i>
          </div>
        </div>
        <div class="triangle">
        </div>
    </header>
    <article>
      <section class="base-info">
        <header :class="['vtitle', baseInfo?'animate' : '']">
          <i class="fa fa-address-card-o" aria-hidden="true"></i>
          基本信息
        </header>
        <aside :class="baseInfo?'animate' : ''">
          <img width="100" src="https://image.gkshi.com/avatar.jpg?v=1583840982017">
        </aside>
          <article :class="baseInfo?'animate' : ''">
            <p><span>姓名：</span><span>小溪</span><br /></p>
            <p><span>爱好：</span><span><del>女</del>&nbsp;听音乐、游泳</span><br /></p>
            <p><span>计划：</span><span>有一份必去的旅行名单，已经在去了~(就差钱了~)</span></p>
          </article>
      </section>
      <section class="name-origin">
        <header :class="['vtitle', nameOrigin?'animate' : '']">
          <!-- <i class="fa fa-question" aria-hidden="true"></i> -->
          名字由来
        </header>
        <article>
          因为家乡方言叫我名字时的谐音像，我也希望能够汇聚知识，终能成海。
        </article>
      </section>
      <section class="now">
        <header :class="now?'animate' : ''">
          <p class="vtitle">现在的我</p>
          <p>现在的我已经走出大学的校门啦~专业是信息安全，却“不务正业”地误打误撞进了前端的坑。（附学校美图）</p>
        </header>
        <article :class="now?'animate' : ''">
          <img class="ujs" src="https://image.gkshi.com/ujs.jpg">
        </article>
      </section>
      <section class="dev">
        <header :class="dev?'animate' : ''">
          <p class="vtitle">开发那些事儿</p>
          <p>喜欢前端，从最开始沉迷于ST3，捣鼓各种插件，到后来用上vscode，也会用nodejs撸一点后端代码。</p>
        </header>
        <article :class="dev?'animate' : ''">
          <img src="/img/vue.png">
          <img src="/img/nodejs.png">
          <img src="/img/vscode-logo.png">
          <img src="/img/bootstrap.png">
        </article>
      </section>
      <section class="future">
        <header :class="future?'animate' : ''">
          <p class="vtitle">关于未来</p>
          <p>和普通人一样，我也有想要的东西，想体验的生活，想去的地方，想见的人......也许现在的我并不出色，但我一直在努力丫！</p>
        </header>
        <article :class="future?'animate' : ''">
          <img :src="run">
        </article>
      </section>
    </article>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'me',
  data () {
    return {
      baseInfo: false,
      nameOrigin: false,
      now: false,
      dev: false,
      future: false,
      flag: false,
      reDesign: true,
      logo: `${process.env.VUE_APP_IMG_PREFIX}website-logo.png`,
      run: `${process.env.VUE_APP_IMG_PREFIX}run.gif`
    }
  },
  methods: {
    moveDown () {
      $('html,body').animate({ scrollTop: $('.base-info').offset().top }, 800)
    }
  },
  mounted () {
    const baseTop = $('.base-info header').offset().top
    const nameTop = $('.name-origin header').offset().top
    const nowTop = $('.now header').offset().top
    const devTop = $('.dev header').offset().top
    const futureTop = $('.future header').offset().top
    const dataArr = [baseTop, nameTop, nowTop, devTop, futureTop]
    let wTop = 0
    if (document.cookie.match(/scrollTop=([^;]+)(;|$)/) !== null) {
      wTop = document.cookie.match(/scrollTop=([^;]+)(;|$)/)[1]
      document.cookie = ''
    } else {
      wTop = $(window).scrollTop()
    }
    const wHeight = $(window).height()
    if (futureTop < (wTop + wHeight) && !this.future) {
      this.baseInfo = true
      this.nameOrigin = true
      this.now = true
      this.dev = true
      this.future = true
    } else if (devTop < (wTop + wHeight) && !this.dev) {
      this.baseInfo = true
      this.nameOrigin = true
      this.now = true
      this.dev = true
    } else if (nowTop < (wTop + wHeight) && !this.now) {
      this.baseInfo = true
      this.nameOrigin = true
      this.now = true
    } else if (nameTop < (wTop + wHeight) && !this.nameOrigin) {
      this.baseInfo = true
      this.nameOrigin = true
    } else if (baseTop < (wTop + wHeight) && !this.baseInfo) {
      this.baseInfo = true
    }
    if (!(futureTop < (wTop + wHeight) && !this.future)) {
      $(window).scroll(dataArr, () => {
        const [baseTop, nameTop, nowTop, devTop, futureTop] = dataArr
        const wTop = $(window).scrollTop()
        const wHeight = $(window).height()
        if (baseTop < (wTop + wHeight) && !this.baseInfo) {
          this.baseInfo = true
        } else if (nameTop < (wTop + wHeight) && !this.nameOrigin) {
          this.nameOrigin = true
        } else if (nowTop < (wTop + wHeight) && !this.now) {
          this.now = true
        } else if (devTop < (wTop + wHeight) && !this.dev) {
          this.dev = true
        } else if (futureTop < (wTop + wHeight) && !this.future) {
          this.future = true
        }
        document.cookie = `scrollTop=${wTop}`
      })
    }
    setTimeout(() => {
      this.reDesign = false
    }, 3000)
  }
}

</script>
<style scoped>
.re-design {
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 0 3px #fff;
}

.body-container {
  width: 100%;
  height: 100%;
}

.body-container>header {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(#36648B, #6495ED);
}

/* 首屏 */
header .logo {
  position: absolute;
  width: 100%;
  height: 100%;
}

.img-box,
.greet,
.down {
  position: absolute;
}

.logo .img-box {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: logo-toggle .8s linear;
  animation-fill-mode: forwards;
}

@keyframes logo-toggle {
  from {
    opacity: 0;
    margin-top: -200px;
  }

  to {
    opacity: 1;
    margin-top: -80px;
  }
}

.logo .greet {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: greet-toggle .8s ease;
  animation-fill-mode: forwards;
  text-align: center;
  z-index: 100;
}

@keyframes greet-toggle {
  0% {
    margin-top: 300px;
    opacity: 0;
  }

  70% {
    margin-top: 60px;
    opacity: 1;
  }

  80% {
    margin-top: 80px;
  }

  90% {
    margin-top: 100px;
  }

  100% {
    margin-top: 80px;
    opacity: 1;
  }
}

.logo .greet>p {
  font-size: 22px;
  font-family: Helvetica, STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, Tohoma, Arial;
}

.logo>.greet>.go-home {
  display: inline-block;
  width: 100px;
  margin-top: 20px;
  padding: 3px 0;
  border-radius: 4px;
  color: #000;
  background-color: #CAE1FF;
}

.logo .down {
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  z-index: 100;
  animation: icon-down .8s linear infinite alternate;
  color: #ccc;
}

@keyframes icon-down {
  from {
    bottom: 0px;
  }

  to {
    bottom: 10px;
  }
}

/* 白色三角覆盖层 */
header>.triangle {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-bottom: 50vh solid #f5f5f5;
  border-left: 50vw solid transparent;
  border-right: 50vw solid transparent;
}

/* 所有 vtitle 加粗 */
.vtitle {
  font-weight: bold;
}

/* 基本信息 */
.base-info {
  position: relative;
  height: 60vh;
  padding-top: 20vh;
}

.base-info .vtitle {
  text-align: center;
  margin-bottom: 20px;
  margin-top: -20px;
  opacity: 0;
}

.base-info .vtitle.animate {
  animation: base-vtitle .8s linear;
  animation-fill-mode: forwards;
}

@keyframes base-vtitle {
  from {
    margin-top: -20px;
    opacity: 0;
  }

  to {
    margin-top: 0px;
    opacity: 1;
  }
}

.base-info aside,
.base-info article {
  /* display: inline-block; */
  position: absolute;
  vertical-align: middle;
}

.base-info aside {
  margin-top: 12px;
  opacity: 0;
}

.base-info aside.animate {
  animation: base-avt .8s linear;
  animation-fill-mode: forwards;
}

@keyframes base-avt {
  from {
    margin-top: 32px;
    left: -20px;
    opacity: 0;
  }

  to {
    margin-top: 12px;
    left: 20px;
    opacity: 1;
  }
}

.base-info article {
  margin-left: 0px;
  right: 0;
  width: calc(100vw - 150px);
  opacity: 0;
}

.base-info article.animate {
  animation: base-article .8s linear;
  animation-fill-mode: forwards;
}

@keyframes base-article {
  from {
    margin-top: 20px;
    right: -20px;
    opacity: 0;
  }

  to {
    margin-top: 0px;
    right: 10px;
    opacity: 1;
  }
}

.base-info article span {
  float: left;
}

.base-info article span:nth-child(2) {
  width: calc(100vw - 200px);
}

/* 名字由来 */
.name-origin {
  background-color: #689;
  padding: 80px 20px;
}

.name-origin .vtitle {
  display: inline-block;
  writing-mode: vertical-lr;
  margin: 0 10px 0 40px;
  /* vertical-align: top; */
  opacity: 0;
}

.name-origin .vtitle.animate {
  animation: name-vtile .6s linear;
  animation-fill-mode: forwards;
}

@keyframes name-vtile {
  from {
    margin-left: 0;
    opacity: 0;
  }

  to {
    margin-left: 40px;
    opacity: 1;
  }
}

.name-origin article {
  display: inline-block;
  width: 230px;
  padding-left: 40px;
  border-left: 1px solid #ddd;
}

/* 现在 */
.now {
  padding: 100px 20px;
}

.now header {
  text-align: center;
  margin-bottom: 30px;
  opacity: 0;
}

.now header.animate {
  animation: now-header .8s linear;
  animation-fill-mode: forwards;
}

@keyframes now-header {
  from {
    margin-top: -30px;
    margin-bottom: 70px;
    opacity: 0;
  }

  to {
    margin-top: 0;
    margin-bottom: 30px;
    opacity: 1;
  }
}

.now article {
  opacity: 0;
}

.now article.animate {
  animation: now-ujs .8s linear;
  animation-fill-mode: forwards;
}

.ujs {
  width: 100%;
}

@keyframes now-ujs {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* 关于开发 */
.dev {
  padding: 50px 0;
}

.dev header {
  text-align: center;
  margin-bottom: 30px;
  opacity: 0;
}

.dev header.animate {
  animation: dev-header .8s linear;
  animation-fill-mode: forwards;
}

@keyframes dev-header {
  from {
    margin-top: -30px;
    opacity: 0;
  }

  to {
    margin-top: 0;
    opacity: 1;
  }
}

.dev header p {
  width: 300px;
  margin: 0 auto;
}

.dev article {
  text-align: center;
}

.dev article img {
  width: 120px;
  margin: 5px;
  opacity: 0;
}

.dev article.animate img:nth-of-type(1) {
  animation: dev-icon .4s linear .8s;
  animation-fill-mode: forwards;
}

.dev article.animate img:nth-of-type(2) {
  animation: dev-icon .4s linear 1.2s;
  animation-fill-mode: forwards;
}

.dev article.animate img:nth-of-type(3) {
  animation: dev-icon .4s linear 1.6s;
  animation-fill-mode: forwards;
}

.dev article.animate img:nth-of-type(4) {
  animation: dev-icon .4s linear 2s;
  animation-fill-mode: forwards;
}

@keyframes dev-icon {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* 关于未来 */
.future {
  padding: 80px 0;
  text-align: center;
  overflow-x: hidden;
}

.future header {
  margin-bottom: 50px;
  opacity: 0;
}

.future header.animate {
  animation: future-header .8s linear;
  animation-fill-mode: forwards;
}

@keyframes future-header {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.future article {
  /* margin-top: 200px; */
  opacity: 0;
}

.future article.animate {
  animation: future-article 1s ease-in .5s;
  animation-fill-mode: forwards;
}

@keyframes future-article {
  from {
    margin-top: 200px;
    opacity: 0;
  }

  to {
    margin-top: 0;
    opacity: 1;
  }
}

@media screen and (min-width: 576px) {
  .body-container>header {
    min-height: 640px;
  }

  /* 首屏 */
  header .triangle {
    min-height: 640px;
  }

  .logo>.greet>.go-home:hover {
    color: #fff;
    text-decoration: none;
    background-color: #1E90FF;
  }

  .logo .greet {
    animation: greet-toggle .8s ease;
    animation-fill-mode: forwards;
  }

  @keyframes greet-toggle {
    0% {
      margin-top: 300px;
      opacity: 0;
    }

    70% {
      margin-top: 100px;
      opacity: 1;
    }

    80% {
      margin-top: 120px;
    }

    90% {
      margin-top: 140px;
    }

    100% {
      margin-top: 120px;
      opacity: 1;
    }
  }

  /* 基本信息 */
  .base-info aside,
  .base-info article {
    position: static;
  }

  .base-info {
    height: 520px;
    padding-top: 150px;
  }

  .base-info aside {
    float: left;
    width: 48vw;
    margin-top: 0;
    text-align: right;
  }

  .base-info aside.animate {
    animation: base-avt .8s linear;
    animation-fill-mode: forwards;
  }

  @keyframes base-avt {
    from {
      margin-top: 20px;
      padding-right: 30px;
      opacity: 0;
    }

    to {
      margin-top: 0;
      padding-right: 0;
      opacity: 1;
    }
  }

  .base-info article {
    float: right;
    width: 48vw;
    overflow: hidden;
  }

  .base-info article.animate {
    animation: base-article .8s linear;
    animation-fill-mode: forwards;
  }

  @keyframes base-article {
    from {
      margin-top: 20px;
      padding-left: 30px;
      opacity: 0;
    }

    to {
      margin-top: 0;
      padding-left: 0;
      opacity: 1;
    }
  }

  .base-info article p span:nth-of-type(2) {
    width: 200px;
    overflow: hidden;
  }

  /* 名字由来 */
  .name-origin {
    height: 500px;
    text-align: center;
    padding: 210px 0 0 0;
  }

  /* 现在 */
  .now header p:nth-of-type(2) {
    width: 300px;
    margin: 0 auto;
    margin-top: 30px;
  }

  /* 开发 */
  .dev {
    height: 600px;
    padding: 180px 0 0 0;
  }

  .dev header {
    width: 400px;
    float: left;
    margin-left: 200px;
    margin-top: 80px;
  }

  @keyframes dev-header {
    from {
      margin-left: 0;
      opacity: 0;
    }

    to {
      margin-left: 200px;
      opacity: 1;
    }
  }

  .dev article {
    width: 400px;
    float: right;
    margin-right: 200px;
  }

  .dev header p:nth-of-type(2) {
    margin-top: 30px;
  }

  .dev article img {
    width: 100px;
    margin: 20px 40px;
  }

  .dev article img:hover {
    transform: scale(1.2, 1.2)
  }

  /* 未来 */
  .future header p:nth-of-type(2) {
    width: 300px;
    margin: 0 auto;
    margin-top: 30px;
  }
}

</style>
