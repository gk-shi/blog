const path = require('path');

const BundleAnalyzerPlugin = require('umi-webpack-bundle-analyzer').BundleAnalyzerPlugin; // ref: https://umijs.org/config/

export default {
  alias: {
    // 修改 icon 指向
    '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/utils/Icon.js'),
  },
  treeShaking: true,
  // proxy: {
  //   '/api': {
  //     target: process.env.DEV_API_SERVER,
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': '',
  //     },
  //   },
  // },
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
          title: '本站介绍',
        },
        {
          path: '/workspace',
          component: './workspace/workspace',
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
      config.plugin('umi-webpack-bundle-analyzer').use(new BundleAnalyzerPlugin());
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
                test: /^.*node_modules[\\/](?!ag-grid-|wangeditor|react-virtualized|rc-time-picker|rc-table|rc-calendar|antd|marked|for-editor|emoji-picker-react).*$/,
                chunks: 'all',
                priority: 10,
              },
              virtualized: {
                name: 'virtualized',
                test: /[\\/]node_modules[\\/]react-virtualized/,
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
  },
};
