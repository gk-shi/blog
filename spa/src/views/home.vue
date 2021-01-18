<template>
  <div>
    <div class="cover">
    <div class="every-word" v-html="todayWord"></div>
  </div>
  <div class="vite-vue">
    <div class="vite">
      <div class="text">
        <p>
          <a class="home-page-a" target="_blank" href="https://github.com/vitejs/vite">vite</a>
        </p>
        <p>快如闪电</p>
      </div>
      <div class="icon">⚡️</div>
    </div>
    <span class="plus">+</span>
    <div class="vue">
      <img src="../assets/images/vue-logo.png" alt="vue" />
      <div>
        <p>
          <a class="home-page-a" target="_blank" href="https://v3.cn.vuejs.org/">vue 3.0</a>
        </p>
        <p>Composition API</p>
        <p>强劲加持</p>
      </div>
    </div>
  </div>
  <div class="umi-react-antd">
    <div class="logo">
      <div class="umi">
        <img src="../assets/images/umi-logo.png" alt="umi" />
        <a class="home-page-a" target="_blank" href="https://umijs.org/">umi</a>
      </div>
      <div class="react">
        <img src="../assets/images/react-logo.png" alt="react" />
        <a class="home-page-a" target="_blank" href="https://reactjs.org/">react</a>
      </div>
      <div class="antd">
        <img src="../assets/images/antd-logo.png" alt="antd" />
        <a class="home-page-a" target="_blank" href="https://ant.design/index-cn">antd</a>
      </div>
    </div>
    <div class="brief">
      <p>一站式配齐</p>
      <p>控制自如</p>
    </div>
  </div>
  <div class="node-koa">
    <div class="logo">
      <img src="../assets/images/nodejs-logo.png" alt="node" />
      <span class="plus">+</span>
      <div class="koa">koa</div>
    </div>
    <div class="brief">
      <p>
        <span class="node-color">前后相通，</span>
        <del>猥琐</del>为所欲为
      </p>
      <p class="line">
        <span class="snake"></span>
      </p>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const code = `
  <p>
    <span class="red">if</span>&nbsp;
    <span class="yellow">(</span>sad.
    <span class="green">now</span>
    <span class="purple">()</span>
    <span class="yellow">)</span>&nbsp;
    <span class="yellow">{</span>
  </p>
  <p>
    &nbsp;&nbsp;sad.
    <span class="green">stop</span>
    <span class="purple">()</span>
  </p>
  <p>
    &nbsp;&nbsp;
    <span class="green">beAwesome</span>
    <span class="purple">()</span>
  </p>
  <p>
    <span class="yellow">}</span>
  </p>
`

const english = `
  <p>I love three things in this world.</p>
  <p>Sun, moon and you.</p>
  <p>Sun for morning, moon for night , and you forever.</p>
`

const poem = `
  <p class="letter20">长风破浪会有时，</p>
  <p class="letter20">直挂云帆济沧海。</p>
`

const sentence = '<p class="letter20">我希望有个如你一般的人。</p>'


const notes = [poem, sentence, code, english]


export default defineComponent({
  name: 'Home',
  setup () {
    const todayWord = ref(notes[Math.floor(Math.random() * 4)])
    return {
      todayWord
    }
  }
})
</script>

<style lang="scss">
.every-word {
  p,
  span {
    font-size: 20px;
    font-family: sourceCodePro, Avenir, Helvetica, Arial, sans-serif;
  }

  p {
    margin-top: 10px;
  }
}

/* 封面代码颜色及文字间隔 */
span {
  &.red {
    color: rgba(251, 0, 108, 1);
  }

  &.yellow {
    color: rgba(252, 212, 0, 1);
  }

  &.green {
    color: rgba(147, 230, 0, 1);
  }

  &.purple {
    color: rgba(234, 101, 219, 1);
  }
}

.letter20 {
  letter-spacing: 20px;
}

@media screen and(max-width: 576px) {
  .letter20 {
    letter-spacing: unset;
  }
}
</style>

<style lang="scss" scoped>
.home-page-a {
  color: unset;
  &:hover {
    text-decoration: underline;
  }
}

