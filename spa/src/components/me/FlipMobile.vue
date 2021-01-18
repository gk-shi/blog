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
    <div class="text">
      <div class="person">
          <p>昵称：<span class="nickname">gkshi</span></p>
        <p>性别：<span class="male">♂</span></p>
        <p>
          爱好：<del><span class="female">♀</span> </del>🎵、🎸、🎬
        </p>
      </div>
      <div>
          <p>一个比较躺平的95后，不算太差但也算不上多好的前端工程师。</p>
          <p>学的好好的信息安全，咋就稀里糊涂做了前端╮(╯▽╰)╭</p>
      </div>
      <div>
        <p>
          工作之余，喜欢捣鼓自己的博客，从前端都后端，从 vue 到 react，从 JS 到
          TS ，从...（再吹下去就有点过了）。
        </p>
      </div>
        <p>其实也有点懒，这次的博客重构拖了近三个月，才算基本完成o(╥﹏╥)o</p>
      <div>
        <p>
          没事儿的时候喜欢刷刷电影、听听音乐，偶尔兴致来了也会拿起吉他拨两下
        </p>
      </div>
      <div>
        <p>
          平时算是比较宅了，但也有想出去浪，比如云南、重庆、长沙...由于种种原因，一直还没有机会去。
        </p>
        <p>但，所有的故事总胜在恰逢其时...</p>
      </div>
      <div class="btn">
        <button @click="() => backTo('home')">回首页</button>
        <button @click="() => backTo('last')">返回</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Flip',
  setup () {
    const router = useRouter()
    const backTo = (direction: string): void => {
      if (direction === 'home') router.replace({ name: 'home' })
      else router.go(-1)
    }


    return {
      backTo
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
  background-color: rgba(0, 0, 0, 0.5);
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

.text {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  color: #ffffff;

  > div {
    position: absolute;
  }

  .person {
    font-size: 25px;
    .nickname {
      font-size: 35px;
      font-family: sourceCodePro, Helvetica, STHeiti STXihei, Microsoft JhengHei,
        Microsoft YaHei, Tohoma, Arial;
    }

    .male {
      color: rgb(143, 191, 240);
    }

    .female {
      color: rgb(243, 149, 195);
    }
  }
}

@media screen and (max-width: 576px) {
  .text {
    height: 100%;
    padding: 30px 20px 10px;
    box-sizing: border-box;

    .person {
      margin-bottom: 30px;
    }

    > div {
      position: static;
      transform: none;
      width: auto;
      margin-bottom: 20px;
    }

    .btn {
      text-align: center;

      button {
        width: 80px;
        padding: 8px 10px;
        margin: 0 15px;
        color: #ffffff;
        border: 0;
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }
}
</style>
