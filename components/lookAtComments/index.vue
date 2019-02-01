<template>
  <div class="fillcontain category" ref="category" v-if="showComments">
    <section class="category-wrap">
      <div class="top-title">
        <h3 class="category-title">{{ replyComments.length }}条回复</h3>
        <i class="el-icon-close close-icon" @click="close"></i>
      </div>

      <div class="comments-wrap">
        <ul class="comments-list">
          <li class="comments-item" style="border-style: none;">
            <div class="comments-avatar">
              <img v-lazy="singleComment.user.user_avatar" alt="avatar" class="user-avatar">
            </div>
            <div class="comments-content">
              <div class="user-name">
                <p class="username">{{ singleComment.user.user_name }}</p>
                <div class="dianzan">
                  <i
                    class="iconfont icon-dianzan"
                    @click="handleLikes"
                    :style="{ 'color': userMsg._id && ((singleComment.user.user_id === userMsg._id && singleComment.user.isLike) || (singleComment.user.user_id !== userMsg._id && singleComment.reply_like)) ? 'red' : '#666' }"
                  ></i>
                  <span class="reply-text">{{ singleComment.likes }}</span>
                </div>
              </div>
              <div
                class="content-text"
                v-html="singleComment.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"
              ></div>
              <div class="create-time" style="padding-top: 5px;">
                <p class="time">{{ singleComment.create_time }}</p>
                <div class="answer-wrap" @click="handleComments(singleComment, 'author', 'main')">
                  <i class="iconfont icon-custom-comment"></i>
                  <span class="reply-text">回复</span>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <ul class="other-list" v-if="replyComments.length > 0">
          <li class="comments-item" v-for="(reply, index) in replyComments" :key="index">
            <div class="comments-avatar">
              <img v-lazy="reply.user.user_avatar" alt="avatar" class="user-avatar">
            </div>
            <div class="comments-content">
              <div class="user-name">
                <p class="username">
                  <span @click="handleComments(reply, 'author', 'me')">{{ reply.user.user_name }}</span>
                  <span style="color: #000;">回复</span>
                  <span
                    @click="handleComments(reply, 'reply', 'you')"
                  >{{ reply.reply_to_user.user_name }}</span>
                </p>
                <div class="dianzan">
                  <i
                    class="iconfont icon-dianzan"
                    @click="handleReplyLikes(reply)"
                    :style="{ 'color': userMsg._id && ((reply.user.user_id === userMsg._id && reply.user.isLike) || (reply.user.user_id !== userMsg._id && reply.reply_like)) ? 'red' : '#666' }"
                  ></i>
                  <span class="reply-text">{{ reply.likes }}</span>
                </div>
              </div>
              <div
                class="content-text"
                v-html="reply.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"
              ></div>
              <div class="create-time" style="padding-top: 5px;">
                <p class="time">{{ reply.create_time }}</p>
                <div class="answer-wrap" @click="handleComments(reply, 'reply')">
                  <i class="iconfont icon-custom-comment"></i>
                  <span class="reply-text">回复</span>
                </div>
                <div class="reply-delete answer-wrap" v-if="userMsg._id === reply.user.user_id">
                  <i class="el-icon-delete"></i>
                  <span>删除</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <el-row class="reply-wrap">
        <el-col :span="20" style="position: relative;">
          <textarea class="text" rows="5" v-model="content" ref="input"></textarea>
          <i class="iconfont icon-smile emoji-icon" @click="showEmoji = !showEmoji"></i>
        </el-col>
        <el-button style="margin-left: 20px;" @click="publish()">发布</el-button>
        <emoji-component
          v-show="showEmoji"
          @emotion="handleEmotion"
          :height="200"
          style="width: 300px;"
          class="emoji-cop"
        ></emoji-component>
      </el-row>
    </section>
  </div>
</template>

