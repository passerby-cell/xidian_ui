import {
  reqSuanFaConfigList,
  reqSuanFaList,
  //从api模块中引入请求
} from "@/api";
//准备actions,用于响应组件中的动作
const actions = {
  //通过api里面的接口函数发送请求,获取服务器的数据
  async getSuanFaConfigList({ commit }) {
    let result = await reqSuanFaConfigList();
    if (result.code == 200) {
      commit("SUANFACONFIGLIST", result.data);
    }
  },
  async getSuanFaList({ commit }) {
    let result = await reqSuanFaList();
    if (result.code == 200) {
      commit("SUANFALIST", result.data);
    }
  },
};
//准备mutations,用于操作数据--state
const mutations = {
  SUANFACONFIGLIST(state, data) {
    state.SuanFaConfigList = data;
  },
  SUANFALIST(state, data) {
    state.SuanFaList = data;
  },
};
//准备state,用于存储数据,要先准备仓库categoryList,才能存储数据
const state = {
  SuanFaConfigList: [],
  SuanFaList: [],
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
