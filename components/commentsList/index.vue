<template>
  <div class="news-comments">
    <h3 class="comments-title">最新评论</h3>
    <ul class="comments-list">
      <li class="comments-item" v-for="(comment, index) in comments" :key="index">
        <div class="comments-avatar">
          <img v-lazy="comment.user.user_avatar" alt="avatar" class="user-avatar">
        </div>
        <div class="comments-content">
          <div class="user-name">
            <p class="username">{{ comment.user.user_name }}</p>
            <div class="dianzan">
              <i class="iconfont icon-dianzan"></i>
              <span class="reply-text">点赞</span>
            </div>
          </div>
          <div
            class="content-text"
            style="display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;"
          >{{ comment.content }}</div>
          <div class="create-time" style="padding-top: 5px;">
            <p class="time">{{ comment.create_time }}</p>
            <div class="reply-wrap" @click="handleComments(index)">
              <i class="iconfont icon-custom-comment"></i>
              <span class="reply-text">回复</span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <look-comments :showComments.sync="showComments" :singleComment="singleComment"></look-comments>
  </div>
</template>

<script>
import Colors from "~/plugins/color.js";
import LookComments from "~/components/lookAtComments";
export default {
  data() {
    return {
      colorsArr: Colors.colorName,
      showComments: false,
      singleComment: {
        _id: "",
        article_id: "",
        content: "",
        user: {
          user_id: "",
          user_name: "",
          user_avatar: ""
        },
        create_time: "",
        edit_time: ""
      }
    };
  },
  computed: {
    comments() {
      console.log(this.$store.state.fatherComments, "father");
      return this.$store.state.fatherComments;
    }
  },
  methods: {
    handleComments(index) {
      this.singleComment = Object.assign({}, this.comments[index])
      this.showComments = true;
    }
  },
  mounted() {},
  components: {
    LookComments
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/style/mixins.scss";
.news-comments {
  background: #fff;
  margin-top: 30px;
  padding: 20px;
  box-sizing: border-box;
  transition: 0.5s ease;
  box-sizing: border-box;
  // &:hover {
  //   border-radius: 4px;
  //   box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  //   transform: translateY(-5px);
  //   transition: 0.5s ease;
  // }

  .comments-title {
    font-size: 1pc;
    font-weight: 400;
    color: #333;
    padding: 2px 0 2px 10px;
    border-left: 2px solid #3472ef;
    margin: 0 0 20px 2px;
    height: 25px;
    line-height: 25px;
  }

  .comments-item {
    border-top: 1px solid #ddd;
    // border-bottom: 1px solid #ddd;
    padding: 15px 0;
    position: relative;

    .comments-avatar {
      display: inline-block;

      .user-avatar {
        display: inline-block;
        height: auto;
        vertical-align: top;
        width: 48px;
        border-radius: 4px;
        border: 1px solid #ddd;
      }
    }

    .comments-content {
      position: absolute;
      top: 50%;
      left: 70px;
      transform: translateY(-50%);
      color: #666;
      box-sizing: border-box;

      .user-name {
        font-weight: bold;
        font-size: 14px;
        color: #d32;
        padding-bottom: 5px;
        position: relative;

        .dianzan {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
          color: #666;
        }
      }

      .content-text {
        // @include no-wrap(2);
      }
    }

    .time,
    .reply-wrap {
      display: inline-block;
    }

    .reply-wrap {
      padding-left: 20px;
    }
  }
}

.second-list,
.second-item {
  display: inline-block;
}
</style>
