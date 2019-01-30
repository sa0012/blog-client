<template>
  <div class="fillcontain category" ref="category" v-show="showComments">
    <section class="category-wrap">
      <div class="top-title">
        <h3 class="category-title">23条回复</h3>
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
                  <i class="iconfont icon-dianzan"></i>
                  <span class="reply-text">点赞</span>
                </div>
              </div>
              <div class="content-text" v-html="singleComment.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></div>
              <div class="create-time" style="padding-top: 5px;">
                <p class="time">{{ singleComment.create_time }}</p>
                <div class="answer-wrap">
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
                  {{ reply.user.user_name }}
                  <span style="color: #000;">回复</span>
                  {{ reply.reply_to_user.user_name }}
                </p>
                <div class="dianzan">
                  <i class="iconfont icon-dianzan"></i>
                  <span class="reply-text">点赞</span>
                </div>
              </div>
              <div class="content-text" v-html="reply.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></div>
              <div class="create-time" style="padding-top: 5px;">
                <p class="time">{{ reply.create_time }}</p>
                <div class="answer-wrap" @click="handleComments(reply._id)">
                  <i class="iconfont icon-custom-comment"></i>
                  <span class="reply-text">回复</span>
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
        <el-button style="margin-left: 20px;" @click="publish(commentId)">发布</el-button>
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
    },
    singleComment: {
      type: Object,
      default: {
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
            user_avatar: ""
          },
          reply_to_user: {
            user_id: "",
            user_name: "",
            user_avatar: ""
          },
          create_time: "",
          edit_time: ""
        }
      ],
      childComment: {
        comment_id: "",
        user: {
          user_id: "",
          user_name: "",
          user_avatar: ""
        },

        // 被评论人信息
        reply_to_user: {
          user_name: "",
          user_id: "",
          user_avatar: ""
        },
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
      commentId: ""
    };
  },
  computed: {
    userMsg() {
      return this.$store.state.user;
    }
  },
  watch: {
    showComments(newVal, oldVal) {
      if (newVal) {
        this.queryReplyCommentsList(this.singleComment._id);
        this.commentId = this.singleComment._id;
      }
    }
  },
  created() {},
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
        reply_to_user: this.singleComment.user,
        //评论内容
        content: this.content
      };

      $http.post("/comment/replySave", config).then(res => {
        if (res.data === "SUCCESS") {
          this.queryReplyCommentsList(this.commentId);
        }
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
    },
    handleComments(id) {
      console.log(id, "commentId");
      this.isFocus = true;
      this.$refs['input'].focus()
      this.commentId = id;
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
  mounted() {},
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
  z-index: 4444;

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

    .content-text {
      // @include no-wrap(2);
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


