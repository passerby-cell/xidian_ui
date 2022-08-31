//示例:user组件的仓库
import {
  reqUserInfoCreateImageProcess,
  reqUserInfoGetImageProcessList,
  reqUserInfoUpdateImageProcessStepOne,
  reqUserInfoUpdateImageProcessStepTwo,
  reqUserInfoUpdateImageProcessStepThree,
  //从api模块中引入请求
} from "@/api";
//准备actions,用于响应组件中的动作
const actions = {
  //通过api里面的接口函数发送请求,获取服务器的数据
  async getImageProcessList({ commit }) {
    let result = await reqUserInfoGetImageProcessList();
    if (result.code == 200) {
      commit("IMAGEPROCESSLIST", result.data);
    }
  },
};
//准备mutations,用于操作数据--state
const mutations = {
  IMAGEPROCESSLIST(state, imageProcessList) {
    state.imageProcessList = imageProcessList;
  },
};
//准备state,用于存储数据,要先准备仓库categoryList,才能存储数据
const state = {
  imageProcessList: [],
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
