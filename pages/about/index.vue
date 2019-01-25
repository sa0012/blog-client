<template>
  <section class="container">
    <header-nav></header-nav>
    <div class="content">
      <!-- <div class="content-left">
        <el-carousel height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <news-articles></news-articles>
      </div>
      <div class="content-right">
        <profile-tip></profile-tip>
        <article-label></article-label>
      </div> -->
    </div>
    <net-footer></net-footer>
  </section>
</template>

<script>
import HeaderNav from "~/components/header/header.vue";
import profileTip from "~/components/profile";
import NetFooter from '~/components/footer';

export default {
  components: {
    HeaderNav,
    profileTip,
    NetFooter,
    NewsArticles: () => import('~/components/newsArticle'),
    ArticleLabel: () => import('~/components/articleLabel'),
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

  .content-left {
    // width: 60%;
  }

  .content-right {
    width: 30%;
    position: absolute;
    right: 0;
    top: 170px;
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
  width: 70%;
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

