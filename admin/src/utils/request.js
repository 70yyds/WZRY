import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'
const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000,
});

// 请求拦截器

request.interceptors.request.use(function (config) {
  let defaultConfig = {}
  if (localStorage.getItem('token')) {
    defaultConfig.headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  else {
    defaultConfig.headers = {
    }
  }


  defaultConfig = Object.assign(config, defaultConfig)
  // 在发送请求之前做些什么
  return defaultConfig;
}, function (error) {

  return Promise.reject(error.response);
});

// 响应拦截器
request.interceptors.response.use(res => {
  // 对响应数据做点什么
  // toast1.clear()
  if (res.data.token) {
    localStorage.setItem('token', res.data.token)
  }
  return res;
}, error => {
  if (error.response.status == 422) {
    Vue.prototype.$message.error(error.response.data.message) //拿vue实例
  }
  if (error.response.status == 401) {
    Vue.prototype.$message.error(error.response.data.message) //拿vue实例
    router.push('/login')
  }
  return Promise.reject(error.response);
});


export default request