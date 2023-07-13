import Vue from "vue";
import App from "./App.vue";
import store from "@/store/index";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import "animate.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import router from "@/router";
import dataV from "@jiaminghi/data-view";

Vue.use(dataV);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueAxios, axios); // 使用 axios 插件
ElementUI.Dialog.props.closeOnClickModal.default = false;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
