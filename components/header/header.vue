<template>
  <div class="header-top">
    <div class="top-background">
      <img src="~/assets/image/timg.jpg" alt style="width: 100%; height: 100px;">
      <div class="motto-wrap">
        <div class="motto-title">陈龙的博客</div>
        <div class="motto-text">博学之，审问之，慎思之，明辨之，笃行之。——《礼记》</div>
      </div>
    </div>
    <div class="header-wrap">
      <div class="logo">
        <img src="~/assets/image/logo.png" class="logo-icon" alt>
      </div>
      <nav class="category-nav">
        <ul class="nav-list">
          <li class="nav-item" v-for="(category, index) in categories" :key="index">
            <nuxt-link :to="category.router">{{ category.title }}</nuxt-link>
          </li>
        </ul>
      </nav>
      <div class="login-wrap">
        <div class="login-start" v-if="!userMsg.isLogin">
          <div class="login" @click="handleLogin('login')">登陆</div>
          <div class="line">/</div>
          <div class="register" @click="handleLogin('register')">注册</div>
        </div>
        <div class="login-end" v-else>
          <drop-login></drop-login>
        </div>
      </div>
    </div>
    <login-component></login-component>
  </div>
</template>

<script>
import LoginComponent from "~/components/login";
import {
  getSession,
  getLocal
} from '~/common/mutils';
export default {
  data() {
    return {
      showLogin: false,
      loginType: "login",
      categories: [
        { router: { name: "index" }, title: "首页" },
        { router: { path: "/article" }, title: "文章" },
        { router: { path: "/diary" }, title: "文章归类" },
        { router: { path: "/about" }, title: "关于我" },
        { router: { path: "/board" }, title: "留言板" }
      ]
    };
  },
  computed: {
    userMsg() {
      return this.$store.state.user
    },
    loginMsg() {
      return this.$store.state.login
    }
  },
  methods: {
    handleLogin(type) {
      this.loginMsg.showLogin = true;
      this.loginMsg.loginType = type;
      this.$store.dispatch('LOGIN_MSG', this.loginMsg)
    }
  },
  mounted() {
    if (getSession('user') && getSession('login')) {
      this.$store.dispatch('USER_MSG', JSON.parse(getSession('user'))).then(res => {
        this.userMsg = this.$store.state.user
      })
      this.$store.dispatch('LOGIN_MSG', JSON.parse(getSession('login'))).then(res => {
        this.loginMsg = this.$store.state.login
      })
    }
  },
  components: {
    LoginComponent,
    DropLogin: () => import('~/components/dropdown')
  }
};
</script>

<style lang="scss" scoped>
.header-top {
  position: fixed;
  top: 0;
  z-index: 333;
  width: 100%;
  text-align: center;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.17);
  z-index: 444;

  .header-wrap {
    width: 80%;
    height: 60px;
    line-height: 60px;
    text-align: left;
    display: inline-block;
    position: relative;
  }

  .logo {
    display: inline-block;
    .logo-icon {
      width: 120px;
    }
  }

  .category-nav,
  .nav-list,
  .login-wrap,
  .login,
  .line,
  .register {
    display: inline-block;
  }

  .nav-list {
    padding-left: 120px;
  }

  .nav-item {
    padding: 0 15px;
    display: inline-block;
    font-size: 16px;
  }

  .login-wrap {
    position: absolute;
    top: 50%;
    right: 50px;
    transform: translateY(-50%);
    color: #999;
  }

  .top-background {
    position: relative;

    .motto-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: left;

      .motto-title {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .motto-text {
        color: #333;
      }
    }
  }
}
</style>
