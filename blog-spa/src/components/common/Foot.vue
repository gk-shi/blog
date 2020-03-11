<template>
  <footer>
    <div>
      <dl>
        <dt>博客的由来</dt>
        <dd>想要写一个自己的博客，把自己平常的学习、工作、生活记录下来。同时也希望把自己学到的不论前端还是其他方面的技术运用起来，提升自己。</dd>
      </dl>
      <dl>
        <dt>相关链接</dt>
        <dd><router-link class="nav-link" to="/blog">博文</router-link></dd>
        <dd><router-link class="nav-link" to="/links">友链</router-link></dd>
      </dl>
      <dl>
        <dt>关于</dt>
        <dd><router-link class="nav-link" to="/me">关于我</router-link></dd>
        <dd><router-link class="nav-link" to="/website">关于博客</router-link></dd>
      </dl>
    </div>
    <div>
      <p class="github">
        <a href="https://github.com/gk-shi/blog" target="_blank"><i class="fa fa-github fa-3x"></i></a>
        <br />
        <span>代码已托管至&nbsp;<a href="https://github.com/gk-shi/blog" target="_blank">Github</a>,完全开源</span>
      </p>
      <a href="http://beian.miit.gov.cn" target="_blank">苏ICP备18065997号</a>
      <p class="copy">{{ new Date().getFullYear() }}&nbsp;&copy;&nbsp;小溪</p>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'foot',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
footer {
  background-color: #343a40;
  color: #a9a9a9;
}
footer div:first-child {
  display: -webkit-flex;
  /* Safari */
  display: flex;
  flex-wrap: wrap;
}
footer dl {
  margin: 1rem 0.5rem;
}
footer dl:last-child {
  margin-left: 2rem;
}
footer dl>dd {
  margin: 5px 0;
}
footer div:last-child {
  text-align: center;
  padding-bottom: 0.5rem;
}
a {
  color: #A9A9A9;
}
/* 平板 */
@media screen and (min-width: 576px) {
  footer dl:first-child dd {
    text-align: left;
  }
  .fa-github:hover {
    color: #ffffff;
  }
}
/* 桌面电脑 */
@media screen and (min-width: 1025px) {
  footer div:first-child {
    display: flex;
    text-align: center;
    justify-content: space-around;
  }
  footer dl:first-child {
    width: 400px;
  }
  footer dl {
    margin-right: 5rem;
  }
  .nav-link:hover {
    color: #fff;
    text-decoration: underline;
  }
}
</style>
