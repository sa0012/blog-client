<template>
  <div class="profile">
    <div class="widget-box widget" id="zzxx-box">
      <div class="topauthor">
        <img
          alt="博客主人：陈龙"
          src="https://www.yangruolan.com/zb_users/avatar/1.png"
          class="avatar-photo"
          title="陈龙"
          height="100"
          width="100"
        >
        <div class="author-right">
          <divn class="intag" title="陈龙">博 主：</divn>
          <span class="names">
            <a href="https://www.yangruolan.com/author-1.html" title="查看 陈龙 发布的文章" rel="author">陈龙</a>
          </span>
          <span class="talk">陈龙博客，是一个记录生活与分享资讯的个人博客网站。『juckchen.cn』</span>
        </div>
      </div>
      <ul>
        <li class="share-icon" v-for="item in 3" :key="item"></li>
      </ul>
      <div class="butauthor">
        <span class="bignum pn">浏览 326596 次</span>
        <span class="bignum">
          运行
          <a id="days">448</a> 天数
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
.profile {
  background: #fff;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  width: 80%;
  max-width: 400px;
  min-width: 400px;

  .author-right {
    position: absolute;
    top: 15px;
    right: 10px;
    padding-left: 120px;
    box-sizing: border-box;
  }

  .intag {
    display: inline-block;
    background: blue;
    color: #fff;
    padding: 5px 10px;
  }
}
</style>

