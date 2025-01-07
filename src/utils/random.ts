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
    window.$message?.success('Both min and max should be numbers.')
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
export function getCommonColor() {
  // 生成随机的 R、G、B 分量
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  
  // 补足不足的位数
  return '#' + '0'.repeat(6 - randomColor.length) + randomColor;
}


/**
 * 将HSL颜色值转换为HEX格式
 * @param h 色相 (0-360)
 * @param s 饱和度 (0-100)
 * @param l 亮度 (0-100)
 * @returns HEX格式颜色字符串
 */
const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  
  return `#${f(0)}${f(8)}${f(4)}`;
};


/**
 * 生成一个适合深色主题的随机颜色
 * @param minLightness 最小亮度值，默认50（范围0-100）
 * @returns 返回一个HSL格式的颜色字符串
 */
export const getRandomColor = (minLightness = 50) => {
  // 生成随机色相（0-360度）
  const hue = Math.floor(Math.random() * 360);
  
  // 生成随机饱和度（50-100%），确保颜色足够鲜艳
  const saturation = Math.floor(Math.random() * 50) + 50;
  
  // 生成随机亮度，确保不低于最小亮度值
  // 亮度范围：minLightness 到 100%
  const lightness = Math.floor(Math.random() * (100 - minLightness)) + minLightness;
  
  // 返回HSL格式的颜色字符串
  // return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
  // 将HSL转换为HEX格式
  return hslToHex(hue, saturation, lightness);
};