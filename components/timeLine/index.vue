<template>
  <div class="timeline">
    <ul class="time-list">
      <li
        class="time-item"
        :class="{ 'is-select': nav == selectNav }"
        v-for="(nav, index) in timeNav"
        :key="index"
        @click="handleTime(index)"
      >{{ nav }}</li>
    </ul>
    <ul class="event_list" ref="eventList">
      <transition-group name="list" tag="p">
        <div
          v-for="(nav, nIndex) in timeArr"
          :key="nIndex"
          :id="nav.time + 'list'"
          v-show="nav.showStatus"
        >
          <h3 :id="nav">{{ nav.time }}</h3>
          <li v-for="(classify, cIndex) in classifyObj[nav.time]" :key="cIndex">
            <span>{{ classify.create_time | momthAndDate }}</span>
            <p>
              <span>
                <nuxt-link :to="'/article/' + classify._id">{{ classify.title }}</nuxt-link>
              </span>
            </p>
          </li>
        </div>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import $ from "~/utils";
export default {
  props: {
    timeNav: {
      type: Array,
      default: []
    },
    classifyObj: {
      type: Object,
      default: {}
    },
    selectIndex: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      hideList: "",
      selectNav: this.selectIndex,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
      timeArr: []
    };
  },
  computed: {
  },
  watch: {
    selectIndex(newVal, oldVal) {
      this.selectNav = newVal;
    },
    timeNav: {
      handler(newVal, oldVal) {
        newVal.forEach((item, index) => {
          // let dom = document.getElementById(item + "list");
          // console.log(dom, 'dom')
          // let height = $.getStyle(dom, "height").split("px")[0];
          let showStatus = true;
          this.timeArr.push({ showStatus, time: item });
        });
      },
      immediate: true
    }
  },
  methods: {
    backTop(oDiv, height, index) {
      if (!window.requestAnimationFrame) {
        let timer = null;
        clearInterval(timer);
        timer = setInterval(() => {
          var speed = height / 10;
          if (height > 0) {
            height -= speed;
            oDiv.style.height = height + "px";
            console.log($.getStyle(oDiv, "height"));
          } else {
            oDiv.style.height -= speed;
          }
          if (height == 0) {
            clearInterval(timer);
          }
        }, 30);
      } else {
        let timer = null;
        cancelAnimationFrame(timer);
        // 如果
        let _this = this;
        timer = window.requestAnimationFrame(function fn() {
          var speed = height / 10;
          let oHeight = $.getStyle(oDiv, "height").split("px")[0];
          // 如果点击的下一个dom没有背隐藏，则将上面所有的都隐藏， 如果点击的元素下一个隐藏，则将上次点击位置和当前位置之间的dom都显示
          if (oHeight > 0) {
            height -= speed;
            oDiv.style.height = height + "px";
            timer = requestAnimationFrame(fn);
          } else {
            oDiv.style.height = 0;
            oDiv.style.display = "none";
            // _this.timeArr[index - 1].showStatus = 'none';
            cancelAnimationFrame(timer);
          }
        });
      }
    },
    handleTime(index) {
      console.log(this.timeArr, "timeArr");
      this.selectNav = this.timeNav[index];
      if (index < this.timeNav.length - 1) {
        let nextDiv = document.getElementById(this.timeNav[index + 1] + "list");
      }
      if (index > 0) {
        let dom = document.getElementById(this.timeNav[index - 1] + "list");
        let height = $.getStyle(dom, "height").split("px")[0];
        this.backTop(dom, height, index);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {});
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
      display: inline-block;
      // float: left;
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
