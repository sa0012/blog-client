<template>
  <el-breadcrumb separator="/" class="bread-nav">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(nav, index) in navArr" :key="index">
      <nuxt-link :to="nav.route">{{ nav.title }}</nuxt-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    navArr: {
      type: Array,
      default: []
    }
  },
  data() {
    return {

    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
  .bread-nav {
    padding: 20px 0;
  }
</style>
