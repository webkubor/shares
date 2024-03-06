/*
 * @Date: 2021-10-13 17:51:35
 * @LastEditTime: 2021-10-14 15:25:47
 */
import fly from "flyio";

//给所有请求添加自定义header-方式1
fly.config.headers["Access-Control-Allow-Origin"] = "*";
fly.config.timeout = 1000 * 10 // 10s

//添加请求拦截器
fly.interceptors.request.use((request) => {
  // 给所有请求添加自定义header-方式2
  // request.headers = {"Access-Control-Allow-Origin": "*"}
  //打印出请求体
  console.log(request.body);
  //终止请求
  //var err=new Error("xxx")
  //err.request=request
  //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return response.data;
  },
  (err) => {
    //发生网络错误后会走到这里
    return Promise.resolve(err);
  }
);

export default fly;
