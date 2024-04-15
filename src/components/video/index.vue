<template>
  <div class="video-barrage ">
    <video ref="playerVideo" :src="src" playsinline controls></video>
    <Board v-if="props.barrage" />
  </div>

</template>

<script setup>
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import Board from './Board.vue'
import { plyrI18n } from './plyrI18n'
import { onMounted,ref } from 'vue';

let props = defineProps({
  src: String,
  barrage: Boolean
})
let playerVideo = ref(null)

onMounted(() => {
  initPLy()

})



function initPLy() {
  if (!playerVideo.value)return
  const options = {
    i18n: plyrI18n.es
  }
  const player = new Plyr(playerVideo.value, options)

  player.on('play', (event) => {
    const instance = event.detail.plyr;
    console.log('开始播放了',instance);
  });
}



</script>

<style lang="scss" scoped>


.video-barrage {
  color: #ffff;
  min-height: 80vh;
  width: 800px;
  margin: 50px auto;
  position: relative;
  video {
    width: 100%;
  }
}
</style>