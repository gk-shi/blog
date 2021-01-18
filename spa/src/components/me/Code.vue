<template>
  <div>
    <div class="code-version">
      <div class="left">
        <div class="left-wrapper">
          <div class="top">
            <div class="top-dot">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="tag">gkshi 的个人简介</div>
            <div class="fill"></div>
          </div>
          <div :class="classList">
            <div class="base-info">
              <div>
                <p>昵称：gkshi</p>
                <p>性别：♂</p>
                <p>爱好：🎵、🎸、🎬</p>
              </div>
              <img :src="blogAvatar" alt="头像" />
            </div>
            <p>一个比较躺平的95后，不算太差但也算不上多好的前端工程师。</p>
            <p>学的好好的信息安全，咋就稀里糊涂做了前端╮(╯▽╰)╭</p>
            <p>
              工作之余，喜欢捣鼓自己的博客，从前端都后端，从 vue 到 react，从 JS
              到 TS
              ，从...（再吹下去就有点过了）。其实也有点懒，这次的博客重构拖了近三个月，才算基本完成o(╥﹏╥)o
            </p>
            <p>
              没事儿的时候喜欢刷刷电影、听听音乐，偶尔兴致来了也会拿起吉他拨两下
            </p>
            <p>
              平时算是比较宅了，但也有想出去浪，比如云南、重庆、长沙...由于种种原因，一直还没有机会去。
            </p>
            <p>但，所有的故事总胜在恰逢其时...</p>

            <div class="btn">
              <button @click="() => backTo('home')">回首页</button>
              <button @click="() => backTo('last')">返回</button>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="top-dot">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="code-wrapper">
          <div class="html">
            <header>
              <div class="title">me.html</div>
            </header>
            <article class="markdown-body">
              <span class="hljs-tag"
                >&lt;<span class="hljs-name">div</span>
                <span class="hljs-attr">class</span>=<span class="hljs-string"
                  >"brief-introduction"</span
                >&gt;</span
              >
              <div v-html="html"></div>
              <span class="hljs-tag"
                >&lt;/<span class="hljs-name">div</span>&gt;</span
              >
            </article>
          </div>
          <div class="css">
            <header>
              <div class="title">me.css</div>
            </header>
            <article class="markdown-body" v-html="css"></article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, Ref, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import marked from '/@/utils/marked'


const html1 = `
  <div class="base-info">
    <div>
      <p>昵称：gkshi</p>
      <p>性别：♂</p>
      <p>爱好：♀`

const html2 = `爱好：🎵、🎸、🎬</p>
    </div>
    <img src="https://image.gkshi.com//avatar.jpg" alt="头像" />
`

const html3 = `
  <p>
    一个比较躺平的95后，不算太差但也算不上多好的前端工程师。
  </p>
  <p>
    学的好好的信息安全，咋就稀里糊涂做了前端╮(╯▽╰)╭
  </p>
  <p>
    工作之余，喜欢捣鼓自己的博客，从前端都后端，从 vue 到 react，从 JS 到 TS ，从...（再吹下去就有点过了）。其实也有点懒，这次的博客重构拖了近三个月，才算基本完成o(╥﹏╥)o
  </p>
  <p>
    没事儿的时候喜欢刷刷电影、听听音乐，偶尔兴致来了也会拿起吉他拨两下
  </p>
  <p>
    平时算是比较宅了，但也有想出去浪，比如云南、重庆、长沙...由于种种原因，一直没有机会去。
  </p>
  <p>
    但，所有的故事总胜在恰逢其时...
  </p>
`


const css1 = `
/* 调整一下基本信息样式，要好看点~ */
.brief-introduction .base-info {
  display: flex;
}

.brief-introduction .base-info > div p {
  height: 30px;
  line-height: 30px;
}

.brief-introduction .base-info img {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-left: 60px;
}`

const css2 = `

/* 太挤了，加点margin，距离产生美 */
.brief-introduction > p {
  margin-top: 30px;
}

.brief-introduction > p:first-of-type {
  margin-top: 100px;
}`

const actualHobby = '爱好：♀'

