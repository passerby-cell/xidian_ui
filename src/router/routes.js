//引入路由的组件
import Login from "@/pages/Login";
import Job from "@/pages/Job";
import Data from "@/pages/Data";
import Images from "@/pages/Images";
import StandardJob from "@/pages/CreateJob";
import ResultData from "@/pages/ResultData";
import JobInfo from "@/pages/JobInfo";
import Ide from "@/pages/Ide";
import User from "@/pages/user";
export default [
  // ?:用于指定params参数可传可不传,没有问号时,不传params参数时路径会出现丢失的情况
  {
    name: "login",
    path: "/login",
    component: Login,
    meta: {
      show: false,
    },
  },
  {
    name: "userinfo",
    path: "/userinfo",
    component: User,
    meta: {
      show: true,
      requireAuth: true, // 配置此条，进入页面前判断是否需要登陆
    },
  },
  {
    name: "standardjob",
    path: "/standardjob",
    component: StandardJob,
    meta: {
      show: true,
      requireAuth: true, // 配置此条，进入页面前判断是否需要登陆
    },
  },
  {
    name: "ide",
    path: "/ide",
    component: Ide,
    meta: {
      show: true,
      requireAuth: true, // 配置此条，进入页面前判断是否需要登陆
    },
  },
  {
    name: "jobInfo",
    path: "/jobinfo/:index",
    component: JobInfo,
    meta: {
      show: true,
      requireAuth: true, // 配置此条，进入页面前判断是否需要登陆
    },
  },
  {
    name: "job",
    path: "/job",
    component: Job,
    meta: {
      show: true,
      requireAuth: true, // 配置此条，进入页面前判断是否需要登陆
    },
  },
  {
    name: "images",
    path: "/images",
    component: Images,
    meta: {
      show: true,
      requireAuth: true, // 配置此条，进入页面前判断是否需要登陆
    },
  },
  {
    name: "data",
    path: "/data",
    component: Data,
    meta: {
      show: true,
      requireAuth: true, // 配置此条，进入页面前判断是否需要登陆
    },
  },
  {
    name: "resultdata",
    path: "/resultdata",
    component: ResultData,
    meta: {
      show: true,
      requireAuth: true, // 配置此条，进入页面前判断是否需要登陆
    },
  },
  {
    path: "/*",
    redirect: "/login",
  },
];
