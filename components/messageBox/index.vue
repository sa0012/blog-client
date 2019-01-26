<template>
  <div class="message-box">
    <img src="~/assets/image/car.jpg" alt="avatar" class="user-avatar">
    <div class="message-input-wrap">
      <div class="input-wrap">
        <textarea class="message-input" v-model="content" maxlength="150"></textarea>
      </div>
      <div class="feature-wrap">
        <div class="expression">
          <i class="el-icon-time" @click="handleEmoji"></i>
          <span class="leave-text">表情</span>
          <!-- <picker v-if="showEmoji" set="emojione" @select="addEmoji"/> -->
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

  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .message-input-wrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    padding-left: 70px;
    box-sizing: border-box;

    .input-wrap {
      width: 100%;
      height: 100px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .message-input {
      width: 100%;
      height: 99px;
      border: none;
      outline: none;
      resize: none;
      -webkit-appearance: none;
    }
  }

  .feature-wrap {
    background: #fff;
    height: 50px;
    line-height: 50px;
    border: 1px solid #ccc;
    // margin-top: -1px;
    padding: 0 10px;
    box-sizing: border-box;
    .expression,
    .upload,
    .login {
      display: inline-block;
      font-size: 16px;
      color: #666;
      vertical-align: middle;
    }

    .expression {
      padding-right: 15px;
    }

    .login {
      float: right;
    }
  }
}
</style>
