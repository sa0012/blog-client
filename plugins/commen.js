import Vue from 'vue'
// 解决在plugins vuex无法传值的问题
var resetSetItem = {
  install(Vue) {
    Vue.prototype.resetSetItem = (key, newVal) => {
      if (key === 'watchStorage') {
        console.log(1111111)
        // 创建一个StorageEvent事件
        var newStorageEvent = document.createEvent('StorageEvent');
        const storage = {
          setItem: function (k, val) {
            sessionStorage.setItem(k, val);

            // 初始化创建的事件
            newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

            // 派发对象
            window.dispatchEvent(newStorageEvent)
          }
        }
        console.log(key, newVal, 'key-value')
        return storage.setItem(key, newVal);
      }
    }

  }
}

export default () => {
  Vue.use(resetSetItem);
}
