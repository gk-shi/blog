<template>
  <div class="me-flip">
    <div class="pictures dynamic">
      <div class="pic pic1"></div>
      <div class="pic pic2"></div>
      <div class="pic pic3"></div>
      <div class="pic pic4"></div>
      <div class="pic pic5"></div>
    </div>
    <div class="flip-mask"></div>
    <ul class="points">
      <li v-for="(n, idx) of classNameList" :key="n" class="point-box">
        <span
          @click="() => changeClassIdx(idx)"
          :class="{ point: true, active: currentClassIdx === idx }"
        ></span>
      </li>
    </ul>
    <ul :class="['pages', 'page' + (currentClassIdx + 1)]">
      <li class="page">
        <div :class="{ box: true, smaller: isMove }">
          <div class="person">
            <p>
              昵称：<span :class="{ nickname: true, larger: !isMove }"
                >gkshi</span
              >
            </p>
            <p>性别：<span class="male">♂</span></p>
            <p>
              爱好：<del><span class="female">♀</span> </del>🎵、🎸、🎬
            </p>
          </div>
        </div>
      </li>
      <li class="page">
        <div :class="{ box: true, smaller: isMove }">
          <div class="sentence1">
            <p>
              一个比较躺平的<span class="age">{{ age }}</span
              >后，不算太差但也算不上多好的<span class="front-end"
                >前端工程师</span
              >。
            </p>
            <p>
              学的好好的<span :class="majorClassName">信息安全</span
              >，咋就稀里糊涂做了前端╮(╯▽╰)╭
            </p>
          </div>
        </div>
      </li>
      <li class="page">
        <div :class="{ box: true, smaller: isMove }">
          <p>
            工作之余，喜欢捣鼓自己的博客，从前端都后端，从 vue 到 react，从 JS
            到 TS ，从...（再吹下去就有点过了）。
          </p>
        </div>
      </li>
      <li class="page">
        <div :class="{ box: true, smaller: isMove }">
          <div class="sentence4">
            <p>
              其实也有点懒，这次的博客重构拖了近三个月，才算<span
                :class="{ 'basic-word': currentClassIdx === 3 }"
                >基本</span
              >完成o(╥﹏╥)o
            </p>
            <p>
              没事儿的时候喜欢刷刷<span
                :class="{ music: currentClassIdx === 3 }"
                >音乐</span
              >、听听<span :class="{ movie: currentClassIdx === 3 }">电影</span
              >，偶尔兴致来了也会拿起吉他拨两下
            </p>
          </div>
        </div>
      </li>
      <li class="page">
        <div :class="{ box: true, smaller: isMove }">
          <div class="sentence5">
            <p>平时算是比较宅了，但也有想出去浪，比如</p>
          <p>云南、重庆、长沙...</p>
          <p>
            由于种种原因，一直还没有机会去。
          </p>
          <p :class="{ 'last-word': currentClassIdx === 4 }">但，所有的故事总胜在<span>恰逢其时</span>...</p>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="currentClassIdx !== 4" :class="{ next: true, smaller: isMove }">
      <div class="next-bg" @click="() => changeClassIdx(currentClassIdx + 1)">
        <div class="arrow">↓</div>
      </div>
    </div>

    <div class="back-tip">
      <img src="https://image.gkshi.com/tip-img.gif" alt="返回" />
      <div class="back-box">
        <p @click="() => backTo('home')">回首页哦</p>
        <p @click="() => backTo('back')">返回啦~</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ageHandler, mouseWheelScrollHandler } from '/@/composables/me'

export default defineComponent({
  name: 'Flip',
  setup () {
    const router = useRouter()
    const backTo = (direction: string): void => {
      if (direction === 'home') router.replace({ name: 'home' })
      else router.go(-1)
    }

    const { age, addAgeHandler } = ageHandler()

    const majorClassName = ref('')
    let majorTimeoutHandler: NodeJS.Timeout
    watch(age, (newV: number) => {
      if (newV === 95) {
        majorClassName.value = 'cs'
        majorTimeoutHandler = setTimeout(() => {
          majorClassName.value = 'cs-shake'
        }, 1500)
      } else {
        clearTimeout(majorTimeoutHandler)
        majorClassName.value = ''
      }
    })

    const classNameList = ['page1', 'page2', 'page3', 'page4', 'page5']
    const currentClassIdx = ref(0)

    watch(currentClassIdx, (newV: number) => {
      if (newV === 1) {
        addAgeHandler()
      }
    })

    const isMove = ref(false)
    let timeoutHandler: NodeJS.Timeout
    const changeClassIdx = (idx: number): void => {
      if (idx === currentClassIdx.value) return
      clearTimeout(timeoutHandler)
      currentClassIdx.value = idx
      isMove.value = true
      timeoutHandler = setTimeout(() => {
        isMove.value = false
      }, 800)
    }

    const mouseWheel = (currentIdxChangeNum: number): void => {
      const nextIdx = currentClassIdx.value + currentIdxChangeNum
      if (nextIdx < 0 || nextIdx > 4 || isMove.value) return
      changeClassIdx(nextIdx)
    }

    mouseWheelScrollHandler(() => mouseWheel(1), () => mouseWheel(-1), 1300)


    return {
      age,
      majorClassName,
      currentClassIdx,
      classNameList,
      isMove,
      backTo,
      changeClassIdx
    }
  }
})
</script>

