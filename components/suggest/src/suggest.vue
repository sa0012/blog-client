<template>
  <div class="fillcontain category" ref="category" v-show="visible">
    <section class="category-wrap">
      <h3 class="category-title">建议 / 反馈</h3>
      <div class="suggest-content-wrap">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="类型">
            <el-col :span="12">
              <el-button plain>功能建议</el-button>
            </el-col>
            <el-col :span="12">
              <el-button plain>BUG反馈</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input class="content-area" type="textarea" v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button plain @click="close">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <i class="el-icon-close close-icon" @click="close"></i>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    showSuggest: {
      type: Boolean,
      default: false
    },
    handleClose: {
      type: Function,
      default: () => {}
    },
    handleConfirm: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      labelPosition: "left",
      visible: false,
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      }
    };
  },
  watch: {
    showSuggest(newVal, oldVal) {}
  },
  created() {},
  methods: {
    close() {
      // this.$emit("update:showSuggest", false);
      this.visible = false;
      this.handleClose && this.handleClose()
    },
    confirm() {
      this.handleConfirm && this.handleConfirm()
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.category {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 4444;

  .category-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    min-height: 300px;
    min-width: 520px;
    padding: 30px;
    border-radius: 5px;
    z-index: 4445;
    animation: slide 0.5s ease-out;

    .category-title {
      font-size: 18px;
      text-align: center;
      padding-bottom: 30px;
    }

    .close-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 30px;
      color: #999;
      display: block;
      transition: all 0.5s ease;

      &:hover {
        transform: rotateZ(-180deg);
        color: red;
      }
    }
  }
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.content-area {
  height: 100px;
  box-sizing: border-box;
  resize: none;
}

textarea {
  resize: none;
}

@keyframes slide {
  from {
    opacity: 0;
    transform: translate(-50%, 0);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>


