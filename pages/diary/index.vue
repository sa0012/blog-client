<template>
  <section class="container">
    <el-row class="content">
      <bread-nav :navArr="navArr"></bread-nav>
      <time-line :classifyObj="classifyObj" :timeNav="timeNav" :selectIndex.sync="selectIndex"></time-line>
    </el-row>
    <nav-tip></nav-tip>
  </section>
</template>

<script>
import BreadNav from "~/components/breadNav";
import NavTip from '~/components/navTip';
import $http from "~/plugins/axios";
import $ from "~/utils";

export default {
  head() {
    return {
      title: "随笔杂谈",
      meta: [{ hid: "随笔杂谈", name: "随笔杂谈", content: "随笔杂谈" }]
    };
  },
  data() {
    return {
      classifyObj: {
        _id: "",
        tags: [],
        article: "",
        draft: "",
        likes: 0,
        browser_count: 0,
        comments_count: 0,
        user_id: "",
        category: "",
        title: "",
        desc: "",
        author: "",
        user: {
          user_name: "",
          user_avatar: ""
        },
        create_time: "",
        edit_time: "",
        __v: 0
      },
      timeNav: [],
      selectIndex: "",
      navArr: [
        {
          title: "文章归类",
          route: "/diary"
        }
      ]
    };
  },
  methods: {
    handleClassifyQuery() {
      $http.get("/article/classifyQuery").then(res => {
        this.classifyObj = Object.assign({}, res.data);
        if (process.env.NODE_ENV === "development") {
          for (var i = 0; i < 5; i++) {
            this.classifyObj[2019 - i] = this.classifyObj["2019"];
          }
        }

        this.timeNav = Object.keys(this.classifyObj).sort($.Descending);
        this.selectIndex = this.timeNav[0];
      });
    }
  },
  created() {
    this.handleClassifyQuery();
  },
  components: {
    BreadNav,
    NavTip,
    TimeLine: () => import("~/components/timeLine")
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

