
import MagicCard from '@/components/MagicCard.vue'
import Moon from '@/components/Moon.vue'
import ColorCard from '@/components/ColorCard.vue'
import scrollRow from '@/components/scrollRow.vue';

export default {
  install: (app) => {
    app.component('Moon', Moon)
    app.component('scrollRow', scrollRow)
    app.component('ColorCard', ColorCard)
    app.component('MagicCard', MagicCard)
  }
}
