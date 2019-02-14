<template>
  <div class="article-label">
    <h3 class="label-title">文章标签</h3>
    <ul class="label-list">
      <li class="label-item" v-for="(label, index) in labelArr" :key="index">
        <p class="label-text" @click="queryArticle(label._id)">
          <span>{{ label.tag_name }}</span>
          <span>{{ `(${ label.tag_count })` }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import Colors from "~/plugins/color.js";
import $http from "~/plugins/axios";
export default {
  data() {
    return {
      labelArr: [
        {
          _id: '',
          tag_name: '',
          tag_count: 0
        }
      ],
      colorsArr: Colors.colorName
    };
  },
  methods: {
    queryLabel() {
      $http.get('/tag/query').then(res => {
        console.log(res, 'labal')
        this.labelArr = res;
      })
    },
    queryArticle(id) {
      $http.get('/tag/queryArticle', { tag_id: id }).then(res => {

      })
    }
  },
  mounted() {
    this.queryLabel();
  }
};
</script>

<style lang="scss" scoped>
.article-label {
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
