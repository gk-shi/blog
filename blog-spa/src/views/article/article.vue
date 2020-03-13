<template>
  <div class="art">
    <section class="container">
      <div class="row">
        <header class="cover">
          <img :src="blog.cover" alt="">
          <div class="art-info">
            <h2 class="title">{{ blog.title }}</h2>
            <div class="outline">{{ blog.outline }}</div>
          </div>
        </header>
        <article class="details">
          <h3 class="title">{{ blog.title }}</h3>
          <br>
          <p>
            tags:&nbsp;
            <span v-for="(tag, index) in blog.tags" :key="index">{{ tag }}&nbsp;&nbsp;</span>
          </p>
          <time>发布时间：{{ blog.createdTime }}</time>
          <div class="article markdown-body" v-html="blog.content"></div>
        </article>
        <div class="comment">
          <CommentBox class="top" ref="commentBox" @toIssue="toIssue" modalTitle="评论"></CommentBox>
          <CommentList @reply="reply" :msgList="comments"></CommentList>
          <Pagination
            v-if="comments.length"
            class="page"
            :pageCount="pageCount"
            @changeList="updateList"
          ></Pagination>
        </div>
        <Catalog class="cat" :catalog="logList"></Catalog>
      </div>
    </section>
    <Foot></Foot>
  </div>
</template>

<script>
import CommentBox from '../../components/common/CommentBox.vue'
import CommentList from '../../components/common/CommentList.vue'
import Pagination from '../../components/common/Pagination.vue'
import Catalog from '../../components/article/Catalog.vue'
import Foot from '../../components/common/Foot.vue'
import {
  getArticleService,
  getCommentsService,
  publishCommentService
} from '../../services/request'
export default {
  name: 'bArticle',
  data () {
    return {
      blogId: '',
      blog: {},
      comments: [],
      pageCount: 0,
      logList: []
    }
  },
  components: {
    Catalog,
    CommentBox,
    CommentList,
    Pagination,
    Foot
  },
  methods: {
    // 调用子组件方法
    reply (user) {
      this.$refs.commentBox.toReply(`  ${user}  `)
    },
    async getArticle () {
      this.blogId = this.$route.params.id
      try {
        let { data } = await getArticleService(this.blogId)
        this.blog = data
        this.blog.createdTime = this.blog.created_time
        document.title = this.blog.title
      } catch (error) {
        throw new Error(error)
      }
    },
    async getComment ({ page = 0, first = false }) {
      try {
        let { data } = await getCommentsService(this.blogId, page, first)
        this.comments.splice(0)
        data[0].forEach((item) => {
          const tempCom = {}
          tempCom.id = item._id
          tempCom.username = item.username
          tempCom.content = item.content
          tempCom.createdTime = item.created_time
          tempCom.isAdmin = item.is_admin
          // 处理原有 avatar 的路径问题
          if (item.avt.includes('gkshi.com')) {
            tempCom.avtSrc = item.avt
          } else {
            tempCom.avtSrc = `${process.env.VUE_APP_IMG_PREFIX}/avt/${item.avt.split('-')[1]}`
          }
          this.comments.push(tempCom)
        })
        if (first) this.pageCount = data[1]
      } catch (error) {
        throw new Error(error)
      }
    },
    // 发布评论
    async toIssue (comment) {
      comment.art_id = this.blogId
      try {
        const { data } = await publishCommentService(this.blogId, comment)
        if (data.created_time) {
          this.getComment({
            first: true
          })
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 更新评论列表
    updateList (page) {
      this.getComment({
        page: page - 1
      })
    },
    // 生成目录
    makeLog () {
      const article = document.querySelector('.details')
      const titleList = article.querySelectorAll('h3,h4')
      titleList.forEach((item) => {
        const t = {}
        t.level =
          item.tagName.toLocaleLowerCase() === 'h3'
            ? item.className === 'title'
              ? 0
              : 1
            : 2
        t.text = item.textContent || item.innerText
        t.top = item.offsetTop - item.scrollHeight - 50
        this.logList.push(t)
      })
    }
  },
  async created () {
    await this.getArticle()
    setTimeout(this.makeLog())
    await this.getComment({
      first: true
    })
  }
}
</script>

<style lang="scss">
@media screen and (min-width: 992px) {
  .art .container {
    max-width: 60%;
  }
}
</style>

<style lang="scss" scoped>
.row {
  &::-webkit-scrollbar {
    display: none;
  }
}

.cat {
  display: none;
}

.cover {
  width: 100%;
  height: 25vh;
  margin-top: 60px;
  background: linear-gradient(to top, #ffd89b, #19547b);
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    filter: blur(4px);
  }

  > div {
    display: none;
  }

  .outline {
    word-wrap: break-word;
    word-break: break-all;
  }
}

.details {
  width: 100%;
  padding: 10px 20px;
  padding-top: 25px;
  padding-bottom: 5rem;
  background-color: #fff;

  time {
    display: inline-block;
    font-size: 13px;
    margin: 10px 0 20px 0;
  }
}

.comment {
  width: 100%;

  > .top {
    margin-top: 15px;

    &:before {
      position: absolute;
      content: '';
      top: -1.9rem;
      left: 50%;
      margin-left: -2rem;
      width: 0;
      height: 0;
      border-style: solid;
      border-color: transparent transparent #f5f5f5;
      border-width: 0 2rem 1rem;
    }
  }

  > .page {
    justify-content: space-around;
  }
}

.markdown-body >>> a {
    color: #0366d6;
  }

.markdown-body .hljs {
  font-size: 18px;
}

.markdown-body.article >>> img {
    display: flex;
    margin: 0 auto;
}

@media screen and (min-width: 576px) {
  .cover {
    position: relative;
    margin-top: 80px;
    height: auto;
    padding-bottom: 30rem;

    > img {
      position: absolute;
      filter: blur(15px);
    }

    > div {
      position: absolute;
      display: block;
      width: 45%;
      color: #fff;
      padding: 2rem 1.5rem 0;

      .title {
        margin-bottom: 20px;
      }
    }
  }

  .details {
    padding: 5rem 8rem;
    width: 100%;
  }

  .comment {
    background-color: #d3d3d3;

    .top:before {
      border-color: transparent transparent #d3d3d3;
    }
  }
}

@media screen and (min-width: 992px) {
  .cat {
    display: block;
    position: fixed;
    right: 20px;
    top: 100px;
    width: 18%;
  }
}
</style>
