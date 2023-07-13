const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false, // 关闭语法检测
  // 开启代理服务器
  devServer: {
    // 修改项目的端口号
    port: 10086,
    // 代理服务器可以将路由中的指定前缀转发到指定的后端服务器中
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080",
        ws: true, // 是否启用websockets
        changeOrigin: true, // 代理时是否更改host
        pathRewrite: {
          "^/api": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        },
        timeout: 36000000,
      },
    },
  },
});
