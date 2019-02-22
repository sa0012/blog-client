<template>
  <div class="foot">
    <div class="main">
      <div class="police">
        <img src="~/assets/image/beian.png">
        <a href="http://www.beian.gov.cn/portal/index.do" target="_blank">皖ICP备19002157号-1</a>
      </div>
      <div class="copyright">
        <span>
          Copyright © 2019&nbsp;
          <a href="http://www.juckchen.cn">juckchen.cn &nbsp;</a>
        </span>
        <span>
          Powered by Vue
          <span>|</span>
        </span>
        <span>
          <a href="http://localhost:8088/" target="_blank">&nbsp;管理员</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.foot {
  width: 100%;
  background: #2e3033;
  color: #fff;
  // margin-top: 50px;
  text-align: center;
  position: relative;
  margin-top: -100px;
  height: 100px;

  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .police {
    margin-bottom: 10px;
  }

  a {
    color: #fff;
  }
}
</style>
