<template>
  <div class="article-detail">
    <h2 class="article-title">{{ article.title }}</h2>
    <div class="item-userinfo">
      <div class="avatar-wrap">
        <img v-lazy="article.user.user_avatar" alt class="avatar-image">
      </div>
      <div class="item-username">{{ article.user.user_name }}</div>
      <div class="item-created-time">发布时间： {{ article.created_time }}</div>
      <div class="item-created-time" style="padding-left: 15px;">浏览次数： 122次</div>
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
        _id: "acekdiel992882828",
        image: require("~/assets/image/case.jpg"),
        title: "如何建立个人博客？",
        user: {
          user_avatar: require("~/assets/image/car.jpg"),
          user_name: "博客"
        },
        created_time: "2018-06-05 10:24:00",
        category: "前端",
        browse: "154",
        commentCount: "4",
        desc:
          "明明是个缺心眼的娃，怎么想法就多呢，五花八门层出不穷，有点佩服自己了。开个淘宝店做业务考学力短期旅行义工旅行穷游咖啡馆。。。。大致的例了这段时间的想法，额，真的不少；但是真正去执行的是哪个，第一个没有，第二个没，第三个没有，第四个没...............试问自己：如果没有去执行了，如何可以成."
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

