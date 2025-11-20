import {App}  from "vue"
import ColorBorder from "@/components/ColorBorder.vue";
import ColorBtn from "@/components/ColorBtn.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import SpotlightCard from "@/components/SpotlightCard/index.vue";
import Tooltip from "@/components/tooltip.vue";
import KButton from "@/components/KButton.vue";
import KInput from "@/components/KInput.vue";
import KCard from "@/components/KCard.vue";
import KCheckbox from "@/components/KCheckbox.vue";
import KCollapse from "@/components/KCollapse.vue";



export default {
    install: (app:App) => {
      app.component('ColorBorder', ColorBorder)
      app.component('ColorBtn', ColorBtn)
      app.component('CustomSelect', CustomSelect)
      app.component('SpotlightCard', SpotlightCard)
      app.component('Tooltip', Tooltip)
      app.component('k-button', KButton)
      app.component('k-input', KInput)
      app.component('k-card', KCard)
      app.component('k-checkbox', KCheckbox)
      app.component('k-collapse', KCollapse)
      app.component('k-select', CustomSelect)
    }
  }
  