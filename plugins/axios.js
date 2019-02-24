import axios from 'axios'
import qs from 'qs'
import config from './config'
import {
  getSession
} from '~/common/mutils';
import Vue from 'vue';

// 全局设置
axios.defaults.timeout = 10000; // 时间超时设置10s

// 创建一个axios的实列
const service = axios.create(config);

axios.interceptors.request.use = service.interceptors.request.use;

// request拦截器，每次发送请求的时候拦截下来
service.interceptors.request.use(
  config => {
    let token = '';
    try {
      token = JSON.parse(getSession('user')).token;
    } catch (e) {}
    if (token) {
      config.headers.Authorization = token;
    }
    if (config.method === 'post') config.data = qs.stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  // 除了200以外的请求到这里来，，这里的200不是我们设置的那个code200,,我这里是，没有登录才会不返回200
  error => {
    let {
      response
    } = error;
    if (response != null) {
      // 这里为什么处理401错误,详见，server/untils/token check_token这个函数
      if (response.status == 401) {
        let msg = response.data || '请重新登录!';
        new Vue().$message.error(msg);
        window.sessionStorage.clear(); // token过期,清除
        new Vue().prototype.isLogin = false;
        return Promise.reject(error.response);
      }
    } else {
      new Vue().$message.error('网络中断，请稍后重试！')
    }
  }
)

const get = (url, params = {}, method = 'get', headers) => new Promise((resolve, reject) => {
  let req = method === 'get' ? {
    params: params
  } : params
  url = '/api' + url;
  headers = headers && headers.headers ? headers.headers : {
    "Content-Type": "application/json; charset=utf-8"
  }
  service[method](url, req, headers).then(res => {
    if (res.code != 200) {
      new Vue().$message.error(res.msg)
    }
    resolve && res && typeof res !== 'undefined' && resolve(res)
  }, error => {
    reject && reject(error)
  })
});

const post = (url, params, headers) => get(url, params, 'post', headers);


export default {
  get,
  post
}
