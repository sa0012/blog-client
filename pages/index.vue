<template>
  <section class="container">
    <el-row class="content">
      <el-col :span="15" class="content-left">
        <el-carousel height="150px">
          <el-carousel-item height="150px" v-for="(item, index) in bannerArr" :key="index">
            <h3>
              <a :href="item.routeUrl" target="_blank">
                <img :src="item.bImgUrl" alt style="width: 100%; height: 100%;">
              </a>
            </h3>
          </el-carousel-item>
        </el-carousel>
        <news-articles :articles="articles"></news-articles>
      </el-col>
      <el-col :span="9" class="content-right">
        <profile-tip :countMes="countMes"></profile-tip>
        <article-label :labelArr="labelArr"></article-label>
        <hot-article :hotArticle="articles"></hot-article>
        <news-comments :comments="comments"></news-comments>
      </el-col>
    </el-row>
    <nav-tip></nav-tip>
  </section>
</template>

<script>
import profileTip from "~/components/profile";
import NavTip from "~/components/navTip";
export default {
  async asyncData({ app }) {
    console.dir(app.$axios, '$axios')
    let [count, articleList, tags, commentList] = await Promise.all([
      app.$axios.$get("/api/count/statistical"),
      app.$axios.$post("/api/article/hot", {
        page: 1,
        size: 10
      }),
      app.$axios.$get("/api/tag/query"),
      app.$axios.$post("/api/leave/queryAll", {
        page: 1,
        size: 10
      })
    ]).catch(err => {
      Promise.reject(err);
    })
    return {
      countMes: count,
      articles: articleList.list,
      pagination: {
        page: 0,
        size: 0,
        total: 0
      },
      labelArr: tags,
      comments: commentList.list
    };
  },
  head() {
    return {
      title: "首页",
      meta: [{ hid: "首页", name: "首页", content: "首页" }]
    };
  },
  data() {
    return {
      imgUrl: require("~/assets/image/client.jpg"),
      bannerArr: [
        {
          bImgUrl: require("~/assets/image/client.jpg"),
          routeUrl: "http://client.juckchen.cn"
        },
        {
          bImgUrl: require("~/assets/image/blog-front.jpg"),
          routeUrl: "http://admin.juckchen.cn"
        },
        {
          bImgUrl: require("~/assets/image/react.jpg"),
          routeUrl: "http://m.juckchen.cn"
        },
        {
          bImgUrl: require("~/assets/image/xiaozhi.jpg"),
          routeUrl: "https://sa0012.github.io/xiaozhi/"
        }
      ],
      articles: [],
      countMes: {},
      labelArr: [],
      comments: [],
      pagination: {}
    };
  },
  components: {
    profileTip,
    NavTip,
    NewsArticles: () => import("~/components/newsArticle"),
    ArticleLabel: () => import("~/components/articleLabel"),
    NewsComments: () => import("~/components/comments"),
    HotArticle: () => import("~/components/hotArticle"),
    WeatherComponent: () => import("~/components/weather")
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
  display: block;
  height: 300px !important;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  height: 300px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

