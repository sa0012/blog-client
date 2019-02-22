<template>
  <section class="container">
    <el-row class="content">
      <bread-nav :navArr="navArr"></bread-nav>
      <news-articles :isShowTitle="showTitle" :showPag="showPag"></news-articles>
    </el-row>
  </section>
</template>

<script>
import BreadNav from "~/components/breadNav";
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
          title: "文章",
          route: "/article"
        }
      ]
    };
  },
  components: {
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

