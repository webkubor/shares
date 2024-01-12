
import Moon from '@/components/Moon.vue'
import ColorCard from '@/components/ColorCard.vue'
import scrollRow from '@/components/scrollRow.vue';
import MovieCom from '@/components/video/index.vue';

export default {
  install: (app) => {
    app.component('Moon', Moon)
    app.component('MovieCom', MovieCom)
    app.component('scrollRow', scrollRow)
    app.component('ColorCard', ColorCard)
  }
}
