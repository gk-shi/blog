<template>
  <div class="article">
    <header
      :style="{
        'background-image': article.cover ? 'url(' + article.cover + ')' : '',
      }"
    >
      <div
        v-if="article.cover"
        class="top-mask"
        :style="{ 'background-image': 'url(' + article.cover + ')' }"
      ></div>
      <div class="outline">
        <div class="title">{{ article.title }}</div>
        <p>{{ article.outline }}</p>
      </div>
    </header>
    <div class="container">
      <article>
        <header>
          <h1>{{ article.title }}</h1>
          <div class="time-wrapper">
            <p class="self">原创</p>
            <p class="time">
              <span class="tip">发布时间</span>
              <span>{{ article.created_time }}</span>
            </p>
          </div>
        </header>
        <div class="content markdown-body" v-html="article.content"></div>
        <footer>
          <div class="comment-box">
            <MessageBox @publish="publishComment" />
          </div>
          <div>
            <MessageList
              :showPagination="false"
              @publish="publishComment"
              :list="commentList"
            />
          </div>
        </footer>
      </article>
      <nav>
        <div class="toc-wrapper">
          <p>TOC</p>
          <ul>
            <li
              class="toc-item"
              :style="{ marginLeft: (item.level - maxLevel) * 10 + 'px' }"
              v-for="(item, idx) of toc"
              :key="item.text"
              @click="() => goToToc(idx)"
            >
              {{ item.text }}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, inject, nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { publishCommentApi } from '../api'
import { getStorage, moveGoTo } from '../utils'
import { getArticle, getComment, generateToc } from '../composables/article'


export default defineComponent({
  name: 'Article',
  components: {
    MessageBox: defineAsyncComponent(() => import('../components/messageBoard/MessageBox.vue')),
    MessageList: defineAsyncComponent(() => import('../components/messageBoard/MessageList.vue'))
  },
  setup () {
    const createTip = inject('createTip') as CreateTip
    // 文章 id
    const id = useRoute().params.id as string

    const { article } = getArticle(id)

    const { toc, maxLevel, goToToc, makeToc } = generateToc()

    watch(article, () => {
      nextTick(() => {
        makeToc()
      })
    })

    const { commentList, getArticleComments } = getComment(id)
    const publishComment: (content: string) => Promise<void> = async (content: string): Promise<void> => {
      const person: PersonInfo = getStorage('personInfo') as PersonInfo
      const configData = {
        username: person.nickname,
        avt: person.avatar,
        content,
        blog: person.blog,
        email: person.email,
        // eslint-disable-next-line @typescript-eslint/camelcase
        art_id: id
      }
      publishCommentApi(configData).then(({ data }) => {
        if (data && data.errno === 0) {
          createTip('success', '发布评论成功了！')
          getArticleComments(id)
        }
      })
    }

    onMounted(() => {
      nextTick(() => {
        // 解决博文列表进入不回弹的问题
        moveGoTo(0)
      })
    })

    return {
      article,
      toc,
      maxLevel,
      goToToc,
      commentList,
      publishComment
    }
  }
})
</script>

style.<style lang="scss">
.article {
  .hljs {
    font-size: 16px;
  }
}
</style>

<style lang="scss" scoped>
.article {
  > header {
    position: relative;
    height: 30%;
    min-height: 300px;
    background: no-repeat 50% #1f3747;
    background-image: -webkit-linear-gradient(left, #1f3747, #293d31);
    background-size: cover;

    .top-mask {
      width: 100%;
      height: 30%;
      min-height: 300px;
      background: no-repeat 50% #1f3747;
      background-size: cover;
      -webkit-filter: blur(3px);
      -moz-filter: blur(3px);
      -ms-filter: blur(3px);
      -o-filter: blur(3px);
      filter: blur(3px);
    }

    .outline {
      position: absolute;
      width: 65%;
      min-width: 300px;
      padding-left: 60px;
      top: 60%;
      transform: translateY(-50%);
      box-sizing: border-box;
      color: #ffffff;

      .title {
        font-size: 25px;
        margin-bottom: 20px;
      }

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
      }
    }
  }

  .container {
    display: flex;

    article {
      width: 75%;
      background-color: #fff;
      padding: 100px 100px 30px;
      box-sizing: border-box;

      header {
        h1 {
          font-size: 30px;
          word-break: break-all;
          word-wrap: break-word;
        }

        .time-wrapper {
          width: 200px;
          height: 50px;
          margin: 20px 0 50px 0;
          border-radius: 6px;
          overflow: hidden;
          display: flex;

          .self {
            width: 35%;
            background: #2691d9;
            color: #ffffff;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .time {
            flex-grow: 1;
            display: flex;
            padding-left: 10px;
            flex-direction: column;
            justify-content: center;
            // align-items: center;
            background: #edf0f2;
            font-size: 12px;

            .tip {
              font-size: 14px;
              font-weight: 500;
              margin-bottom: 3px;
            }
          }
        }
      }

      footer {
        position: relative;
        margin-top: 100px;
        background-color: #f9fafb;
        padding: 30px 0;

        &::before {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -15px;
          content: "";
          display: block;
          border-style: solid;
          border-color: transparent transparent #f9fafb;
          border-width: 0 30px 15px;
        }

        .comment-box {
          margin-bottom: 30px;
        }
      }
    }

    nav {
      flex-grow: 1;
      min-width: 400px;
      background: #f9fafb;

      p {
        color: #c2ccd6;
        margin-bottom: 10px;
      }

      .toc-wrapper {
        padding: 100px 0 50px 30px;
        .toc-item {
          cursor: pointer;
          color: #8599ad;

          &:hover {
            color: #407fbf;
            text-decoration: underline;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .article {
    .container {
      article {
        width: 70%;
        padding: 100px 50px 30px;
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .article {
    .container {
      article {
        width: 100%;
        padding: 100px 80px 30px;
      }

      nav {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .article {
    header {
      .outline {
        display: none;
      }
    }

    .container {
      article {
        width: 100%;
        padding: 50px 20px 30px;

        header {
          .time-wrapper {
            margin-bottom: 30px;
          }
        }
      }

      nav {
        display: none;
      }
    }
  }
}
</style>
