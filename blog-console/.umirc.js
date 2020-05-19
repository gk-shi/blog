// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  proxy: {
    '/api': {
      target: process.env.DEV_API_SERVER,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
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
          title: '博文内容',
        },
        {
          path: '/website',
          component: './website/website',
          title: '本站介绍'
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

  // 拆分打包
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 2,
            automaticNameDelimiter: '.',
            cacheGroups: {
              vendor: {
                name: 'vendors',
                test: /^.*node_modules[\\/](?!ag-grid-|lodash|wangeditor|react-virtualized|rc-select|rc-drawer|rc-time-picker|rc-tree|rc-table|rc-calendar|antd).*$/,
                chunks: 'all',
                priority: 10,
              },
              virtualized: {
                name: 'virtualized',
                test: /[\\/]node_modules[\\/]react-virtualized/,
                chunks: 'all',
                priority: 10,
              },
              rcselect: {
                name: 'rc-select',
                test: /[\\/]node_modules[\\/]rc-select/,
                chunks: 'all',
                priority: 10,
              },
              rcdrawer: {
                name: 'rcdrawer',
                test: /[\\/]node_modules[\\/]rc-drawer/,
                chunks: 'all',
                priority: 10,
              },
              rctimepicker: {
                name: 'rctimepicker',
                test: /[\\/]node_modules[\\/]rc-time-picker/,
                chunks: 'all',
                priority: 10,
              },
              ag: {
                name: 'ag',
                test: /[\\/]node_modules[\\/]ag-grid-/,
                chunks: 'all',
                priority: 10,
              },
              antd: {
                name: 'antd',
                test: /[\\/]node_modules[\\/]antd[\\/]/,
                chunks: 'all',
                priority: 9,
              },
              rctree: {
                name: 'rctree',
                test: /[\\/]node_modules[\\/]rc-tree/,
                chunks: 'all',
                priority: -1,
              },
              rccalendar: {
                name: 'rccalendar',
                test: /[\\/]node_modules[\\/]rc-calendar[\\/]/,
                chunks: 'all',
                priority: -1,
              },
              rctable: {
                name: 'rctable',
                test: /[\\/]node_modules[\\/]rc-table[\\/]es[\\/]/,
                chunks: 'all',
                priority: -1,
              },
              wang: {
                name: 'wang',
                test: /[\\/]node_modules[\\/]wangeditor[\\/]/,
                chunks: 'all',
                priority: -1,
              },
              marked: {
                name: 'marked',
                test: /[\\/]node_modules[\\/]marked[\\/]/,
                chunks: 'all',
                priority: -1,
              },
              forEditor: {
                name: 'marked',
                test: /[\\/]node_modules[\\/]for-editor[\\/]/,
                chunks: 'all',
                priority: -1,
              },
              emojiPickerReact: {
                name: 'emojiPickerReact',
                test: /[\\/]node_modules[\\/]emoji-picker-react[\\/]/,
                chunks: 'all',
                priority: -1,
              },
              highLight: {
                name: 'highLight',
                test: /[\\/]node_modules[\\/]highlight[\\/]/,
                chunks: 'all',
                priority: -1,
              },
              lodash: {
                name: 'lodash',
                test: /[\\/]node_modules[\\/]lodash[\\/]/,
                chunks: 'all',
                priority: -2,
              },
            },
          },
        },
      });
    } //过滤掉momnet的那些不使用的国际化文件

    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /zh-cn/];
      });
  }, // ignoreMomentLocale: true
};
