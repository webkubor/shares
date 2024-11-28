export const prettyLog = (): Object => {
    const COLORS = {
        info: '#909399',
        error: '#F56C6C',
        warning: '#E6A23C',
        success: '#67C23A'
    };

    const isEmpty = (value: any) => value == null || value === '';

    const prettyPrint = (title: string, text: string, color: string) => {
        console.log(
            `%c ${title} %c ${text} %c`,
            `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
            `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
            'background:transparent'
        );
    };

    const log = (type: keyof typeof COLORS, textOrTitle: string, content = '') => {
        const title = isEmpty(content) ? type.charAt(0).toUpperCase() + type.slice(1) : textOrTitle;
        const text = isEmpty(content) ? textOrTitle : content;
        prettyPrint(title, text, COLORS[type]);
    };

    const picture = async (url: string, scale = 1) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        return new Promise<void>((resolve, reject) => {
            img.onload = () => {
                const c = document.createElement('canvas');
                const ctx = c.getContext('2d');
                if (ctx) {
                    c.width = img.width;
                    c.height = img.height;
                    ctx.fillStyle = 'red';
                    ctx.fillRect(0, 0, c.width, c.height);
                    ctx.drawImage(img, 0, 0);
                    const dataUri = c.toDataURL('image/png');
                    console.log(
                        `%c sup?`,
                        `font-size: 1px;
                        padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor((img.width * scale) / 2)}px;
                        background-image: url(${dataUri});
                        background-repeat: no-repeat;
                        background-size: ${img.width * scale}px ${img.height * scale}px;
                        color: transparent;`
                    );
                    resolve();
                }
            };
            img.onerror = reject;
            img.src = url;
        });
    };

    // 返回一个对象，暴露 info, error, warning, success 等方法
    return {
        info: (textOrTitle: string, content = '') => log('info', textOrTitle, content),
        error: (textOrTitle: string, content = '') => log('error', textOrTitle, content),
        warning: (textOrTitle: string, content = '') => log('warning', textOrTitle, content),
        success: (textOrTitle: string, content = '') => log('success', textOrTitle, content),
        picture
    };
};


