<template>
  <div class="article-label">
    <h3 class="label-title">
      <div class="icon-wrap">
        <i class="el-icon-menu"></i>
      </div>
      <span>文章标签</span>
    </h3>
    <ul class="label-list">
      <li class="label-item" v-for="(label, index) in labelArr" :key="index">{{ label }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelArr: [
        "分享 (257)",
        "网络杂谈 (139)",
        "站长 (134)",
        "自媒体 (113)",
        "新闻 (93)",
        "经验 (92)",
        "资讯 (90)",
        "SEO优化 (90)",
        "投稿 (90)",
        "建站 (83)",
        "推广 (82)",
        "教程 (82)",
        "百度 (80)",
        "图文教程 (54)",
        "zblog教程 (48)",
        "zblog主题 (43)",
        "胡言乱语 (40)",
        "zblog模版 (37)",
        "php模版 (35)",
        "正经事 (28)",
        "电子商务 (19)"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.article-label {
  background: #fff;
  min-width: 400px;
  margin-top: 30px;
}
</style>
