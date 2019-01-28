<template>
  <div class="fillcontain category" ref="category" v-show="showComments">
    <section class="category-wrap">
      <div class="top-title">
        <h3 class="category-title">23条回复</h3>
        <i class="el-icon-close close-icon" @click="close"></i>
      </div>

      <div class="comments-wrap">
        <ul class="comments-list">
          <li class="comments-item" v-for="(comment, index) in comments" :key="index" style="border-style: none;">
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
              <div class="content-text">{{ comment.content }}</div>
              <div class="create-time" style="padding-top: 5px;">
                <p class="time">{{ comment.create_time }}</p>
                <div class="answer-wrap" @click="handleComments(index)">
                  <i class="iconfont icon-custom-comment"></i>
                  <span class="reply-text">回复</span>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <ul class="other-list">
          <li class="comments-item" v-for="(reply, i) in replyComments" :key="i">
            <div class="comments-avatar">
              <img v-lazy="reply.user.user_avatar" alt="avatar" class="user-avatar">
            </div>
            <div class="comments-content">
              <div class="user-name">
                <p class="username">
                  {{ reply.user.user_name }}
                  <span style="color: #000;">回复</span>
                  {{ reply.user.user_name }}
                </p>
                <div class="dianzan">
                  <i class="iconfont icon-dianzan"></i>
                  <span class="reply-text">点赞</span>
                </div>
              </div>
              <div class="content-text">{{ reply.content }}</div>
              <div class="create-time" style="padding-top: 5px;">
                <p class="time">{{ reply.create_time }}</p>
                <div class="answer-wrap" @click="handleComments(i)">
                  <i class="iconfont icon-custom-comment"></i>
                  <span class="reply-text">回复</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <el-row class="reply-wrap">
        <el-col :span="20" style="position: relative;">
          <textarea class="text" rows="5" v-model="content"></textarea>
          <i class="iconfont icon-smile emoji-icon" @click="showEmoji = !showEmoji"></i>
        </el-col>
        <el-button style="margin-left: 20px;">发布</el-button>
      </el-row>
      <emoji-component
        v-show="showEmoji"
        @emotion="handleEmotion"
        :height="200"
        style="width: 300px; float: right; padding-right: 10px;"
      ></emoji-component>
    </section>
  </div>
</template>

<script>
import EmojiComponent from "~/components/emoji";
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
      replyComments: [
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
        },
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
        },
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
        },
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
      },
      content: "",
      comment: "",
      showEmoji: false
    };
  },
  watch: {
    showComments(newVal, oldVal) {}
  },
  created() {},
  methods: {
    close() {
      this.$emit("update:showComments", false);
    },
    handleComments(index) {},
    handleEmotion(i) {
      this.content += i;
    },
    // 将匹配结果替换表情图片
    emotion(res) {
      let word = res.replace(/\#|\;/gi, "");
      const list = [
        "微笑",
        "撇嘴",
        "色",
        "发呆",
        "得意",
        "流泪",
        "害羞",
        "闭嘴",
        "睡",
        "大哭",
        "尴尬",
        "发怒",
        "调皮",
        "呲牙",
        "惊讶",
        "难过",
        "酷",
        "冷汗",
        "抓狂",
        "吐",
        "偷笑",
        "可爱",
        "白眼",
        "傲慢",
        "饥饿",
        "困",
        "惊恐",
        "流汗",
        "憨笑",
        "大兵",
        "奋斗",
        "咒骂",
        "疑问",
        "嘘",
        "晕",
        "折磨",
        "衰",
        "骷髅",
        "敲打",
        "再见",
        "擦汗",
        "抠鼻",
        "鼓掌",
        "糗大了",
        "坏笑",
        "左哼哼",
        "右哼哼",
        "哈欠",
        "鄙视",
        "委屈",
        "快哭了",
        "阴险",
        "亲亲",
        "吓",
        "可怜",
        "菜刀",
        "西瓜",
        "啤酒",
        "篮球",
        "乒乓",
        "咖啡",
        "饭",
        "猪头",
        "玫瑰",
        "凋谢",
        "示爱",
        "爱心",
        "心碎",
        "蛋糕",
        "闪电",
        "炸弹",
        "刀",
        "足球",
        "瓢虫",
        "便便",
        "月亮",
        "太阳",
        "礼物",
        "拥抱",
        "强",
        "弱",
        "握手",
        "胜利",
        "抱拳",
        "勾引",
        "拳头",
        "差劲",
        "爱你",
        "NO",
        "OK",
        "爱情",
        "飞吻",
        "跳跳",
        "发抖",
        "怄火",
        "转圈",
        "磕头",
        "回头",
        "跳绳",
        "挥手",
        "激动",
        "街舞",
        "献吻",
        "左太极",
        "右太极"
      ];
      let index = list.indexOf(word);
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`;
    }
  },
  mounted() {},
  components: {
    EmojiComponent
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
      font-size: 24px;

      &:hover {
        // transform: rotateZ(-180deg);
        color: #ccc;
      }
    }
  }
}
.comments-wrap {
  max-height: calc(100vh * 0.9 - 400px);
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
}
.comments-item {
  border-top: 1px solid #ddd;
  padding: 10px 0;
  position: relative;

  .comments-avatar {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;

    .user-avatar {
      display: inline-block;
      height: auto;
      vertical-align: top;
      width: 50px;
      border-radius: 4px;
    }
  }

  .comments-content {
    padding-left: 85px;
    color: #666;
    box-sizing: border-box;

    .user-name {
      font-weight: bold;
      font-size: 14px;
      color: #d32;
      // padding-bottom: 5px;
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
  .answer-wrap {
    display: inline-block;
  }

  .answer-wrap {
    padding-left: 20px;
    position: relative;
  }
}

.reply-wrap {
  height: 40px;
  box-sizing: border-box;
  margin: 15px 10px 0 70px;
}

textarea {
  resize: none;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
}

.emoji-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  font-size: 26px;
  vertical-align: middle;
  color: #ff5722;
}

.other-list {
  padding-left: 60px;
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


