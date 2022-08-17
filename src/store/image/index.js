//准备actions,用于响应组件中的动作
const actions = {
  //通过api里面的接口函数发送请求,获取服务器的数据
  getImageOverview({ commit }, { warehouseId, warehouseName, imageCatalogs }) {
    commit("WAREHOUSEID", warehouseId);
    commit("WAREHOUSENAME", warehouseName);
    commit("IMAGECATALOGS", imageCatalogs);
  },
  getImageList({ commit }, {imageList,totalCount,currPageNum}) {
    commit("IMAGELIST", imageList);
    commit("TOTALCOUNT", totalCount);
    commit("CURRPAGENUM", currPageNum);
  },
  getImageVersionList({ commit }, imageVersionList){
    commit("IMAGEVERSIONLIST", imageVersionList);
  },
};
//准备mutations,用于操作数据--state
const mutations = {
  WAREHOUSEID(state, warehouseId) {
    state.warehouseId = warehouseId;
  },
  WAREHOUSENAME(state, warehouseName) {
    state.warehouseName = warehouseName;
  },
  IMAGECATALOGS(state, imageCatalogs) {
    state.imageCatalogs = imageCatalogs;
  },
  IMAGELIST(state, imageList) {
    state.imageList = imageList;
  },
  TOTALCOUNT(state, totalCount) {
    state.totalCount = totalCount;
  },
  CURRPAGENUM(state, currPageNum) {
    state.currPageNum = currPageNum;
  },
  IMAGEVERSIONLIST(state, imageVersionList) {
    state.imageVersionList = imageVersionList;
  },
};
//准备state,用于存储数据,要先准备仓库categoryList,才能存储数据
const state = {
  warehouseId: 0,
  warehouseName: "",
  imageCatalogs: [],
  imageList: [],
  pageSize:10,
  totalCount:'',
  imageVersionList:[],
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
