

<template>
    <div class="barrage">
    <video ref="player" :src="src" playsinline controls></video>
    <Board/>
  </div>

</template>
  
<script>
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import Board from './Board.vue'
import { plyrI18n } from './plyrI18n'

export default {
  name: 'VideoPlayer',
  props: {
    src: String,
    barrage: Boolean
  },
  mounted() {
    const options = {
      i18n: plyrI18n.es
    }
    const player = new Plyr(this.$refs.player, options)

    player.on('play', (event) => {
      const instance = event.detail.plyr;
      console.log('开始播放了');
    });
  },
};
</script>

<style lang="scss" scoped>
.barrage {
    color: #ffff;
    min-height: 100vh;
    position: relative;
}
</style>