<template>
  <div class="mes-list col-12">
    <ul class="list-group">
      <li class="list-group-item" v-for="msg in msgList" :key="msg.id">
        <div class="avatar float-left">
          <img :src="msg.avtSrc" alt="出错啦~" width="50">
        </div>
          <div class="list-content">
            <div :class="['username', msg.isAdmin ? 'is-admin' : '']">{{ msg.username }}</div>
            <div class="text">{{ msg.content }}</div>
            <div class="footer">
              <time>{{ msg.createdTime }}</time>
              <span>
              <a class="go-comment" href="javascript: void(0);" @click="$emit('reply',`@${msg.username}`)">回复</a>
            </span>
            </div>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  data () {
    return {
    }
  },
  props: ['msgList'],
  watch: {
    // 为更新的列表添加点击回复按钮回到内容框事件
    msgList: function (newValue, oldValue) {
      this.$nextTick(() => {
        this.addReplyClick()
      })
    }
  },
  methods: {
    // 原生js添加click事件，保证不覆盖click时的emit事件
    addReplyClick () {
      const replyBtn = [].slice.call(document.getElementsByClassName('go-comment'))
      for (let i = 0; i < replyBtn.length; i++) {
        replyBtn[i].addEventListener('click', replyHandler, false)
      }
    }
  }
}

function replyHandler () {
  const html = document.documentElement || document.body
  const commentBox = document.getElementsByClassName('comment')[0]
  const foot = document.getElementsByTagName('footer')[0]
  if (!commentBox) {
    window.scrollTo(0, 0)
    return
  } else if (!foot) {
    window.scrollTo(0, html.scrollHeight - commentBox.scrollHeight)
    return
  }
  window.scrollTo(0, html.scrollHeight - commentBox.scrollHeight - foot.scrollHeight)
}

</script>
<style>
.mes-list .list-group {
  padding: 25px 0;
}

.avatar {
  vertical-align: top;
  margin-right: 10px;
}

.list-content div {
  margin-left: 60px;
  margin-bottom: 10px;
  color: #a9a9a9;
}

.list-content>.is-admin {
  color: #FF8C00;
}

.list-content .username i {
  padding-left: 15px;
}

.list-content .text {
  word-wrap:break-word;
  word-break:break-all;
  color: #000000;
}

.list-content .footer {
  margin-bottom: 0;
}

.list-content .footer a {
  float: right;
}

@media screen and (min-width: 576px) {
  .list-group .list-group-item:hover {
  background-color: #dee3e7;
}
}

</style>
