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
      timeArr: [],
      oldIndex: 0
    };
  },
  computed: {},
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
      console.log(this.timeArr, index, "timeArr");
      this.selectNav = this.timeNav[index];
      if (index === 0 && !this.timeArr[index + 1].showStatus) {
        this.timeArr.forEach((time, tIndex) => {
          this.timeArr[tIndex].showStatus = true;
        });
      } else if (index !== 0 && this.timeArr[index - 1].showStatus) {
        for (let i = 0; i < index; i++) {
          this.timeArr[i].showStatus = false;
        }
      } else if (index !== 0 && !this.timeArr[index - 1].showStatus) {
        for (let j = index; j < this.timeArr.length - 1; j++) {
          this.timeArr[j].showStatus = true;
        }
      } else if (index === 0 && this.timeArr[index + 1].showStatus) {
        this.timeArr[index].showStatus = true;
      }
      // if (index > 0) {
      //   let dom = document.getElementById(this.timeNav[index - 1] + "list");
      //   let height = $.getStyle(dom, "height").split("px")[0];
      //   this.backTop(dom, height, index);
      // }
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

<style type="text/css">
.op_weather4_twoicon {
  height: 282px;
}

.op_weather4_twoicon_bg {
  height: 404px;
}

.op_weather4_xiala {
  width: 100%;
  position: absolute;
  z-index: 5;
  top: 269px;
  font-family: "微软雅黑", "黑体", Arial;
}

.op_weather4_xltab ul li {
  width: 78px;
  list-style: none;
  float: left;
  background: rgba(255, 255, 255, 0.2);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr='#20ffffff', endColorstr='#20ffffff');
  text-align: center;
  line-height: 26px;
  margin-right: 1px;
  font-size: 12px;
  cursor: pointer;
  display: block;
}

.op_weather4_xltab ul li.op_weather4_xlactive {
  height: 27px;
  background: rgba(255, 255, 255, 0.1);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr=#10ffffff, endColorstr=#10ffffff);
}

.op_weather4_xlcon {
  background: rgba(255, 255, 255, 0.1);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr=#10ffffff, endColorstr=#10ffffff);
  height: 114px;
}

.op_weather4_xlleft {
  float: left;
  height: 86px;
  width: 35px;
  font-size: 10px;
  color: #fff;
  position: absolute;
  top: 0px;
  left: 0px;
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -o-transform: scale(0.8);
}

.op_weather4_xlleft ul li {
  padding-top: 4px;
  padding-top: 2px\9;
  list-style: none;
  text-align: right;
}

.op_weather4_xltimeul {
  clear: both;
  font-size: 12px;
  padding-left: 42px;
  padding-top: 2px\9;
}

.op_weather4_xltimeul ul {
  width: 520px;
}

.op_weather4_xltimeul ul li {
  float: left;
  list-style: none;
  width: 56px;
  text-align: left;
  color: #fff;
}

.op_weather4_xltimeul-s ul li {
  float: left;
  list-style: none;
  width: 56px;
  text-align: left;
  color: #fff;
}

.op_weather4_xltimeul-s ul {
  width: 520px;
}

.op_weather4_yuandian {
  background: url("//www.baidu.com/aladdin/img/new_weath/ico.png") no-repeat;
}

.op_weather4_xllefts {
  font-size: 10px;
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -o-transform: scale(0.8);
  position: absolute;
  top: -14px;
  left: -11px;
  color: #fff;
  width: 40px;
  text-align: center;
}

.op_weather4_xlqyyc {
  float: left;
  width: 40px;
  height: 106px;
  position: absolute;
  top: 0;
  cursor: pointer;
  z-index: 9;
}

.op_weather4_xltip {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  font-size: 12px;
}

.op_weather4_xlico {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: transparent transparent white transparent;
  border-style: solid;
  border-width: 0 5px 5px 5px;
  width: 0;
  height: 0;
  top: 1px;
  z-index: 2;
}

.op_weather4_xlcont {
  background: #fff;
  margin-top: 5px;
  color: #555;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.op_weather4_jsl {
  width: 20px;
  height: 114px;
  float: left;
}

.op_weather4_jsm {
  width: 498px;
  height: 84px;
  float: left;
  margin-top: 15px;
  font-size: 12px;
}

