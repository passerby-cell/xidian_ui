/**
 * 添加 Cookie
 * @param {[string]} name       [Cookie 的名称]
 * @param {[string]} value      [Cookie 的值]
 * @param {[number]} daysToLive [Cookie 的过期时间]
 */
export const setCookie = (name, value, daysToLive) => {
  // 对 cookie 值进行编码以转义其中的分号、逗号和空格
  var cookie = name + "=" + encodeURIComponent(value);

  if (typeof daysToLive === "number") {
    /* 设置 max-age 属性 */
    cookie += "; max-age=" + daysToLive * 24 * 60 * 60;
  }
  document.cookie = cookie;
};

export const getCookie = (name) => {
  // 拆分 cookie 字符串
  var cookieArr = document.cookie.split(";");

  // 循环遍历数组元素
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    /* 删除 cookie 名称开头的空白并将其与给定字符串进行比较 */
    if (name == cookiePair[0].trim()) {
      // 解码cookie值并返回
      return decodeURIComponent(cookiePair[1]);
    }
  }
  // 如果未找到，则返回null
  return null;
};
//删除cookies

export const delCookie = () => {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--; )
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
  }
};
