<template>
  <div class="news-article">
    <h2 class="news-title" v-if="isShowTitle">推荐文章</h2>
    <ul class="news-list">
      <li class="news-item" v-for="(news, index) in articles" :key="index">
        <el-row>
          <el-col>
            <div class="news-image-wrap">
              <img v-lazy="image" alt class="news-image">
            </div>
          </el-col>
          <el-col class="news-user-wrap" style="padding-left: 200px;">
            <h3 class="item-title">{{ news.title }}</h3>
            <div class="item-userinfo">
              <div class="avatar-wrap">
                <img v-lazy="news.user.user_avatar" alt class="avatar-image">
              </div>
              <div class="item-username">{{ news.user.user_name }}</div>
              <div class="item-created-time">发布时间： {{ news.created_time }}</div>
              <div class="item-category">分类： {{ news.category }}</div>
            </div>
            <p
              class="item-desc no-many-wrap"
              style="display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;"
            >{{ news.desc }}</p>
            <div class="item-footer">
              <div class="bd-count" style="padding-right: 15px;">
                <i class="iconfont icon-count count-icon"></i>
                <span>{{ news.browser_count }}次浏览</span>
              </div>
              <div class="bd-count">
                <i class="iconfont icon-custom-comment count-icon"></i>
                <span>{{ news.comments_count }}条评论</span>
              </div>
              <nuxt-link :to="'/article/' + news._id">
                <el-button type="primary" size="mini" class="read-btn">阅读全文</el-button>
              </nuxt-link>
            </div>
          </el-col>
        </el-row>
      </li>
    </ul>
    <el-col :span="24" style="padding-top: 15px;" v-if="showPag && pagination.total > 0">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="1"
        layout="total, prev, pager, next"
        :total="pagination.page"
      ></el-pagination>
    </el-col>
  </div>
</template>

<script>
import $http from "~/plugins/axios";
import $ from "~/utils";
export default {
  props: {
    isShowTitle: {
      type: Boolean,
      default: true
    },
    showPag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      image: require("~/assets/image/case.jpg"),
      articles: [
        {
          _id: "",
          image: '',
          title: "",
          user: {
            avatar: '',
            user_name: "",
            address: null,
          },
          created_time: "",
          category: "",
          browse: "",
          commentCount: "",
          desc: ''
        }
      ],
      config: {
        size: 10,
        page: 1
      },
      pagination: {
        page: 0,
        size: 0,
        total: 0
      },
      tagName: ""
    };
  },
  created() {
    try {
      this.tagName = this.$route.query.name;
      if (this.tagName) {
        this.labelToArticle(this.tagName);
      } else {
        this.getArticleList();
      }
    } catch (e) {}
  },
  methods: {
    getArticleList() {
      let type = 'hot'
      if (this.showPag) {
        type = 'getArticle'
      }
      $http.post(`/article/${type}`, this.config).then(res => {
        try {
          let list = res.data.list && res.data.list.length ? res.data.list : [];
          list.forEach((article, index) => {
            list[index].create_time = $.timeFormat(article.create_time - 0);
            list[index].edit_time = $.timeFormat(article.edit_time - 0);
          });
          if (!this.showPag) {
            this.$store.dispatch('HOT_ARTICLE', res.data.list);
          }
          this.articles = res.data.list;
        } catch (e) {}
        this.pagination = res.data.pagination;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.config.page = val;
      this.getArticleList();
    },
    labelToArticle(tagName) {
      $http.get("/tag/queryArticle", { tag_name: tagName }).then(res => {
        try {
          let list = res.data && res.data.length ? res.data : [];
          list.forEach((article, index) => {
            list[index].create_time = $.timeFormat(article.create_time - 0);
            list[index].edit_time = $.timeFormat(article.edit_time - 0);
          });
          this.articles = res.data;
        } catch (e) {}
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~/assets/style/mixins.scss";
.news-article {
  // padding-top: 30px;
  // width: 70%;

  h2.news-title {
    font-size: 1pc;
    font-weight: 400;
    color: #333;
    padding: 2px 0 2px 10px;
    border-left: 2px solid #3472ef;
    margin: 20px 0 20px 2px;
    height: 25px;
    line-height: 25px;
  }

  .news-item {
    background: #fff;
    padding: 15px;
    margin-bottom: 15px;
    transition: 0.5s ease;
    &:hover {
      border-radius: 4px;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
      transform: translateY(-5px);
      transition: 0.5s ease;
    }

    .news-image {
      vertical-align: middle;
      width: 180px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .item-title {
      margin-bottom: 5px;
      color: #3d3d3d;
      font-size: 16px;
      font-weight: bold;
    }

    .item-userinfo {
      color: #666;
      padding-bottom: 5px;

      .avatar-wrap {
        > .avatar-image {
          width: 30px;
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

    .item-desc {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }

    .item-footer {
      padding-top: 5px;
      position: relative;

      .bd-count {
        display: inline-block;
        padding: 5px 0;

        .count-icon {
          font-size: 20px;
          vertical-align: middle;
        }
      }

      .read-btn {
        float: right;
      }
    }
  }
}
</style>
