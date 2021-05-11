<template>
  <div class="blog-list">
    <header>
      <p class="slogan">Thinking & Coding & Writing</p>
    </header>
    <div class="tags-wrapper">
      <div class="tags">
        <span @click="() => changeTag('all')"
          :class="{ tag: true, active: 'all' === currentTag }">全部</span>
        <span v-for="tag of tags" :key="tag._id" @click="() => changeTag(tag.tag)"
          :class="{ tag: true, active: currentTag === tag.tag }">{{ tag.tag }}</span>
      </div>
    </div>
    <v3-waterfall class="waterfall" :list="list" srcKey="cover" :gap="12" :colWidth="280"
      :distanceToScroll="200" :isLoading="loading" :isOver="over" @scrollReachBottom="getNext">
      <template v-slot:default="slotProp">
        <div class="list-item">
          <router-link :to="'/blog/' + slotProp.item._id">
            <div class="cover-wrapper">
              <img v-if="slotProp.item.cover" :src="slotProp.item.cover" class="cover" />
            </div>
            <div class="brief">
              <h3>{{ slotProp.item.title }}</h3>
              <p>{{ slotProp.item.outline }}</p>
            </div>
          </router-link>
          <div class="outline-bottom">
            <p class="article-tags">
              <span>tags</span>
              <span @click="() => changeTag(tag)" v-for="tag of slotProp.item.tags" :key="tag"
                class="tag">{{
                tag
              }}</span>
            </p>
            <time>{{ slotProp.item.time }}</time>
          </div>
        </div>
      </template>
    </v3-waterfall>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
// import Waterfall from '../components/waterfall/Waterfall.vue'
import { getBlogList, getTag } from '../composables/blog'


export default defineComponent({
  name: 'Blog',
  components: {
    // Waterfall
  },
  setup () {
    const { currentTag, tags, changeCurrentTag } = getTag()
    const { list, getList } = getBlogList()

    let config = {
      page: 0,
      tag: '',
      count: 10,
      first: true
    }

    const loading = ref(false)
    const over = ref(false)
    const fetchList = async (): Promise<void> => {
      loading.value = true
      const listCount = await getList(config)
      loading.value = false
      if (listCount !== -1) {
        config.page = config.page + 1
        config.first = false
        if (listCount < 10) over.value = true
      }
    }

    onMounted(fetchList)

    const changeTag: (tagName: string) => void = (tagName: string): void => {
      if (tagName === currentTag.value) return
      changeCurrentTag(tagName)
      config = {
        page: 0,
        tag: tagName === 'all' ? '' : tagName,
        count: 10,
        first: true
      }
      over.value = false
      fetchList()
    }

    let isLoad = false
    const getNext: () => Promise<void> = async (): Promise<void> => {
      if (isLoad) return
      isLoad = true
      await fetchList()
      isLoad = false
    }


    return {
      currentTag,
      tags,
      list,
      changeTag,
      getNext,
      loading,
      over
    }
  }
})
</script>

<style lang="scss" scoped>

.blog-list {
  background-color: #dee3e7;
}

header {
  position: relative;
  height: 70vh;
  min-height: 450px;
  background: url("../assets/images/blog-list.jpg") no-repeat;
  background-size: 100% auto;
  background-position: 0 60%;

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

  .slogan {
    position: absolute;
    // left: 50%;
    top: 80%;
    width: 100%;
    text-align: center;
    color: #ffffff;
    font-family: sourceCodePro, Helvetica, STHeiti STXihei, Microsoft JhengHei,
      Microsoft YaHei, Tohoma, Arial;
  }
}

.waterfall,
.tags {
  width: 80%;
  margin: 0 auto;
  min-width: 1200px;
}

.tags-wrapper {
  padding: 10px 0;
  background-color: #fff;
  border-bottom: 1px solid #c4cdd4;
  margin-bottom: 15px;

  .tags {
    .tag {
      display: inline-block;
      width: 100px;
      font-size: 14px;
      color: #576575;
      padding: 5px 0;
      text-align: center;
      border: 1px solid #e8eaee;
      border-radius: 4px;
      margin: 0 10px 8px 0;

      &:hover {
        border-color: #8599ad;
      }

      &:not(.active) {
        cursor: pointer;
      }

      &.active {
        color: #ffffff;
        background-color: #576575;
        border-color: #576575;
      }
    }
  }
}

.brief {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;

  h3,
  > p {
    word-wrap: break-word;
    word-break: break-all;
  }

  h3 {
    text-align: center;
    padding: 20px 20px 12px;
    font-weight: 400;
    color: #22252a;
  }
  > p {
    padding: 0 20px 12px;
    color: #8a98a8;
    font-size: 13px;
  }
}

.outline-bottom {
  border-top: 1px solid #e7ebef;
  background-color: #f9fafb;
  padding: 10px;
  display: flex;
  justify-content: space-between;

  .article-tags,
  time {
    font-size: 12px;
    color: #73828c;
  }

  .article-tags {
    span {
      margin-right: 6px;

      &.tag:hover {
        text-decoration: underline;
        color: #000000;
        cursor: pointer;
      }
    }
  }
}

.list-item {
  box-sizing: border-box;

  .cover-wrapper {
    overflow: hidden;
    background-color: #fff;
  }

  &:hover {
    box-shadow: 5px 5px 5px #ccc;

    .cover {
      // transform: scale(1.5);
      animation: scaleImg 0.1s linear forwards;
    }

    @keyframes scaleImg {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.5);
      }
    }
  }
}

.cover {
  width: 100%;
  vertical-align: middle;
}

/* ipad pro */
@media screen and(max-width: 1024px) {
  header {
    height: 40vh;
    background-size: 100% 100%;
  }
}

@media screen and(max-width: 1000px) {
  .waterfall,
  .tags {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    min-width: auto;
  }
}

@media screen and(max-width: 576px) {
  header {
    height: 30vh;
    min-height: 300px;

    background-size: 150% 100%;
    background-position: 40% 0;
  }

  .waterfall,
  .tags {
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    min-width: auto;
  }

  .tags {
    width: 90%;
  }
}
</style>
