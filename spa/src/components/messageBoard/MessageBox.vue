<template>
  <div class="message-box">
    <div class="person" @click="showPersonInfo = true">
      <div
        class="avatar"
        :style="{ backgroundImage: `url('${personInfo.avatar}')` }"
      ></div>
      <span class="nickname">{{ personInfo.nickname || "请输入昵称" }}</span>
    </div>
    <div class="message-container">
      <div class="content-wrapper">
        <div class="content-box">
          <div
            class="placeholder"
            v-if="!isFocus && messageText.length === 0"
            @click="jsToFocus"
          >
            <p>独秀同学，请开始你的发言~</p>
            <span>已支持 markdown 解析哟~</span>
            <!-- <span>正在加紧支持 markdown 解析~</span> -->
          </div>
          <textarea
            class="text"
            ref="textAreaRef"
            rows="4"
            v-model="messageText"
            @focus="focusText"
            @blur="blurText"
          />
        </div>
        <div :class="{ issue: true, focus: isFocus }">
          <button @click="publishMessage" :class="{ can: messageText.trim().length !== 0 }">
            发 布
          </button>
        </div>
      </div>
    </div>
  </div>
  <PersonInfo v-model:showModal="showPersonInfo" @confirm="confirm" />
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref } from 'vue'
import PersonInfo from './com/PersonInfo.vue'
import marked from '../../utils/marked'

const defaultAvatar = `${import.meta.env.VITE_IMG_PREFIX}/avt/${Math.floor(Math.random() * 34) + 1}.jpg`

export default defineComponent({
  name: 'MessageBox',
  emits: ['publish', 'update:text'],
  components: {
    PersonInfo
  },
  props: {
    reply: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 个人信息
    const getStorage = inject('getStorage') as Function
    const personInfo = getStorage('personInfo') || {
      nickname: '',
      avatar: defaultAvatar,
      email: '',
      blog: ''
    }
    const personInfoR = reactive(personInfo)


    // 文本框聚焦与失焦的操作
    const isFocus = ref(false)
    const textAreaRef = ref()
    const focusText: () => void = (): void => {
      isFocus.value = true
    }
    const blurText: () => void = (): void => {
      setTimeout(() => {
        isFocus.value = false
      }, 200)
    }
    const jsToFocus: () => void = (): void => {
      textAreaRef.value.focus()
    }

    // 文本框内容
    const messageText = ref('')

    // 展示个人信息编辑
    const showPersonInfo = ref(false)
    const confirm: (flag: boolean) => void = (flag: boolean): void => {
      if (flag) {
        Object.assign(personInfoR, getStorage('personInfo'))
      }
    }


    // 发布
    const publishMessage: () => void = (): void => {
      if (messageText.value.trim().length === 0) return
      if (!personInfo.nickname) {
        showPersonInfo.value = true
        return
      }
      const markedText = marked(messageText.value)
      emit('publish', props.reply + markedText)
    }

    return {
      // 个人信息
      personInfo: personInfoR,
      showPersonInfo,
      confirm,
      // 文本框聚焦与失焦
      textAreaRef,
      isFocus,
      focusText,
      blurText,
      jsToFocus,
      // 文本框内容
      messageText,
      publishMessage
    }
  }
})
</script>

<style lang="scss" scoped>
.message-box {
  background-color: #f1f3f4;
  padding: 20px;
  display: flex;

  .person {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      overflow: hidden;
      background-size: 100% 100%;
    }

    .nickname {
      font-size: 12px;
      margin-top: 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .message-container {
    flex-grow: 1;

    .content-wrapper {
      .content-box {
        position: relative;
        line-height: 0;
        width: 100%;
        border: 1px solid #d7dfe4;

        &::before {
          content: "";
          display: block;
          position: absolute;
          top: 10px;
          left: -8px;
          width: 15px;
          height: 15px;
          border: 1px solid #d7dfe4;
          border-top: 0;
          border-right: 0;
          background-color: #fff;
          transform: rotateZ(45deg);
          box-sizing: border-box;
        }

        .placeholder {
          position: absolute;
          padding: 8px 0 0 15px;
          > p {
            margin-top: 6px;
            color: #aaaaaa;
          }
          > span {
            display: block;
            margin-top: 22px;
            color: #cccccc;
            font-size: 12px;
          }
        }

        .text {
          width: 100%;
          border: 0;
          box-sizing: border-box;
          padding: 5px 10px;
          resize: none;

          &:focus {
            border: 0;
            outline: none;
          }
        }
      }

      .issue {
        overflow: hidden;
        transition: 0.2s;
        height: 0px;

        &.focus {
          height: 45px;
        }
        button {
          margin-top: 10px;
          height: 35px;
          color: #ffffff;
          background-color: #999999;
          border: 0;
          padding: 0 15px;

          &.can {
            background-color: #409eff;
            cursor: pointer;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .message-box {
    flex-direction: column;

    .person {
      // display: flex;
      align-items: flex-start;
      flex-direction: row;

      .avatar {
        width: 35px;
        height: 35px;
      }

      .nickname {
        font-size: 20px;
        margin-left: 10px;
      }
    }

    .message-container {
      margin-top: 16px;

      .content-wrapper {
        .content-box {
          &::before {
            top: -8px;
            left: 10px;
            transform: rotateZ(135deg);
          }
        }
      }
    }
  }
}
</style>
