//对api进行统一的管理
import apirequest from "./apiAjax";

export const reqThirdsix = (p) =>
  apirequest({
    url: "/third/dixiaomansix",
    method: "get",
    params: { p },
  });

export const reqThirdfive = (p, v) =>
  apirequest({
    url: "/third/dixiaomanfive",
    method: "get",
    params: { p, v },
  });

export const reqThirdfour = (p, v) =>
  apirequest({
    url: "/third/dixiaomanfour",
    method: "get",
    params: { p, v },
  });

export const reqThirdthree = (p) =>
  apirequest({
    url: "/third/dixiaomanthree",
    method: "get",
    params: { p },
  });

export const reqThirdtwo = () =>
  apirequest({
    url: "/third/dixiaomantwo",
    method: "get",
  });

export const reqThirdone = () =>
  apirequest({
    url: "/third/dixiaomanone",
    method: "get",
  });

export const reqDraw = (cc, vv, pp) =>
  apirequest({
    url: "/matlab/draw",
    method: "get",
    params: { cc, vv, pp },
  });

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
