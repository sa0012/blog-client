<template>
  <div class="message-box">
    <div class="avatar-wrap">
      <div class="user-login">
        <div v-if="!userMsg.isLogin" @click="handleLogin">登陆</div>
        <img v-else :src="userMsg.avatar" alt="avatar" class="login-avatar">
      </div>
      <div class="no-border"></div>
    </div>
    <div class="message-input-wrap">
      <div class="textarea-wrap">
        <textarea name id class="message-input" v-model="content" maxlength="150" ref="message"></textarea>
      </div>
      <div class="feature-wrap">
        <div class="expression">
          <i class="iconfont icon-smile emoji-icon" @click="showEmoji = !showEmoji"></i>
          <span class="leave-text">表情</span>
          <emoji-component
            v-show="showEmoji"
            @emotion="handleEmotion"
            :height="200"
            style="width: 300px;"
            class="emoji-cop"
          ></emoji-component>
        </div>
        <div class="upload">
          <i class="el-icon-picture"></i>
          <span class="leave-text">图片</span>
        </div>
        <div class="login" @click="startComment">发表评论</div>
      </div>
    </div>
  </div>
</template>

<script>
import EmojiComponent from "~/components/emoji";
import $http from "~/plugins/axios";
export default {
  props: {},
  data() {
    return {
      content: "",
      showEmoji: false,
      commentList: {
        article_id: this.$route.params.detail,
        content: "",
        user: {
          user_id: "",
          user_name: "",
          user_avatar: ""
        }
      },
      queryFatherComment: {
        page: 1,
        size: 10,
        article_id: ""
      },
      comments: [{
        _id: '',
        article_id: '',
        content: "",
        user: {
          user_id: "",
          user_name: "",
          user_avatar: ""
        },
        create_time: "",
        edit_time: "",
      }]
    };
  },
  computed: {
    userMsg() {
      return this.$store.state.user;
    },
    loginMsg() {
      return this.$store.state.login;
    },
    fatherComments() {}
  },
  methods: {
    queryCommentList() {
      this.queryFatherComment.article_id = this.$route.params.detail;
      $http
        .post("/comment/queryCommentList", this.queryFatherComment)
        .then(res => {
          this.comments = res.data.list;
          this.$emit('throwComments', this.comments)
          console.log(this.comments, 'comments')
          this.$store.dispatch('FATHER_COMMENTS', this.comments)
        });
    },
    startComment() {
      const config = {
        article_id: this.$route.params.detail,
        content: this.content,
        user: {
          user_id: this.userMsg._id,
          user_name: this.userMsg.user_id,
          user_avatar: this.userMsg.avatar
        }
      };
      $http.post("/comment/saveComment", config).then(res => {
        console.log(res);
        if (res.data === "SUCCESS") {
          this.queryCommentList();
        }
      });
    },
    handleLogin() {
      this.loginMsg.showLogin = true;
      this.loginMsg.loginType = "login";
      this.$store.dispatch("LOGIN_MSG", this.loginMsg);
    },
    handleEmotion(i) {
      this.content += i;
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
  created() {
    this.queryCommentList();
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs['message'].focus();
    })
  },
  components: {
    EmojiComponent
  }
};
</script>

<style lang="scss" scoped>
.message-box {
  position: relative;
  height: 150px;
  margin-top: 50px;
  z-index: 333;

  .emoji-cop {
    background: #fff;
  }

  .avatar-wrap {
    position: absolute;
    left: 1px;
    top: -54px;
    width: 55px;
    height: 60px;
    border-radius: 1000px;
    border: 1px solid royalblue;
    background: #e7e7e7;
    z-index: 11;

    .user-login {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 44px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      border: 1px solid royalblue;
      border-radius: 1000px;
      bottom: 5px;
      z-index: 44;
      font-size: 12px;
      color: #666;
      background: #fff;
    }

    .login-avatar {
      width: 35px;
      height: 35px;
      border-radius: 1000px;
      vertical-align: middle;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .no-border {
      position: absolute;
      top: -12px;
      left: -1px;
      width: 65px;
      height: 65px;
      background: #e7e7e7;
      z-index: 22;
    }
  }

  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    // border: 1px solid #ddd;
  }

  .message-input-wrap {
    // position: absolute;
    // top: 0;
    // right: 0;
    width: 100%;
    // padding-left: 70px;
    box-sizing: border-box;

    .textarea-wrap {
      border: 1px solid royalblue;
      border-radius: 10px;
      background: #fff;
    }

    .message-input {
      width: 100%;
      min-height: 100px;
      resize: none;
      font-size: 14px;
      border: none;
      outline: none;
      -webkit-appearance: none;
      // border: 1px solid #ccc;
      background: transparent;
      padding: 10px;
    }
  }

  .feature-wrap {
    padding: 10px 0;
    // border: 1px solid #ccc;
    .expression,
    .upload,
    .login {
      display: inline-block;
      font-size: 16px;
      color: #666;
    }

    .expression {
      padding-right: 15px;
    }

    .login {
      float: right;
      padding-right: 10px;
    }
  }
}
</style>
