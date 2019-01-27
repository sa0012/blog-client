<template>
  <div class="fillcontain category" ref="category" v-show="showComments">
    <section class="category-wrap">
      <h3 class="category-title">23条回复</h3>
      <!-- <div style="height: 800px; background: green;"></div> -->
      <i class="el-icon-close close-icon" @click="close"></i>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    showComments: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      }
    };
  },
  watch: {
    showComments(newVal, oldVal) {}
  },
  created() {},
  methods: {
    close() {
      this.$emit("update:showComments", false);
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
    max-height: 90%;
    overflow: auto;
    width: 80%;
    padding: 14px;
    border-radius: 5px;
    z-index: 4445;
    animation: slide 0.5s ease-out;

    .category-title {
      font-size: 18px;
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


