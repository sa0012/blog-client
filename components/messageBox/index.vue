<template>
  <div class="message-box">
    <div class="avatar-wrap">
      <div class="user-login">登录</div>
      <div class="no-border"></div>
      <!-- <img src="~/assets/image/car.jpg" alt="avatar" class="user-avatar"> -->
    </div>
    <div class="message-input-wrap">
      <div class="textarea-wrap">
        <textarea name id class="message-input" v-model="content" maxlength="150"></textarea>
      </div>
      <div class="feature-wrap">
        <div class="expression">
          <i class="el-icon-time" @click="handleEmoji"></i>
          <span class="leave-text">表情</span>
          <picker v-if="showEmoji" set="emojione" @select="addEmoji"/>
        </div>
        <div class="upload">
          <i class="el-icon-picture"></i>
          <span class="leave-text">图片</span>
        </div>
        <div class="login">点击登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Picker } from "emoji-mart-vue";
export default {
  props: {},
  data() {
    return {
      content: "",
      showEmoji: false
    };
  },
  methods: {
    addEmoji(value) {
      console.log(value, "value");
    },
    handleEmoji() {
      this.showEmoji = !this.showEmoji;
    }
  },
  components: {
    Picker
  }
};
</script>

<style lang="scss" scoped>
.message-box {
  position: relative;
  height: 150px;
  margin-top: 50px;
  // border: 1px solid royalblue;
  // border-radius: 10px 10px 0 0;
  // background: #fff;

  .avatar-wrap {
    position: absolute;
    left: 1px;
    top: -54px;
    width: 55px;
    height: 60px;
    border-radius: 1000px;
    border: 1px solid royalblue;
    background: #e7e7e7;
    z-index: 333;

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
      z-index: 444;
      font-size: 12px;
      color: #666;
    }

    .no-border {
      position: absolute;
      top: -12px;
      left: -1px;
      width: 65px;
      height: 65px;
      background: #e7e7e7;
      z-index: 334;
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
