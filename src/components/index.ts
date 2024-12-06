import {App}  from "vue"
import ColorBorder from "@/components/ColorBorder.vue";

export default {
    install: (app:App) => {
      app.component('ColorBorder', ColorBorder)
    }
  }
  