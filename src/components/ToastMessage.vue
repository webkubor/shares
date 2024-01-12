<template>
    <transition name="slide-fade">
      <div
        v-if="modelValue"
        class="toast-message">
        <div
          class="icon-container"
          :class="type">
          <CircleCheck
            v-if="type === 'success'"
            class="icon" />
          <CircleClose
            v-else-if="type === 'error'"
            class="icon" />
          <svg
            v-else
            class="icon shorter-icon"
            aria-hidden="true">
            <use xlink:href="#icon-warning" />
          </svg>
        </div>
        <main class="toast-message-main">
          <header
            v-if="title"
            class="title">
            {{ title }}
          </header>
          <section
            v-if="content"
            class="toast-message-content"
            v-html="content" />
          <section
            v-else
            class="toast-message-content">
            <slot />
          </section>
        </main>
        <div
          class="close"
          @click="onClose">
          ×
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  import { watchEffect } from "vue";
  export default {
    name: "ToastMessage",
    inheritAttrs: false,
    props: {
      modelValue: {
        type: Boolean,
        default: () => false
      },
      title: {
        type: String,
        default: () => ""
      },
      content: {
        type: String,
        default: () => ""
      },
      destroy: {
        type: Function,
        default: () => {}
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
    @include flex;
    position: fixed;
    width: 320px;
    right: 64px;
    top: 96px;
    margin-left: -325px;
    background: #fff;
    box-shadow: 0px 10px 40px -4px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    z-index: 10000;
    transition: 0.3s;
    .toast-message-content {
      :deep .message-link {
        display: inline-block;
        text-decoration: underline;
        color: #d08fff;
        margin-top: 8px;
      }
    }
  }
  .title {
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  .icon-container {
    @include flex-center-h;
    width: 56px;
    padding-top: 16px;
    border-radius: 16px 0px 0px 16px;
    color: #fff;
    font-size: 24px;
    .icon {
      width: 24px;
      height: 24px;
    }
    &.success {
      background: #02d396;
    }
    &.error {
      background: #ef5a4f;
    }
    &.warning {
      background: #484040;
    }
  }
  .toast-message-main {
    flex: 1;
    padding: 16px 20px 16px 24px;
  }
  
  .close {
    @include flex-center;
    width: 24px;
    height: 24px;
    // margin-left:8px;
    margin: 16px 24px 16px 4px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    font-size: 24px;
    z-index: 1;
    font-family: Haas Grot Disp;
    font-weight: 600;
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
  