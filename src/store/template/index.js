//示例:user组件的仓库
import {
  reqJobTemplates,
  reqJobTemplate,
  reqTaskTemplate
  //从api模块中引入请求
} from "@/api";
//准备actions,用于响应组件中的动作
const actions = {
  //通过api里面的接口函数发送请求,获取服务器的数据
  async getJobTemplates({ commit },data) {
    let result=await reqJobTemplates()
    if(result.success==true){
      commit("JOBTEMPLATES", result.rows);
    }
    
  },
  async getJobTemplate({ commit },data) {
    let result=await reqJobTemplate(data)
    if(result.code==200){
      commit("JOBTEMPLATE", result.data);
    }
    
  },
  async getTaskTemplate({ commit },data) {
    let result=await reqTaskTemplate(data)
    if(result.code==200){
      commit("TASKTEMPLATE", result.data);
    }
    
  },
 
};
//准备mutations,用于操作数据--state
const mutations = {
  JOBTEMPLATES(state, JobTemplates) {
    state.JobTemplates = JobTemplates;
  },
  JOBTEMPLATE(state, JobTemplate) {
    state.JobTemplate = JobTemplate;
  },
  TASKTEMPLATE(state, TaskTemplate) {
    state.TaskTemplate = TaskTemplate;
  },
};
//准备state,用于存储数据,要先准备仓库categoryList,才能存储数据
const state = {
  JobTemplates: [],
  JobTemplate:{},
  TaskTemplate:[],
};

//用于简化数据
const getters = {};

//创建并暴露store
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
