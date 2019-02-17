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
      <div class="textarea-wrap" @click="showEmoji = false">
        <textarea name id class="message-input" v-model="content" maxlength="150" ref="message"></textarea>
      </div>
      <div class="feature-wrap">
        <div class="expression" @click.stop="handleShowEmoji('emoji')">
          <i class="iconfont icon-smile emoji-icon"></i>
          <span class="leave-text">表情</span>
        </div>
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            action="/api/upload/artiUploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-picture"></i>
            <span class="leave-text">图片</span>
          </el-upload>
        </div>
        <div class="login" @click="startComment">发表评论</div>
        <emoji-component
          v-show="showEmoji"
          @emotion="handleEmotion"
          @click.native.stop="handleShowEmoji"
          :height="200"
          class="emoji-cop find-div-body"
        ></emoji-component>
        <div class="img-modal find-div-body" v-if="showImg">
          <img :src="imageUrl" class="avatar">
          <i class="el-icon-close img-close" @click="closeImg"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmojiComponent from "~/components/emoji";
import $http from "~/plugins/axios";
export default {
  props: {
    publish: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      content: "",
      showEmoji: false,
      imageUrl: "",
      showImg: false,
      config: { "Content-Type": "multipart/form-data" }
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
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.imageUrl = res.data.key
      this.showImg = true;
      this.content += `<section><img src="${this.imageUrl}" class="upload" align="middle"></section>`
    },
    // 上传文件到七牛云
    async upqiniu(req) {
      console.log(req);
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      let filetype = "";
      if (req.file.type === "image/png") {
        filetype = "png";
      } else {
        filetype = "jpg";
      }
      // 重命名要上传的文件
      const keyname =
        "juckchen" +
        +new Date() +
        Math.floor(Math.random() * 100) +
        "." +
        filetype;
      // 从后端获取上传凭证token
      const formdata = new FormData();
      formdata.append("file", req.file);
      // formdata.append("key", keyname);
      $http.post("/upload/artiUploadImg", formdata, config).then(res => {
        this.imageUrl = res.data.key;
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    closeImg() {
      const imgKey = this.imageUrl.split("/")[3];
      $http
        .post("/upload/deleteArticleImg", {
          key: imgKey
        })
        .then(res => {
          this.imageUrl = "";
          this.showImg = false;
        });
    },
    handleShowEmoji(type) {
      this.$refs["message"].focus();
      if (type === "emoji") {
        this.showEmoji = !this.showEmoji;
      } else {
        this.showEmoji = true;
      }
    },
    startComment() {
      this.publish && this.publish(this.content);
      this.content = "";
      this.showEmoji = false;
      this.showImg = false;
    },
    handleLogin() {
      this.loginMsg.showLogin = true;
      this.loginMsg.loginType = "login";
      this.$store.dispatch("LOGIN_MSG", this.loginMsg);
    },
    handleEmotion(i) {
      console.log(i);
      this.showEmoji = true;
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
    // this.queryCommentList();
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs["message"].focus();
      document.body.addEventListener("click", () => {
        this.showEmoji = false;
      });
    });
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
    width: 300px;
    position: absolute;
    top: 40px;
    left: 0;
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
    position: relative;
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
      position: absolute;
      top: 10px;
      left: 0;
    }

    .upload {
      position: absolute;
      top: 12px;
      left: 80px;
    }

    .img-modal {
      position: absolute;
      top: 40px;
      left: 40px;
      width: 200px;
      height: 180px;
      background: #fff;
      text-align: center;
      line-height: 180px;
      border: 1px solid #e74851;
      border-radius: 10px;
      .avatar {
        max-width: 140px;
      }

      .img-close {
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 24px;
        &:hover {
          background: #ccc;
          transition: all 0.2s;
        }
      }
    }

    .find-div-body:before {
      box-sizing: content-box;
      width: 0px;
      height: 0px;
      position: absolute;
      top: -16px;
      left: 41px;
      padding: 0;
      border-bottom: 8px solid #ffffff;
      border-top: 8px solid transparent;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      display: block;
      content: "";
      z-index: 12;
    }
    .find-div-body:after {
      box-sizing: content-box;
      width: 0px;
      height: 0px;
      position: absolute;
      top: -18px;
      left: 40px;
      padding: 0;
      border-bottom: 9px solid #e74851;
      border-top: 9px solid transparent;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      display: block;
      content: "";
      z-index: 10;
    }

    .login {
      float: right;
      padding-right: 10px;
    }
  }
}
</style>
