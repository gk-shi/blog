
<template>
<div>
  <transition name="info">
    <div class="info" v-if="info">
      博主马上就审核~~~
    </div>
  </transition>
  <header>
    <p class="index">
      <a href="#"></a>
    </p>
    <div>
      <div class="slogan">Slogan 我还没想好</div>
      <a href="javascript:void(0);" class="btn join-us" data-toggle="modal" data-target="#join-box">join us!</a>
      <!-- 模态框 -->
      <div class="modal fade" id="join-box">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- 模态框头部 -->
            <div class="modal-header">
              <h6 class="modal-title">我要加入</h6>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <!-- 模态框主体 -->
            <div class="modal-body">
              <form action="/demo/demo_form.asp">
                <p>
                  <label for="person-name">尊姓大名</label>
                  <input type="text" id="person-name" v-model="userInfo.username" placeholder="这样我才能给你安排鸭^_^">
                </p>
                <p>
                  <label for="person-blog">个人博客</label>
                  <input type="text" id="person-blog" v-model="userInfo.blog_url" placeholder="http://">
                </p>
                <p>
                  <label for="person-github">Github用户名</label>
                  <input type="text" id="person-github" v-model="userInfo.git_name" placeholder="如：gk-shi">
                </p>
                <p>
                  <label for="person-desc">个人描述</label>
                  <textarea style="resize: none;" rows="3" id="person-desc" v-model="userInfo.description" placeholder="不长不短一句话，灯光师、摄影师已就位，请开始你的表演~"></textarea>
                </p>
              </form>
            </div>
            <!-- 模态框底部 -->
            <div class="modal-footer">
              <button type="submit" data-dismiss="modal" :disabled="!userInfo.username.trim().length" @click="toIusse">确定</button>
              <button type="button" data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span>进这里就像回家一样，这里个个都是人才，而且说话又好听~</span>
  </header>
  <section class="container">
    <div class="row">
      <div class="person-item" v-for="user in userCards" :key="user._id">
        <div class="avatar float-left">
          <img :src="user.avt" width="40px">
        </div>
        <div class="nickname clearfix">{{ user.username }}</div>
        <div class="desc">{{ user.description }}</div>
        <div class="links">
          <a :href="user.blog_url" target="_blank" class="blog">博</a>
          <a :href="user.git_name" target="_blank" class="git">git</a>
        </div>
      </div>
    </div>
  </section>
</div>
</template>
<script>
import {
  getLinksService,
  addLinkService
} from '../../services/request'
export default {
  name: 'links',
  data () {
    return {
      linkUrl: '/api/links',
      userInfo: {
        username: '',
        blog_url: '',
        git_name: '',
        description: ''
      },
      userCards: [],
      info: false
    }
  },
  methods: {
    async getLinks () {
      try {
        const {
          data
        } = await getLinksService()
        this.userCards.push(...data)
      } catch (error) {
        throw new Error(error)
      }
    },
    async toIusse () {
      try {
        await addLinkService(this.userInfo)
        this.info = true
        setTimeout(() => {
          this.info = false
        }, 3000)
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  created () {
    this.getLinks()
  }
}
</script>
<style lang="scss" scoped>
.info {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  padding: 20px;
  box-shadow: 0 0 10px 4px #708090;
  text-align: center;
  font-size: 20px;
  font-family: Helvetica, STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, Tohoma, Arial;
  background-color: #fff;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

header {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 40vh;
  background: #64cccb;
  -webkit-background: linear-gradient(to bottom, #336799, #64cccb);
  background: linear-gradient(to bottom, #336799, #64cccb);
  color: #ffffff;
  overflow: hidden;
  >.index {
    padding-left: 30px;
  }
  div {
    text-align: center;
    padding-top: 3rem;
    .slogan {
      padding-bottom: 30px;
      font-size: 1.5rem;
      font-family: Helvetica, STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, Tohoma, Arial;
    }
    .join-us {
      color: #000;
      background-color: #fff;
    }
    #join-box {
      color: #808080;
    }
    .modal {
      &-content {
        padding-top: 10px;
      }
      &-header {
        padding: 5px;
        font-size: 14px;
      }
      &-body {
        form {
          text-align: left;
          label {
            padding-right: 10px;
            width: 120px;
            text-align: right;
          }
          p {
            padding-bottom: 12px;
            &:last-child {
              padding-bottom: 0;
              label {
                vertical-align: top;
              }
            }
            input,
            textarea {
              padding: 3px 10px;
              width: calc(100% - 125px);
              &::placeholder {
                font-size: 12px;
              }
            }
          }
        }
      }
      &-footer {
        padding: 0;
        button {
          margin: 0;
          padding: 5px;
          border: 0px;
          color: #4169E1;
          background-color: #fff;
          width: 50%;
          &:hover {
            background-color: #f5f5f5;
          }
          &[type=submit] {
            margin-right: 0;
            border-right: 2px solid #eee;
          }
          &[type=button] {
            margin-left: 0;
          }
        }
      }
    }
  }
  span {
    position: absolute;
    bottom: 15px;
    display: inline-block;
    width: 130%;
    margin-left: 30px;
    animation: text-marquee 5s infinite alternate;
  }
  @keyframes text-marquee {
    from {
      margin-left: 30px;
    }
    to {
      margin-left: -100px;
    }
  }
}

.row {
  padding-top: 20px;
  .person-item {
    width: 100%;
    padding: 10px 20px;
    background-color: #fff;
    border-bottom: 1px solid #d3d3d3;
    .avatar {
      img {
        border-radius: 50%;
      }
    }
    .links {
      a {
        display: inline-block;
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background-color: skyblue;
        border: 1px solid #dcdcdc;
        border-radius: 50%;
        color: #ffffff;
      }
      .blog {
        background-color: #336799;
      }
      .git {
        margin-left: 15px;
        background-color: #30c251;
      }
    }
    .nickname {
      line-height: 40px;
      padding-left: 80px;
    }
    .desc {
      word-wrap: break-word;
      word-break: break-all;
      margin: 20px 0;
      color: #808080;
      font-size: 12px;
      height: 50px;
      overflow: hidden;
    }
  }
}

@media screen and (max-width: 576px) {
  header {
    height: 50vh;
    span {
      width: 134%;
    }
  }
}

/* 平板 */

@media screen and (min-width: 576px) {
  header {
    height: auto;
    padding-bottom: 7rem;
    span {
      animation: text-marquee-pc 25s ease infinite;
      @keyframes text-marquee-pc {
        0% {
          margin-left: 120%;
        }
        35% {
          margin-left: 35%;
        }
        65% {
          margin-left: 35%;
        }
        100% {
          margin-left: -50%;
        }
      }
    }
  }
  .row .person-item {
    width: 32%;
    margin: 10px 0;
    &:nth-child(3n+2) {
      margin: 10px 10px;
    }
  }
}

/* 桌面电脑 */

@media screen and (min-width: 1025px) {
  header .join-us:hover {
    background-color: #87CEFA;
    color: #fff;
  }
  .row .person-item:hover {
    box-shadow: 0px 0px 10px 5px #ced2db;
    transition: all .5s;
  }
  .links .blog:hover,
  .links .git:hover {
    text-decoration: none;
    background-color: #fff;
    color: #000;
    transition: all .5s;
  }
}

.info-enter-active,
.info-leave-active {
  transition: opacity .5s;
}

.info-enter,
.info-leave-to {
  opacity: 0;
}
</style>
