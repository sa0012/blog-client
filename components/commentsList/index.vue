<template>
  <div class="comment-root">
    <div style="text-align: left;">
      <message-box :publish="startComment"></message-box>
    </div>
    <div class="news-comments" v-if="comments.length > 0">
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
                <i
                  class="iconfont icon-dianzan"
                  @click="handleLikes(index)"
                  :style="{ 'color': userMsg._id && ((comment.user.user_id === userMsg._id && comment.user.isLike) || (comment.user.user_id !== userMsg._id && comment.reply_like)) ? 'red' : '#666' }"
                ></i>
                <span class="reply-text">{{ comment.likes }}</span>
              </div>
            </div>
            <div
              class="content-text"
              style="display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;"
              v-html="comment.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"
            ></div>
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

      <look-comments
        :showComments.sync="showComments"
        v-if="showComments"
        @updateComment="handleUpdate"
      ></look-comments>
    </div>
    <div class="no-comment" v-else>暂无评论， 快去抢沙发吧</div>
  </div>
</template>

<script>
import Colors from "~/plugins/color.js";
import LookComments from "~/components/lookAtComments";
import MessageBox from "~/components/messageBox";
import $http from "~/plugins/axios";
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
          user_avatar: "",
          isLike: false
        },
        reply_like: false,
        isWhoLike: "ME",
        likes: 0,
        create_time: "",
        edit_time: ""
      },
      commentList: {
        article_id: this.$route.params.detail,
        content: "",
        user: {
          user_id: "",
          user_name: "",
          user_avatar: "",
          isLike: false
        }
      },
      queryFatherComment: {
        page: 1,
        size: 10,
        article_id: ""
      },
      comments: [
        {
          _id: "",
          article_id: "",
          content: "",
          user: {
            user_id: "",
            user_name: "",
            user_avatar: "",
            isLike: false
          },
          create_time: "",
          edit_time: "",
          likes: 0,
          reply_like: false,
          isWhoLike: "ME"
        }
      ],
      cIndex: 0,
      isLike: false,
      isWho: "ME",
      replyLike: false
    };
  },
  computed: {
    userMsg() {
      return this.$store.state.user;
    },
    loginMsg() {
      return this.$store.state.login;
    }
  },
  methods: {
    handleUpdate() {
      this.queryCommentList();
    },
    startComment(content) {
      const config = {
        article_id: this.$route.params.detail,
        content: content,
        user: {
          user_id: this.userMsg._id,
          user_name: this.userMsg.user_id,
          user_avatar: this.userMsg.avatar
        },
        reply_like: false,
        isWhoLike: "ME"
      };
      $http.post("/comment/saveComment", config).then(res => {
        console.log(res);
        if (res.data === "SUCCESS") {
          this.queryCommentList();
        }
      });
    },
    queryCommentList() {
      this.queryFatherComment.article_id = this.$route.params.detail;
      $http
        .post("/comment/queryCommentList", this.queryFatherComment)
        .then(res => {
          this.comments = res.data.list;
          this.$emit("throwComments", this.comments);
          // this.$store.dispatch("FATHER_COMMENTS", this.comments);
        });
    },
    handleLikes(index) {
      // 自己为自己点赞
      if (this.userMsg._id === this.comments[index].user.user_id) {
        this.isWho = "ME";
        this.isLike = this.comments[index].user.isLike;
        this.isLike = !this.isLike;
        this.replyLike = false;
      } else {
        // 自己对别人的评论点赞
        console.log(this.replyLike, "自己对别人");
        this.replyLike = !this.replyLike;
        this.isWho = "YOU";
        this.isLike = false;
      }

      let config = {
        article_id: this.comments[index].article_id,
        _id: this.comments[index]._id,
        isWhoLike: this.isWho,
        reply_like: this.replyLike,
        user: {
          user_id: this.comments[index].user.user_id,
          user_name: this.comments[index].user.user_name,
          user_avatar: this.comments[index].user.user_avatar,
          isLike: this.isLike
        }
      };

      console.log(config, "config");

      $http.post("/comment/confirmLikes", config).then(res => {
        this.queryCommentList();
      });
    },
    handleComments(index) {
      this.singleComment = Object.assign({}, this.comments[index]);
      this.$store.dispatch("SINGLE_COMMENT", this.singleComment).then(res => {
        this.showComments = true;
      });
    },
    // 将匹配结果替换表情图片
    emotion(res) {
      let word = res.replace(/\#|\;/gi, "");
      const list = [
        "微笑",
        "撇嘴",
        "色",
        "发呆",
        "得意",
        "流泪",
        "害羞",
        "闭嘴",
        "睡",
        "大哭",
        "尴尬",
        "发怒",
        "调皮",
        "呲牙",
        "惊讶",
        "难过",
        "酷",
        "冷汗",
        "抓狂",
        "吐",
        "偷笑",
        "可爱",
        "白眼",
        "傲慢",
        "饥饿",
        "困",
        "惊恐",
        "流汗",
        "憨笑",
        "大兵",
        "奋斗",
        "咒骂",
        "疑问",
        "嘘",
        "晕",
        "折磨",
        "衰",
        "骷髅",
        "敲打",
        "再见",
        "擦汗",
        "抠鼻",
        "鼓掌",
        "糗大了",
        "坏笑",
        "左哼哼",
        "右哼哼",
        "哈欠",
        "鄙视",
        "委屈",
        "快哭了",
        "阴险",
        "亲亲",
        "吓",
        "可怜",
        "菜刀",
        "西瓜",
        "啤酒",
        "篮球",
        "乒乓",
        "咖啡",
        "饭",
        "猪头",
        "玫瑰",
        "凋谢",
        "示爱",
        "爱心",
        "心碎",
        "蛋糕",
        "闪电",
        "炸弹",
        "刀",
        "足球",
        "瓢虫",
        "便便",
        "月亮",
        "太阳",
        "礼物",
        "拥抱",
        "强",
        "弱",
        "握手",
        "胜利",
        "抱拳",
        "勾引",
        "拳头",
        "差劲",
        "爱你",
        "NO",
        "OK",
        "爱情",
        "飞吻",
        "跳跳",
        "发抖",
        "怄火",
        "转圈",
        "磕头",
        "回头",
        "跳绳",
        "挥手",
        "激动",
        "街舞",
        "献吻",
        "左太极",
        "右太极"
      ];
      let index = list.indexOf(word);
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`;
    }
  },
  mounted() {
    this.queryCommentList();
  },
  components: {
    LookComments,
    MessageBox
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
    padding: 20px 0;
    position: relative;

    .comments-avatar {
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
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
      padding-left: 70px;
      box-sizing: border-box;
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

.no-comment {
  text-align: center;
  color: #666;
  padding: 10px 0;
}

.second-list,
.second-item {
  display: inline-block;
}
</style>

<style>
.content-text section img {
  width: 150px;
  object-fit: fill;
}
</style>
