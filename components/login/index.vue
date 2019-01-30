<template>
  <div class="login fillcontain" v-if="loginMsg.showLogin">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="loginMsg.showLogin">
        <sq-tabs
          :active="loginMsg.loginType === 'register' ? 'name2' : 'name1'"
          line-scale="0.7"
          font-size="16"
          title-height="40"
        >
          <sq-tabpane label="登陆" name="name1">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" style="padding-top: 40px;">
              <el-form-item prop="user_id">
                <el-input v-model="loginForm.user_id" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="loginForm.user_pwd"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-col :span="14">
                  <el-input type="text" placeholder="验证码" v-model="loginForm.code"></el-input>
                </el-col>
                <el-col :span="10">
                  <img
                    class="form-checkcode"
                    :src="img_base64"
                    alt="验证码"
                    title="点击切换验证码"
                    @click="get_check_code"
                  >
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
              </el-form-item>
            </el-form>
          </sq-tabpane>
          <sq-tabpane label="注册" name="name2">
            <el-form
              :model="registerForm"
              :rules="registerRules"
              ref="loginForm"
              style="padding-top: 40px;"
            >
              <el-form-item prop="user_id">
                <el-input v-model="registerForm.user_id" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="user_pwd">
                <el-input type="password" placeholder="密码" v-model="registerForm.user_pwd"></el-input>
              </el-form-item>
              <el-form-item prop="re_user_pwd">
                <el-input type="password" placeholder="确认密码" v-model="registerForm.re_user_pwd"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-col :span="14">
                  <el-input type="text" placeholder="验证码" v-model="registerForm.code"></el-input>
                </el-col>
                <el-col :span="10">
                  <img
                    class="form-checkcode"
                    :src="img_base64"
                    alt="验证码"
                    title="点击切换验证码"
                    @click="get_check_code"
                  >
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="register()" class="submit_btn">注册</el-button>
              </el-form-item>
            </el-form>
          </sq-tabpane>
        </sq-tabs>
        <el-row class="login-icon-wrap">
          <el-col :span="6">
            <i class="iconfont icon-github login-icon" @click="githubLogin"></i>
          </el-col>
          <el-col :span="6">
            <i class="iconfont icon-weixin login-icon"></i>
          </el-col>
          <el-col :span="6">
            <i class="iconfont icon-qq login-icon"></i>
          </el-col>
          <el-col :span="6">
            <i class="iconfont icon-weibo login-icon"></i>
          </el-col>
        </el-row>
        <i class="el-icon-close close-icon" @click="close"></i>
      </section>
    </transition>
  </div>
</template>

<script>
import Controller from "./handle";

export default Controller;
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 555;

  .manage_tip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p {
      font-size: 34px;
      color: #fff;
    }
  }
  .form_contianer {
    width: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    animation: slide 0.5s ease-out;
    .submit_btn {
      width: 100%;
      font-size: 16px;
    }

    .close-icon {
      position: absolute;
      top: -30px;
      right: -30px;
      font-size: 30px;
      color: #ccc;
      border-radius: 1000px;
      border: 1px solid #ccc;
      transition: all 0.5s;

      &:hover {
        transform: rotateZ(180deg);
        transition: all 0.5s;
      }
    }
  }
  .tip {
    font-size: 12px;
    color: red;
  }
  .form-fade-enter-active,
  .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter,
  .form-fade-leave-active {
    transform: translate3d(-50%, -50px, 0);
    opacity: 0;
  }
}

.form-checkcode {
  float: right;
}

.login-icon-wrap {
  width: 160px;
  margin: 0 auto;

  .login-icon {
    font-size: 26px;

    &:hover {
      color: green;
    }
  }
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


