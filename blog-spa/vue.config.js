module.exports = {
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         require('autoprefixer')({
  //           overrideBrowserslist: [
  //             'defaults',
  //             'ios >= 6',
  //             'not ie <= 100',
  //             'not ExplorerMobile <= 100',
  //             'not Opera <=100',
  //             'not OperaMini <= 100',
  //             'not OperaMini all',
  //             'not OperaMobile <= 100',
  //             'not BlackBerry <= 100'
  //           ]
  //         }),
  //         require('postcss-pxtorem')({
  //           rootValue: 50,
  //           unitPrecision: 5,
  //           propList: ['*'],
  //           selectorBlackList: ['van'],
  //           replace: true,
  //           mediaQuery: false,
  //           minPixeValue: 0
  //         })
  //       ]
  //     }
  //   }
  // },
  configureWebpack: config => {
    config
      .externals = {
        'jquery': '$',
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'axios': 'axios'
      }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .exclude
      .add('node_modules')
      .end()
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
