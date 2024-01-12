

<template>
  <div>
    <video ref="player" :src="src" playsinline controls></video>
  </div>
</template>
  
<script>
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { plyrI18n } from './plyrI18n'

export default {
  name: 'VideoPlayer',
  props: {
    src: String,
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
