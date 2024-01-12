/*
 * @Date: 2021-10-11 15:47:11
 * @LastEditTime: 2024-01-12 09:42:53
 */
import _ from "lodash";

/**
 * @description: judgeType
 * @param {*} target
 * @return {number, string, boolean, array, function,object, regexp, date}
 */
 export function judgeTypes (target) {
  return Object.prototype.toString.call(target).replace(/^\[object\s(\w+)\]$/, '$1').toLowerCase()
 //return Reflect.apply(Object.prototype.toString, target, []).replace(/^\[object\s(\w+)\]$/, '$1').toLowerCase()
 }



/**
 * @description: 长文本省略中间部分
 * @param {string} str 文本内容
 * @param {number} start 保留文本头部长度
 * @param {number} end 保留文本尾部长度
 * @return {string}
 */
 export function ellipsisStr(str, start = 6, end = 4) {
  if (typeof str === "string") {
    return str.slice(0, start) + "..." + str.slice(-end);
  }
  return str;
}



/**
 * @description: 是否开起禁止页面滚动，默认开始
 * @param {*} flag
 * @return {*}
 */
export function preventScroll(flag= true) {
  if (flag) {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      document.body.style.cssText += `
        position: fixed;
        width: 100vw;
        left: 0;
        top: ${-top}px;
    `
  } else {
      const top = document.body.style.top;
      document.body.style.cssText += `
        position: static;
    `;
      window.scrollTo(0, Math.abs(parseFloat(top)))
  }
}


/**
 * @description: open other URL (防拦截)
 * @param {*} url
 * @param {*} id
 * @return {*}
 */
export function openUrl(url, id = "default") {
  var a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("target", "_blank");
  a.setAttribute("id", id);
  // 防止反复添加
  if (!document.getElementById(id)) {
    document.body.appendChild(a);
  }
  a.click();
}



/**
 * @description: 截取金额数据(非四舍五入)
 * @param {*} number
 * @param {*} length
 * @return {*}
 */
 export function toFixed(number, length = 2) {
  return Math.floor(Math.pow(10, length) * number) / Math.pow(10, length);
}


/**
 * @description: 将科学记数法转化正常计数
 * @param {*} num
 * @return {*}
 */
 function _toNonExponential(num) {
  var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return num.toFixed(Math.max(0, (m[1] || "").length - m[2]));
}