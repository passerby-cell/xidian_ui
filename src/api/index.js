//对api进行统一的管理
import apirequest from "./apiAjax";

export const reqSuanFaList = () =>
  apirequest({
    url: "/algroithminfo",
    method: "get",
  });

export const reqSuanFaConfigList = () =>
  apirequest({
    url: "/savepath",
    method: "get",
  });

export const reqLoad = (num) =>
  apirequest({
    url: "/matlab/load",
    method: "get",
    params: { num },
  });

export const reqPCprocess = (num) =>
  apirequest({
    url: "/matlab/pcprocess",
    method: "get",
    params: { num },
  });

export const reqAddTarget = (num, snr) =>
  apirequest({
    url: "/matlab/addtarget",
    method: "get",
    params: { num, snr },
  });

export const reqBulidModel = (clun, clumode) =>
  apirequest({
    url: "/matlab/modeling",
    method: "get",
    params: { clun, clumode },
  });

export const reqtargetDetection = (clustermode, cyclenum, snr, clun) =>
  apirequest({
    url: "/matlab/objectdetection",
    method: "get",
    params: { clustermode, cyclenum, snr, clun },
  });
