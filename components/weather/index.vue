<template>
  <div class="weather">
    <el-row>
      <el-col :span="12">
        <i class="el-icon-location"></i>
        <!-- <span class="city">{{ weather.realtime.city_name }}</span> -->
        <span class="change">[切换]</span>
      </el-col>
    </el-row>
    <!-- <div
          bg-name="night"
          class="op_weather4_twoicon_bg"
          style="background-image: -webkit-linear-gradient(top, rgb(24, 50, 89), rgb(52, 130, 186)); height: 422px; z-index: 1; opacity: 1; display: block;"
    ></div>-->
  </div>
</template>

<script>
import $http from "~/plugins/axios";
export default {
  data() {
    return {
      showDate: "",
      weather: {}
    };
  },
  methods: {
    queryWeather() {
      $http.get("/weather/query").then(res => {
        // this.weather = Object.assign({}, res.data.result);
      });
    }
  },
  mounted() {
    this.queryWeather();
  }
};
</script>

<style lang="scss" scoped>
</style>
