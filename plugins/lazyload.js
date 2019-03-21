import Vue from 'vue';
import VueLazyload from 'vue-lazyload'

export default () => {
  // or with options
  Vue.use(VueLazyload, {
    preLoad: 1.3, //预加载的宽高比
    error: require('~/assets/image/loading.gif'), //图片加载失败时使用的图片源
    loading: require('~/assets/image/loading.gif'), //图片加载的路径
    attempt: 1 //尝试加载次数
  })
}
