<template>
  <div>
    <header class="bless-header">
      <div class="bless-box">
        <p>课代表发言</p>
        <MessageBox @publish="publishBless" />
      </div>
    </header>
    <section>
      <div class="left">
        <MessageList @publish="publishBless" :list="bless.list" :total="bless.total" v-model:current-page="currentPage" @pageChange='pageChange' />
      </div>
      <aside class="right">
        <div class="myself">
          <div class="card">
            <img :src="blogAvatar" alt="头像" />
          </div>
          <div class="info">
            <p>gkshi</p>
            <div class="wrapper">
              <div>
                <p><span>性别：</span> <span class="male">♂</span></p>
                <p>
                  爱好：<del><span class="female">♀</span></del
                  >🎬、🎸、💻
                </p>
                <p>邮箱：gkshi@foxmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div class="latest">
          <p class="title">最新留言</p>
          <p v-if="bless.latest.length <= 0" class="empty">还没有留言呢~</p>
          <ul>
            <li v-for="comment of bless.latest" :key="comment._id">
              <div class="comment">
                <img
                  :src="comment.avt"
                  alt="头像"
                />
                <div>
                  <p>
                    <span class="nick">{{ comment.username }}</span
                    ><span class="time">{{ comment.time }}</span>
                  </p>
                  <p class="markdown-body content" v-html="comment.content">
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive, ref } from 'vue'
import { getBlessesApi, publishBlessApi } from '../api'
// import MessageBox from '/@/components/messageBoard/MessageBox.vue'
import MessageBox from '../components/messageBoard/MessageBox.vue'
import MessageList from '../components/messageBoard/MessageList.vue'
import { getStorage, moveGoTo } from '../utils'

