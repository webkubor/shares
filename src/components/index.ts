import {App}  from "vue"
import ColorBorder from "@/components/ColorBorder.vue";
import ColorBtn from "@/components/ColorBtn.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import SpotlightCard from "@/components/SpotlightCard/index.vue";
import Timeline from "@/components/Timeline/index.vue";
import Tooltip from "@/components/tooltip.vue";

export default {
    install: (app:App) => {
      app.component('ColorBorder', ColorBorder)
      app.component('ColorBtn', ColorBtn)
      app.component('CustomSelect', CustomSelect)
      app.component('SpotlightCard', SpotlightCard)
      app.component('Timeline', Timeline)
      app.component('Tooltip', Tooltip)
    }
  }
  