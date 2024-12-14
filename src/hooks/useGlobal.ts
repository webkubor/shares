import { reactive } from "vue";

// 全局状态
let appConfig = reactive({
  isPcModel: true, // 是否为 PC 端
  isPortrait: true, // 是否为竖屏状态，仅在移动端有效
});

// 判断是否为移动端
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent) || document.documentElement.clientWidth < 768;
}

// 处理设备类型及屏幕方向
function handleDeviceType() {
  if (isMobile()) {
    appConfig.isPcModel = false;
    handleOrientation(); // 如果是移动端，处理屏幕方向
    watchOrientationChange(); // 开启屏幕方向监听
  } else {
    appConfig.isPcModel = true;
    appConfig.isPortrait = true; // PC 端默认不关心横竖屏
  }
}

// 处理屏幕方向
function handleOrientation() {
  if (!appConfig.isPcModel) {
    const orientation = window.screen.orientation?.type || "";
    if (orientation.includes("portrait")) {
      appConfig.isPortrait = true;
      console.log("竖屏状态");
    } else if (orientation.includes("landscape")) {
      appConfig.isPortrait = false;
      console.log("横屏状态");
    }
  }
}

// 监听屏幕方向变化
function watchOrientationChange() {
  if (!appConfig.isPcModel && window.screen.orientation) {
    window.screen.orientation.addEventListener("change", handleOrientation);
  } else if (!appConfig.isPcModel) {
    // Fallback 处理（旧版浏览器）
    window.addEventListener("resize", handleOrientation);
  }
}

// 初始化
function init() {
  handleDeviceType(); // 初始化设备类型和屏幕方向
  window.addEventListener("resize", handleDeviceType); // 监听设备宽度变化
}

// 导出方法
export function useGlobal() {
  return {
    appConfig,
    init,
  };
}