<template>
  <div class="article-detail">
    <h2 class="article-title">{{ article.title }}</h2>
    <div class="item-userinfo">
      <div class="avatar-wrap">
        <img v-lazy="article.user.user_avatar" alt class="avatar-image">
      </div>
      <div class="item-username">{{ article.user.user_name }}</div>
      <div class="item-created-time">发布时间： {{ article.create_time | dateformat }}</div>
      <div class="item-created-time" style="padding-left: 15px;">浏览次数： {{ article.browser_count }}次</div>
      <div class="item-category">分类： {{ article.category }}</div>
    </div>
    <!-- <p class="article-content" v-html="article.article"></p> -->
    <mavon-editor
      class="compile-md"
      v-model="article.article"
      codeStyle="vs2015"
      :toolbarsFlag="toolbarsFlag"
      :subfield="subfield"
      defaultOpen="preview"
      style="    background: #e7e7e7;"
    ></mavon-editor>
  </div>
</template>

<script>
import $http from "~/plugins/axios";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  props: {
    articleId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      toolbarsFlag: false,
      subfield: false,
      article: {
        _id: "",
        image: '',
        title: "",
        user: {
          user_avatar: '',
          user_name: "",
          address: null
        },
        create_time: "",
        category: "",
        browse: "",
        commentCount: "",
        desc: ""
      }
    };
  },
  computed: {
    currentHeight() {
      return (
        (document.body.clientHeight ||
          document.documentElement.clientHeight ||
          0) -
        100 +
        "px"
      );
    }
  },
  created() {
    this.articleDetail();
  },
  methods: {
    articleDetail() {
      $http
        .post("/article/findOneArticle", { _id: this.$route.params.detail })
        .then(res => {
          this.article = Object.assign({}, res.data);
        });
    }
  },
  components: {
    mavonEditor
  }
};
</script>

<style lang="scss" scoped>
.article-title {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 30px;
}
.item-userinfo {
  color: #666;
  padding-bottom: 15px;

  .avatar-wrap {
    > .avatar-image {
      width: 30px;
      border-radius: 1000px;
      vertical-align: middle;
    }
  }

  .item-username,
  .item-created-time,
  .item-category,
  .avatar-wrap {
    display: inline-block;
  }

  .item-username {
    padding: 0 10px;
  }

  .item-category {
    padding-left: 15px;
  }
}
</style>

<style scoped>
.v-note-wrapper {
  z-index: 222;
}
</style>

<style>
.v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  background: #e7e7e7 !important;
}

.v-note-wrapper .v-note-panel.shadow {
    box-shadow: none !important;
}
</style>


