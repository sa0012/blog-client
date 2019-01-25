<template>
  <div class="nav-tip">
    <ul class="nav-list">
      <transition name="form-fade" mode="in-out">
        <li class="nav-item" @click="backTop" v-if="showBack">
          <i class="el-icon-arrow-up icon" style="color: red;"></i>
        </li>
      </transition>
      <li class="nav-item no-top">
        <el-tooltip placement="left" effect="light">
          <img src="~/assets/image/qr_weixin.jpg" alt slot="content" style="width: 150px;">
          <i class="iconfont icon-weixin1 icon" style="color: #248a34;"></i>
        </el-tooltip>
      </li>
      <li class="nav-item no-top">
        <el-tooltip placement="left" effect="light">
          <img
            src="~/assets/image/qr_qq.jpg"
            alt
            slot="content"
            style="width: 150px; height: 150px;"
          >
          <i class="iconfont icon-qq icon" style="color: #4e91d1;"></i>
        </el-tooltip>
      </li>
      <li class="nav-item no-top">
        <a href="https://github.com/sa0012">
          <i class="iconfont icon-github icon" style="color: #0e2535;"></i>
        </a>
      </li>
      <li class="nav-item no-top" @click="handleSuggest">
        <i class="el-icon-edit-outline icon"></i>
      </li>
    </ul>
    <suggest-modal :showSuggest.sync="showSuggest"></suggest-modal>
  </div>
</template>

<script>
import SuggestModal from '~/components/suggest';
export default {
  data() {
    return {
      timer: null,
      showBack: false,
      showSuggest: false
    };
  },
  components: {
    SuggestModal
  },
  methods: {
    backTop() {
      if (!window.requestAnimationFrame) {
        let timer = null;
        clearInterval(timer);
        timer = setInterval(() => {
          var top =
            document.body.scrollTop || document.documentElement.scrollTop;
          var speed = top / 10;
          if (document.body.scrollTop != 0) {
            document.body.scrollTop -= speed;
          } else {
            document.documentElement.scrollTop -= speed;
          }
          if (top == 0) {
            clearInterval(timer);
          }
        }, 30);
      } else {
        let timer = null;
        cancelAnimationFrame(timer);
        timer = window.requestAnimationFrame(function fn() {
          var oTop =
            document.body.scrollTop || document.documentElement.scrollTop;
          if (oTop > 0) {
            document.body.scrollTop = document.documentElement.scrollTop =
              oTop - 50;
            timer = requestAnimationFrame(fn);
          } else {
            cancelAnimationFrame(timer);
          }
        });
      }
    },
    handleSuggest() {
      this.showSuggest = true;
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let top = document.body.scrollTop || document.documentElement.scrollTop;
      if (top > 50) {
        this.showBack = true;
      } else {
        this.showBack = false;
      }
    });
  },
  destroyed() {}
};
</script>

<style lang="scss" scoped>
.nav-tip {
  position: fixed;
  top: 60%;
  right: 5%;

  .nav-item {
    background: #fff;
    width: 48px;
    height: 48px;
    font-size: 18px;
    text-align: center;
    line-height: 48px;
    border: 1px solid #ddd;
    transition: all 1s;

    &.no-top {
      margin-top: -1px;
    }

    .icon {
      font-size: 24px;
    }
  }
}
</style>

<style>
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  height: 0;
  opacity: 0;
}
</style>

