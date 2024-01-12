
import Moon from '@/components/Moon.vue'
import ColorCard from '@/components/ColorCard.vue'
import ScrollRow from '@/components/ScrollRow.vue';
import MovieCom from '@/components/Video/index.vue';

export default {
  install: (app) => {
    app.component('Moon', Moon)
    app.component('MovieCom', MovieCom)
    app.component('ScrollRow', ScrollRow)
    app.component('ColorCard', ColorCard)
  }
}
