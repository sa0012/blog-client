<template>
  <section class="container">
    <header-nav></header-nav>
    <el-row class="content">
      <news-articles :isShowTitle="showTitle"></news-articles>
      <el-col :span="24" style="padding-top: 15px;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="1"
        layout="total, prev, pager, next"
        :total="100"
      ></el-pagination>
    </el-col>
    </el-row>
    <net-footer></net-footer>
  </section>
</template>

<script>
import HeaderNav from "~/components/header/header.vue";
import profileTip from "~/components/profile";
import NetFooter from "~/components/footer";

export default {
  data() {
    return {
      showTitle: false
    };
  },
  components: {
    HeaderNav,
    profileTip,
    NetFooter,
    NewsArticles: () => import("~/components/newsArticle"),
    ArticleLabel: () => import("~/components/articleLabel"),
    NewsComments: () => import("~/components/comments"),
    HotArticle: () => import("~/components/hotArticle")
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
  padding-top: 150px;
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

