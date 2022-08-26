//对api进行统一的管理
import apirequest from "./apiAjax";
import iderequest from "./ideAjax";
import userInforequest from "./userInfoAjax";
import qs from "qs";

export const reqUserInfoUploadFile = (file) =>
  userInforequest({
    url: "/icon/upload",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      file,
    },
  });
export const reqUserInfoUpdateGender = (sex) =>
  userInforequest({
    url: "/user/updategender",
    method: "PUT",
    params: { sex },
  });
export const reqUserInfoRegist = (data) =>
  userInforequest({
    url: "/user/regist",
    method: "POST",
    data,
  });
export const reqUserInfoLogin = (data) =>
  userInforequest({
    url: "/user/login",
    method: "POST",
    data,
  });

export const reqIdeLogin = ({ name, password }) =>
  iderequest({
    url: "/node-manager/user/login",
    method: "POST",
    // headers: {
    //   "content-type": "application/x-www-form-urlencoded",
    // },
    data: qs.stringify({
      name,
      password,
    }),
  });
export const reqIdeRegister = ({ name, password }) =>
  iderequest({
    url: "/node-manager/user/register",
    method: "POST",

    data: qs.stringify({
      name,
      password,
    }),
  });
export const reqIdeStart = () =>
  iderequest({
    url: "/node-manager/workspace/start",
    method: "POST",
    withCredentials: true,
  });
export const reqIdeStop = () =>
  iderequest({
    url: "/node-manager/workspace/stop",
    method: "POST",
    withCredentials: true,
  });
export const reqCreateIDE = () =>
  iderequest({
    url: "/node-manager/workspace",
    method: "POST",
    withCredentials: true,
  });
// 登录接口
export const reqUserLogin = (data) =>
  apirequest({
    url: "/paas-web/upmstreeapi/login",
    method: "POST",
    data,
  });
export const reqUserToken = (code) =>
  apirequest({
    url: "/paas-web/upmstreeapi/accessToken",
    method: "get",
    params: {
      code,
    },
  });

export const reqJobList = (data) =>
  apirequest({
    url: "/paas-web/bocapi/volcano/v3.3/vcJob/list",
    method: "post",
    data,
  });

export const reqDeleteJob = (clusterId, vcJobId) =>
  apirequest({
    url: "/paas-web/bocapi/volcano/v3.3/vcJob/delete",
    method: "post",
    data: {
      clusterId,
      vcJobId,
    },
  });

export const reqParentFile = (type, self, isPlatform) =>
  apirequest({
    url: "/paas-web/bocapi/dataBcc/list",
    method: "get",
    params: {
      type,
      self,
      isPlatform,
    },
  });

export const reqChildFileList = (dataId, filePath, current, size) =>
  apirequest({
    url: "/paas-web/bocapi/fileBcc/pageList",
    method: "get",
    params: {
      dataId,
      filePath,
      current,
      size,
    },
  });

export const reqCreateParentFile = (name, remark, storageId, type) =>
  apirequest({
    url: "/paas-web/bocapi/dataBcc/add",
    method: "post",
    data: {
      name,
      remark,
      storageId,
      type,
    },
  });

export const reqDeleteParentFile = (id) =>
  apirequest({
    url: `/paas-web/bocapi/dataBcc/${id}`,
    method: "delete",
  });

export const reqUpdateParentFileName = (id, name, remark, storageId, type) =>
  apirequest({
    url: "/paas-web/bocapi/dataBcc/update",
    method: "put",
    data: {
      id,
      name,
      remark,
      storageId,
      type,
    },
  });

export const reqUpdateChildFileName = (dataId, filePath, fileName, newName) =>
  apirequest({
    url: "/paas-web/bocapi/fileBcc/rename",
    method: "get",
    params: {
      dataId,
      filePath,
      fileName,
      newName,
    },
  });

export const reqCreateChildFolder = (dataId, filePath, folderName, desc) =>
  apirequest({
    url: "/paas-web/bocapi/fileBcc/createFolder",
    method: "get",
    params: {
      dataId,
      filePath,
      folderName,
      desc,
    },
  });
export const reqDownloadChildFile = (fileName, dataId, filePath, fileType) =>
  apirequest({
    url: "/paas-web/bocapi/fileBcc/download",
    method: "get",
    params: {
      fileName,
      dataId,
      filePath,
      fileType: 1,
    },
  });

export const reqQueryZipChildFileStatus = (filePath) =>
  apirequest({
    url: "/paas-web/bocapi/fileBcc/status",
    method: "get",
    params: {
      filePath,
    },
  });

