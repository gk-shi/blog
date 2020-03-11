// ref: https://umijs.org/config/

export default {
  treeShaking: true,
  proxy: {
    "/api": {
      "target": process.env.DEV_API_SERVER,
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  routes: [
    {
      path: '/login',
      component: './login/login',
      title: '登录',
    },
    {
      path: '/404',
      component: './404',
      title: '登录',
    },
    {
      path: '/',
      component: '../layouts/index',
      Routes: ['./routes/beforeRouteEnter'],
      routes: [
        {
          path: '/create/:id',
          component: './create/create',
          title: '创建博文',
        },
        {
          path: '/create',
          component: './create/create',
          title: '创建博文',
        },
        {
          path: '/bless',
          component: './bless/bless',
          title: '留言回复',
        },
        {
          path: '/travel',
          component: './travel/travel',
          title: '旅行地图',
        },
        {
          path: '/links/:id',
          component: './links/$links',
        },
        {
          path: '/setting',
          component: './setting/setting',
          title: '个人设置',
        },
        {
          path: '/list',
          component: './list/list',
          title: '博文列表',
        },
        {
          path: '/blog/:id',
          component: './blog/$blog',
          title: '博文内容'
        },
        {
          path: '/',
          component: './index',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/Loading.jsx',
        },
        title: '博客控制台',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
