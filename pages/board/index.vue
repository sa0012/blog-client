<template>
  <section class="container">
    <el-row class="content">
      <bread-nav :navArr="navArr"></bread-nav>
      <el-col :span="15" class="content-left">
        <!-- <message-box></message-box> -->
        <comments-list :comments="comments"></comments-list>
      </el-col>
      <el-col :span="9" class="content-right">
        <profile-tip :countMes="countMes"></profile-tip>
        <article-label :labelArr="labelArr"></article-label>
        <hot-article :hotArticle="articles"></hot-article>
        <news-comments :comments="comments"></news-comments>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import profileTip from "~/components/profile";
import BreadNav from "~/components/breadNav";
import MessageBox from "~/components/messageBox";
import $ from "~/utils";

export default {
  async asyncData({ $axios, store }) {
    // $axios.$post(`/api/comment/queryCommentList`, {
    //   page: 1,
    //   size: 10,
    //   article_id: route.params.detail
    // });
    let [count, articleList, tags, commentList] = await Promise.all([
      $axios.$get("/api/count/statistical"),
      $axios.$post("/api/article/hot", {
        page: 1,
        size: 10
      }),
      $axios.$get("/api/tag/query"),
      $axios.$post("/api/leave/queryCommentList", {
        page: 1,
        size: 10
      })
    ]);

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
    // let list = res.data.list && res.data.list.length ? res.data.list : [];
    // list.forEach((article, index) => {
    //   list[index].create_time = $.timeFormat(article.create_time - 0);
    //   list[index].edit_time = $.timeFormat(article.edit_time - 0);
    // });
    // store.dispatch('HOT_ARTICLE', res.data.list)
  },
  head() {
    return {
      title: "留言板",
      meta: [{ hid: "留言板", name: "留言板", content: "留言板" }]
    };
  },
  data() {
    return {
      navArr: [
        {
          title: "留言板",
          route: "/board"
        }
      ]
    };
  },
  components: {
    profileTip,
    MessageBox,
    BreadNav,
    CommentsList: () => import("~/components/commentsList"),
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

