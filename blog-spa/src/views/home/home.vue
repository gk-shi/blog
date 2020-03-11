<template>
<div>
  <section class="container-fluid">
    <div class="row">
      <div class="cover-img col-12">
        <div class="cover-img-mask"></div>
        <div class="introduce" v-html="introduceNow"></div>
      </div>
      <div class="bootstrap col-12" v-pre>
        <div>
          <p><i class="fa fa-twitter fa-5x"></i><a class="bootstrap-link" href="http://www.bootcss.com/" target="_blank">Bootstrap</a></p>
          <p>响应式UI框架</p>
          <p>移动端优先原则</p>
        </div>
      </div>
      <div class="vue col-12" v-pre>
        <div class="offset-5 offset-md-4">
          <a href="https://cn.vuejs.org/" target="_blank">Vue.js</a>
          <p>渐进式</p>
          <p>JavaScript框架</p>
        </div>
      </div>
      <div class="nodejs col-12" v-pre>
        <div>
          <p>
            <a href="https://nodejs.org/en/" class="node-link" target="_blank">Node.js</a> +
            <a href="http://expressjs.com/" class="express-link" target="_blank">Express</a>
          </p>
          <p class="line">
            <span>让你前后相通，<span class="line-through">猥琐</span>为所欲为！</span>
            <span class="line-bottom"></span>
          </p>
        </div>
      </div>
    </div>
  </section>
  <Foot></Foot>
</div>
</template>

<script>
import Foot from '../../components/common/Foot.vue'
export default {
  name: 'home',
  data () {
    return {
      // 随机问候语数组
      introduce: [
        `<p>遇见你,</p><p>是我的荣幸</p><p>希望你此刻是<strong>快乐</strong>的</p>`,
        `<p>if&nbsp;(sad)&nbsp;{</p><p>&nbsp;&nbsp;sad.stop()</p><p>&nbsp;&nbsp;beAwesome()</p><p>}</p>`,
        `未来可期。`
      ],
      introduceNow: `<p>if&nbsp;(sad)&nbsp;{</p><p>&nbsp;&nbsp;sad.stop()</p><p>&nbsp;&nbsp;beAwesome()</p><p>}</p>`
    }
  },
  components: {
    Foot
  },
  methods: {
    setIntroduce () {
      this.introduceNow = this.introduce[Math.floor(Math.random() * 3)]
    }
  },
  created () {
    this.setIntroduce()
  }
}
</script>

<style lang="scss">

/* 移动端 */

.cover-img {
  max-height: 100vh;
  min-height: 50vh;
  padding: 0;
  font-size: 1.5rem;
  color: #ffffff;
  overflow: hidden;
  background-image: url('https://image.gkshi.com/cover.jpg');
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100vh;
  background-attachment: fixed;
  -webkit-mask-image: url('../../assets/images/mask.png');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center center;
  animation: circle_zoom 1.2s ease-in;
  -webkit-mask-size: 300%;
  &-mask {
    width: 100%;
    height: 100%;
    background: url('https://image.gkshi.com/cover.jpg') no-repeat;
    background-position: top;
    background-size: 100vh;
    background-attachment: fixed;
    filter: blur(3px);
  }
}

.introduce {
  padding: 15vh 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  p {
    font-family: sourceCodePro, Helvetica, STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, Tohoma, Arial;
  }
}

.bootstrap,
.vue,
.nodejs {
  padding: 15vh 0;
  max-height: 100vh;
  min-height: 50vh;
  text-align: center;
}

.bootstrap {
  color: #ffffff;
  font-size: 18px;
  background: linear-gradient(to right, #020031, #6d3353);
  .fa-twitter {
    vertical-align: middle;
    padding-right: 1rem;
  }
  &-link {
    color: #ffffff;
    vertical-align: middle;
    font-size: 1.8rem;
  }
}

.vue {
  background-image: url('../../assets/images/vue-logo.png');
  background-repeat: no-repeat;
  background-position: 20% center;
  -webkit-background-size: auto 50%;
  background-size: auto 50%;
  div {
    padding-top: 3vh;
    >a {
      color: #41b883;
      font-size: 1.6rem;
    }
    >p:first-of-type:before {
      content: '';
      display: block;
      height: 1.5rem;
    }
  }
}

.nodejs {
  background-image: url('../../assets/images/nodejs-logo.png');
  background-repeat: no-repeat;
  background-position: center 20%;
  -webkit-background-size: auto 50%;
  background-size: auto 50%;
  padding: 0 0 5vh 0;
  div {
    padding-top: 33vh;
    p:last-child:before {
      content: '';
      display: block;
      height: 1rem;
    }
  }
  >div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .node-link,
  .express-link {
    font-size: 1.5rem;
  }
  a.node-link {
    color: #72A962;
  }
  .line {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &-through {
      padding: 0 5px;
      font-style: italic;
      text-decoration: line-through;
      color: #a9a9a9;
    }
    &-bottom {
      margin-top: 10px;
      width: 50px;
      height: 2px;
      background: linear-gradient(90deg, rgba(24, 144, 255, 0) 0, #1890ff);
      animation: line-move 2s ease-in-out infinite;
    }
  }
}

@keyframes circle_zoom {
  from {
    -webkit-mask-size: 0%;
    opacity: 0;
  }
  to {
    -webkit-mask-size: 300%;
    opacity: 1;
  }
}

@keyframes line-move {
  from {
    margin-left: -100px;
  }
  to {
    margin-left: 120%;
  }
}

/* 大屏设备和平板 */

@media screen and (min-width: 576px) {
  .cover-img {
    // background-image: url('http://image.gkshi.com/cover.jpg');
    background-position: center top;
    background-size: 100% 50%;
    &-mask {
      background-position: center top;
      background-size: 100% 50%;
    }
  }
  .bootstrap div>p:nth-child(2):before {
    content: '';
    display: block;
    padding-top: 3.5rem;
  }
  .vue {
    background-position: 30% center;
    -webkit-background-size: auto 60%;
    background-size: auto 60%;
  }
}

/* 电脑 */

@media screen and (min-width: 1024px) {
  .cover-img {
    min-height: 100vh;
    background-image: url('https://image.gkshi.com/code-bg.gif');
    background-size: 100% 100%;

    &-mask {
      background: url('https://image.gkshi.com/code-bg.gif') no-repeat;
      background-size: 100% 100%;
      background-attachment: fixed;
    }
  }

  .bootstrap,
  .vue,
  .nodejs {
    max-height: 100vh;
    min-height: 500px;
    padding: 0;
  }
  .bootstrap div {
    padding-top: 10rem;
  }
  .vue {
    background-position: 35% center;

    div {
      padding-top: 13rem;
      margin-left: 10rem;
      font-size: 1.5rem;
    }
  }

  .nodejs {
    background-position: center 30%;

    div {
      padding-top: 20rem;
    }
  }
}
</style>
