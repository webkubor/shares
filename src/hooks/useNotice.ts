
import Tplogo from '@/assets/logo/tp.png'

/**
 * 创建Chrome通知
 * @param {string} title - 通知标题
 * @param {string} body - 通知内容
 * @param {string} theLink - 跳转链接
 * @param {string} iconURL - 通知图标URL
 */
function createNotification(title, body, theLink, iconURL) {
    const notification = new Notification(title, {
        body,
        data:{test:122},
        tag: `message-${Date.now()}`,
        icon: iconURL
    });

    console.log('通知已发送:', notification);
    notification.onclick = (event) => {
        event.preventDefault(); // 阻止浏览器聚焦通知标签页
        window.open(theLink, '_blank');
    };

    setTimeout(() => notification.close(), 7000);
}

/**
 * 发送清算通知
 * @param {string} message - 通知消息内容
 */
function popNotice(message) {
    if (!('Notification' in window)) {
        return; // 浏览器不支持桌面通知
    }

    if (!message) {
        return; // 消息内容为空
    }

    const defaultLink = 'https://www.yuque.com/webkubor/blog';
    const defaultTitle = '订单模块';

    console.log(Notification.permission)
    if (Notification.permission === 'granted') {
        createNotification(defaultTitle, message, defaultLink, Tplogo);
    } else {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                createNotification(defaultTitle, message, defaultLink, Tplogo);
            } else {
                console.log('用户拒绝了通知权限');
                // 可以在此处添加处理拒绝权限的逻辑，比如提示用户
            }
        }).catch((error) => {
            console.error('请求通知权限时发生错误:', error);
            // 错误处理逻辑
        });
    }
}

/**
 * 导出通知功能
 * @returns {{popNotice: function}}
 */
export function useNotice() {
    return { popNotice };
}