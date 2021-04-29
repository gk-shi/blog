<template>
  <div class="message-item">
    <img
      class="user-avatar"
      :src="message.avt || 'https://s.gravatar.com/avatar/d81bb206a889656035b929cd8bb1ef10?s=80'"
      alt="头像"
    />
    <div class="message-wrapper">
      <div class="message-main">
        <p>
          <a :href="message.blog || 'javascript:;'" :class="{ 'mes-nickname': true, 'is-admin': message.is_admin }">{{ message.username }}</a
          ><span class="time">留言于 <time>{{ message.time }}</time></span
          ><span class="reply-btn" @click="() => toReply(message.username)">回复</span>
        </p>
        <div class="markdown-body mes-content" v-html="xss(message.content)">
        </div>
      </div>
      <div class="reply-box" v-if="flag">
        <MessageBox @publish="publish" :reply="replyUsername" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import MessageBox from './MessageBox.vue'

export default defineComponent({
  name: 'MessageItem',
  components: {
    MessageBox
  },
  props: {
    message: {
      default: (): any => ({})
    }
  },
  setup (props, { emit }) {
    const xss = inject('xss')
    const flag = ref(false)
    const replyUsername = ref('')
    const toReply: (username: string) => void = (username: string): void => {
      flag.value = !flag.value
      replyUsername.value = `@${username}  `
    }
    const publish: (content: string) => void = (content: string) => {
      emit('publish', content)
    }
    return {
      flag,
      replyUsername,
      toReply,
      publish,
      xss
    }
  }
})
</script>

<style lang="scss" scoped>
.message-item {
  display: flex;
  // height: 100px;
  // border: 1px solid #eee;

  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  .message-wrapper {
    flex-grow: 1;
    position: relative;
    font-size: 14px;
    // padding: 10px 20px;
    border: 1px solid #dfe7ec;
    margin-left: 30px;
    box-sizing: border-box;

    &::before {
      position: absolute;
      top: 10px;
      left: -8px;
      display: block;
      content: "";
      width: 14px;
      height: 14px;
      border-top: 1px solid #dfe7ec;
      border-left: 1px solid #dfe7ec;
      transform: rotateZ(-45deg);
      background-color: #fff;
    }

    .message-main {
      margin: 10px 20px;
    }

    p {
      color: #aaa;

      .mes-nickname {
        color: #2c3e50;
      }

      .time {
        margin-left: 8px;

        time {
          font-size: 12px;
        }
      }
    }

    .reply-btn {
      float: right;

      &:hover {
        color: #2c3e50;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .mes-content {
      padding: 20px 20px 10px 10px;
      white-space: wrap;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
}

@media screen and (max-width: 1024px) {
  .reply-btn {
    &:hover {
      text-decoration: none !important;
    }
  }
}

@media screen and (max-width: 576px) {
  .message-item {
    .user-avatar {
      width: 35px;
      height: 35px;
    }

    .message-wrapper {
      margin-left: 15px;

      p {
        .mes-nickname {
          display: block;
        }

        .time {
          margin-left: 0;
        }

        .reply-btn {
          margin-top: -20px;
        }
      }
    }
  }
}

.is-admin {
  color: #ff8c00 !important;
}
</style>
