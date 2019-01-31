<template>
  <div class="github-callback">github正在授权登录</div>
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
            isLogin: res.isLogin,
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
