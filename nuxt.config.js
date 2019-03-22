const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: '陈龙 client.juckchen.cn | 前端技术分享',
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

  router: {
    middleware: ['auth']
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
  plugins: [{
      src: '@/plugins/element-ui',
      ssr: true
    },
    {
      src: '@/plugins/lazyload',
      ssr: false
    },
    '@/plugins/filter',
    {
      src: '~/plugins/commen',
      ssr: false
    },
    {
      src: '@/plugins/suggest',
      ssr: false
    },
    '@/plugins/axios',
    // {
    //   src: '@/plugins/directive',
    //   ssr: false
    // }
  ],

  /*
   ** Nuxt.js modules
   */
  //处理跨域问题
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true
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
    babel: { //配置按需引入规则
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    },
    // npm run build --analyze
    // analyze: true,
    // maxChunkSize: 300000,
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {

    }
  },
  generate: {
    minify: {
      collapseWhitespace: false
    }
  }
}
