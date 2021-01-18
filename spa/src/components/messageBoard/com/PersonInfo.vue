<template>
  <teleport to="body">
    <div v-if="showModal" class="modal" @click="closeModal()"></div>
    <transition name="person-scale">
      <div v-if="showModal" class="person-wrapper">
        <header class="info">
          <p class="title">你来啦~</p>
          <section>
            <div class="item">
              <label>
                <p>你的昵称：</p>
                <input
                  type="text"
                  v-model="person.nickname"
                  placeholder="拽一点，一眼就记住那种"
                />
              </label>
            </div>
            <div class="item">
              <label>
                <p>blog：</p>
                <input
                  type="text"
                  v-model="person.blog"
                  placeholder="https://gkshi.com"
                />
              </label>
            </div>
            <div class="item">
              <label>
                <p>
                  E-mail：<span style="font-size: 10px"
                    >(仅作为gravatar头像获取或必要联系)</span
                  >
                </p>
                <input
                  type="text"
                  v-model="person.email"
                  placeholder="gkshi@foxmail.com"
                />
              </label>
            </div>
          </section>
        </header>
        <footer class="opt">
          <div class="cancel" @click="closeModal()">取 消</div>
          <div class="confirm" @click="savePersonInfo">确 定</div>
        </footer>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref, toRefs, watch } from 'vue'
import md5 from 'blueimp-md5'
// import { getStorage, setStorage } from '/@/utils'

// type PersonInfo = {
//   nickname: string;
//   blog: string;
//   email: string;
//   avatar?: string;
// }

// 防止 PC 端滚动穿透
const forbidScrollThrough: (flag: boolean) => void = (flag: boolean): void => {
  const html = document.querySelector('html') as HTMLElement
  const body = document.querySelector('body') as HTMLElement
  if (flag) {
    html.style.overflowY = 'hidden'
    body.style.overflowY = 'hidden'
    return
  }
  html.style.overflowY = 'auto'
  body.style.overflowY = 'auto'
}


export default defineComponent({
  name: 'PersonInfo',
  emits: ['update:showModal', 'confirm'],
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const getStorage = inject('getStorage') as Function
    const setStorage = inject('setStorage') as Function
    const person: Ref<PersonInfo> = ref({
      nickname: '',
      blog: '',
      email: ''
    })
    // 限制只能 10 个字符的昵称
    watch(() => person.value.nickname, (n: string) => {
      person.value.nickname = n.slice(0, 10)
    })
    const { showModal } = toRefs(props)
    // 可能刚打开时就要展示
    if (showModal.value) forbidScrollThrough(true)
    watch(showModal, (n: boolean) => {
      if (n) {
        forbidScrollThrough(true)
        if (getStorage('personInfo')) {
          person.value = getStorage('personInfo') as PersonInfo
        }
      } else forbidScrollThrough(false)
    })

    // 关闭弹窗时的上抛
    const emitConfirm: (flag: boolean) => void = (flag: boolean): void => {
      emit('confirm', flag)
    }

    const closeModal: (isConfirm?: boolean) => void = (isConfirm?: boolean): void => {
      emit('update:showModal', false)
      emitConfirm(!!isConfirm)
    }

    // 阻止信息框的点击冒泡
    const preventBubble: (e: Event) => void = (e: Event): void => {
      e.stopPropagation()
    }

    // 保存个人信息
    const getGravatar: (email: string) => string = (email = 'default'): string => {
      const md5Email = md5(email)
      return `https://s.gravatar.com/avatar/${md5Email}?s=80`
    }
    const savePersonInfo: () => void = (): void => {
      const localPersonInfo = { ...person.value, avatar: getGravatar(person.value.email) }
      setStorage('personInfo', localPersonInfo)
      closeModal(true)
    }

    return {
      preventBubble,
      // 个人信息
      person,
      savePersonInfo,
      closeModal
    }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.person-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3001;
  padding-top: 20px;
  background-color: #fff;

  .title {
    text-align: center;
    color: #666666;
    margin-bottom: 10px;
  }

  .item {
    margin: 0 20px 20px;
    p {
      font-size: 13px;
      color: #a9a9a9;
    }

    input {
      margin-top: 3px;
      min-width: 250px;
      padding: 3px 5px;
      border: 1px solid #999999;
      border-radius: 5px;

      &:focus {
        outline: none;
        border-color: #409eff;
      }
    }

    input::-webkit-input-placeholder {
      color: #cccccc;
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #cccccc;
    }
    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #cccccc;
    }
    input:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #cccccc;
    }
  }

  .opt {
    display: flex;
    align-items: flex-end;
    border-top: 1px solid #ccc;
    > div {
      flex-grow: 1;
      text-align: center;
      padding: 10px 0;
      cursor: pointer;
    }

    .cancel {
      color: #aaaaaa;
      border-right: 1px solid #ccc;

      &:hover {
        background-color: #eeeeee;
        color: #999999;
      }
    }

    .confirm {
      color: #409eff;
      &:hover {
        background-color: #409eff;
        color: #ffffff;
      }
    }
  }
}

/* 路由过渡 */
.person-scale-enter-active {
  transition: all 0.2s linear;
}

.person-scale-leave-active {
  transition: all 0.2s linear;
}

.person-scale-enter-from,
.person-scale-leave-to {
  transform-origin: 0 0;
  transform: scale(0.1);
  opacity: 0;
}
</style>
