<template>
  <header>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <router-link class="navbar-brand" to="/">
        <img :src="logo" width="80">
      </router-link>
      <button class="navbar-toggler togglle-btn" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item" @click="toggleCard">
            <router-link class="nav-link" to="/blog">博文</router-link>
          </li>
           <li class="nav-item">
            <router-link class="nav-link" to="/travel">旅行</router-link>
          </li>
          <li class="nav-item" @click="toggleCard">
            <router-link class="nav-link" to="/bless">留言</router-link>
          </li>
          <!-- <li class="nav-item" @click="toggleCard">
            <router-link class="nav-link" to="/links">友链</router-link>
          </li> -->
          <!-- <li class="nav-item" @click="toggleCard">
            <router-link class="nav-link" to="/me">我</router-link>
          </li> -->
          <li class="nav-item" @click="toggleCard">
            <router-link class="nav-link" to="/website">本站</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'navBar',
  data () {
    return {
      logo: `${process.env.VUE_APP_IMG_PREFIX}website-logo.png`
    }
  },
  methods: {
    // 解决移动端点击link后自动收回列表
    toggleCard () {
      if (!(window.screen.width < 576)) {
        return
      }
      document.querySelector('.togglle-btn').click()
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar-nav>li:last-child {
  padding-bottom: 5px;
}

/* 平板 */

@media screen and (min-width: 576px) {
  .navbar {
    padding: 8px 50px 8px 50px;

    &-nav, .nav-item {
      margin-right: 30px;
    }
  }

  @keyframes toggle-down {
    from {
      margin-top: -61px;
    }
    to {
      margin-top: 0;
    }
  }

  .collapse {
    justify-content: flex-end;
  }

  #collapsibleNavbar.nav-link:hover {
    text-decoration: none;
  }
}

/* 桌面电脑 */

@media screen and (min-width: 1025px) {
  .navbar {
    padding: 8px 120px 8px 120px;

    &-nav li {
      margin-right: 50px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
