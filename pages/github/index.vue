<template>
  <div class="github-callback">
    <div class="content">
      <img src="~/assets/image/loading.gif" alt class="loading-img">
      <div class="loading-text">github正在授权登录</div>
    </div>
  </div>
</template>

<script>
import { setSession } from "~/common/mutils";
import $http from "~/plugins/axios";
export default {
  name: "Github",
  data() {
    return {};
  },
  computed: {
    route() {
      return this.$store.state.currentRoute;
    },
    loginMsg() {
      return this.$store.state.login;
    }
  },
  mounted() {
    if (this.$route.query.code) {
      console.log(this.$route, "route");
      $http
        .get(`/oauth/callback?code=${this.$route.query.code}&type=client`)
        .then(res => {
          console.log(res, "gitHubCallback");
          let config = {
            avatar: res.avatar,
            isLogin: true,
            token: res.token,
            user_id: res.user_id,
            user_name: res.user_name,
            _id: res._id
          };
          this.$store.dispatch("USER_MSG", config);
          this.loginMsg.showLogin = false;
          this.$store.dispatch("LOGIN_MSG", this.loginMsg);
          // this.$message.success(res.msg);
          this.$router.replace(this.route);
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.github-callback {
  width: 100%;
  height: 100vh;
  position: relative;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .loading-img {
      width: 320px;
    }

    .loading-text {
      text-align: center;
      padding: 10px 0;
      color: #666;
    }
  }
}
</style>