.op_weather4_jsm ul li {
  width: 55px;
  float: left;
  background: url("//www.baidu.com/aladdin/img/new_weath/icobg.png") no-repeat
    right 0;
}

.op_weather4_jsm span {
  display: block;
  text-align: center;
}

.op_weather4_jsr {
  width: 20px;
  height: 114px;
  float: left;
}

.op_weather4_jsm ul li .op_weather4_jsico {
  height: 24px;
  padding: 13px 0 13px 18px;
}

.op_weather4_jsiconborw0,
.op_weather4_jsiconborw1,
.op_weather4_jsiconborw2,
.op_weather4_jsiconborw3,
.op_weather4_jsiconborw4,
.op_weather4_jsiconborw5,
.op_weather4_jsiconborw6,
.op_weather4_jsiconborw7,
.op_weather4_jsiconborw8,
.op_weather4_jsiconborw9,
.op_weather4_jsiconborw10 {
  width: 18px;
  height: 23px;
  background: url("//www.baidu.com/aladdin/img/new_weath/icowater.png")
    no-repeat;
}

.op_weather4_jsiconborw0 {
  background-position: 0 0px;
}

.op_weather4_jsiconborw1 {
  background-position: 0 -33px;
}

.op_weather4_jsiconborw2 {
  background-position: 0 -66px;
}

.op_weather4_jsiconborw3 {
  background-position: 0 -99px;
}

.op_weather4_jsiconborw4 {
  background-position: 0 -132px;
}

.op_weather4_jsiconborw5 {
  background-position: 0 -165px;
}

.op_weather4_jsiconborw6 {
  background-position: 0 -198px;
}

.op_weather4_jsiconborw7 {
  background-position: 0 -231px;
}

.op_weather4_jsiconborw8 {
  background-position: 0 -264px;
}

.op_weather4_jsiconborw9 {
  background-position: 0 -297px;
}

.op_weather4_jsiconborw10 {
  background-position: 0 -330px;
}

.op_weather4_xlzs {
  width: 240px;
  float: left;
  margin-left: 17px;
  border-bottom: 1px solid #ddd;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  line-height: 32px;
  height: 32px;
  cursor: pointer;
}

.op_weather4_xlzstit {
  font-size: 16px;
}

.op_weather4_xlzstitdes {
  font-size: 12px;
}

.op_weather4_xlbornone {
  border-bottom: 0;
}

.op_weather4_xltop {
  padding-top: 8px;
  clear: both;
}

.op_weather4_xltiptitle {
  font-size: 14px;
  font-weight: bold;
  line-height: 24px;
}

.op_weather4_xltipcontent {
  line-height: 20px;
}

.op_weather4_xlopen {
  width: 100%;
  height: 29px;
  background: rgba(0, 0, 0, 0.1);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr=#10000000, endColorstr=#10000000);
  cursor: pointer;
  text-align: center;
  z-index: 6;
  padding-top: 3px;
}

.op_weather4_tipbtn {
  display: inline-block;
  padding: 2px 0;
  cursor: pointer;
}

.op_weather4_tipbtn span {
  display: inline-block;
}

.op_weather4_icobottom {
  background: url("//www.baidu.com/aladdin/img/new_weath/ico.png") 0 -188px no-repeat;
  width: 27px;
  height: 11px;
  display: inline-block;
}

.op_weather4_xlclose {
  height: 32px;
  cursor: pointer;
  text-align: center;
  z-index: 6;
}

.op_weather4_xlclose .op_weather4_icobottom {
  background: url("//www.baidu.com/aladdin/img/new_weath/ico.png") 0 -212px no-repeat;
}

.op_weather4_xlCanvascon1,
.op_weather4_xlCanvascon2 {
  position: relative;
  margin-left: 36px;
}

.op_weather4_jslNovalue {
  background: none;
  padding-top: 4px;
}

.op_weather4_xltab ul .op_weather4_temperature {
  width: 106px;
}
</style>

<style>
/** 插入过程 **/
.list-enter-active {
  transition: all 1s;
}
/** 移除过程 **/
.list-leave-active {
  transition: all 1s;
}
/*** 开始插入、移除结束的位置变化 ***/
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
