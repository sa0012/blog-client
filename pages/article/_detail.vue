<template>
  <section class="container">
    <el-row class="content">
      <bread-nav :navArr="navArr"></bread-nav>
      <article-detail :articleId="articleId"></article-detail>
      <el-col :span="12" style="text-align: left;">上一篇</el-col>
      <el-col :span="12" style="text-align: right;">下一篇</el-col>
      <h3 class="comments-title first-title">发表评论</h3>
      <el-col :span="24" style="text-align: left;">
        <comments-list></comments-list>
      </el-col>
    </el-row>
    <nav-tip></nav-tip>
  </section>
</template>

<script>
import BreadNav from "~/components/breadNav";
import NavTip from '~/components/navTip';

export default {
  head() {
    return {
      title: "文章详情",
      meta: [{ hid: "文章详情", name: "文章详情", content: "文章详情" }]
    };
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
      articleId: this.$route.params.detail
    };
  },
  created() {
  },
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
</style>

