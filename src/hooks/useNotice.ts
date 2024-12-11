const defaultIconURL = new URL('@/assets/logo/tp.png', import.meta.url).href;

const defaultConfig = {
    title: '订单模块',
    link: 'https://www.yuque.com/webkubor/blog',
    icon: defaultIconURL,
};

/**
 * 初始化配置
 * @param {Partial<typeof defaultConfig>} data - 自定义配置项
 * @returns {typeof defaultConfig} 合并后的配置对象
 */
function initConfig(data?: Partial<typeof defaultConfig>): typeof defaultConfig {
    return {
        ...defaultConfig,
        ...data,
    };
}

/**
 * 创建 Chrome 通知
 * @param {string} title - 通知标题
 * @param {string} body - 通知内容
 * @param {string} theLink - 跳转链接
 * @param {string} iconURL - 通知图标 URL
 * @param {object} data - 自定义参数对象
 * @param {number} [timeout=7000] - 通知自动关闭时间（毫秒），传 0 表示不自动关闭
 */
function createNotification(title, body, theLink, iconURL, data = {}, timeout = 7000) {
    const notification = new Notification(title, {
        body,
        icon: iconURL,
        tag: `message-${Date.now()}`,
        data, // 自定义数据
    });

    console.log('通知已发送:', notification);

    notification.onclick = (event) => {
        event.preventDefault();

        // 动态生成带参数的 URL
        const url = new URL(theLink);
        Object.keys(notification.data).forEach((key) => {
            url.searchParams.append(key, notification.data[key]);
        });

        console.log('跳转的 URL:', url.toString());
        window.open(url.toString(), '_blank');
    };

    if (timeout > 0) {
        setTimeout(() => notification.close(), timeout);
    }
}

/**
 * 发送通知
 * @param {string} message - 通知消息内容
 * @param {object} data - 自定义参数对象
 * @param {Partial<typeof defaultConfig>} customConfig - 自定义配置项，用于覆盖默认配置
 */
function popNotice(message, data = {}, customConfig: Partial<typeof defaultConfig> = {}) {
    if (!('Notification' in window)) {
        console.warn('浏览器不支持通知功能');
        return;
    }

    if (!message) {
        console.warn('通知内容为空，未发送');
        return;
    }

    // 通过 initConfig 合并默认配置和自定义配置
    const { title, link, icon } = initConfig(customConfig);

    if (Notification.permission === 'granted') {
        createNotification(title, message, link, icon, data);
    } else if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                createNotification(title, message, link, icon, data);
            } else {
                console.log('用户拒绝了通知权限');
            }
        }).catch((error) => {
            console.error('请求通知权限时发生错误:', error);
            alert('无法请求通知权限，请检查您的浏览器设置。');
        });
    } else {
        console.log('通知权限已被拒绝，无法发送通知');
    }
}

/**
 * 导出通知功能
 */
export function useNotice() {
    return {
        popNotice,
        createNotification,
        initConfig, // 允许外部动态初始化配置
        checkPermission: () => Notification.permission, // 查询通知权限状态
    };
}