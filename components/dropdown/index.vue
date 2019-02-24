<template>
  <div class="toptip">
    <el-dropdown @command="handleCommand" menu-align="start">
      <img :src="userMsg.avatar" class="user-avator">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="singout" @click.native="quitLogin">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { removeSession } from '~/common/mutils';
export default {
  data() {
    return {
    };
  },
  computed: {
    userMsg() {
      return this.$store.state.user
    }
  },
  methods: {
    handleCommand(command) {
      if (command === "home") {
        this.$router.push(`/`);
      } else {
      }
    },
    quitLogin() {
      this.userMsg.isLogin = false;
      this.$store.dispatch("USER_MSG", this.userMsg)
      this.$router.push(this.$route.path);
      removeSession('user');
    }
  },
  created() {
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.toptip {
  background-color: #fff;
  height: 60px;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 20px;

  .user-avator {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 20px;
  }
}
</style>