<script>
import EmojiComponent from "~/components/emoji";
import $http from "~/plugins/axios";
export default {
  props: {
    showComments: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      labelPosition: "left",
      replyComments: [
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
          reply_to_user: {
            user_id: "",
            user_name: "",
            user_avatar: "",
            isLike: false
          },
          isWhoLike: "ME",
          reply_like: false,
          create_time: "",
          edit_time: ""
        }
      ],
      childComment: {
        comment_id: "",
        user: {
          user_id: "",
          user_name: "",
          user_avatar: "",
          isLike: false
        },

        // 被评论人信息
        reply_to_user: {
          user_name: "",
          user_id: "",
          user_avatar: "",
          isLike: false
        },
        isWhoLike: "ME",
        reply_like: false,
        //评论内容
        content: ""
      },
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      queryReplyComment: {
        page: 1,
        size: 10,
        comment_id: ""
      },
      content: "",
      comment: "",
      showEmoji: false,
      isFocus: true,
      commentId: "",
      commentType: "author",
      reply_user: {
        user_avatar: "",
        user_id: "",
        user_name: "",
        isLike: false
      },
      reply_content: "",
      isMain: "main",

      isLike: false,
      isWho: "ME",
      replyLike: false,

      isReplyLike: false,
      isReplyWho: "ME",
      replyLikeReply: false
    };
  },
  computed: {
    userMsg() {
      return this.$store.state.user;
    },
    singleComment() {
      this.reply_user = Object.assign({}, this.$store.state.everyOne.user);
      return this.$store.state.everyOne;
    }
  },
  watch: {
    showComments(newVal, oldVal) {
      if (newVal) {
      }
    }
  },
  created() {
    this.queryReplyCommentsList(this.singleComment._id);
    this.commentId = this.singleComment._id;
    console.log(this.singleComment, "single");
  },
  methods: {
    publish() {
      const config = {
        comment_id: this.singleComment._id,
        user: {
          user_id: this.userMsg._id,
          user_name: this.userMsg.user_id,
          user_avatar: this.userMsg.avatar
        },

        // 被评论人信息
        reply_to_user: this.reply_user,
        //评论内容
        content:
          this.commentType === "author" && this.isMain === "main"
            ? this.content
            : this.content +
              ` // ` +
              "<span>" +
              "@" +
              this.reply_user.user_name +
              ":" +
              "</span>" +
              ` ${this.reply_content}`,
        article_id: this.singleComment.article_id
      };

      $http.post("/comment/replySave", config).then(res => {
        if (res.data === "SUCCESS") {
          this.$refs["input"].blur();
          this.commentType = "author";
          this.queryReplyCommentsList(config.comment_id);
        }
      });
    },
    handleLikes() {
      // 自己为自己点赞
      if (this.userMsg._id === this.singleComment.user.user_id) {
        this.isWho = "ME";
        this.isLike = this.singleComment.user.isLike;
        this.isLike = !this.isLike;
        this.replyLike = false;
      } else {
        // 自己对别人的评论点赞
        console.log(this.replyLike, "自己对别人");
        this.replyLike = this.singleComment.reply_like;
        this.replyLike = !this.replyLike;
        this.isWho = "YOU";
        this.isLike = false;
      }

      let config = {
        article_id: this.singleComment.article_id,
        _id: this.singleComment._id,
        isWhoLike: this.isWho,
        reply_like: this.replyLike,
        user: {
          user_id: this.singleComment.user.user_id,
          user_name: this.singleComment.user.user_name,
          user_avatar: this.singleComment.user.user_avatar,
          isLike: this.isLike
        }
      };

      console.log(config, "config_reply");

      $http.post("/comment/confirmLikes", config).then(res => {
        this.$store.dispatch("SINGLE_COMMENT", res.data);
      });
    },
    handleReplyLikes(reply) {
      // let like = reply.user.isLike;
      // like = !like;
      // const config = {
      //   comment_id: reply.comment_id,
      //   _id: reply._id,
      //   user: {
      //     user_id: reply.user.user_id,
      //     user_name: reply.user.user_name,
      //     user_avatar: reply.user.user_avatar,
      //     isLike: like
      //   }
      // };

      // 自己为自己点赞
      if (this.userMsg._id === reply.user.user_id) {
        this.isReplyWho = "ME";
        this.isReplyLike = reply.user.isLike;
        this.isReplyLike = !this.isReplyLike;
        this.replyLike = false;
      } else {
        // 自己对别人的评论点赞
        console.log(this.replyLike, "自己对别人");
        this.replyLikeReply = reply.reply_like;
        this.replyLikeReply = !this.replyLikeReply;
        this.isReplyWho = "YOU";
        this.isReplyLike = false;
      }

      let config = {
        comment_id: reply.comment_id,
        _id: reply._id,
        isWhoLike: this.isReplyWho,
        reply_like: this.replyLikeReply,
        user: {
          user_id: reply.user.user_id,
          user_name: reply.user.user_name,
          user_avatar: reply.user.user_avatar,
          isLike: this.isReplyLike
        }
      };

      console.log(config, "config_reply_config");

      $http.post("/comment/ReplyLikes", config).then(res => {
        this.queryReplyCommentsList(config.comment_id);
      });
    },
    queryReplyCommentsList(id) {
      this.queryReplyComment.comment_id = id;
      $http
        .post("/comment/queryReleyCommentsList", this.queryReplyComment)
        .then(res => {
          this.replyComments = res.data.list;
        });
    },
    close() {
      this.$emit("update:showComments", false);
      this.$emit("updateComment");
    },
    handleComments(info, type, mainType) {
      console.log(info, "info");
      this.$refs["input"].focus();
      this.commentType = type;
      this.reply_content = info.content;
      this.isMain = mainType;
      if (type === "author") {
        this.reply_user = Object.assign({}, info.user);
      } else {
        this.reply_user = Object.assign({}, info.reply_to_user);
      }
    },
    handleEmotion(i) {
      this.content += i;
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
    this.$nextTick(() => {
      this.$refs["input"].focus();
    });
  },
  components: {
    EmojiComponent
  }
};
</script>

