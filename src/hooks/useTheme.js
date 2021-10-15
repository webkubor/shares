/*
 * @Date: 2021-10-14 17:25:02
 * @LastEditTime: 2021-10-15 16:17:05
 */
import { useMessage, darkTheme } from "naive-ui";
import { ref } from "vue";
let theme = ref(null);

export function useTheme() {
  const message = useMessage();
  function swtichTheme() {
    if (theme.value) {
      theme.value = null;
    } else {
      theme.value = darkTheme;
      message.success("白天不懂夜的黑");
    }
    console.log("theme, 切换主题");
  }

  return {
    theme,
    swtichTheme,
  };
}
