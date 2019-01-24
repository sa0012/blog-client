<template>
  <div class="profile">
    <div class="profile-wrap">
      <el-row>
        <el-col :span="8">
          <img
            alt="博客主人：陈龙"
            src="https://www.yangruolan.com/zb_users/avatar/1.png"
            class="avatar-photo"
            title="陈龙"
            height="100"
            width="100"
          >
        </el-col>
        <el-col :span="16">
          <div class="author-right">
            <div class="intag" title="陈龙">博 主：</div>
            <span class="names">
              <a href title="查看 陈龙 发布的文章" rel="author">陈龙</a>
            </span>
            <span
              class="talk"
            >博客简介：专注于前端技术的研究与分享，还有自己日常生活和工作的记录，期望认识广大前端开发爱好者和同行们，共同研究web前端技术的新动向。『juckchen.cn』</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="share-icon-wrap">
        <el-col :span="6">
          <div class="icon-wrap share-icon-github">
            <i class="iconfont icon-github share-icon"></i>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="icon-wrap share-icon-weixin">
            <i class="iconfont icon-weixin1 share-icon"></i>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="icon-wrap share-icon-qq">
            <i class="iconfont icon-qq share-icon"></i>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="icon-wrap">
            <i class="el-icon-edit-outline share-icon"></i>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row class="count-wrap">
      <el-col :span="12" class="count-item count-browse">
        <span class="bignum pn">
          浏览
          <a class="count-color">326596</a> 次
        </span>
      </el-col>
      <el-col :span="12" class="count-item count-runtime">
        <span class="bignum">
          运行
          <a class="count-color">448</a> 天数
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.profile {
  background: #fff;
  position: relative;
  box-sizing: border-box;
  width: 80%;
  max-width: 400px;
  min-width: 400px;
  transition: 0.5s ease;
  &:hover {
    border-radius: 4px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
    transition: 0.5s ease;
  }
  .profile-wrap {
    padding: 20px;
  }

  .author-right {
    padding-top: 10px;
  }

  .intag {
    display: inline-block;
    background: #eda47b;
    color: #fff;
    padding: 5px 10px;
  }
}

.share-icon-wrap {
  text-align: center;
  padding: 20px 0;

  .icon-wrap {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    display: inline-block;
    border-radius: 3px;

    &.share-icon-github:hover {
      background: #248a34;
      border: 1px solid #248a34;
      color: #fff;
    }

    &.share-icon-weixin:hover {
      background: #248a34;
      border: 1px solid #248a34;
      color: #fff;
    }

    &.share-icon-qq:hover {
      background: #4e91d1;
      border: 1px solid #4e91d1;
      color: #fff;
    }

    .share-icon {
      font-size: 24px;
      display: inline-block;
      vertical-align: middle;
    }
  }
}

.count-wrap {
  border-top: 1px solid #ddd;

  .count-item {
    color: #666;
    padding: 10px 0;
    cursor: pointer;
    text-align: center;

    &.count-browse {
      border-right: 1px solid #ddd;
      margin-right: -1px;
    }

    .count-color {
      color: #000;
      font-size: 16px;
    }
  }
}
</style>

