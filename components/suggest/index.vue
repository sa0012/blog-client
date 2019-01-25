<template>
  <div class="fillcontain category" ref="category" v-show="showSuggest">
    <section class="category-wrap">
      <h3 class="category-title">建议 / 反馈</h3>
      <div class="suggest-content-wrap">

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
  },
  data() {
    return {
    };
  },
  watch: {
    showSuggest(newVal, oldVal) {
    }
  },
  created() {},
  methods: {
    close() {
      this.$emit("update:showSuggest", false);
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.category {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1600;

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
    z-index: 1601;
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


