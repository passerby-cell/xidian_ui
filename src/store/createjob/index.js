const actions = {
  getQueueList({ commit }, QUEUELIST) {
    commit("QUEUELIST", QUEUELIST);
  },
  getWareHouseList({ commit }, WAREHOUSELIST) {
    commit("WAREHOUSELIST", WAREHOUSELIST);
  },
  getWareHouseImageList({ commit }, IMAGECATALODLIST) {
    commit("IMAGECATALODLIST", IMAGECATALODLIST);
  },
  getImage({ commit }, IMAGELIST) {
    commit("IMAGELIST", IMAGELIST);
  },
  getImageVersion({ commit }, IMAGEVERSIONLIST) {
    commit("IMAGEVERSIONLIST", IMAGEVERSIONLIST);
  },
  getDataSet({ commit }, data) {
    commit("DATA", data);
  },
};
//准备mutations,用于操作数据--state
const mutations = {
  DATA(state, data) {
    state.data = data;
  },
  QUEUELIST(state, queueList) {
    state.queueList = queueList;
  },
  WAREHOUSELIST(state, warehouseList) {
    state.warehouseList = warehouseList;
  },
  IMAGECATALODLIST(state, imageCatalogList) {
    state.imageCatalogList = imageCatalogList;
  },
  IMAGELIST(state, imageList) {
    state.imageList = imageList;
  },
  IMAGEVERSIONLIST(state, imageVersionList) {
    state.imageVersionList = imageVersionList;
  },
};
//准备state,用于存储数据,要先准备仓库categoryList,才能存储数据
const state = {
  queueList: [],
  warehouseList: [],
  imageCatalogList: [{ catalogId: 0 }, { catalogId: 0 }],
  imageList: [],
  imageVersionList: [],
  data: [],
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
