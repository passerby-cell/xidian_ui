import Vue from "vue";
import Vuex from "vuex";
//引入各存储模块
import Job from "./job";
import File from "./file";
import ResultFile from "./resultfile";
import User from "./user";
import Image from "./image";
import CreateJob from "./createjob";
import ImageProcess from "./imageprocess";
Vue.use(Vuex);

//创建并暴露store
export default new Vuex.Store({
  modules: {
    Job,
    File,
    User,
    Image,
    ResultFile,
    CreateJob,
    ImageProcess,
  },
});
