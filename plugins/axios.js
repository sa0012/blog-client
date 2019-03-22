// import axios from 'axios'
import qs from 'qs'
import config from './config'
import {
  getSession
} from '~/common/mutils';
import Vue from 'vue';

// // 全局设置
// axios.defaults.timeout = 10000; // 时间超时设置10s
// if (process.server) {
//   // axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api`
//   axios.defaults.baseURL = 'http://127.0.0.1:7778/api'
// }

// // 创建一个axios的实列
// const service = axios.create(config);

// axios.interceptors.request.use = service.interceptors.request.use;
// console.log(process.server, 'process')

// // axios.defaults.baseURL = 'http://127.0.0.1:7778/api'

// // request拦截器，每次发送请求的时候拦截下来
// service.interceptors.request.use(
//   config => {
//     // let token = '';
//     // try {
//     //   token = JSON.parse(getSession('user')).token;
//     // } catch (e) {}
//     // if (token) {
//     //   config.headers.Authorization = token;
//     // }
//     if (config.method === 'post') config.data = qs.stringify(config.data)
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// // respone拦截器
// service.interceptors.response.use(
//   response => {
//     return response.data;
//   },
//   // 除了200以外的请求到这里来，，这里的200不是我们设置的那个code200,,我这里是，没有登录才会不返回200
//   error => {
//     let {
//       response
//     } = error;
//     if (response != null) {
//       // 这里为什么处理401错误,详见，server/untils/token check_token这个函数
//       if (response.status == 401) {
//         let msg = response.data || '请重新登录!';
//         new Vue().$message.error(msg);
//         // window.sessionStorage.clear(); // token过期,清除
//         // new Vue().resetSetItem('watchStorage', JSON.stringify({ test: 'user' }))
//         return Promise.reject(error.response);
//       }
//     } else {
//       new Vue().$message.error('网络中断，请稍后重试！')
//     }
//   }
// )

// const get = (url, params = {}, method = 'get', headers) => new Promise((resolve, reject) => {
//   let req = method === 'get' ? {
//     params: params
//   } : params
//   url = 'http://127.0.0.1:7778/api' + url;
//   headers = headers && headers.headers ? headers.headers : {
//     "Content-Type": "application/json; charset=utf-8"
//   }
//   service[method](url, req, headers).then(res => {
//     if (res.code != 200) {
//       new Vue().$message.error(res.msg)
//     }
//     resolve && res && typeof res !== 'undefined' && resolve(res)
//   }, error => {
//     reject && reject(error)
//   })
// });

// const post = (url, params, headers) => get(url, params, 'post', headers);


// export default {
//   get,
//   post
// }


export default function ({
  $axios,
  redirect
}) {
  // onRequest(config)
  // onResponse(response)
  // onError(err)
  // onRequestError(err)
  // onResponseError(err)
  // let service = $axios.create
  $axios.onRequest(config => {
    if (process.browser) {
      let token = '';
      try {
        token = JSON.parse(getSession('user')).token;
      } catch (e) {}
      if (token) {
        config.headers.Authorization = token;
      }
    }
    if (config.method === 'post') config.data = qs.stringify(config.data)
    // console.log('Making request to ' + config.url)
    return config
  })

  $axios.onResponse(config => {
    // console.log(config.data, 'config')
    return config.data;
  })

  $axios.onResponseError(error => {
    let {
      response
    } = error;
    if (response != null) {
      // 这里为什么处理401错误,详见，server/untils/token check_token这个函数
      if (response.status == 401) {
        let msg = response.data || '请重新登录!';
        if (process.browser) {
          new Vue().$message.error(msg);
          window.sessionStorage.clear(); // token过期,清除
          new Vue().resetSetItem('watchStorage', JSON.stringify({
            test: 'user'
          }))
        }
        return Promise.reject(error.response);
      }
    } else {
      new Vue().$message.error('网络中断，请稍后重试！')
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
