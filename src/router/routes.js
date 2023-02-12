//引入路由的组件
import ZaBo from "@/pages/zabo";
import MuBiao from "@/pages/mubiao";
import Config from "@/pages/config";

export default [
  {
    name: "zabo",
    path: "/zabo",
    component: ZaBo,
    meta: {
      show: true,
      requireAuth: true, // 配置此条，进入页面前判断是否需要登陆
    },
  },
  {
    name: "mubiao",
    path: "/mubiao",
    component: MuBiao,
    meta: {
      show: true,
      requireAuth: true, // 配置此条，进入页面前判断是否需要登陆
    },
  },
  {
    name: "config",
    path: "/config",
    component: Config,
    meta: {
      show: true,
      requireAuth: true, // 配置此条，进入页面前判断是否需要登陆
    },
  },

  {
    path: "/*",
    redirect: "/zabo",
  },
];
