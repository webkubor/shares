
import {  darkTheme, lightTheme } from "naive-ui";
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { GlobalThemeOverrides } from "naive-ui";
let local: any = reactive({
  theme: null,
  osTheme: "light",
});
let allThemeOverrides = ref({});

// 公共主题色及尺寸大小配置
const baseThemeOverrides: GlobalThemeOverrides = reactive({
  common: {
    fontWeightStrong: "600",
    successColor: "#30C0A2",
    successColorHover: "#54CCB0",
    successColorPressed: "#1E9C48",
    successColorSuppl: "rgba(47, 194, 91, 0.5)",

    primaryColorPressed: "#1865D9",
    primaryColorSuppl: "rgba(0, 97, 243, 0.5)",
    primaryColor: "#2354FF",
    primaryColorHover: "#4D79FF",

    infoColor: "#5E64DA",
    infoColorHover: "#878FE6",
    infoColorPressed: "#4446B3",
    infoColorSuppl: "rgba(94,100,218,0.5)",


    warningColor: "#FFB31C",
    warningColorHover: "#FFC745",
    warningColorPressed: "#D48806",
    warningColorSuppl: "rgba(250, 173, 20, 0.5)",

    errorColor: "#BA0006",
    errorColorHover: "#C72020",
    errorColorPressed: "#CF1322",
    errorColorSuppl: "rgba(208, 48, 80, 0.5)",
  },
  Space: {
    gapSmall: "4px 8px",
    gapMedium: "20px 12px", //默认 padding
    gapLarge: "12px 16px",
  },
  Button: {
    paddingMedium: "0 14px",
    textColorPrimary: "#ffffff",
    textColorHoverPrimary: "#ffffff"
  },
  Input: {
    heightMedium: "36px",
    borderRadius: "4px",
  },
  Select: {
    peers: {
      InternalSelection: {
        heightMedium: "36px",
        borderRadius: "4px",
      },
    },
  },
  Card: {
    paddingMedium: "20px"
  }
});
// 亮色
const themeOverridesLight: GlobalThemeOverrides = reactive({
  Card: {
    color: "#FFFFFF",
    titleTextColor: "#333333",
    textColor: "#333333",
    colorModal: "#EEEEEE"
  },
  Input: {
    textColor: "#333333",
    placeholderColor: "#999999",
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: "#333333",
        placeholderColor: "#999999",
      },
    },
  },
  DataTable: {
    thTextColor: "#333333",
    tdTextColor: "#333333",
    thColor: "#F1F5FA",
    tdColor: "#FFFFFF"
  },
  Menu: {
    itemTextColor: "#333333",
    itemTextColorHover: "#2354ff",
    itemTextColorHoverHorizontal: "#2354ff",
    itemTextColorActiveHoverHorizontal: "#333333",
    itemTextColorChildActiveHorizontal: "#2354ff",
    itemTextColorChildActiveHoverHorizontal: "#2354ff",
    itemTextColorActiveHorizontal: "#2354ff",
    itemTextColorHorizontal: "#333333",

    itemIconColor: "#333333",
    itemIconColorHoverHorizontal: "#2354ff",
    itemIconColorActiveHorizontal: "#2354ff",
    itemIconColorChildActiveHorizontal: "#2354ff",
    itemIconColorChildActiveHoverHorizontal: "#2354ff",
    itemIconColorActiveHover: "#2354ff",
    itemIconColorActiveHoverHorizontalInverted: "#2354ff",
    itemIconColorActiveHoverHorizontal: "#333333",
  },
  Dropdown: {
    optionTextColor: "#333333",
    optionTextColorActive: "#2354ff",
    optionColorHoverInverted: "#2354ff",
    optionColorActiveInverted: "#2354ff",
  },
  Divider: {
    color: "#e5e5e5"
  },
  Button: {
    border: "1px solid #E5E5E5",
    textColorPrimary: "#ffffff",
    textColorHoverPrimary: "#ffffff"
  },
});
// 暗色
const themeOverridesDark: GlobalThemeOverrides = reactive({
  Card: {
    color: "#171A1D",
    titleTextColor: "#ffffff",
    textColor: "#9A9999",
    colorModal: "#0C0E10"
  },
  Input: {
    textColor: "#ffffff",
    placeholderColor: "#9A9999",
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: "#ffffff",
        placeholderColor: "#9A9999",
      },
    },
  },
  DataTable: {
    thTextColor: "#ffffff",
    tdTextColor: "#ffffff",
    thColor: "#0C0E10",
    tdColor: "#171A1D"
  },
  Menu: {
    itemTextColor: "#9A9999",
    itemTextColorHover: "#ffffff",
    itemTextColorHoverHorizontal: "#ffffff",
    itemTextColorActiveHoverHorizontal: "#9A9999",
    itemTextColorChildActiveHorizontal: "#ffffff",
    itemTextColorChildActiveHoverHorizontal: "#ffffff",
    itemTextColorActiveHorizontal: "#ffffff",
    itemTextColorHorizontal: "#9A9999",

    itemIconColor: "#9A9999",
    itemIconColorHoverHorizontal: "#ffffff",
    itemIconColorActiveHorizontal: "#ffffff",
    itemIconColorChildActiveHorizontal: "#ffffff",
    itemIconColorChildActiveHoverHorizontal: "#ffffff",
    itemIconColorActiveHover: "#ffffff",
    itemIconColorActiveHoverHorizontalInverted: "#ffffff",
    itemIconColorActiveHoverHorizontal: "#9A9999",
  },
  Dropdown: {
    optionTextColor: "#9A9999",
    optionTextColorActive: "#ffffff",
    optionColorHoverInverted: "#ffffff",
    optionColorActiveInverted: "#ffffff",
    color: "#030303",
    optionColorActive: "#2354ff"
  },
  Divider: {
    color: "#272B30"
  },
  Button: {
    border: "1px solid #272B30",
    textColorPrimary: "#ffffff",
    textColorHoverPrimary: "#ffffff"
  },
  Popover: {
    color: "#030303"
  }
});


export function useTheme() {
     // 自动切换系统主题
     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  
    // 切换主题方法
    const switchTheme = (toDark = false) => {
      if (toDark) {
          local.theme = darkTheme;
          local.osTheme = "dark";
  
          // 确保替换或添加正确的类
          document.body.classList.remove("light_theme");
          document.body.classList.add("dark_theme");
          
          console.log(document.body.classList); // 调试输出
  
          allThemeOverrides.value = { ...baseThemeOverrides, ...themeOverridesDark };
      } else {
          local.theme = lightTheme;
          local.osTheme = "light";
  
          // 确保替换或添加正确的类
          document.body.classList.remove("dark_theme");
          document.body.classList.add("light_theme");
          
          console.log(document.body.classList); // 调试输出
  
          allThemeOverrides.value = { ...baseThemeOverrides, ...themeOverridesLight };
      }
  };

  // 初始化主题并监听系统主题变化
  const initTheme = () => {
    if (mediaQuery.matches) {
        switchTheme(true);  // 系统默认暗色
    } else {
        switchTheme(false); // 系统默认亮色
    }

    // 监听系统主题变化
    mediaQuery.addEventListener("change", (event) => {
        switchTheme(event.matches);
    });
};


  // 组件卸载时移除事件监听
  onMounted(() => initTheme());
  onBeforeUnmount(() => mediaQuery.removeEventListener("change", switchTheme));

  return {
    allThemeOverrides,
    switchTheme,
    initTheme,
    local,
  };
}