<style lang="scss" scoped>
.me-flip {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.flip-mask {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}

.pictures {
  position: relative;
  width: 100%;
  height: 100%;

  .pic {
    position: absolute;
    width: 35%;
    height: 23.4vw;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0;
  }

  &.dynamic {
    .pic1 {
      background-image: url("https://image.gkshi.com/me1.jpg");
      animation: showPic1 4s linear forwards;

      @keyframes showPic1 {
        0% {
          opacity: 0;
          transform: rotateZ(-45deg) scale(2);
        }
        100% {
          opacity: 1;
          transform: rotateZ(-45deg) scale(1.3);
        }
      }
    }

    .pic2 {
      right: 0;
      background-image: url("https://image.gkshi.com/me2.jpg");
      animation: showPic2 4s 4s linear forwards;

      @keyframes showPic2 {
        0% {
          opacity: 0;
          transform: rotateZ(30deg) scale(2);
        }
        100% {
          opacity: 1;
          transform: rotateZ(30deg) scale(1.3);
        }
      }
    }

    .pic3 {
      bottom: 0;
      background-image: url("https://image.gkshi.com/me3.jpg");
      animation: showPic3 4s 8s linear forwards;

      @keyframes showPic3 {
        0% {
          opacity: 0;
          transform: rotateZ(10deg) scale(2);
        }
        100% {
          opacity: 1;
          transform: rotateZ(10deg) scale(1.3);
        }
      }
    }

    .pic4 {
      right: 5%;
      bottom: 0;
      background-image: url("https://image.gkshi.com/me4.jpg");
      animation: showPic4 4s 12s linear forwards;

      @keyframes showPic4 {
        0% {
          opacity: 0;
          transform: rotateZ(-10deg) scale(2);
        }
        100% {
          opacity: 1;
          transform: rotateZ(-10deg) scale(0.9);
        }
      }
    }

    .pic5 {
      left: 50%;
      top: 50%;
      background-image: url("https://image.gkshi.com/me5.jpg");
      animation: showPic5 4s 16s linear forwards;

      @keyframes showPic5 {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) rotateZ(-8deg) scale(3);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) rotateZ(-8deg) scale(1.3);
        }
      }
    }
  }
}

.points {
  position: fixed;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  width: 20px;
  align-items: center;
  z-index: 100;

  .point-box {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .point {
    position: relative;
    width: 6px;
    height: 6px;
    background-color: #fff;
    border-radius: 50%;

    &:hover {
      width: 11px;
      height: 11px;
    }

    &.active {
      width: 12px;
      height: 12px;

      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        content: "";
        width: 22px;
        height: 22px;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
      }
    }
  }
}

