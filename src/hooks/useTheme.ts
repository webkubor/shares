
import { reactive, onMounted, onBeforeUnmount } from "vue";
let local: any = reactive({ osTheme: "light" });

export function useTheme() {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const updateGiscusTheme = (t: 'light' | 'dark') => {
    const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement | null
    if (!iframe) return
    iframe.contentWindow?.postMessage({ giscus: { setConfig: { theme: t } } }, 'https://giscus.app')
  }

  const switchTheme = (toDark = false) => {
    if (toDark) {
      local.osTheme = "dark";
      document.body.classList.remove("light_theme");
      document.body.classList.add("dark_theme");
      updateGiscusTheme('dark')
    } else {
      local.osTheme = "light";
      document.body.classList.remove("dark_theme");
      document.body.classList.add("light_theme");
      updateGiscusTheme('light')
    }
  };

  const initTheme = () => {
    switchTheme(mediaQuery.matches);
    mediaQuery.addEventListener("change", (event) => {
      switchTheme(event.matches);
    });
  };

  onMounted(() => initTheme());
  onBeforeUnmount(() => mediaQuery.removeEventListener("change", switchTheme));

  return { switchTheme, initTheme, local };
}



