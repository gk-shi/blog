<template>
  <div class="messaage-list">
    <div class="empty" v-if="formatedList.length === 0">
      还没有任何留言，赶快成为第一个！
    </div>
    <MessageItem @publish="publish" v-for="message of formatedList" :key="message._id" :message="message" class="message-item" />
    <Pagination v-if="showPagination" v-model:current-page="current" :total="total" @pageChange="pageChange" class="pagination" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import MessageItem from './MessageItem.vue'
import Pagination from './com/Pagination.vue'

export default defineComponent({
  name: 'MessageList',
  emits: ['page-change', 'update:currentPage', 'reply', 'publish'],
  components: {
    MessageItem,
    Pagination
  },
  props: {
    list: {
      default: (): any => ([])
    },
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }) {
    const formatedList = computed(() => {
      return props.list.map((el: any) => {
        const timeSplit = el.created_time.split(/\s+/)
        el.time = `${timeSplit[1]}-${timeSplit[0]} ${timeSplit[2]}`
        return el
      })
    })

    const current = computed(() => {
      return props.currentPage
    })


    const pageChange: (page: number) => void = (page: number): void => {
      emit('page-change', page)
      emit('update:currentPage', page)
    }

    const publish: (content: string) => void = (content: string) => {
      emit('publish', content)
    }

    return {
      current,
      formatedList,
      pageChange,
      publish
    }
  }
})
</script>

<style lang="scss" scoped>
.empty {
  text-align: center;
  margin: 20px auto;
}

.pagination {
  margin: 20px auto 0;
  text-align: center;
}

.message-item {
  margin: 20px 0;

  &:first-child {
    margin: 0
  }
}
</style>
