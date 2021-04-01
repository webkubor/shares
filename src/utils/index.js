/*
 * @Author: 王恩博 
 * @Date: 2021-04-01 11:53:50 
 * @Last Modified by: 王恩博
 * @Last Modified time: 2021-04-01 11:56:17
 * utils工具包
 */


export function is_wechat () {
  var ua = navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) == 'micromessenger';
}


// 类型判断-小写
// number
// string
// boolean
// array
// object
// regexp
// function
// date
function _judgeTypes (target) {
  return Object.prototype.toString.call(target).replace(/^\[object\s(\w+)\]$/, '$1').toLowerCase()
 //return Reflect.apply(Object.prototype.toString, target, []).replace(/^\[object\s(\w+)\]$/, '$1').toLowerCase()
 }


//打印随机数
 function createRandomStr(len = 6) {
  var rdmString = "";
  for (
    ;
    rdmString.length < len;
    rdmString += Math.random()
      .toString(36)
      .substr(2)
  );
  return rdmString.substr(0, len);
}