<template>
  <section class="container">
    <el-row class="content">
      <bread-nav :navArr="navArr"></bread-nav>
      <article-detail :article="article"></article-detail>
      <!-- <el-row>
        <el-col class="history" :span="12" style="text-align: left;">
          <nuxt-link
            :to="'/article/' + bsHistory.prev.id"
            v-show="bsHistory.prev.id"
          >上一篇: {{ bsHistory.prev.title }}</nuxt-link>
        </el-col>
        <el-col class="history" :span="12" style="text-align: right;">
          <nuxt-link
            :to="'/article/' + bsHistory.next.id"
            v-show="bsHistory.next.id"
          >下一篇: {{ bsHistory.next.title }}</nuxt-link>
        </el-col>
      </el-row> -->
      <!-- <h3 class="comments-title first-title">发表评论</h3>
      <el-col :span="24" style="text-align: left;">
        <comments-list :comments="comments"></comments-list>
      </el-col> -->
    </el-row>
    <nav-tip></nav-tip>
  </section>
</template>

<script>
import BreadNav from "~/components/breadNav";
import NavTip from "~/components/navTip";
// import { getLocal } from "~/common/mutils";

export default {
  head() {
    return {
      title: "文章详情",
      meta: [{ hid: "文章详情", name: "文章详情", content: "文章详情" }]
    };
  },
  async asyncData({ $axios, route }) {
    let [articleDetail, comments] = await Promise.all([
      $axios.$post("/api/article/findOneArticle", { _id: route.params.detail }),
      $axios.$post(`/api/comment/queryCommentList`, {
        page: 1,
        size: 5,
        article_id: route.params.detail
      })
    ]);

    return {
        article: articleDetail,
        comments: comments.list
      }
  },
  data() {
    return {
      navArr: [
        {
          title: "文章",
          route: "/article"
        },
        {
          title: "文章详情",
          route: this.$route.path
        }
      ],
      article: {}
    };
  },
  computed: {
    bsHistory() {
      // return JSON.parse(getLocal("browser_history"));
    }
  },
  created() {},
  components: {
    BreadNav,
    NavTip,
    ArticleDetail: () => import("~/components/articleDetail"),
    CommentsList: () => import("~/components/commentsList")
  },
  methods: {
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
  text-align: center;
  padding-bottom: 150px;

  .content-right {
    padding-left: 30px;
    box-sizing: border-box;
  }
}

.comments-title {
  text-align: left;
  background: #ccc;
  color: #666;
}

.history {
  height: 30px;
  line-height: 30px;
}
</style>

