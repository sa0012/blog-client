<template>
  <div class="hot-article">
    <h3 class="hot-title">热门文章</h3>
    <ul class="hot-list">
      <li class="hot-item" v-for="(hot, index) in hotArticle" :key="index">
        <div 
          class="item-index"
          :style="{
            'background': index === 0 ? '#ff858e' : index === 1 ? '#77d549' : index === 2 ? '#62c1ff' : '#979598'
          }">{{ index + 1 }}</div>
        <h3 class="item-title">
          <nuxt-link :to="'/article/' + hot._id">{{ hot.title }}</nuxt-link>
        </h3>
      </li>
    </ul>
  </div>
</template>

<script>
import Colors from "~/plugins/color.js";
export default {
  data() {
    return {
      hotArr: [
        {
          title: "百度搜索引擎千人千面的转型之路"
        }
      ],
      colorsArr: Colors.colorName
    };
  },
  computed: {
    hotArticle() {
      return this.$store.state.hotArticle;
    }
  },
  methods: {
    showBackgroundColor() {}
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/style/mixins.scss";
.hot-article {
  background: #fff;
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

  .hot-title {
    font-size: 1pc;
    font-weight: 400;
    color: #333;
    padding: 2px 0 2px 10px;
    border-left: 2px solid #3472ef;
    margin: 0 0 20px 2px;
    height: 25px;
    line-height: 25px;
  }

  .hot-item {
    padding: 10px 0;
    border-top: 1px solid #ddd;
    color: #666;

    .item-index {
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      border-radius: 3px;
      display: inline-block;
      vertical-align: middle;
      color: #fff;
      font-weight: bold;
    }

    .item-title {
      display: inline-block;
      vertical-align: middle;
      padding-left: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
