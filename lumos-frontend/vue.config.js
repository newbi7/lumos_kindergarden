const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://e-childschoolinfo.moe.go.kr',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api/notice/basicInfo.do'
        },
      },
    },
    // 포트 번호 고정
    port: 8079
  },
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
}
