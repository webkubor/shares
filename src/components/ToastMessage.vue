<template>
  <transition name="slide-fade">
    <div v-if="modelValue" class="toast-message">
      <div class="icon-container">
        <ph-check-circle v-if="type === 'success'" :size="20" color="#02d396" weight="bold" />
        <ph-x-circle v-else-if="type === 'error'" :size="20" color="#ef5a4f" weight="bold" />
        <ph-warning-circle v-else :size="20" color="#FFB31C" weight="bold" />
      </div>
      <main class="toast-message-main">
        <section v-if="content" class="toast-message-content" v-html="content" />
        <section v-else class="toast-message-content">
          <slot />
        </section>
      </main>
    </div>
  </transition>
</template>
  
<script>
import { watchEffect } from "vue";
import { PhCheckCircle, PhXCircle, PhWarningCircle } from "phosphor-vue";
export default {
  name: "ToastMessage",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: () => false
    },
    content: {
      type: String,
      default: () => ""
    },
    destroy: {
      type: Function,
      default: () => { }
    },
    type: {
      type: String,
      default: () => "success",
      validator(value) {
        return ["success", "warning", "error"].includes(value);
      }
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    let timer = null;
    function onClose() {
      emit("update:modelValue", false);
      props.destroy();
    }
    watchEffect(() => {
      clearTimeout(timer);
      if (props.modelValue) {
        timer = setTimeout(() => {
          onClose();
        }, 3000);
      }
    });

    return {
      onClose
    };
  }
};
</script>
  
<style lang="scss" scoped>
.toast-message {
  display: flex;
  position: fixed;
  width: 320px;
  right: 64px;
  top: 96px;
  margin-left: -325px;
  background:#0E0B00;
  box-shadow: 0px 10px 40px -4px rgba(#2354FF, 0.4);
  border-radius: 16px;
  z-index: 10000;
  transition: 0.3s;
  padding: 0 10px;
  border: 0.2px solid #2354FF;

  .toast-message-content {
    color: aliceblue;
    :deep .message-link {
      display: inline-block;
      text-decoration: underline;
      color: #d08fff;
      margin-top: 8px;
    }
  }
}

.icon-container {
  display: flex;
  border-radius: 16px 0px 0px 16px;
  font-size: 24px;
  align-items: center;
}

.toast-message-main {
  flex: 1;
  padding: 15px;
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
</style>
  