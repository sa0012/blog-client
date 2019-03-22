<template>
  <section class="container">
    <el-row class="content">
      <bread-nav :navArr="navArr"></bread-nav>
      <div class="query-content">
        <div class="category">
          <div class="cate-name">分类：</div>
          <section class="cate-tag">
            <el-tag
              size="medium"
              :hit="true"
              @click.native="queryArticle('article', 'ALL', 'name')"
            >ALL</el-tag>
            <el-tag
              size="medium"
              v-for="(cate, cIndex) in categorysArr"
              :key="cIndex"
              @click.native="queryArticle('category', cate.category_name, 'category_name')"
              :hit="true"
            >
              <span>{{ cate.category_name }}</span>
            </el-tag>
          </section>
        </div>
        <div class="category">
          <div class="cate-name">标签：</div>
          <section class="cate-tag">
            <el-tag
              size="medium"
              :hit="true"
              @click.native="queryArticle('article', 'ALL', 'name')"
            >ALL</el-tag>
            <el-tag
              size="medium"
              v-for="(tag, tIndex) in tagsArr"
              @click.native="queryArticle('tag', tag.tag_name, 'tag_name')"
              :key="tIndex"
              :hit="true"
            >
              <span>{{ tag.tag_name }}</span>
            </el-tag>
          </section>
        </div>
      </div>
      <news-articles
        :isShowTitle="showTitle"
        :showPag="showPag"
        :articles="articles"
        :pagination="pagination"
        @propPage="queryPage"
      ></news-articles>
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
  // watchQuery: ["name", "category_name", "tag_name"],
  async asyncData({ app, route }) {
    let queryAllArticle = app.$axios.$post("/api/article/getArticle", {
      page: 1,
      size: 1
    });
    let tagQuery = () => {};
    if (route.query.tag_name) {
     tagQuery = app.$axios.$get(
        `/api/tag/queryArticle?tag_name=${route.query.tag_name}`
      );
    }
    let [tags, categorys, articleList] = await Promise.all([
      app.$axios.$get("/api/tag/query"),
      app.$axios.$get("/api/category/query"),
      route.query.tag_name ? tagQuery : queryAllArticle
    ]);

    return {
      tagsArr: tags,
      categorysArr: categorys,
      articles: !route.query.tag_name ? articleList.list : articleList,
      pagination: !route.query.tag_name ? articleList.pagination : {
        page: 0,
        size: 0,
        total: 0
      },
      navArr: [
        {
          title: "文章",
          route: "/article"
        },
        {
          title: route.query ? route.query[Object.keys(route.query)[0]] : "",
          route: ""
        }
      ]
    };
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
      ],
      tagsArr: [],
      categorysArr: [],
      articles: [],
      pagination: {}
    };
  },
  components: {
    BreadNav,
    NewsArticles: () => import("~/components/newsArticle")
  },
  methods: {
    queryPage(page) {
      this.$axios
        .$post("/api/article/getArticle", {
          page: page,
          size: 1
        })
        .then(res => {
          this.articles = res.list;
          this.pagination = res.pagination;
        });
    },
    queryArticle(type, query, queryType) {
      this.navArr.pop();
      this.navArr.push({
        title: query,
        route: ""
      });
      console.log(this.navArr, "navArr");
      if (type === "article") {
        this.$axios
          .$post("/api/article/getArticle", {
            page: 1,
            size: 1
          })
          .then(res => {
            this.articles = res.list;
            this.pagination = res.pagination;
            this.showPag = true;
          });
      } else {
        this.$axios
          .$get(`/api/${type}/queryArticle?${queryType}=${query}`)
          .then(res => {
            this.articles = res;
            this.showPag = false;
          });
      }
    }
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

.query-content {
  padding-bottom: 20px;
}
.category {
  position: relative;
}

.cate-name {
  position: absolute;
  top: 0;
  left: 0;
  height: 38px;
  line-height: 38px;
  font-size: 16px;
  font-weight: bold;
}

.cate-tag {
  padding-left: 50px;
}

.el-tag {
  color: hsla(0, 0%, 100%, 0.8);
  margin: 5px;
  cursor: pointer;
}

.el-tag:hover {
  opacity: 0.6;
}

.el-tag:nth-child(1n + 0) {
  background: #3f51b5;
}

.el-tag:nth-child(2n + 0) {
  background: #36c978;
}

.el-tag:nth-child(3n + 0) {
  background: #673ab7;
}

.el-tag:nth-child(4n + 0) {
  background: #ce24c6;
}

.el-tag:nth-child(5n + 0) {
  background: #dd5c53;
}

.el-tag:nth-child(6n + 0) {
  background: #00abc0;
}

.el-tag:nth-child(7n + 0) {
  background: #2196f3;
}

.el-tag:nth-child(8n + 0) {
  background: #9408d5;
}

.el-tag:nth-child(9n + 0) {
  background: #34dad4;
}
</style>

