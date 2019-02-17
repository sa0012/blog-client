<template>
  <div class="news-comments" v-if="comments.length > 0">
    <h3 class="comments-title">最新评论</h3>
    <ul class="comments-list">
      <li class="comments-item" v-for="(comment, index) in comments" :key="index">
        <div class="comments-avatar">
          <img v-lazy="comment.user.user_avatar" alt="avatar" class="user-avatar">
        </div>
        <div class="comments-content">
          <div class="user-name">{{ comment.user.user_name }}</div>
          <div
            class="content-text"
            style="display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;"
            v-html="comment.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"
          ></div>
          <div class="create-time">{{ comment.create_time }}</div>
        </div>
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
      comments: [
        {
          _id: "",
          article_id: "",
          content: "",
          user: {
            user_id: "",
            user_name: "",
            user_avatar: ""
          },
          create_time: "",
          edit_time: ""
        }
      ],
      colorsArr: Colors.colorName,
      queryFatherComment: {
        page: 1,
        size: 10
      }
    };
  },
  methods: {
    queryCommentList() {
      $http
        .post("/comment/queryNewsCommentList", this.queryFatherComment)
        .then(res => {
          this.comments = res.data.list;
        });
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
  created() {
    this.queryCommentList();
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/style/mixins.scss";
.news-comments {
  background: #fff;
  margin-top: 30px;
  padding: 20px;
  box-sizing: border-box;
  transition: 0.5s ease;
  box-sizing: border-box;
  &:hover {
    border-radius: 4px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
    transition: 0.5s ease;
  }

  .comments-title {
    font-size: 1pc;
    font-weight: 400;
    color: #333;
    padding: 2px 0 2px 10px;
    border-left: 2px solid #3472ef;
    margin: 0 0 20px 2px;
    height: 25px;
    line-height: 25px;
  }

  .comments-item {
    border-top: 1px solid #ddd;
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
      }
    }
  }
}
</style>

<style>
.content-text section img {
  width: 30px;
  object-fit: fill;
}
</style>
