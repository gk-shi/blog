<template>
  <footer>
    <div>
      <dl>
        <dt>博客由来</dt>
        <dd class="message">这是一个博主自己吹🐂 皮的地方。刚学前端时想要写一个自己的博客，有点成就感。几经改版后对现有代码自我感觉能看💀。从此再次立下再重写就是🐶 的flag~</dd>
      </dl>
      <dl>
        <dt>相关链接</dt>
        <dd>
          <router-Link class="nav-Link" to="/blog">博文</router-Link>
        </dd>
        <dd>
          <router-Link class="nav-Link" to="/travel">旅行</router-Link>
        </dd>
      </dl>
      <dl>
        <dt>关于</dt>
        <dd>
          <router-Link class="nav-Link" to="/me">关于我</router-Link>
        </dd>
        <dd>
          <router-Link class="nav-Link" to="/website">关于博客</router-Link>
        </dd>
      </dl>
    </div>
    <div>
      <p class="github">
        <a href="https://github.com/gk-shi/blog" target="_blank">
          <i class="fa fa-github fa-3x"></i>
        </a>
        <br />
        <span>
          代码已托管至&nbsp;
          <a
            href="https://github.com/gk-shi/blog"
            target="_blank"
            class="github-url"
          >Github</a>,完全开源
        </span>
      </p>
      <p class="copy">
        2018 一 {{ new Date().getFullYear() }}&nbsp;&nbsp;&copy;&nbsp;
        <span class="gkshi">gkshi</span>
      </p>
      <a class="icp" href="http://beian.miit.gov.cn" target="_blank">赣ICP备2020011360号</a>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Footer'
})
</script>

<style lang="scss" scoped>
/* 桌面 */
footer {
  padding: 20px 0;
  background-color: #343a40;
  color: #a9a9a9;

  div:first-child {
    display: flex;
    justify-content: space-around;

    dl {
      min-width: 100px;
      dd {
        margin-top: 8px;

        a:hover {
          color: #ffffff;
          text-decoration: underline;
        }
      }
    }

    dl:first-child {
      max-width: 400px;
    }

    .message {
      color: #777;
    }
  }

  div:last-child {
    margin-top: 25px;
    text-align: center;

    .fa-github:hover,
    .github-url:hover {
      color: #ffffff;
    }

    .copy {
      margin: 5px 0;

      .gkshi {
        font-family: sourceCodePro, Helvetica, STHeiti STXihei,
          Microsoft JhengHei, Microsoft YaHei, Tohoma, Arial;
      }
    }

    .icp {
      display: block;
      font-size: 14px;
      color: #666;
    }
  }
}

/* 移动端 */
@media screen and (max-width: 576px) {
  footer {
    div:first-child {
      flex-wrap: wrap;

      dl:first-child {
        width: 100%;
        margin-bottom: 20px;
        padding: 0 15px;
      }
    }
  }
}

// footer {
//   background-color: #343a40;
//   color: #a9a9a9;

//   div:first-child {
//     display: -webkit-flex;
//     /* Safari */
//     display: flex;
//     flex-wrap: wrap;
//   }

//   div:last-child {
//     text-align: center;
//     padding-bottom: 0.5rem;
//   }

//   dl {
//     margin: 1rem 0.5rem;

//     &:last-child {
//       margin-left: 2rem;
//     }

//     & > dd {
//       margin: 5px 0
//     }
//   }

//   a {
//     color: #A9A9A9;
//   }
// }

// /* 平板 */
// @media screen and (min-width: 576px) {
//   footer dl:first-child dd {
//     text-align: left;
//   }
//   .fa-github:hover {
//     color: #ffffff;
//   }
// }

// /* 桌面电脑 */
// @media screen and (min-width: 1025px) {
//   footer div:first-child {
//     display: flex;
//     text-align: center;
//     justify-content: space-around;
//   }
//   footer dl:first-child {
//     width: 400px;
//   }
//   footer dl {
//     margin-right: 5rem;
//   }
//   .nav-Link:hover {
//     color: #fff;
//     text-decoration: underline;
//   }
// }
</style>
