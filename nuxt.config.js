const pkg = require('./package')


module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/style/reset.scss',
    '~/assets/icon/iconfont.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/lazyload',
    '@/plugins/axios',
  ],

  /*
   ** Nuxt.js modules
   */
  //处理跨域问题
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true,
    prefix: '/api',
    // See https://github.com/nuxt-community/axios-module#options
  },
  proxy: {
    //开启代理
    "/api": {
      target: "http://localhost:7778",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api"
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {

    }
  },
  generate: {
    routes: [
      '/article/:id',
    ],
    minify: {
      collapseWhitespace: false
    }
  }
}