const fill = (timeHandler: NodeJS.Timeout, raw: string, target: Ref<string>, callback: Function, delay = 1000, time = 100): void => {
  let idx = 0
  timeHandler = setInterval(() => {
    if (!raw[idx]) {
      clearInterval(timeHandler)
      setTimeout(() => {
        callback && callback()
      }, delay)
      return
    }
    target.value += raw[idx]
    idx++
  }, time)
}

const cut = (timeHandler: NodeJS.Timeout, cutStr: string, target: Ref<string>, callback: Function, delay = 1000, time = 100): void => {
  const len = cutStr.length
  let haveCut = 0
  timeHandler = setInterval(() => {
    if (haveCut >= len) {
      clearInterval(timeHandler)
      setTimeout(() => {
        callback && callback()
      }, delay)
      return
    }
    target.value = target.value.slice(0, -1)
    haveCut++
  }, time)
}


export default defineComponent({
  name: 'Me',
  props: {
    delay: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const imgPrefix = import.meta.env.VITE_IMG_PREFIX
    const blogAvatar = `${imgPrefix}/avatar.jpg?t=${Date.now()}`

    const htmlContent = ref('')
    const html = computed(() => {
      return marked('```html' + htmlContent.value + '\n```')
    })


    const cssContent = ref('')
    const css = computed(() => {
      return marked('```css\n' + cssContent.value + '\n```')
    })



    const classList = ref<Array<string>>(['brief-introduction'])
    const addClass = (className: string): void => {
      classList.value.push(className)
    }

    const nextRenderNum = ref(0)
    interface HandlerObj {
      [propName: number]: () => void;
    }
    let timehandler: NodeJS.Timeout
    onBeforeUnmount(() => {
      clearInterval(timehandler)
    })

    const handlerObj: HandlerObj = {
      1: (): void => fill(timehandler, html1, htmlContent, () => { nextRenderNum.value++ }),
      2: (): void => cut(timehandler, actualHobby, htmlContent, () => { nextRenderNum.value++ }, 0),
      3: (): void => fill(timehandler, html2, htmlContent, () => {
        addClass('show-base-info')
        nextTick(() => {
          nextRenderNum.value++
        })
      }, 500),
      4: (): void => fill(timehandler, css1, cssContent, () => {
        addClass('base-position')
        nextTick(() => {
          nextRenderNum.value++
        })
      }, 500),
      5: (): void => fill(timehandler, html3, htmlContent, () => {
        addClass('show-sentence')
        nextTick(() => {
          nextRenderNum.value++
        })
      }, 500),
      6: (): void => fill(timehandler, css2, cssContent, () => {
        addClass('fix-p-css')
        nextTick(() => {
          nextRenderNum.value++
        })
      })
    }
    watch(nextRenderNum, (newNum: number) => {
      handlerObj[newNum] && handlerObj[newNum]()
    })

    onMounted(() => {
      setTimeout(() => {
        nextRenderNum.value = 1
      }, props.delay)
    })


    const router = useRouter()
    const backTo = (direction: string): void => {
      if (direction === 'home') router.replace({ name: 'home' })
      else router.go(-1)
    }

    return {
      html,
      css,
      classList,
      blogAvatar,
      backTo
    }
  }
})
</script>

