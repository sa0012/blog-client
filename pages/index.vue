<template>
  <section class="container">
    <header-nav></header-nav>
    <el-row class="content">
      <el-col :span="15" class="content-left">
        <el-carousel height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <news-articles></news-articles>
      </el-col>
      <el-col :span="9" class="content-right">
        <profile-tip></profile-tip>
        <article-label></article-label>
        <hot-article></hot-article>
        <news-comments></news-comments>
      </el-col>
    </el-row>
    <net-footer></net-footer>
    <nav-tip></nav-tip>
    <!-- <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: green; z-index: 3333;"></div> -->
    <!-- <login-component ></login-component> -->
  </section>
</template>

<script>
import HeaderNav from "~/components/header/header.vue";
import profileTip from "~/components/profile";
import NetFooter from '~/components/footer';
import NavTip from '~/components/navTip';
// import LoginComponent from '~/components/login';

export default {
  head () {
    return {
      title: '首页',
      meta: [
        { hid: '首页', name: '首页', content: '首页' }
      ]
    }
  },
  components: {
    HeaderNav,
    profileTip,
    NetFooter,
    NavTip,
    // LoginComponent,
    NewsArticles: () => import('~/components/newsArticle'),
    ArticleLabel: () => import('~/components/articleLabel'),
    NewsComments: () => import('~/components/comments'),
    HotArticle: () => import('~/components/hotArticle'),
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100%;
}

.content {
  width: 80%;
  padding-top: 170px;
  position: relative;
  margin: 0 auto;

  .content-right {
    padding-left: 30px;
    box-sizing: border-box;
  }
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
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

