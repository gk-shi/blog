<template>
  <div class="header col-12">
    <div class="mes-box col-12">
      <p class="mes-box-title"><i class="fa fa-comments-o" aria-hidden="true"></i>陈独秀请发言
      </p>
      <form>
        <transition name="lea">
          <div class="empty" v-if="empty">？？？准备不写字白piáo？！</div>
        </transition>
        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <!-- 模态框头部 -->
              <div class="modal-header">
                <h6 class="modal-title">{{ modalTitle }}</h6>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <!-- 模态框主体 -->
              <div class="modal-body">
                <p>
                  <label for="nickname">
                    <i class="fa fa-user-circle"></i>&nbsp;昵称：
                  </label>
                  <input type="text" id="nickname" v-model="userInfo.nickname" placeholder="让我来看看是谁在装13">
                </p>
                <span class="local-storage">
                  <input type="checkbox" id="remember" v-model="userInfo.remember" @click="changeLocalStorage">
                  <label for="remember">
                    &nbsp;记住我
                  </label>
                </span>
              </div>
              <!-- 模态框底部 -->
              <div class="modal-footer">
                <button type="button" class="btn" :disabled="!userInfo.nickname.trim().length" data-dismiss="modal" @click="toEmit">确认</button>
                <button type="button" class="btn" data-dismiss="modal">取消</button>
              </div>
            </div>
          </div>
        </div>
        <div class="avt col-4">
          <img :src="avtSrc" width="50" class="rounded" alt="头像">
          <p @click="changeAvt">切换头像</p>
        </div>
        <div class="content col-8">
          <textarea id="textarea" v-model="input" placeholder="请开始你的表演~"></textarea>
        </div>
        <div class="post">
          <emoji-picker @emoji="insert">
            <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events }" v-on="events">
              <i class="fa fa-smile-o fa-2x" aria-hidden="true"></i>
            </div>
            <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
              <div class="emoji-picker">
                <!-- <div class="emoji-picker__search">
                  <input type="text" v-model="search">
                </div> -->
                <div>
                  <div v-for="(emojiGroup, category) in emojis" :key="category">
                    <h5>{{ category }}</h5>
                    <div class="emojis">
                      <span
                            v-for="(emoji, emojiName) in emojiGroup"
                            :key="emojiName"
                            @click="insert(emoji)"
                            :title="emojiName"
                        >{{ emoji }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </emoji-picker>
          <button type="button" class="btn" data-toggle="modal" :data-target="input.trim().length ? '#myModal' : '' " @click="input.trim().length ? '' : changeEmpty()">发布</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import EmojiPicker from 'vue-emoji-picker'
import EmojiPicker from '../../components/emoji/Emoji.vue'
export default {
  name: 'commentBox',
  data () {
    return {
      input: '',
      search: '',
      avtSrc: `${process.env.VUE_APP_IMG_PREFIX}avt/1.jpg`,
      userInfo: {
        nickname: '',
        remember: false
      },
      empty: false,
      nickEmpty: false
    }
  },
  props: ['modalTitle'],
  components: {
    // 表情组件
    EmojiPicker
  },
  methods: {
    toReply (user) {
      this.input += user
    },
    // 上抛事件
    toEmit () {
      const userObj = {}
      userObj.username = this.userInfo.nickname
      userObj.avt = this.avtSrc
      userObj.content = this.input
      this.$emit('toIssue', userObj)
    },
    insert (emoji) {
      this.input += emoji
    },
    changeAvt () {
      const num = getRandom()
      this.avtSrc = `${process.env.VUE_APP_IMG_PREFIX}/avt/${num}.jpg`
    },
    // 修改本地存储
    changeLocalStorage () {
      this.userInfo.remember = !this.userInfo.remember
      if (this.userInfo.remember) {
        this.setLocalStorage()
        return
      }
      this.clearlocalStorage()
    },
    setLocalStorage () {
      window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    },
    clearlocalStorage () {
      window.localStorage.clear()
    },
    // 设置无内容时提示
    changeEmpty () {
      this.empty = true
      setTimeout(() => {
        this.empty = false
      }, 3000)
    }
  },
  created () {
    let user = JSON.parse(window.localStorage.getItem('userInfo'))
    if (user) {
      for (let key in user) {
        this.userInfo[key] = user[key]
      }
    }
  },
  mounted () {
    // 控制input 、textarea提示
    const textareas = document.getElementsByTagName('textarea')
    let inputs = [].slice.call(document.getElementsByTagName('input'))
    inputs = inputs.filter((item) => {
      if (item.type === 'text') {
        return item
      }
    })
    addPlaceholderlistener(inputs, ['focus', 'blur'], [clearPlaceHolder, setPlaceHolder])
    addPlaceholderlistener(textareas, ['focus', 'blur'], [clearPlaceHolder, setPlaceHolder])
  }
}

let msg = ''

function getRandom () {
  return Math.floor(Math.random() * 35 + 1)
}

function clearPlaceHolder () {
  msg = this.placeholder
  this.placeholder = ''
}

function setPlaceHolder () {
  this.placeholder = msg
}

function addPlaceholderlistener (els, types, handlers) {
  for (let i = 0; i < els.length; i++) {
    els[i].addEventListener(types[0], handlers[0], false)
    els[i].addEventListener(types[1], handlers[1], false)
  }
}

</script>
<style lang="scss" scoped>

@media screen and (max-width: 330px) {
  div.avt>p {
    width: 60px;
  }
}

@media screen and (max-width: 576px) {
  .header {
    margin-top: 57px;
    text-align: center;
  }

  div.mes-box .mes-box-title {
    padding-top: 30px;
    font-size: 1.2rem;
    color: #a9a9a9;
  }
}

.mes-box .mes-box-title {
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 20px;

  i {
    margin-right: 15px;
  }
}

form {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 10px;

  .empty {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 300px;
    padding: 20px;
    box-shadow: 0 0 10px 4px #708090;
    font-size: 20px;
    font-family: Helvetica, STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, Tohoma, Arial;
    background-color: #fff;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }

  .avt, .content {
    display: inline-block;
  }

  .avt {
    width: 85px;
    margin-left: -35px;
  }

  p {
    color: #a9a9a9;
    text-decoration: none;
    font-size: 13px;
    cursor: pointer;

    &:before {
      content: '';
      display: block;
      height: 10px;
    }
  }

  textarea {
    width: 125%;
    height: 80px;
    resize: none;
    margin-left: -15px;
    padding: 5px 15px;
    border: 1px solid #FFA500;
  }
}

/* emoji-picker */
.emoji-invoker {
  text-align: left;
  padding-left: 15%;

  > i {
    position: absolute;
    margin-top: -8px;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
}

.emoji-picker {
  position: absolute;
  z-index: 9999999;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow-y: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;

  &__search {
    display: flex;

    > input {
      flex: 1;
      border-radius: 10rem;
      border: 1px solid #ccc;
      padding: 0.5rem 1rem;
      outline: none;
    }
  }

  h5 {
    margin-top:20px;
    margin-bottom: 10px;
    color: #b1b1b1;
    text-align: left;
    text-transform: uppercase;
    font-size: 0.8rem;
    cursor: default;
  }

  .emojis {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &:after {
      content: "";
      flex: auto;
    }

    span {
      padding: 0.2rem;
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        background: #ececec;
        cursor: pointer;
      }
    }
  }
}

.post {
  margin-top: 10px;
  padding-left: 55px;

  &:before {
    content: '';
    display: block;
    height: 10px;
  }

  .fa-smile-o {
    color: #a9a9a9;
  }

  button {
    color: #ffffff;
    background-color: #ffa500;
    margin-top: -15px;
    margin-left: 100px;
  }
}

.modal-content {
  position: absolute;
  margin: 30% auto;
}

.modal-body {
  text-align: left;
  padding-left: 15%;
  padding-bottom: 1.5rem;

  P {
    &:nth-of-type(2) {
      margin-top: 15px;
      margin-bottom: 15px;
    }

    &:last-of-type {
      margin-bottom: 20px;
    }
  }
}

.modal-footer {
  display: block;

  button {
    &:first-child {
      margin-right: 40px;
    }

    &:hover {
      background-color: #add8e6;
    }
  }
}

#email,#nickname {
  border-width: 0 0 1px 0;
  border-color: #000000;
  height: 25px;
  padding: 4px;
}

.local-storage {
  position: absolute;

  > label {
    margin-bottom: 0;
    color: #d3d3d3;
  }
}

@media screen and (min-width: 576px) {
  .header {
    margin-top: 8rem;
    text-align: center;
  }

  .mes-box .mes-box-title {
    font-size: 2rem;
  }

  .modal-body {
  text-align: left;
  padding-left: 20%;
  }

  .avt {
    margin-left: -80px;
  }

  .avt p:hover {
    color: #ff8c00;
  }

  .post button {
    margin-left: 40vw;
  }

  .header {
    margin-top: 8rem;
    text-align: center;
  }

  .emoji-picker {
    margin-left: 120px;
  }
}

@media screen and (width: 1024px) {
  .emoji-picker {
    margin-left: 160px;
  }
}

@media screen and (min-width: 1025px) {
  .avt {
    margin-left: -150px;
  }

  .emoji-picker {
    margin-left: 180px;
  }
}

.lea-enter-active, .lea-leave-active {
  transition: opacity .5s;
}
.lea-enter, .lea-leave-to {
  opacity: 0;
}

</style>
