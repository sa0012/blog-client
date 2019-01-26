<template>
  <section class="container">
    <header-nav></header-nav>
    <el-row class="content">
      <el-col :span="15" class="content-left">
        <message-box></message-box>
      </el-col>
      <el-col :span="9" class="content-right">
        <profile-tip></profile-tip>
        <article-label></article-label>
        <hot-article></hot-article>
        <news-comments></news-comments>
      </el-col>
    </el-row>
    <net-footer></net-footer>
  </section>
</template>

<script>
import HeaderNav from "~/components/header/header.vue";
import profileTip from "~/components/profile";
import NetFooter from "~/components/footer";
import MessageBox from '~/components/messageBox';

export default {
  head() {
    return {
      title: "留言板",
      meta: [{ hid: "留言板", name: "留言板", content: "留言板" }]
    };
  },
  components: {
    HeaderNav,
    profileTip,
    NetFooter,
    MessageBox,
    NewsArticles: () => import("~/components/newsArticle"),
    ArticleLabel: () => import("~/components/articleLabel"),
    NewsComments: () => import("~/components/comments"),
    HotArticle: () => import("~/components/hotArticle")
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

