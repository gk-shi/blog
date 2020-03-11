<template>
  <div class="fall-wrapper">
    <vueWaterfallEasy ref="waterfall" height="100vh" linkRange="img" :imgsArr="blogLists" :imgWidth="300" :maxCols="4" :mobileGap="20" :isRouterLink="true" @scrollReachBottom="getData">
      <header class="header col-12" slot="waterfall-head">
        <div class="container">
          <div class="title">
            <img :src="book">
            <p>Thinking & Coding & Writing</p>
          </div>
          <div class="tags">
            <router-link to="/blog" @click.native="switchTag('全部')"><i class="fa fa-tags"></i>全部</router-link>
            <router-link v-for="tag in tags" :key="tag.id" :to="{name:'blog', query: { tag: tag.name }}" @click.native="switchTag(tag.name)"><i class="fa fa-tag"></i>{{ tag.name }}</router-link>
          </div>
        </div>
        <p class="empty" v-if="blogLists.length === 0">现在还没有内容哦~</p>
      </header>
      <div class="img-info" slot-scope="props">
        <router-link :to="props.value.href" class="tag-link">
          <div class="card-body">
            <h5 class="card-title">{{ props.value.title }}</h5>
            <p class="card-text">{{ props.value.outline }}</p>
          </div>
        </router-link>
        <div class="card-footer">
          <span class="art-tags">
            <small>tags:</small>
            <router-link v-for="(tag, tagIndex) in props.value.tags" :to="{name:'blog', query: { tag: tag }}" :key="tagIndex" @click.native="switchTag(tag)">{{ tag }}</router-link>
          </span>
          <time>{{ props.value.time }}</time>
        </div>
      </div>
    </vueWaterfallEasy>
  </div>
</template>

<script>
import vueWaterfallEasy from '../../components/waterfall/Waterfall.vue'
import { getTagsService, getBlogListService } from '../../services/request'
export default {
  name: 'BlogList',
  inject: ['reload'],
  data () {
    return {
      page: 0,
      tags: [],
      blogLists: [],
      nextBlogLists: [],
      scrollHandler: null,
      tagNow: '全部',
      book: `${process.env.VUE_APP_IMG_PREFIX}book.png`
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    async switchTag (tag) {
      if (tag === this.tagNow) return
      this.tagNow = tag
      this.blogLists.splice(0)
      await this.getBlogList(0)
      this.blogLists.push(...this.nextBlogLists)
    },
    async getData () {
      await this.getBlogList()
      if (this.nextBlogLists.length === 0) {
        this.$refs.waterfall.waterfallOver()
        return
      }
      this.blogLists.push(...this.nextBlogLists)
    },
    async getTags () {
      try {
        const { data } = await getTagsService()
        data.forEach(item => {
          const tempTag = {}
          tempTag.id = item._id
          tempTag.name = item.tag
          this.tags.push(tempTag)
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    async getBlogList (page = this.page) {
      if (page === 0) {
        this.page = 0
      }
      const { tag = '' } = this.$route.query
      this.nextBlogLists.splice(0)
      try {
        const { data } = await getBlogListService(page, tag)
        data[0].forEach(item => {
          const tempList = {}
          tempList.src = item.cover
          tempList.href = '/blog/' + item._id
          tempList.title = item.title
          tempList.tags = item.tags
          tempList.outline = item.outline
          tempList.time = item.created_time
          this.nextBlogLists.push(tempList)
        })
        this.page++
      } catch (error) {
        throw new Error(error)
      }
    },
    scrollBind () {
      this.scrollHandler = document.querySelector('.vue-waterfall-easy-scroll')
      this.scrollHandler.addEventListener('scroll', this.scrollFunc, false)
    },
    scrollFunc () {
      if (this.scrollHandler.scrollTop >= 250) {
        this.$emit('show-rocket', true)
      } else {
        this.$emit('show-rocket', false)
      }
    }
  },
  async created () {
    await this.getTags()
    await this.getBlogList(0)
    this.blogLists = this.blogLists.concat(this.nextBlogLists)
    setTimeout(() => {
      this.scrollBind()
    }, 200)
  },
  beforeRouteLeave (to, from, next) {
    this.scrollHandler.removeEventListener('scroll', this.scrollBind)
    next()
  }
}
</script>

<style lang="scss">
$aColor: #a9a9a9;
/* 修改卡片默认样式 */
.img-wraper {
  box-shadow: 0 0 1px #111;
}

.tag-link:hover {
  text-decoration: none;
  .card-text {
    color: $aColor;
  }
}
</style>

<style lang="scss" scoped>
$aColor: #a9a9a9;
.fall-wrapper {
  height: 100%;

  .header {
    padding-top: 80px;

    .title {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        padding: 20px 0;
        color: #bfbfbf;
        font-family: sourceCodePro;
      }
    }

    .tags {
      a {
        display: inline-block;
        text-decoration: none;
        margin: 0 5px 5px 0;
        padding: 2px 8px;
        border: 1px solid rgba(245, 222, 179, .5);
        border-radius: 8px;
        color: #333;
        background-color: #eee;
        font-size: 14px;

        &.router-link-exact-active {
          color: #fff;
          background-color: #ff8c00;
        }

        &:not([class~=router-link-exact-active]):hover {
          color: #ffffff;
          background-color: rgba(0, 0, 0, .7);
        }

        i {
          margin-right: 4px;
        }

        span {
          color: #808080;
          margin: 0 5px;
        }
      }
    }

    .empty {
      text-align: center;
      padding-top: 50px;
    }
  }

  .card {
    &-title,
    &-text {
      word-break:break-all;
    }

    &-title {
      display: flex;
      justify-content: center;
      color: #000;
    }

    &-text {
      text-indent: 2rem;
    }

    &-footer {
      display: flex;
      justify-content: space-between;
      font-size: 13px;

      .art-tags {
        display: inline-block;
        max-width: 160px;
        white-space:nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        a {
          margin: 0 3px;

          &:hover {
            color: $aColor;
          }
        }
      }

      time {
        color: $aColor;
      }
    }
  }
}
</style>
