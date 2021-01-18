import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: (): Promise => import('../views/home.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: (): Promise => import('../views/blog.vue')
    },
    {
      path: '/blog/:id',
      name: 'article',
      component: (): Promise => import('../views/article.vue')
    },
    {
      path: '/travel',
      name: 'travel',
      component: (): Promise => import('../views/travel.vue')
    },
    {
      path: '/bless',
      name: 'bless',
      component: (): Promise => import('../views/bless.vue')
    },
    {
      path: '/website',
      name: 'website',
      component: (): Promise => import('../views/website.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: (): Promise => import('../views/me.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: (): Promise => import('../views/notFound.vue')
    }
  ]
})

export default router
