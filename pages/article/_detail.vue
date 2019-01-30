<template>
  <section class="container">
    <header-nav></header-nav>
    <el-row class="content">
      <bread-nav :navArr="navArr"></bread-nav>
      <article-detail></article-detail>
      <h3 class="comments-title first-title">发表评论</h3>
      <el-col :span="24" style="text-align: left;">
        <message-box></message-box>
      </el-col>
      <el-col :span="24" style="text-align: left;">
        <comments-list></comments-list>
      </el-col>
    </el-row>
    <net-footer></net-footer>
  </section>
</template>

<script>
import HeaderNav from "~/components/header/header.vue";
import NetFooter from "~/components/footer";
import BreadNav from "~/components/breadNav";
import MessageBox from "~/components/messageBox";
import $http from "~/plugins/axios";
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
    this.articleDetail()
    console.log(this.$route, "route");
  },
  components: {
    HeaderNav,
    NetFooter,
    BreadNav,
    MessageBox,
    ArticleDetail: () => import("~/components/articleDetail"),
    CommentsList: () => import("~/components/commentsList")
  },
  methods: {
    articleDetail() {
      $http.post("/article/findOneArticle", { _id: this.articleId }).then(res => {
        // console.log(res);
      });
    },
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
  text-align: center;

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

