<template>
  <div class="article-label">
    <h3 class="label-title">文章标签</h3>
    <ul class="label-list" v-if="labelArr.length > 0">
      <li class="label-item" v-for="(label, index) in labelArr" :key="index">
        <el-tag @click="queryArticle(label.tag_name)" size="medium" :hit="true">
          <span>{{ label.tag_name }}</span>
          <span>{{ `(${ label.tag_count })` }}</span>
        </el-tag>
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
      labelArr: [],
      colorsArr: Colors.colorName
    };
  },
  methods: {
    queryLabel() {
      $http.get("/tag/query").then(res => {
        this.labelArr = res.data || [];
      });
    },
    queryArticle(name) {
      this.$router.push("/article?tag_name=" + name);
    }
  },
  created() {
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

.el-tag {
  color: hsla(0, 0%, 100%, 0.8);
  margin: 5px;
  cursor: pointer;
}

.el-tag:hover {
  opacity: 0.6;
}

.label-item:nth-child(1n + 0) {
  .el-tag {
    background: #3f51b5;
  }
}

.label-item:nth-child(2n + 0) {
  .el-tag {
    background: #36c978;
  }
}

.label-item:nth-child(3n + 0) {
  .el-tag {
    background: #673ab7;
  }
}

.label-item:nth-child(4n + 0) {
  .el-tag {
    background: #ce24c6;
  }
}

.label-item:nth-child(5n + 0) {
  .el-tag {
    background: #dd5c53;
  }
}

.label-item:nth-child(6n + 0) {
  .el-tag {
    background: #00abc0;
  }
}

.label-item:nth-child(7n + 0) {
  .el-tag {
    background: #2196f3;
  }
}

.label-item:nth-child(8n + 0) {
  .el-tag {
    background: #9408d5;
  }
}

.label-item:nth-child(9n + 0) {
  .el-tag {
    background: #34dad4;
  }
}
</style>
