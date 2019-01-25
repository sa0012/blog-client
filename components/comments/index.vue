<template>
  <div class="news-comments">
    <h3 class="comments-title">最新评论</h3>
    <ul class="comments-list" v-for="(item, i) in 10" :key="i">
      <li class="comments-item" v-for="(comment, index) in comments" :key="index">
        <div class="comments-avatar">
          <img v-lazy="comment.user.user_avatar" alt="avatar" class="user-avatar">
        </div>
        <div class="comments-content">
          <div class="user-name">{{ comment.user.user_name }}</div>
          <div
            class="content-text"
            style="display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;"
          >{{ comment.content }}</div>
          <div class="create-time">{{ comment.create_time }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Colors from "~/plugins/color.js";
export default {
  data() {
    return {
      comments: [
        {
          _id: "5c4a6870f6aa8dba3095dafb",
          article_id: "5c3d8268ca6b105455e60b16",
          content:
            "明明是个缺心眼的娃，怎么想法就多呢，五花八门层出不穷，有点佩服自己了。开个淘宝店做业务考学力短期旅行义工旅行穷游咖啡馆。。。。大致的例了这段时间的想法，额，真的不少；但是真正去执行的是哪个",
          user: {
            user_id: "5c3c20482975bdf2f027c822",
            user_name: "sa0012",
            user_avatar: "https://avatars3.githubusercontent.com/u/24355136?v=4"
          },
          create_time: "1548380272142",
          edit_time: "1548380272142"
        }
      ],
      colorsArr: Colors.colorName
    };
  },
  methods: {
    showBackgroundColor() {}
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/style/mixins.scss";
.news-comments {
  background: #fff;
  min-width: 400px;
  margin-top: 30px;
  padding: 20px;
  box-sizing: border-box;
  transition: 0.5s ease;
  &:hover {
    border-radius: 4px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
    transition: 0.5s ease;
  }

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
      }

      .content-text {
        // @include no-wrap(2);
      }
    }
  }
}
</style>
