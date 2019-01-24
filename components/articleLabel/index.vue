<template>
  <div class="article-label">
    <h3 class="label-title">文章标签</h3>
    <ul class="label-list">
      <li class="label-item" v-for="(label, index) in labelArr" :key="index">
        <p class="label-text" @mousemove="showBackgroundColor">{{ label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Colors from "~/plugins/color.js";
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
      ],
      colorsArr: Colors.colorName
    };
  },
  methods: {
    showBackgroundColor() {}
  }
};
</script>

<style lang="scss" scoped>
.article-label {
  background: #fff;
  min-width: 400px;
  margin-top: 30px;
  padding: 20px;
  box-sizing: border-box;
  transition: 0.5s ease;
  &:hover {
    border-radius: 4px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
    transition: 0.5s ease;
  }

  .label-title {
    font-size: 1pc;
    font-weight: 400;
    color: #333;
    padding: 2px 0 2px 10px;
    border-left: 2px solid #3472ef;
    margin: 0 0 20px 2px;
    height: 25px;
    line-height: 25px;
  }

  .label-list {
    .label-item {
      display: inline-block;

      .label-text {
        padding: 5px 10px;
        border-radius: 4px;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
      }
    }
  }
}
</style>
