//示例:user组件的仓库
import {
  reqChildFileList,
  //从api模块中引入请求
} from "@/api";
//准备actions,用于响应组件中的动作
const actions = {
  //通过api里面的接口函数发送请求,获取服务器的数据
  getParentFileList({ commit }, data) {
    commit("PARENTFILELIST", data);
  },
  async getChildFileList({ commit }, data) {
    let result = await reqChildFileList(
      data.dataId,
      data.filePath,
      data.current,
      data.size
    );
    if (result.code == 200) {
      commit("PAGENUM", result.data.current);
      commit("FILEPATH", result.data.filePath);
      commit("CHILDFILELIST", result.data.fileList);
      commit("PAGESIZE", result.data.size);
      commit("TOATLRECORD", result.data.total);
    }
  },
};
//准备mutations,用于操作数据--state
const mutations = {
  PARENTFILELIST(state, parentFileList) {
    state.parentFileList = parentFileList;
  },
  PAGENUM(state, pageNum) {
    state.pageNum = pageNum;
  },
  FILEPATH(state, filePath) {
    state.filePath = filePath;
  },
  CHILDFILELIST(state, childFileList) {
    state.childFileList = childFileList;
  },
  PAGESIZE(state, pageSize) {
    state.pageSize = pageSize;
  },
  TOATLRECORD(state, totalRecord) {
    state.totalRecord = totalRecord;
  },
};
//准备state,用于存储数据,要先准备仓库categoryList,才能存储数据
const state = {
  parentFileList: [],
  childFileList: [],
  pageNum: 1,
  filePath: "",
  pageSize: "",
  totalRecord: "",
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