style.<style lang="scss">
.code-wrapper {
  .html,
  .css {
    .markdown-body {
      pre {
        height: 100%;
        background: none;
        padding: 0;
        margin-bottom: 0;

        .hljs {
          height: 100%;
          background: none;
          padding: 0;
          font-size: 16px;
          box-sizing: border-box;

          > code {
            display: inline-block;
            white-space: pre-wrap;

            > span {
              font-size: 16px !important;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.code-version {
  display: flex;
  perspective: 300px;

  .left,
  .right {
    height: 100vh;
    min-height: 700px;
    box-sizing: border-box;

    .top-dot {
      position: absolute;

      .dot {
        display: inline-block;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        margin-right: 6px;
        cursor: pointer;

        &.red {
          background-color: #fb6058;
        }

        &.yellow {
          background-color: #fcbd2e;
        }

        &.green {
          background-color: #29c941;
        }
      }
    }
  }

  .right {
    position: relative;
    border: 10px solid #e0dddf;
    border-top: 25px solid #e0dddf;
    border-radius: 10px;
    background-color: #282823;
    width: 50%;
    display: flex;
    flex-direction: column;
    // margin-right: 30px;

    .top-dot {
      top: -22px;

      .dot {
        display: inline-block;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        margin-right: 6px;
        cursor: pointer;

        &.red {
          background-color: #fb6058;
        }

        &.yellow {
          background-color: #fcbd2e;
        }

        &.green {
          background-color: #29c941;
        }
      }
    }

    .code-wrapper {
      display: flex;
      height: 100%;

      .html {
        width: 52%;
        flex-shrink: 0;
      }

      .css {
        flex-grow: 1;
      }

      .html,
      .css {
        box-sizing: border-box;
        // display: flex;
        // flex-direction: column;
        // overflow-y: scroll;

        header {
          height: 30px;
          background-color: #6c6d6a;
          overflow: hidden;

          .title {
            position: relative;
            width: 100px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ccc;
            background: #282823;
            margin-left: 12px;

            &::before {
              position: absolute;
              left: -12px;
              display: block;
              content: "";
              border-width: 0 6px 30px;
              border-style: solid;
              border-color: transparent #282823 #282823 transparent;
            }

            &::after {
              position: absolute;
              right: -12px;
              display: block;
              content: "";
              border-width: 0 6px 30px;
              border-style: solid;
              border-color: transparent transparent #282823 #282823;
            }
          }
        }

        article {
          height: calc(100% - 30px);
          padding: 5px 10px;
          overflow: scroll;
          box-sizing: border-box;

          &.markdown-body {
            color: #ffffff;
          }
        }
      }

      .html {
        border-right: 2px solid #666666;
      }
    }
  }

  .left {
    flex-grow: 1;
    width: 50%;
    padding: 10px;
    box-sizing: border-box;
    transform-origin: 0;
    animation: leftRotate 0.5s linear 0.2s forwards;

    @keyframes leftRotate {
      0% {
        width: 50%;
        transform: rotateY(0deg);
      }
      100% {
        width: 45%;
        transform: rotateY(10deg);
      }
    }

    &-wrapper {
      height: 100%;
      border: 1px solid #ccc;
      border-radius: 10px;
      overflow: hidden;

      .top {
        padding-top: 6px;
        display: flex;
        align-items: center;
        height: 35px;
        background: linear-gradient(
          to bottom,
          #f5f5f5 0,
          #f5f5f5 60%,
          #ffffff 61%,
          #ffffff 100%
        );

        .top-dot,
        .tag,
        .fill {
          height: 100%;
        }

        .top-dot {
          position: inherit;
          padding: 6px 10px 0 10px;
          background-color: #f5f5f5;
          border-radius: 0 0 10px 0;
          box-sizing: border-box;
        }

        .tag {
          background-color: #fff;
          padding: 6px 10px 0;
          box-sizing: border-box;
          border-radius: 10px 10px 0 0;
        }

        .fill {
          flex-grow: 1;
          height: 100%;
          background-color: #f5f5f5;
          border-radius: 0 0 0 10px;
        }
      }

      .brief-introduction {
        width: 100%;
        height: 100%;
        padding: 30px 30px;
        background-color: #fff;
        box-sizing: border-box;

        .base-info {
          display: none;
        }

        > p {
          display: none;
        }

        &.show-base-info {
          .base-info {
            display: block;
          }
        }

        &.base-position {
          .base-info {
            display: flex;

            div {
              p {
                height: 30px;
                line-height: 30px;
              }
            }

            img {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              margin-left: 60px;
            }
          }
        }

        &.show-sentence {
          > p {
            display: block;
          }
        }

        &.fix-p-css {
          > p {
            margin-top: 30px;

            &:first-of-type {
              margin-top: 100px;
            }
          }
        }
      }

      .btn {
        opacity: 0;
      }

      .fix-p-css > .btn {
      margin-top: 20px;
      text-align: center;

      animation: showBack 1s linear 1s forwards;

      @keyframes showBack {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      button {
        cursor: pointer;
        width: 80px;
        padding: 8px 10px;
        margin: 0 15px;
        // color: #ffffff;
        border: 1px solid #2c3e50;
        border-radius: 5px;
        background-color: #ffffff;

        &:hover {
          border: 1px solid #3eaf7c;
        }
      }
    }
    }
  }
}
</style>
