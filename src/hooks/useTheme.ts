
import { useMessage, darkTheme, lightTheme } from "naive-ui";
import { reactive, ref } from "vue";
import { GlobalThemeOverrides } from "naive-ui";
let local: any = reactive({
  theme: null,
  osTheme: "light",
});
let allThemeOverrides = ref({});

// 公共主题色及尺寸大小配置
const themeOverrides: GlobalThemeOverrides = reactive({
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
  function swtichTheme() {
    if (local.osTheme === "dark") {
      local.theme = lightTheme;
      local.osTheme = "light";
      if (document.body.classList.contains("dark_theme")) {
        document.body.classList.remove("dark_theme");
        document.body.classList.add("light_theme");
        allThemeOverrides.value = Object.assign(themeOverridesLight, themeOverrides);
      }
    } else {
      local.theme = darkTheme;
      local.osTheme = "dark";
      document.body.classList.remove("light_theme");
      document.body.classList.add("dark_theme");
      window.$message?.success("白天不懂夜的黑~~")
      allThemeOverrides.value = Object.assign(themeOverridesDark, themeOverrides);
    }
  }


  function initTheme() {
    local.theme = lightTheme;
    local.osTheme = "light";
    document.body.classList.add("light_theme");
    allThemeOverrides.value = Object.assign(themeOverridesLight, themeOverrides);
  }

  return {
    allThemeOverrides,
    swtichTheme,
    initTheme,
    local,
  };
}





export let backgroundBg = [
  'https://cdn.pixabay.com/photo/2023/11/02/16/47/dawn-8361032_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/10/21/15/59/sun-1758348_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/01/08/09/33/jellyfish-7704800_1280.jpg'
]