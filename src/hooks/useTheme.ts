
import { reactive, onMounted, onBeforeUnmount } from "vue";
let local: any = reactive({ osTheme: "light" });

export function useTheme() {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  let isInitialized = false;

  const updateGiscusTheme = (t: 'light' | 'dark') => {
    const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement | null
    if (!iframe) return
    iframe.contentWindow?.postMessage({ giscus: { setConfig: { theme: t } } }, 'https://giscus.app')
  }

  const switchTheme = (toDark = false) => {
    console.log(`[Theme] 切换主题: ${toDark ? '暗黑' : '亮色'}`)
    if (toDark) {
      local.osTheme = "dark";
      document.body.classList.remove("light_theme");
      document.body.classList.add("dark_theme");
      updateGiscusTheme('dark')
      console.log('[Theme] 已应用暗黑主题类名: dark_theme')
      console.log('[Theme] body类名:', document.body.className)
      console.log('[Theme] 当前背景色:', getComputedStyle(document.body).backgroundColor)
      console.log('[Theme] 当前文字色:', getComputedStyle(document.body).color)
      
      // 直接更新body的CSS变量作为后备方案 - 使用水泥灰色调
      document.body.style.setProperty('--bg-base', '#1a1a1a');
      document.body.style.setProperty('--text-primary', '#f8fafc');
      document.body.style.setProperty('--border-color', 'rgba(148, 163, 184, 0.1)');
      
      // 检查body是否有边框
      const bodyStyles = getComputedStyle(document.body);
      console.log('[Theme] body边框:', bodyStyles.border);
      console.log('[Theme] body边框颜色:', bodyStyles.borderColor);
      console.log('[Theme] body外边距:', bodyStyles.margin);
      
      console.log('[Theme] 直接设置body CSS变量为暗黑主题')
    } else {
      local.osTheme = "light";
      document.body.classList.remove("dark_theme");
      document.body.classList.add("light_theme");
      updateGiscusTheme('light')
      console.log('[Theme] 已应用亮色主题类名: light_theme')
      console.log('[Theme] body类名:', document.body.className)
      console.log('[Theme] 当前背景色:', getComputedStyle(document.body).backgroundColor)
      console.log('[Theme] 当前文字色:', getComputedStyle(document.body).color)
      
      // 直接更新body的CSS变量作为后备方案
      document.body.style.setProperty('--bg-base', '#fafbfc');
      document.body.style.setProperty('--text-primary', '#111827');
      document.body.style.setProperty('--border-color', 'rgba(17, 24, 39, 0.08)');
      
      // 检查body是否有边框
      const bodyStyles = getComputedStyle(document.body);
      console.log('[Theme] body边框:', bodyStyles.border);
      console.log('[Theme] body边框颜色:', bodyStyles.borderColor);
      console.log('[Theme] body外边距:', bodyStyles.margin);
      
      console.log('[Theme] 直接设置body CSS变量为亮色主题')
    }
  };

  const toggleTheme = () => {
    const isDark = local.osTheme === "dark";
    console.log(`[Theme] 手动切换主题: ${isDark ? '亮色' : '暗黑'}`)
    switchTheme(!isDark);
  };

  const initTheme = () => {
    if (isInitialized) {
      console.log('[Theme] 主题已经初始化，跳过重复初始化')
      return
    }
    
    console.log('[Theme] 初始化主题检测...')
    console.log(`[Theme] 系统主题偏好: ${mediaQuery.matches ? '暗黑' : '亮色'}`)
    console.log(`[Theme] 当前body类名: ${document.body.className}`)
    
    // 检查CSS变量是否正确设置
    const rootStyles = getComputedStyle(document.documentElement);
    console.log('[Theme] 根元素背景色:', rootStyles.getPropertyValue('--bg-base'));
    console.log('[Theme] 根元素文字色:', rootStyles.getPropertyValue('--text-primary'));
    
    // 检查body元素的样式
    const bodyStyles = getComputedStyle(document.body);
    console.log('[Theme] body背景色:', bodyStyles.backgroundColor);
    console.log('[Theme] body文字色:', bodyStyles.color);
    
    // 立即应用系统主题
    switchTheme(mediaQuery.matches);
    
    // 添加系统主题变化监听
    mediaQuery.addEventListener("change", (event) => {
      console.log(`[Theme] 检测到系统主题变化: ${event.matches ? '暗黑' : '亮色'}`)
      switchTheme(event.matches);
    });
    
    isInitialized = true;
    console.log('[Theme] 主题初始化完成')
  };

  onMounted(() => initTheme());
  onBeforeUnmount(() => mediaQuery.removeEventListener("change", switchTheme));

  return { switchTheme, initTheme, toggleTheme, local };
}



