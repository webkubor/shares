/*
 * @Date: 2021-10-15 11:39:34
 * @LastEditTime: 2024-04-26 16:37:15
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






export function createRandomNum(min =0, max= 111) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    window.$message('Both min and max should be numbers.')
    throw new Error('Both min and max should be numbers.');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
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


/**
 * @description: 16777215 是 0xFFFFFF 的十进制表示，而 0xFFFFFF 是 RGB 颜色空间中最大的可表示的白色
 * @return {*}
 */
export function getRandomColor() {
  // 生成随机的 R、G、B 分量
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  
  // 补足不足的位数
  return '#' + '0'.repeat(6 - randomColor.length) + randomColor;
}