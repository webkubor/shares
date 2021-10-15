/*
 * @Date: 2021-10-15 11:39:34
 * @LastEditTime: 2021-10-15 11:39:35
 */

/**
 * @description: return RandomStr
 * @param {*}
 * @return {*}
 */
export function createRandomStr(len = 6) {
  var rdmString = "";
  for (
    ;
    rdmString.length < len;
    rdmString += Math.random().toString(36).substr(2)
  );
  return rdmString.substr(0, len);
}

/**
 * @description: 获取tag的随机状态
 * @param {*}
 * @return {*}
 */
export function getRandomType() {
  let typeList = ["success", "warning", "error", "info", ""];
  let index = Math.floor(Math.random() * typeList.length);
  return typeList[index];
}
