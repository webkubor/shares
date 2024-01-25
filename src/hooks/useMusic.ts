import commonClick from '@/assets/click/commonClick_1.mp3';
import bgMusic from '@/assets/bg.mp3';
import { ref } from 'vue';
let currentBgMusic = ref<any>(null);


// 播放单个声音
const playAudio = (audio) => {
        try {
            audio.play();
        } catch (error) {
            console.log(error);
            audio.current.play()
        }
}

//关闭当前的背景音乐
function stopMusic() {
    currentBgMusic.value
    if (currentBgMusic.value) {
        currentBgMusic.value.pause();
        currentBgMusic.value.currentTime = 0;
    }
}


// 点击音效
function onClickAudio() {
    let clickAudio = new Audio(commonClick);
    playAudio(clickAudio)
}


function initBackgroundMusic() {
    let soundSwitch = localStorage.getItem("soundSwitch");
    if (soundSwitch == 'false') return
    currentBgMusic.value = new Audio(bgMusic);
    currentBgMusic.value.loop = true;
    // currentBgMusic.value.play();
}

export function useMusic() {
    return {
        initBackgroundMusic,
        onClickAudio,
        stopMusic,
        playAudio
    }
}