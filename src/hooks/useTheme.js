/*
 * @Date: 2021-10-14 17:25:02
 * @LastEditTime: 2021-10-14 17:36:42
 */
import { darkTheme } from 'naive-ui'
import { ref } from 'vue'

let theme = ref(null)

export function useTheme() {

   function swtichTheme() {
       if (theme.value) {
         theme.value = null
       } else {
         theme.value = darkTheme
       }
       console.log("theme, 切换主题")
   }

   return {
    theme,
    swtichTheme
   }
}