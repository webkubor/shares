import { createApp } from "vue";
import ToastMessage from "./ToastMessage.vue";

const MessagePlugin = {
  install(app: any) {
    let queue = [];
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
          queue = queue.slice(1);
          const el = dom.firstElementChild;
          if (el) {
            el.style.transform = `translateX(${2 * defaultTop}px)`;
            el.style.opacity = "0";
            setTimeout(() => {
              app.unmount(dom);
              if (document.body.contains(dom)) {
                document.body.removeChild(dom);
              }
            }, 300);
          }
        },
        ...option
      });

      const vm = app.mount(dom);
      vm.$el.setAttribute("id", id);

      setTimeout(() => {
        vm.$el.style.marginTop = `${defaultTop}px`;
      });

      if (queue.length > 0) {
        moveDownMessages(queue.length);
      }

      queue.push(vm.$el);

      function moveDownMessages(end) {
        for (let index = 0; index < end; index++) {
          const el = queue[index];
          const rect = el.getBoundingClientRect();
          const distance = rect.height + 15;
          el.style.marginTop = `${(index + 1) * distance + defaultTop}px`;
        }
      }
    }

    // 添加消息类型方法
    Message.success = (content) => Message({ type: "success", content });
    Message.warning = (content) => Message({ type: "warning", content });
    Message.error = (content) => Message({ type: "error", content });
    Message.info = (content) => Message({ type: "info", content });

    // 挂载到全局
    app.config.globalProperties.$message = Message;
    app.config.globalProperties.$notice = Message;
    
    // 提供注入方式
    app.provide('message', Message);
    app.provide('notice', Message);
  }
}

export default MessagePlugin;

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
export const Message = createMessage();
export const Notice = createMessage();