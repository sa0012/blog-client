<template>
  <section class="container">
    <el-row class="content">
      <el-col :span="15" class="content-left">
        <el-carousel height="150px">
          <el-carousel-item v-for="(item, index) in bannerArr" :key="index">
            <h3>
              <a :href="item.routeUrl" target="_blank">
                <img :src="item.bImgUrl" alt="" style="width: 100%;">
              </a>
            </h3>
          </el-carousel-item>
        </el-carousel>
        <news-articles></news-articles>
      </el-col>
      <el-col :span="9" class="content-right">
        <profile-tip></profile-tip>
        <!-- <weather-component></weather-component> -->
        <article-label></article-label>
        <hot-article></hot-article>
        <news-comments></news-comments>
      </el-col>
    </el-row>
    <nav-tip></nav-tip>
  </section>
</template>

<script>
import profileTip from "~/components/profile";
import NavTip from '~/components/navTip';

export default {
  head () {
    return {
      title: '首页',
      meta: [
        { hid: '首页', name: '首页', content: '首页' }
      ]
    }
  },
  data() {
    return {
      bannerArr: [
        {
          bImgUrl: require('~/assets/image/client.jpg'),
          routeUrl: 'http://client.juckchen.cn'
        },
        {
          bImgUrl: require('~/assets/image/blog-front.jpg'),
          routeUrl: 'http://admin.juckchen.cn'
        },
        {
          bImgUrl: require('~/assets/image/react.jpg'),
          routeUrl: 'http://m.juckchen.cn'
        },
        {
          bImgUrl: require('~/assets/image/xiaozhi.jpg'),
          routeUrl: 'https://sa0012.github.io/xiaozhi/'
        },
      ]
    }
  },
  components: {
    profileTip,
    NavTip,
    NewsArticles: () => import('~/components/newsArticle'),
    ArticleLabel: () => import('~/components/articleLabel'),
    NewsComments: () => import('~/components/comments'),
    HotArticle: () => import('~/components/hotArticle'),
    WeatherComponent: () => import('~/components/weather'),
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100%;
  height: auto;
}

.content {
  width: 80%;
  padding-top: 170px;
  position: relative;
  margin: 0 auto;
  padding-bottom: 150px;

  .content-right {
    padding-left: 30px;
    box-sizing: border-box;
  }
}

</style>

<style>
.el-carousel {
  width: 100%;
  height: 300px !important;
}

.el-carousel__item,
.el-carousel__container {
  height: 300px !important;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  /* width: 80%; */
  height: 300px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

