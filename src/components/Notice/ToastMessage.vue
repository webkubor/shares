<template>
  <transition name="slide-fade">
    <div v-if="modelValue" class="toast-message">
      <main class="toast-message-main">
        <section v-if="content" class="toast-message-content" v-html="content" />
        <section v-else class="toast-message-content">
          <slot />
        </section>
        <div v-if="showProgress" class="progress-bar-container">
          <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>
      </main>
    </div>
  </transition>
</template>

<script>
import { watchEffect, onMounted, ref } from "vue";
export default {
  name: "ToastMessage",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: () => false
    },
    showProgress: {
      type: Boolean,
      default: () => true
    },
    content: {
      type: String,
      default: () => ""
    },
    time: {
      type: Number,
      default: () => 3000
    },
    destroy: {
      type: Function,
      default: () => { }
    },
    type: {
      type: String,
      default: () => "info",
      validator(value) {
        return ["success", "warning", "error", "info"].includes(value);
      }
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    let timer = null;

    const progress = ref(100);
    const totalTime = props.time || 5000; // 接受外部传入的时间参数，默认为 5000 毫秒

    function onClose() {
      emit("update:modelValue", false);
      props.destroy();
    }
    onMounted(() => {
      startProgress();
    });
    watchEffect(() => {
      clearTimeout(timer);
      if (props.modelValue) {
        timer = setTimeout(() => {
          onClose();
        }, props.time);
      }
    });



    const startProgress = () => {
      const interval = setInterval(() => {
        progress.value -= (100 / totalTime) * 1000;
        if (progress.value <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    }


    return {
      progress,
      onClose
    };
  }
};
</script>

<style lang="scss" scoped>
.progress-bar-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #23181E;
  border-radius: 4px;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 1s;
  background: $default-primary;
  box-shadow: 0px 10px 40px -4px rgba($default-primary, 0.4);
}

.toast-message {
  position: fixed;
  top: 10vh;
  /* 距离顶部屏幕高度的 10% */
  left: 50%;
  /* 水平居中 */
  transform: translateX(-50%);
  width: 90%;
  /* 在小屏幕上自适应宽度 */
  max-width: 320px;
  /* 最大宽度限制 */
  z-index: 10000;
  background: linear-gradient(145deg, $default-primary 2.89%, #23181E 20.36%);
  box-shadow: 0px 10px 40px -4px rgba($default-primary, 0.4);
  filter: drop-shadow(0 0 10px $default-primary);
  border-radius: 6px;
  font-size: 16px;
  transition: 0.3s;
  border: 0.2px solid $default-primary;

  .toast-message-content {
    position: relative;
    color: aliceblue;
    padding: 0 10px;

    :deep(.message-link) {
      display: inline-block;
      text-decoration: underline;
      color: #d08fff;
      margin-top: 8px;
    }
  }

  .toast-message-main {
    position: relative;
    flex: 1;
    padding: 15px;
  }

  .progress-bar-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #23181E;
    border-radius: 4px;
  }

  .progress-bar {
    height: 100%;
    border-radius: 4px;
    transition: width 1s;
    background: $default-primary;
    box-shadow: 0px 10px 40px -4px rgba($default-primary, 0.4);
  }
}

.slide-fade-enter-active {
  opacity: 1;
  transition: all 0.3s;
}

.slide-fade-leave-active {
  transition: all 0.3s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}


@media screen and (max-width: 400px) {
  .toast-message {
    width: auto;
    .toast-message-main {
      font-size: 12px;
      padding: 6px 12px;
    }
    .progress-bar-container {
      height: 2px;
    }
  }


}
</style>