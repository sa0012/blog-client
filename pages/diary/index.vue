<template>
  <section class="container">
    <header-nav></header-nav>
    <el-row class="content">
      <time-line></time-line>
    </el-row>
    <net-footer></net-footer>
  </section>
</template>

<script>
import HeaderNav from "~/components/header/header.vue";
import NetFooter from '~/components/footer';

export default {
  head () {
    return {
      title: '随笔杂谈',
      meta: [
        { hid: '随笔杂谈', name: '随笔杂谈', content: '随笔杂谈' }
      ]
    }
  },
  components: {
    HeaderNav,
    NetFooter,
    TimeLine: () => import('~/components/timeLine')
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100%;
}

.content {
  width: 80%;
  padding-top: 170px;
  position: relative;
  margin: 0 auto;

  .content-right {
    padding-left: 30px;
    box-sizing: border-box;
  }
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

