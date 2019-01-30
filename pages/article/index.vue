<template>
  <section class="container">
    <header-nav></header-nav>
    <el-row class="content">
      <bread-nav :navArr="navArr"></bread-nav>
      <news-articles :isShowTitle="showTitle" :showPag="showPag"></news-articles>
    </el-row>
    <net-footer></net-footer>
  </section>
</template>

<script>
import HeaderNav from "~/components/header/header.vue";
import NetFooter from "~/components/footer";
import BreadNav from "~/components/breadNav";
// import $http from '~/plugin/axios';
export default {
  head() {
    return {
      title: "文章",
      meta: [{ hid: "文章", name: "文章", content: "文章" }]
    };
  },
  asyncData(context) {
    // return $http.post('/article/findOneArticle').then
  },
  data() {
    return {
      showTitle: false,
      showPag: true,
      navArr: [
        {
          title: '文章',
          route: '/article'
        }
      ]
    };
  },
  components: {
    HeaderNav,
    NetFooter,
    BreadNav,
    NewsArticles: () => import("~/components/newsArticle")
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
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

