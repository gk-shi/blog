import Vue from 'vue'
import Router from 'vue-router'
import Window from './views/window/window.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: Window,
    children: [{
      path: '',
      name: 'home',
      component: () => import('./views/home/home.vue'),
      meta: {
        title: 'gkshi_小溪的个人博客 记录学习与生活'
      }
    },
    {
      path: 'blog',
      name: 'blog',
      component: () => import('./views/blog/blog.vue'),
      meta: {
        title: 'gkshi_博文'
      }
    },
    {
      path: 'blog/:id',
      name: 'bArticle',
      component: () => import('./views/article/article.vue')
    },
    {
      path: 'bless',
      name: 'bless',
      component: () => import('./views/bless/bless.vue'),
      meta: {
        title: 'gkshi_留言墙'
      }
    },
    {
      path: 'links',
      name: 'links',
      component: () => import('./views/links/links.vue'),
      meta: {
        title: '大佬在咆哮，小白在奔跑'
      }
    }
    ]
  },
  {
    path: '/travel',
    name: 'travel',
    component: () => import('./views/travel/travel.vue'),
    meta: {
      title: 'gkshi_身体和心灵总有个在路上'
    }
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('./views/me/me.vue'),
    meta: {
      title: '关于小溪'
    }
  },
  {
    path: '/website',
    name: 'website',
    component: () => import('./views/website/website.vue'),
    meta: {
      title: '关于本站'
    }
  },
  {

    path: '*',
    name: 'notFound',
    component: () => import('./views/notFound/notFound.vue'),
    meta: {
      title: '走错路啦~'
    }
  }
  ],
  // 路由渲染时回到顶部
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
