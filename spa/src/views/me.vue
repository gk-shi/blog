<template>
  <div>
    <FlipMobile v-if="isMobile" />
    <div v-else>
      <Code v-if="codeOrFlip === 1" :delay="0" />
      <Flip v-else-if="codeOrFlip === 2" />
      <div v-else :class="{ 'select-wrapper': true, hidden: codeClass }">
        <div :class="['me-code', codeClass]">
          <div class="text" @click="() => selectVerson('code')">硬核版</div>
          <div
            :class="{ 'code-mask': true, active: codeClass === 'large' }"
          ></div>
        </div>
        <div class="me-flip">
          <div class="text" @click="() => selectVerson('flip')">丝滑版</div>
          <div
            :class="{ 'flip-mask': true, active: codeClass === 'small' }"
          ></div>
        </div>
      </div>
    </div>
    <div v-if="codeOrFlip === 0" class="go-back" @click="() => backTo('back')">返回</div>
  </div>
</template>


<script lang="ts">
import { defineAsyncComponent, defineComponent, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { screenMaxIs } from '../utils'

export default defineComponent({
  name: 'Me',
  components: {
    Code: defineAsyncComponent(() => import('/@/components/me/Code.vue')),
    Flip: defineAsyncComponent(() => import('/@/components/me/Flip.vue')),
    FlipMobile: defineAsyncComponent(() => import('/@/components/me/FlipMobile.vue'))
  },
  setup () {
    const codeOrFlip = ref(0)
    const isMobile = screenMaxIs(576)

    const codeClass = ref('')
    let slideWrapperTimeHandler: NodeJS.Timeout
    const selectVerson = (version: string): void => {
      const v = version === 'code' ? 1 : 2
      codeClass.value = v === 1 ? 'large' : 'small'
      slideWrapperTimeHandler = setTimeout(() => {
        codeOrFlip.value = v
      }, 600)
    }
    onBeforeUnmount(() => {
      clearTimeout(slideWrapperTimeHandler)
    })

    const router = useRouter()
    const backTo = (direction: string): void => {
      if (direction === 'home') router.replace({ name: 'home' })
      else router.go(-1)
    }

    return {
      isMobile,
      codeOrFlip,
      codeClass,
      selectVerson,
      backTo
    }
  }
})
</script>


<style lang="scss" scoped>
.select-wrapper {
  display: flex;
  height: 100vh;
  transition: all 0.6s;

  &.hidden {
    opacity: 0;
  }

  .me-code,
  .me-flip {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .code-mask:not(.active),
    .flip-mask:not(.active) {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.4);
      width: 2000px;
      height: 2000px;
      transition: all 0.4s;
    }

    .text {
      z-index: 100;
      width: 80px;
      height: 80px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #42b983;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        animation: textScale 0.4s ease-in forwards;
        @keyframes textScale {
          0% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1.2);
            border: 0;
            background-color: #fff;
            color: #42b983;
          }
        }

        + .code-mask,
        + .flip-mask {
          width: 80px;
          height: 80px;
        }
      }
    }
  }

  .me-code {
    transition: all 0.6s;
    width: 50%;
    flex-shrink: 0;
    background: url("https://image.gkshi.com/me-code.png") no-repeat;
    background-size: cover;

    &.large {
      width: 100%;
    }

    &.small {
      width: 0;
    }
  }

  .me-flip {
    flex-grow: 1;
    background: url("https://image.gkshi.com/me-flip.jpg") no-repeat;
    background-size: cover;
  }
}

.go-back {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 80px;
  height: 80px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #42b983;
  border-radius: 50%;
  cursor: pointer;
  animation: upOrDown 5s linear infinite;

  @keyframes upOrDown {
    0% {
      top: 50%;
    }
    25% {
      top: 80%;
    }
    50% {
      top: 50%;
    }
    75% {
      top: 20%;
    }
    100% {
      top: 50%;
    }
  }

  &:hover {
    animation-play-state:paused;
    -webkit-animation-play-state:paused;
  }
}
</style>
