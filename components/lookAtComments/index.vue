<template>
  <div class="fillcontain category" ref="category" v-show="showComments">
    <section class="category-wrap">
      <div class="top-title">
        <h3 class="category-title">23条回复</h3>
        <i class="el-icon-close close-icon" @click="close"></i>
      </div>

      <div class="comments-wrap">
        <ul class="comments-list" v-for="(item, i) in 10" :key="i">
          <li class="comments-item" v-for="(comment, index) in comments" :key="index">
            <div class="comments-avatar">
              <img v-lazy="comment.user.user_avatar" alt="avatar" class="user-avatar">
            </div>
            <div class="comments-content">
              <div class="user-name">
                <p class="username">{{ comment.user.user_name }}</p>
                <div class="dianzan">
                  <i class="iconfont icon-dianzan"></i>
                  <span class="reply-text">点赞</span>
                </div>
              </div>
              <div
                class="content-text"
                style="display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;"
              >{{ comment.content }}</div>
              <div class="create-time" style="padding-top: 5px;">
                <p class="time">{{ comment.create_time }}</p>
                <div class="reply-wrap" @click="handleComments(index)">
                  <i class="iconfont icon-custom-comment"></i>
                  <span class="reply-text">回复</span>
                </div>
              </div>
            </div>

            <!-- <ul class="second-list">
          <li class="second-item">
            <div class="comments-avatar">
              <img v-lazy="comment.user.user_avatar" alt="avatar" class="user-avatar">
            </div>
            <div class="comments-content">
              <div class="user-name">{{ comment.user.user_name }} 回复 sa0012</div>
              <div
                class="content-text"
                style="display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;"
              >{{ comment.content }}</div>
              <div class="create-time">{{ comment.create_time }}</div>
            </div>
          </li>
            </ul>-->
          </li>
        </ul>
      </div>

      <div class="reply-wrap">
        底部区域
      </div>
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
      comments: [
        {
          _id: "5c4a6870f6aa8dba3095dafb",
          article_id: "5c3d8268ca6b105455e60b16",
          content:
            "明明是个缺心眼的娃，怎么想法就多呢，五花八门层出不穷，有点佩服自己了。开个淘宝店做业务考学力短期旅行义工旅行穷游咖啡馆。。。。大致的例了这段时间的想法，额，真的不少；但是真正去执行的是哪个",
          user: {
            user_id: "5c3c20482975bdf2f027c822",
            user_name: "sa0012",
            user_avatar: "https://avatars3.githubusercontent.com/u/24355136?v=4"
          },
          create_time: "1548380272142",
          edit_time: "1548380272142"
        }
      ],
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
  mounted() {},
  components: {
  }
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
    width: 80%;
    max-height: 90%;
    padding: 14px;
    padding-top: 0;
    border-radius: 5px;
    z-index: 4445;
    animation: slide 0.5s ease-out;

    .top-title {
      background: #ffffff;
      border-bottom: 1px solid #f6f6f6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      position: relative;
    }

    .category-title {
      display: inline-block;
      font-size: 18px;
    }

    .close-icon {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      transition: all 0.5s ease;

      &:hover {
        // transform: rotateZ(-180deg);
        color: #ccc;
      }
    }
  }
}
.comments-wrap {
  max-height: calc(100vh * 0.9 - 60px * 2);
  overflow: auto;
}
.comments-item {
  border-top: 1px solid #ddd;
  // border-bottom: 1px solid #ddd;
  padding: 15px 0;
  position: relative;

  .comments-avatar {
    display: inline-block;

    .user-avatar {
      display: inline-block;
      height: auto;
      vertical-align: top;
      width: 48px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
  }

  .comments-content {
    position: absolute;
    top: 50%;
    left: 70px;
    transform: translateY(-50%);
    color: #666;
    box-sizing: border-box;

    .user-name {
      font-weight: bold;
      font-size: 14px;
      color: #d32;
      padding-bottom: 5px;
      position: relative;

      .dianzan {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        color: #666;
      }
    }

    .content-text {
      // @include no-wrap(2);
    }
  }

  .time,
  .reply-wrap {
    display: inline-block;
  }

  .reply-wrap {
    padding-left: 20px;
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


