import Vue from "vue";
import App from "./App.vue";
import store from "@/store/index";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import "animate.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as echarts from "echarts";

import "default-passive-events";

//引入swiper样式
import "swiper/css/swiper.css";

import router from "@/router";
//代码高亮文件引入
import hljs from "highlight.js";
//样式文件,这里我选的是sublime样式，文件里面还有其他样式可供选择
import "highlight.js/styles/monokai-sublime.css";

Vue.directive("highlight", function (el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
});
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueAxios, axios); // 使用 axios 插件

Vue.prototype.$echarts = echarts;

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
  if (to.name === "login" && localStorage.getItem("token")) {
    next({
      path: "/job",
    });
  }
  next();
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
