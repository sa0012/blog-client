import axios from 'axios'
import qs from 'qs'
import config from './config'
import { getSession } from '~/common/mutils';
import Vue from 'vue';

if (process.server) {
  config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 7778}`
}

const service = axios.create(config)

// POST 传参序列化
service.interceptors.request.use(
  config => {
    let token = '';
    try {
      token = JSON.parse(getSession('user')).token;
    } catch(e) {}
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
// 返回状态判断
service.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    let {
      response
    } = error;
    if (response != null) {
      // 这里为什么处理401错误,详见，server/untils/token check_token这个函数
      if (response.status == 401) {
        let msg = response.data || '请重新登录!';
        new Vue().$message.error(msg)
        window.sessionStorage.clear() // token过期,清除
        return Promise.reject(error.response);
      }
    } else {
      new Vue().$message.error('网络中断，请稍后重试！')
    }
  }
)

export default {
  get: (url, params = {}, method = 'get', headers) => new Promise((resolve, reject) => {
    let req = method === 'get' ? {
      params: params
    } : params
    url = '/api' + url;
    headers = headers && headers.headers ? headers.headers : {
      "Content-Type": "application/json; charset=utf-8"
    }
    service[method](url, req, headers).then(res => {
      console.log(res, 'getREsponse')
      if (res.code != 200) {
        new Vue().$message.error(res.msg)
      }
      resolve && res && typeof res !== 'undefined' && resolve(res.data)
    }, error => {
      reject && reject(error)
    })
  }),
  post: (url, params = {}, method = 'post', headers) => new Promise((resolve, reject) => {
    let req = method === 'get' ? {
      params: params
    } : params
    url = '/api' + url;
    headers = headers && headers.headers ? headers.headers : {
      "Content-Type": "application/json; charset=utf-8",
    }
    console.log(headers, 'headers')
    service[method](url, req, headers).then(res => {
      if (res.code != 200) {
        new Vue().$message.error(res.msg)
      }
      console.log(res, 'post')
      resolve && res && typeof res !== 'undefined' && resolve(res)
    }, error => {
      reject && reject(error)
    })
  }),
}
