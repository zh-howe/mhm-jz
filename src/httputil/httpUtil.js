/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-14 09:28:41
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-10-22 18:41:26
 */
import axios from 'axios'
import ApiConfig from '../../config/api.config.js'

// 设置请求头
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = true
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'
axios.defaults.withCredentials = false

// 请求域名
axios.defaults.baseURL = ApiConfig.baseURL
// axios.defaults.baseURL = '/api'

// 请求超时时间
axios.defaults.timeout = 20000

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 打开加载遮罩
    // console.log('在请求之前执行')
    return Promise.resolve(config)
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 关闭加载遮罩
    // console.log('请求成功')
    return Promise.resolve(response)
  },
  error => {
    // 关闭加载遮罩
    if (error.status === 500) {
      console.log(error)
    }
    if (error.status === 404) {
      console.log(error)
    }
    return Promise.reject(error)
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export let get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export let post = (url, params, responseType) => {
  return new Promise((resolve, reject) => {
    axios({method: 'post', url: url, data: params, responseType: responseType || 'json'})
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * all方法，对应all请求
 * @param {List} queryList [多个请求的url地址和参数的集合]
 */
export let all = (queryList) => {
  let query = queryList.map((item) => {
    return axios.get(item.url, { params: item.params })
  })
  return new Promise((resolve, reject) => {
    axios.all(query)
      .then((iterable) => {
        resolve(iterable)
      }).catch(err => {
        reject(err.data)
      })
  })
}
