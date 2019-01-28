import axios from 'axios'
import qs from 'qs'

const hotName = location.hostname
if (hotName === 'localhost') {
  axios.defaults.baseURL = `//xxxx.com/api`
  axios.defaults.withCredentials = true
} else {
  axios.defaults.baseURL = `//${hotName}/api`
  axios.defaults.withCredentials = true
}
axios.defaults.baseURL = `//ask.hishixi.com/api`
axios.defaults.withCredentials = true
// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use(function (res) {
  return res.data
}, function (error) {
  return Promise.reject(error)
})


export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  // 获取导航信息
  check_code() {
    return axios.get('/other/checkcode')
  }
}
