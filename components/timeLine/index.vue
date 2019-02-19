<template>
  <el-row class="timeline">
    <!-- <el-col :span="4"> -->
      <ul class="time-list">
        <li
          class="time-item"
          :class="{ 'is-select': nav == selectIndex }"
          v-for="(nav, index) in timeNav"
          :key="index"
          @click="handleTime(nav)"
        >{{ nav }}</li>
      </ul>
    <!-- </el-col> -->

    <!-- <el-col :span="20"> -->
      <ul class="event_list" ref="eventList">
        <div
          style="display: block;"
          v-for="(nav, nIndex) in timeNav"
          :key="nIndex"
          :id="nav + 'list'"
        >
          <h3 :id="nav">{{ nav }}</h3>
          <li v-for="(classify, cIndex) in classifyObj[nav]" :key="cIndex">
            <span>{{ classify.create_time | momthAndDate }}</span>
            <p>
              <span>
                <nuxt-link :to="'/article/' + classify._id">{{ classify.title }}</nuxt-link>
              </span>
            </p>
          </li>
        </div>
      </ul>
    <!-- </el-col> -->
  </el-row>
</template>

<script>
import $ from '~/utils'
export default {
  props: {
    timeNav: {
      type: Array,
      default: []
    },
    classifyObj: {
      type: Object | Array,
      default: {}
    },
    selectIndex: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      hideList: ""
    };
  },
  methods: {
    handleTime(nav) {
      let dom = document.getElementById(nav + "list");
      let height = $.getStyle(dom, 'scrollTop')
      console.dir(dom, 'height')
      document.body.scrollTop = 0;
      // this.$refs.eventList.scrollTop = 50;
      // dom.style.height = 0;
      // dom.style.transition = 'all 0.5s ease'
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(111111111);
    });
  }
};
</script>

<style lang="scss" scoped>
.timeline {
  position: relative;
}
.event_list {
  width: 850px;
  float: right;
  background: url(../../assets/image/dian3.png) 139px 0 repeat-y;
  margin: 10px 0 20px 0;

  h3 {
    margin: 0 0 10px 132px;
    font-size: 24px;
    font-family: Georgia;
    color: #db6d4c;
    padding-left: 25px;
    background: url(../../assets/image/jian.png) 0 -45px no-repeat;
    height: 38px;
    line-height: 30px;
    font-style: italic;
  }

  li {
    background: url(../../assets/image/jian.png) 136px -80px no-repeat;

    span {
      width: 127px;
      text-align: right;
      display: block;
      float: left;
      margin-top: 10px;
    }

    p {
      width: 680px;
      margin-left: 24px;
      display: inline-block;
      padding-left: 10px;
      background: url(../../assets/image/jian.png) -21px 0 no-repeat;
      line-height: 25px;

      span {
        width: 650px;
        text-align: left;
        border-bottom: 2px solid #ddd;
        padding: 10px 15px;
        background: #fff;
        margin: 0;
      }

      a:link,
      a:visited {
        text-decoration: none;
        color: #666;
      }
    }
  }
}

.time-list {
  width: 60px;
  border-bottom: 2px solid #ddd;
  text-align: center;
  // float: left;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 10px;

  .time-item {
    width: 60px;
    background: #fff;
    color: #828282;
    height: 40px;
    line-height: 40px;

    &.is-select {
      background: #db6d4c url(../../assets/image/jian.png) 60px 0 no-repeat;
      color: #fff;
    }
  }
}
</style>