<style lang="scss" scoped>
.category {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 444;

  .category-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 80%;
    max-height: 90%;
    padding: 14px;
    padding-top: 0;
    border-radius: 5px;
    z-index: 4445;
    animation: slide 0.5s ease-out;

    .top-title {
      background: #ffffff;
      border-bottom: 1px solid #f6f6f6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      position: relative;
    }

    .category-title {
      padding-left: 20px;
      display: inline-block;
      font-size: 18px;
    }

    .close-icon {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      transition: all 0.5s ease;
      font-size: 24px;

      &:hover {
        // transform: rotateZ(-180deg);
        color: #ccc;
      }
    }
  }
}
.comments-wrap {
  max-height: calc(100vh * 0.9 - 120px);
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
}
.comments-item {
  border-top: 1px solid #ddd;
  padding: 10px 0;
  position: relative;

  .comments-avatar {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;

    .user-avatar {
      display: inline-block;
      height: auto;
      vertical-align: top;
      width: 50px;
      border-radius: 4px;
    }
  }

  .comments-content {
    padding-left: 85px;
    color: #666;
    box-sizing: border-box;

    .user-name {
      font-weight: bold;
      font-size: 14px;
      color: #d32;
      // padding-bottom: 5px;
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
  .answer-wrap {
    display: inline-block;
  }

  .answer-wrap {
    padding-left: 20px;
    position: relative;
  }
}

.reply-wrap {
  height: 40px;
  box-sizing: border-box;
  margin: 15px 10px 0 70px;
  position: relative;

  .emoji-cop {
    position: absolute;
    top: -200px;
    right: 108px;
    background: #fff;
  }
}

textarea {
  resize: none;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
}

.emoji-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  font-size: 26px;
  vertical-align: middle;
  color: #ff5722;
}

.other-list {
  padding-left: 60px;
}

@keyframes slide {
  from {
    opacity: 0;
    transform: translate(-50%, 0);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>

<style>
.content-text span {
  color: blue;
  font-weight: bold;
}
</style>



