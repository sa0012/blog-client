import Vue from 'vue';

function add0(m) {
  return m < 10 ? '0' + m : m
}
export default () => {
  Vue.filter('dateformat', timestamp => {
    console.log(timestamp, 'timestamp')
    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var time = new Date(Number(timestamp));
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    if (hours < 10) {
      hours = '0' + hours;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    console.log(time, 'year')
    // return year + '年' + month + '月' + date + '日' + hours + '时' + minutes + '分' + seconds + '秒';
    return year + '-' + add0(month) + '-' + add0(date) + ' ' + hours + ':' + minutes + ':' + seconds;
  })
}
