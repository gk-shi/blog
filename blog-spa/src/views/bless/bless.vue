<template>
  <div>
    <section id="leave-msg" class="container" :style="'background-image:url('+bgImg+')'">
      <div class="row ">
        <CommentBox ref=commentBox id="comment-box" @toIssue="toIssue" modalTitle="留言"></CommentBox>
        <CommentList @reply="reply" v-if="leaveMsg.length !== 0" :msgList="leaveMsg"></CommentList>
        <p class="empty" :style="'height:' + pHeight + 'px'" v-else>快来占据第一条留言吧~</p>
        <Pagination v-if="leaveMsg.length" :pageCount="pageCount" @changeList="updateList"></Pagination>
      </div>
    </section>
    <Foot></Foot>
  </div>
</template>

<script>
import CommentBox from '../../components/common/CommentBox.vue'
import CommentList from '../../components/common/CommentList.vue'
import Pagination from '../../components/common/Pagination.vue'
import Foot from '../../components/common/Foot.vue'
import { getBlessService, publishBlessService } from '../../services/request'
export default {
  name: 'LeaveMsg',
  data () {
    return {
      leaveMsg: [],
      pageCount: 0,
      pHeight: 0,
      bgImg: `${process.env.VUE_APP_IMG_PREFIX}leave-bg-image.jpg`
    }
  },
  components: {
    CommentBox,
    CommentList,
    Pagination,
    Foot
  },
  methods: {
    // 调用评论框子组件的方法将回复对象加入内容中
    reply (user) {
      this.$refs.commentBox.toReply(`  ${user}  `)
    },
    // 发布留言
    async toIssue (value) {
      try {
        const { data } = await publishBlessService(value)
        if (data.created_time) {
          this.getLeaveMsg({ first: true })
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async getLeaveMsg ({ page = 0, first = false }) {
      try {
        const { data } = await getBlessService(page, first)
        this.leaveMsg.splice(0)
        data[0].forEach(item => {
          const tempMsg = {}
          tempMsg.id = item._id
          tempMsg.username = item.username
          tempMsg.content = item.content
          tempMsg.createdTime = item.created_time
          tempMsg.isAdmin = item.is_admin
          // 处理原有 avatar 的路径问题
          if (item.avt.includes('gkshi.com')) {
            tempMsg.avtSrc = item.avt
          } else {
            tempMsg.avtSrc = `${process.env.VUE_APP_IMG_PREFIX}/avt/${item.avt.split('-')[1]}`
          }
          this.leaveMsg.push(tempMsg)
        })
        if (first) {
          this.pageCount = data[1]
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    updateList (page) {
      this.getLeaveMsg({ 'page': page - 1 })
    }
  },
  created () {
    this.getLeaveMsg({ first: true })
  },
  mounted () {
    const wHeight = window.innerHeight
    let bHeight = (document.body || document.documentElement).offsetHeight
    this.pHeight = wHeight - bHeight
  }
}

</script>
<style scoped>
.empty {
  padding: 100px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#leave-msg.container {
  background-repeat: no-repeat;
  background-size: cover;
}

@media screen and (min-width: 576px) {
  .empty {
    color: #fff;
    padding: 0;
  }

  #leave-msg.container {
    max-width: 100%;
    margin: 0;
    background-attachment: fixed;
    /* background-image: url('http://image.gkshi.com/leave-bg-image.jpg'); */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  #leave-msg .row {
    max-width: 990px;
    margin: 0 auto;
  }
}

@media screen and (min-width: 1200px) {
  #leave-msg .row {
    max-width: 1140px;
    margin: 0 auto;
  }
}

</style>