export const reqDeleteChildFile = (dataId, fileList, filePath) =>
  apirequest({
    url: "/paas-web/bocapi/fileBcc/deleteFiles",
    method: "post",
    data: {
      dataId,
      fileList,
      filePath,
    },
  });

export const reqUploadChildFile = (
  currentChunkSize,
  totalSize,
  identifier,
  filename,
  relativePath,
  filePath,
  dataId,
  file
) =>
  apirequest({
    url: "/paas-web/bocapi/fileBcc/upload",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      chunkNumber: "1",
      chunkSize: "2048000",
      currentChunkSize,
      totalSize,
      identifier,
      filename,
      relativePath,
      totalChunks: "1",
      filePath,
      rootPath: "/opt/bcc/storage1/",
      dataId,
      file,
    },
  });

export const reqImagelIST = (
  currPageNum,
  imageCatalogId,
  imageCatalogType,
  imageName,
  pageSize,
  warehouseId
) =>
  apirequest({
    url: "/paas-web/bocapi/image/v2.3/queryRegImageList",
    method: "post",
    data: {
      currPageNum,
      imageCatalogId,
      imageCatalogType,
      imageName,
      pageSize,
      warehouseId,
    },
  });

export const reqImageVersionlIST = (imageName) =>
  apirequest({
    url: "/paas-web/bocapi/image/v2.3/queryRegImageVersionList",
    method: "post",
    data: {
      currPageNum: 1,
      imageName,
      pageSize: 1000,
    },
  });

export const reqImageOverview = (envId) =>
  apirequest({
    url: "/paas-web/bocapi/warehouse/v2.3/overview",
    method: "post",
    data: {
      envId: envId || 1,
    },
  });
export const reqJobInfoList = (
  clusterId,
  currPageNum,
  nodeName,
  pageSize,
  podName,
  vcJobName
) =>
  apirequest({
    url: "/paas-web/bocapi/volcano/v3.3/pod/info1",
    method: "post",
    data: {
      clusterId,
      currPageNum,
      nodeName,
      pageSize,
      podName,
      queueName: "default",
      vcJobName,
    },
  });
//获取镜像列表
export const reqImage = (imageCatalogId) =>
  apirequest({
    url: "/paas-web/bocapi/image/v2.3/queryRegImages",
    method: "post",
    data: {
      imageCatalogId,
    },
  });
//获取队列列表
export const reqQueueList = () =>
  apirequest({
    url: "/paas-web/bocapi/volcano/v3.3/queue/list",
    method: "post",
    data: {
      currPageNum: 1,
      envId: 1,
      pageSize: 1000,
    },
  });
//获取仓库列表
export const reqWareHouseList = (clusterId) =>
  apirequest({
    url: "/paas-web/bocapi/warehouse/v2.3/getList",
    method: "post",
    data: {
      clusterId,
      envId: 1,
      types: ["Registry", "Harbor", "Artifactory"],
    },
  });

//获取仓库下镜像列表
export const reqWareHouseImageList = (warehouseId) =>
  apirequest({
    url: "/paas-web/bocapi/imageCatalog/v3.0/list",
    method: "post",
    data: {
      envId: 1,
      warehouseId,
      withPublic: true,
    },
  });
//获取镜像版本列表
export const reqImageVersion = (imageName) =>
  apirequest({
    url: "/paas-web/bocapi/image/v2.3/queryRegImageVersionList",
    method: "post",
    data: {
      imageName,
    },
  });

export const reqDataSet = (type) =>
  apirequest({
    url: "/paas-web/bocapi/dataBcc/list",
    method: "get",
    params: {
      type,
      self: 0,
    },
  });

export const reqCreateJob = ({ target, vcJob, tasks }) =>
  apirequest({
    url: "/paas-web/bocapi/volcano/v3.3/vcJob/create",
    method: "post",
    data: {
      target,
      vcJob,
      tasks,
    },
  });

export const reqStartJob = (clusterId, vcJobId) =>
  apirequest({
    url: "/paas-web/bocapi/volcano/v3.3/vcJob/start",
    method: "post",
    data: {
      clusterId,
      vcJobId,
    },
  });

export const reqVerifyPasswd = (oldPassword) =>
  apirequest({
    url: "/paas-web/upmstreeapi/login/password",
    method: "get",
    params: {
      oldPassword,
    },
  });
export const reqUpdateUserPassword = (data) =>
  apirequest({
    url: "/paas-web/upmstreeapi/login/password",
    method: "PUT",
    data,
  });
export const reqUpdateUserInfo = (data) =>
  apirequest({
    url: "/paas-web/upmstreeapi/core/account",
    method: "put",
    data,
  });
