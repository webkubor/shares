import { createApp } from "vue";
import ToastMessage from "./ToastMessage.vue";

const MessagePlugin = {
  install(app: any) {
    let queue: HTMLElement[] = [];
    const defaultTop = 10;

    function Message(option) {
      const dom = document.createElement("div");
      const id = `message-${queue.length}`;
      document.body.appendChild(dom);

      if (typeof option === "object") {
        option = { modelValue: true, ...option };
      } else {
        option = { modelValue: true, content: option };
      }

      const app = createApp(ToastMessage, {
        destroy: () => {
          const index = queue.findIndex(item => item === vm.$el);
          if (index !== -1) {
            queue.splice(index, 1);
          }
          
          // 不需要手动设置样式，由 Vue transition 处理
          setTimeout(() => {
            app.unmount(dom);
            if (document.body.contains(dom)) {
              document.body.removeChild(dom);
            }
            // 更新剩余消息的位置，添加动画过渡
            updateMessagePositions(true);
          }, 400); // 增加时间以匹配动画持续时间
        },
        ...option
      });

      const vm = app.mount(dom);
      vm.$el.setAttribute("id", id);
      
      // 设置消息类型属性
      if (option.type) {
        vm.$el.setAttribute("data-type", option.type);
      }
      if (option.color) {
        applyAccentColor(vm.$el, option.color);
      }
      
      // 初始化时设置为不可见，等待位置计算完成后再显示
      vm.$el.style.opacity = "0";
      
      queue.push(vm.$el);
      
      // 计算新消息的位置
      setTimeout(() => {
        updateMessagePositions();
        // 计算完位置后淡入显示
        setTimeout(() => {
          vm.$el.style.opacity = "1";
          vm.$el.style.transition = "opacity 0.3s ease-out";
        }, 50);
      }, 10);

      function updateMessagePositions(animate = false) {
        let totalHeight = defaultTop;
        
        // 为所有消息添加过渡效果
        if (animate) {
          queue.forEach(el => {
            el.style.transition = 'margin-top 0.3s ease-out';
          });
        }
        
        // 第一个消息（最早的）放在顶部
        if (queue.length > 0) {
          queue[0].style.marginTop = `${totalHeight}px`;
          totalHeight += queue[0].getBoundingClientRect().height + 15;
        }
        
        // 后续消息依次向下排列
        for (let i = 1; i < queue.length; i++) {
          queue[i].style.marginTop = `${totalHeight}px`;
          totalHeight += queue[i].getBoundingClientRect().height + 15;
        }
        
        // 如果是动画过渡，添加延时后移除过渡效果
        if (animate) {
          setTimeout(() => {
            queue.forEach(el => {
              el.style.transition = '';
            });
          }, 300);
        }
      }
    }

    // 添加消息类型方法
    Message.success = (content) => {
      if (typeof content === "object") return Message({ type: "success", ...content });
      return Message({ type: "success", content });
    };
    Message.warning = (content) => {
      if (typeof content === "object") return Message({ type: "warning", ...content });
      return Message({ type: "warning", content });
    };
    Message.error = (content) => {
      if (typeof content === "object") return Message({ type: "error", ...content });
      return Message({ type: "error", content });
    };
    Message.info = (content) => {
      if (typeof content === "object") return Message({ type: "info", ...content });
      return Message({ type: "info", content });
    };

    // 挂载到全局
    app.config.globalProperties.$message = Message;
    app.config.globalProperties.$notice = Message;
    
    // 提供注入方式
    app.provide('message', Message);
    app.provide('notice', Message);
  }
}

export default MessagePlugin;

function applyAccentColor(target: HTMLElement, color: string) {
  const normalized = normalizeHex(color);
  if (!normalized) return;
  const { r, g, b } = hexToRgb(normalized);
  const textColor = getTextColor(r, g, b);
  target.setAttribute("data-accent", "custom");
  target.style.setProperty("--toast-accent", `${r}, ${g}, ${b}`);
  target.style.setProperty("--toast-text-color", textColor);
  target.style.setProperty("--toast-progress-color", textColor);
}

function normalizeHex(input: string): string | null {
  const trimmed = input.trim();
  const raw = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(raw)) {
    return null;
  }
  const full = raw.length === 3
    ? raw.split("").map(ch => ch + ch).join("")
    : raw;
  return `#${full.toUpperCase()}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const raw = hex.replace("#", "");
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  return { r, g, b };
}

function getTextColor(r: number, g: number, b: number): string {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#1a1a1a" : "#ffffff";
}

// 创建独立的Message实例
let messageInstance: any = null;

function createMessage() {
  if (!messageInstance) {
    const fakeApp = { 
      config: { globalProperties: {} },
      provide: () => {}
    };
    MessagePlugin.install(fakeApp);
    messageInstance = fakeApp.config.globalProperties.$message;
  }
  return messageInstance;
}


// 导出类型和实例
const messageApi = createMessage();
export const Message = messageApi;
export const Notice = messageApi;
