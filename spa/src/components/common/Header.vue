<template>
  <div>
    <div class="empty"></div>
    <header :class="[isPhone ? '' : navHasBlank ? 'blank' : 'fill']">
      <nav>
        <router-Link to="/">
          <img :src="logo" class="logo" width="100" />
        </router-Link>
        <div v-if="resizeFlag">
          <transition name="menu-fade">
            <ul
              class="nav-list"
              v-if="displayMenu"
              @click="isPC ? '' : toggleShowMenu(false)"
            >
              <li
                class="nav-list-item"
                v-for="Link in routerLinks"
                :key="Link.to"
              >
                <router-Link
                  :class="{ 'nav-Link': true, 'is-pc': isPC }"
                  :to="Link.to"
                  >{{ Link.title }}</router-Link
                >
              </li>
            </ul>
          </transition>
          <div
            :class="['line-wrapper', displayMenu ? 'close' : 'open']"
            v-if="isPhone"
            @click="toggleShowMenu(!displayMenu)"
          >
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { getDevice, screenMaxIs } from '../../utils'

export default defineComponent({
  name: 'Header',
  props: {
    navHasBlank: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    // logo 地址
    const logo = '/img/gkshi.png' || `${import.meta.env.VITE_IMG_PREFIX}website-logo.png`
    const routerLinks = reactive([
      {
        to: '/blog',
        title: '博文'
      },
      {
        to: '/travel',
        title: '旅行'
      },
      {
        to: '/bless',
        title: '留言'
      },
      {
        to: '/me',
        title: '我'
      },
      {
        to: '/website',
        title: '本站'
      }
    ])

    // 是否为手机端
    const isPhone = ref(false)
    // 是否为 PC 端
    const isPC = ref(getDevice(navigator.userAgent) === 'pc')

    const setIsPhone: () => void = (): void => {
      const emptyEl: HTMLElement = (document.querySelector('.empty')) as HTMLElement
      if (screenMaxIs(576)) {
        isPhone.value = true
        const nav: HTMLElement = (document.querySelector('nav')) as HTMLElement
        emptyEl.style.height = nav.offsetHeight + 'px'
      } else {
        isPhone.value = false
        emptyEl.style.display = 'none'
      }
    }

    const displayMenu = ref(false)
    const toggleShowMenu: (show: boolean) => void = (flag: boolean): void => {
      displayMenu.value = flag
    }

    const resizeFlag = ref(true)
    const resizeHandle: () => Promise<void> = async (): Promise<void> => {
      resizeFlag.value = false
      setIsPhone()
      toggleShowMenu(!isPhone.value)
      isPC.value = getDevice(navigator.userAgent) === 'pc'
      await nextTick()
      resizeFlag.value = true
    }

    onMounted(() => {
      setIsPhone()
      toggleShowMenu(!isPhone.value)
      window.addEventListener('resize', resizeHandle)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandle)
    })

    return {
      logo,
      routerLinks,
      resizeFlag,
      isPhone,
      isPC,
      displayMenu,
      toggleShowMenu
    }
  }
})
</script>

<style lang="scss" scoped>
.empty,
header {
  z-index: 100;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 30px 60px 0 60px;

  &.blank {
    transition: all 0.8s;
    padding-top: 30px;
    background-color: rgba(52, 58, 64, 0);

    nav {
      transition: all 0.8s;
      box-shadow: 0 0 8px 2px rgba(102, 102, 102, 1);
    }
  }

  &.fill {
    transition: all 0.8s;
    padding-top: 0;
    background-color: rgba(52, 58, 64, 1);

    nav {
      transition: all 0.8s;
      box-shadow: 0 0 8px 2px rgba(102, 102, 102, 0);
    }
  }

  nav {
    background-color: rgb(52, 58, 64);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 0 8px 2px #666;

    .logo {
      vertical-align: middle;
    }

    .nav-list {
      display: flex;
      align-items: stretch;

      &-item {
        a {
          display: block;
          padding: 15px 20px;
          position: relative;
          box-sizing: border-box;
        }

        .router-link-active {
          color: #ffffff;

          &::after {
            position: absolute;
            display: block;
            bottom: 8px;
            content: "";
            left: 50%;
            transform: translateX(-50%);
            height: 1px;
            background-color: rgb(255, 255, 255);
            animation: width80 0.3s linear forwards;
          }

          @keyframes width80 {
            from {
              width: 30%;
            }
            to {
              width: 80%;
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 1025px) {
  .nav-list-item .nav-Link.is-pc:not(.router-Link-active):hover {
    color: #f9f9f9;

    &::after {
      position: absolute;
      display: block;
      bottom: 8px;
      content: "";
      // width: 20%;
      left: 50%;
      transform: translateX(-50%);
      height: 1px;
      background-color: rgb(255, 255, 255);
      animation: width30 0.2s linear forwards;

      @keyframes width30 {
        from {
          width: 0;
        }
        to {
          width: 30%;
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  header {
    padding: 0;

    nav {
      height: 60px;

      .line-wrapper {
        padding: 5px;

        .line {
          width: 28px;
          height: 4px;
          background-color: #fff;
          margin: 6px 0;
          border-radius: 5px;
        }

        &.open {
          .line:first-child {
            transition: all 0.2s linear;
            transform: rotateZ(0);
            transform-origin: right center 0;
          }

          .line:nth-child(2) {
            transition: all 0.3s linear;
            opacity: 1;
          }

          .line:last-child {
            transition: all 0.3s linear;
            transform: rotateZ(0);
            transform-origin: right center 0;
          }
        }

        &.close {
          .line:first-child {
            transition: all 0.3s linear;
            transform: rotateZ(-45deg);
            transform-origin: right center 0;
          }

          .line:nth-child(2) {
            transition: all 0.3s linear;
            opacity: 0;
          }

          .line:last-child {
            transition: all 0.3s linear;
            transform: rotateZ(45deg);
            transform-origin: right center 0;
          }
        }
      }

      .nav-list {
        position: absolute;
        z-index: -1;
        right: 5px;
        background: rgb(52, 58, 64);
        width: 40%;
        top: 65px;
        flex-direction: column;
        align-items: center;

        &-item {
          width: 100%;
          height: 100%;
          text-align: center;
        }
      }
    }

    .drop-menu {
      position: absolute;
      width: 100%;
      height: 200px;
      background-color: skyblue;
    }
  }

  /* 移动端-菜单进入与离开过渡 */
  .menu-fade-enter-active {
    transition: all 0.3s linear;
  }

  .menu-fade-leave-active {
    transition: all 0.3s linear;
  }

  .menu-fade-enter-from,
  .menu-fade-leave-to {
    opacity: 0;
  }
}
</style>
