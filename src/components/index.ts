import {App}  from "vue"
import ColorBorder from "@/components/ColorBorder.vue";
import ColorBtn from "@/components/ColorBtn.vue";

export default {
    install: (app:App) => {
      app.component('ColorBorder', ColorBorder)
      app.component('ColorBtn', ColorBtn)
    }
  }
  