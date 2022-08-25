// 对axios二次封装
import axios from "axios";
//引入nprogress进度条
import nprogress from "nprogress";
//start:表示进度条开始 done:表示进度条结束
// 引入nprogress样式
import "nprogress/nprogress.css";

// 利用axios的create方法,创建一个axios实例
const request = axios.create({
  // 配置对象
  // 基础路径:发请求时路径中会出现/api
  baseURL: "/userInfo",
  // 请求超时的时间
  timeout: 50000,
});
// 请求拦截器
request.interceptors.request.use((config) => {
  // config:配置对象
  // 进度条开始
  nprogress.start();
  config.headers["userInfoToken"] = localStorage.getItem("userInfoToken");
  return config;
});
// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 成功的回调函数
    // 进度条结束
    nprogress.done();
    if (res.data.token) {
      localStorage.setItem("userInfoToken", res.data.token);
    }
    return res.data;
  },
  (error) => {
    // 失败的回调函数
    nprogress.done();
    //location.href = 'http://localhost:10086/#/login'
    return Promise.reject(new Error("fail"));
  }
);

export default request;