export default defineComponent({
  name: 'Bless',
  components: {
    MessageBox,
    MessageList
  },
  setup () {
    const imgPrefix = import.meta.env.VITE_IMG_PREFIX
    const createTip = inject('createTip') as CreateTip
    const blogAvatar = `${imgPrefix}/avatar.jpg?t=${Date.now()}`

    const currentPage = ref(1)
    const bless = reactive({
      list: [],
      latest: [],
      total: 0
    })
    const config = {
      page: 0,
      count: 10,
      first: true
    }
    const getBlesses: () => Promise<void> = async (): Promise<void> => {
      try {
        const { data } = await getBlessesApi(config)
        if (data && data.errno === 0 && data.data) {
          // data.data.data.forEach((el: any) => {
          //   el.avt = /https?:\/\/image/.test(el.avt) ? el.avt : el.avt
          // })
          bless.list = data.data.data
          if (typeof data.data.total === 'number') {
            bless.total = data.data.total
            bless.latest = (data.data.data || []).slice(0, 5).map((el: any) => {
              const timeSplit = el.created_time.split(/\s+/)
              el.time = `${timeSplit[2]}  ${timeSplit[0]}`
              return el
            })
          }
          config.first = false
        }
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      getBlesses()
    })

    const publishBless: (content: string) => Promise<void> = async (content: string): Promise<void> => {
      const person: PersonInfo = getStorage('personInfo') as PersonInfo
      const configData = {
        username: person.nickname,
        avt: person.avatar,
        content,
        blog: person.blog,
        email: person.email
      }
      publishBlessApi(configData).then(({ data }) => {
        if (data && data.errno === 0) {
          createTip('success', '发布留言成功了！')
          if (config.page === 0) {
            getBlesses()
          }
        }
      })
    }

    const pageChange: (page: number) => void = (page: number): void => {
      // currentPage.value = page
      config.page = page - 1
      getBlesses()
      const blessHeader = document.querySelector('.bless-header') as HTMLElement
      const blessBox = document.querySelector('.bless-box') as HTMLElement
      moveGoTo((blessHeader?.offsetHeight || 0) / 2 - (blessBox?.offsetHeight || 0) / 2)
    }

    return {
      blogAvatar,
      currentPage,
      bless,
      publishBless,
      pageChange
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  position: relative;
  height: 70vh;
  min-height: 450px;
  background: url("https://image.gkshi.com/bless-2.jpg") no-repeat;
  background-size: 100% auto;
  background-position: 0 70%;

  div > p {
    text-align: center;
    color: #ffffff;
    font-size: 25px;
    margin-bottom: 10px;
  }

  .bless-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 700px;
  }
}

section {
  // height: 300px;
  display: flex;

  .left {
    flex-grow: 1;
    background-color: #fff;
    padding: 20px 20px 20px 140px;
    box-sizing: border-box;
  }

  .right {
    padding: 20px 100px 20px 20px;
    min-width: 400px;
    max-width: 400px;
    background: #f5f8fa;
    box-sizing: border-box;

    .myself,
    .latest {
      border: 1px solid #eee;
      background: #fff;
    }

    .myself {
      margin-bottom: 20px;

      .card {
        position: relative;
        height: 120px;
        background: url("https://image.gkshi.com/card-bg.jpg") no-repeat;
        background-size: 100% auto;
        background-position: 0 -45px;

        &::after {
          display: block;
          content: "";
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 20px;
          background-color: #fff;
          border-radius: 50% 50% 0 0/20px 20px 0 0;
        }

        img {
          position: absolute;
          left: 50%;
          top: 40%;
          transform: translate(-50%, -50%);
          width: 60px;
          border-radius: 50%;
        }
      }

      .info {
        display: flex;
        flex-direction: column;

        > p {
          text-align: center;
          font-size: 20px;
          font-family: sourceCodePro, Helvetica, STHeiti STXihei,
            Microsoft JhengHei, Microsoft YaHei, Tohoma, Arial;
        }

        .wrapper {
          width: 100%;
          min-height: 120px;
          position: relative;

          > div {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            p {
              display: block;
              margin-bottom: 6px;
              white-space: nowrap;

              &:first-child {
                display: flex;
              }
            }
          }
        }

        .male,
        .female {
          margin-right: 10px;
        }

        .male {
          display: block;
          color: #427eba;
          transform: rotateZ(25deg);
        }

        .female {
          color: #ee4897;
        }
      }
    }

    .latest {
      padding: 15px 10px 10px;
      // border: 1px solid #eee;
      // background: #fff;

      p.title {
        padding-bottom: 5px;
        border-bottom: 1px solid #eee;
      }

      p.empty {
        color: #ccc;
        font-size: 12px;
        margin-top: 10px;
        text-align: center;
      }

      ul > li {
        margin: 5px 0;
        padding-bottom: 5px;
        border-bottom: 1px solid #eee;

        .comment {
          display: flex;

          > img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }

          > div {
            font-size: 12px;
            word-break: break-all;
            padding: 0 10px;

            .nick {
              font-size: 15px;
              font-weight: bold;
            }

            .time {
              margin-left: 10px;
              color: #aaa;
            }

            .content {
              color: #999;
              display: -webkit-box;
              overflow: hidden;
              white-space: normal !important;
              text-overflow: ellipsis;
              word-wrap: break-word;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
}

/* ipad pro */
@media screen and(max-width: 1024px) {
  header {
    height: 40vh;
    background-size: 100% 100%;
  }

  section {
    .left {
      padding-left: 80px;
    }

    .right {
      min-width: 350px;
      max-width: 350px;
      padding-right: 50px;
    }
  }
}

/* ipad */
@media screen and(max-width: 768px) {
  section {
    flex-direction: column;

    .left {
      padding-left: 30px;
    }

    .right {
      padding: 0 20px;
      max-width: 100%;
      min-width: auto;
      width: 100%;

      .myself {
        .card {
          height: 300px;

          &::after {
            bottom: -2px;
          }
        }
      }
    }
  }
}

@media screen and(max-width: 576px) {
  header {
    height: 30vh;
    min-height: 300px;

    .bless-box {
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      max-width: calc(100% - 40px);
    }
  }

  section {
    .left {
      padding-left: 20px;
    }

    .right {
      .myself {
        .card {
          height: 120px;
        }
      }
    }
  }
}

</style>