.pages {
  position: absolute;
  top: 0;
  transition: all 0.8s;

  .page {
    width: 100vw;
    height: 100vh;

    .box {
      transition: all 0.2s;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #ffffff;
      background-color: rgba(255, 255, 255, 0.2);
      font-size: 20px;

      .person {
        p {
          margin-bottom: 15px;
          &:first-of-type {
            display: flex;
          }
        }

        .nickname {
          font-family: sourceCodePro, Helvetica, STHeiti STXihei,
            Microsoft JhengHei, Microsoft YaHei, Tohoma, Arial;

          &.larger {
            transition: all 1s;
            transform: scale(1.5);
            margin-left: 20px;
          }
        }

        .male {
          color: rgb(138, 192, 243);
        }

        .female {
          color: rgb(243, 149, 195);
        }
      }

      p {
        margin-bottom: 15px;
      }

      .sentence1 {
        text-align: center;

        .age {
          font-size: 35px;
          font-family: sourceCodePro, Helvetica, STHeiti STXihei,
            Microsoft JhengHei, Microsoft YaHei, Tohoma, Arial;
          color: rgb(138, 192, 243);
        }

        .front-end {
          font-size: 25px;
          color: #5fecad;
        }

        .cs {
          display: inline-block;
          transform-origin: center bottom;
          animation: knockDown 1.5s linear infinite;

          @keyframes knockDown {
            0% {
              transform: rotateX(0deg);
            }
            65% {
              transform: rotateX(210deg);
            }

            100% {
              transform: rotateX(150deg);
            }
          }
        }

        .cs-shake {
          display: inline-block;
          transform-origin: center bottom;
          animation: shakeRotate 3s linear infinite;
          // transform: rotateX(160deg);

          @keyframes shakeRotate {
            0% {
              transform: rotateX(150deg);
            }
            50% {
              transform: rotateX(210deg);
            }
            100% {
              transform: rotateX(150deg);
            }
          }
        }
      }

      .sentence4 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .basic-word {
          display: inline-block;
          transform-origin: 110% top;
          font-size: 0px;
          animation: wordShow 2s ease-in 2s forwards;

          @keyframes wordShow {
            0% {
              font-size: 0px;
            }
            60% {
              font-size: 35px;
              transform: rotateZ(0);
            }
            100% {
              font-size: 20px;
              transform: rotateZ(45deg);
            }
          }
        }

        .music {
          display: inline-block;
          animation: musicMove 2s linear 2s forwards;

          @keyframes musicMove {
            0% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(50px, -50px);
            }
            100% {
              transform: translate(100px, 0px);
            }
          }
        }

        .movie {
          display: inline-block;
          animation: movieMove 2s linear 2s forwards;

          @keyframes movieMove {
            0% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(-50px, 50px);
            }
            100% {
              transform: translate(-100px, 0px);
            }
          }
        }
      }

      .sentence5 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        > p:last-child {
          transform: rotateY(90deg);

          span {
            font-size: 28px;
          }
        }

        > p.last-word {
          animation: lastWord 1s linear 2s forwards;

          @keyframes lastWord {
            0% {
              transform: rotateY(90deg);
            }
            70% {
              transform: rotateY(-20deg);
            }
            85% {
              transform: rotateY(10deg);
            }
            100% {
              transform: rotateY(0deg);
            }
          }
        }
      }
    }
  }

  .smaller {
    transform: scale(0.8);
  }

  &.page1 {
    top: 0;
  }

  &.page2 {
    top: -100vh;
  }

  &.page3 {
    top: -200vh;
  }

  &.page4 {
    top: -300vh;
  }

  &.page5 {
    top: -400vh;
  }
}

.next {
  z-index: 100;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  transition: all 0.3s;

  .next-bg {
    position: relative;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &::before {
      position: absolute;
      top: 0;
      content: "";
      width: 30px;
      height: 2px;
      background-color: rgba(255, 255, 255, 0.3);
      transition: all 0.3s;
      transform-origin: center 60px;
      transform: rotateZ(-45deg);
    }

    &::after {
      position: absolute;
      bottom: 0;
      content: "";
      width: 30px;
      height: 2px;
      background-color: rgba(255, 255, 255, 0.3);
      transition: all 0.3s;
      transform-origin: center -60px;
      transform: rotateZ(-45deg);
    }

    &:hover {
      &::before {
        transform: rotateZ(0deg);
        width: 0;
        top: 10px;
      }

      &::after {
        transform: rotateZ(0deg);
        width: 0;
        bottom: 10px;
      }

      .arrow {
        font-size: 20px;
        width: 40px;
        height: 40px;
        background-color: #5677fc;
      }
    }
  }

  .arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: 600;
    color: #ffffff;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    transition: all 0.3s;
  }

  &.smaller {
    transform: translateX(-50%) scale(0);
  }
}

.back-tip {
  position: fixed;
  top: 50%;
  right: -5px;
  transform: translateY(-50%);

  img {
    height: 100px;
  }

  .back-box {
    position: absolute;
    top: -50px;
    left: -130px;
    width: 120px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    transform: scale(0);

    p {
      margin: 10px 0;
      &:hover {
        cursor: pointer;
        color: #42b983;
        text-decoration: underline;
      }
    }

    &::after {
      position: absolute;
      bottom: 15px;
      right: -20px;
      content: "";
      border-width: 5px 10px 5px 10px;
      border-style: solid;
      border-color: transparent transparent transparent rgba(255, 255, 255, 0.6);
    }
  }

  &:hover {
    .back-box {
      transform: scale(1);
    }
  }
}
</style>