.cover {
  position: relative;
  height: 100vh;
  background-image: url("https://image.gkshi.com/cover.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  -webkit-mask-image: url("../assets/images/mask.png");
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center center;
  animation: circle_zoom 1.2s ease-in;
  -webkit-mask-size: 300%;

  .every-word {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
  }
}

.vite-vue {
  display: flex;
  justify-content: space-evenly;
  padding: 150px 0;

  .plus {
    display: flex;
    align-items: center;
    margin: 0 -200px;
    font-size: 50px;
  }

  .vite,
  .vue {
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  .vite {
    .text {
      text-align: center;

      > p:first-child {
        color: #ff901e;
      }
    }

    .icon {
      font-size: 150px;
    }
  }

  .vue {
    > img {
      width: 200px;
      height: 200px;
    }

    > div {
      > p:first-child {
        color: #3fb983;
      }
    }
  }
}

.umi-react-antd {
  background-color: rgb(52, 58, 64);
  padding: 150px 0 80px;
  color: #ffffff;
  font-size: 20px;

  .logo {
    display: flex;
    justify-content: center;
    transform-style: preserve-3d;
    transform-origin: center center -52px;
    animation: rotateForY 4s linear infinite;

    .umi,
    .react,
    .antd {
      display: flex;
      flex-direction: column;
      align-items: center;

      > img {
        height: 150px;
      }

      > a {
        margin-top: 15px;
      }
    }

    .umi {
      > a {
        background: linear-gradient(to right, #ffffff, #2883ff);
        -webkit-background-clip: text;
        color: transparent;

        &:hover {
          text-decoration-color: #2883ff;
        }
      }

      backface-visibility: hidden;
      transform-origin: right;
      transform: rotateY(-120deg);
    }

    .react {
      > a {
        color: #61dafb;
      }
      backface-visibility: hidden;
    }

    .antd {
      > a {
        background: linear-gradient(
          to right,
          #2883ff,
          #2fc5ff,
          #f85d62,
          #f62e3f
        );
        -webkit-background-clip: text;
        color: transparent;

        &:hover {
          text-decoration-color: #2883ff;
        }
      }

      backface-visibility: hidden;
      transform-origin: left;
      transform: rotateY(120deg);
    }
  }

  .brief {
    text-align: center;
    margin-top: 60px;
    color: #61dafb;
  }
}

.node-koa {
  padding: 150px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;

    > img {
      width: 130px;
    }

    .plus {
      font-size: 50px;
      margin: 0 50px;
    }

    .koa {
      font: 100px "Italiana", sans-serif;
      text-transform: lowercase;
    }
  }

  .brief {
    margin-top: 20px;

    .node-color {
      color: #99cc67;
    }

    .line {
      position: relative;
      height: 10px;
      overflow: hidden;
      padding-top: 10px;

      .snake {
        position: absolute;
        display: inline-block;
        width: 40px;
        height: 4px;
        border-radius: 10px;
        background: linear-gradient(to left, #99cc67, transparent);
        animation: lineMove 2s linear infinite;
      }
    }
  }
}

@media screen and(max-width: 1024px) {
  .cover {
    height: 50vh;
    background-image: url("http://image.gkshi.com/cover.jpg");
    background-size: 100% 50%;
  }

  .vite-vue {
    .plus {
      margin: 0 -100px;
    }
  }
}

/* ipad */
@media screen and(max-width: 768px) {
  .vite-vue {
    .vite,
    .vue {
      font-size: 16px;
    }

    .vite {
      > .icon {
        font-size: 100px;
      }
    }

    .vue {
      > img {
        width: 150px;
        height: 150px;
      }
    }

    .plus {
      margin: 0 -100px;
    }
  }
}

@media screen and(max-width: 576px) {
  .cover {
    background-position: 50% 60px;
    background-size: 150% 50%;

    .every-word {
      width: 100%;
      box-sizing: border-box;
      padding-left: 30px;

      > p {
        width: 100%;
      }
    }
  }

  .vite-vue {
    flex-direction: column;
    padding: 80px 0;

    .vite {
      flex-direction: row-reverse;
      justify-content: center;
    }

    .plus {
      margin: 0 auto 30px;
    }

    .vue {
      justify-content: center;
    }
  }

  .node-koa {
    .logo {
      > img {
        margin-left: -10px;
      }

      .plus {
        margin: 0 10px;
      }
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

@keyframes rotateForY {
  from {
    transform: rotateY(0deg);
  }
  from {
    transform: rotateY(360deg);
  }
}

@keyframes lineMove {
  from {
    margin-left: -100px;
  }
  to {
    margin-left: 300px;
  }
}
</style>
