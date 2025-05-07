


export function downloadImage(imageSources: string | string[], isBatch: boolean = false) {
    if (isBatch && Array.isArray(imageSources)) {
         // 批量下载逻辑：逐个下载，避免浏览器一次性处理多个下载
         imageSources.forEach((item: string, index: number) => {
            setTimeout(() => {
                console.log('src', item);
                const link = document.createElement('a');
                link.href = item.src;
                link.download = `webkubor_${new Date().getTime()}_${index}.png`; // 保证文件名唯一
                link.click();
            }, index * 300); // 每个下载之间有延迟，避免同时触发
        });
    } else if (!isBatch && typeof imageSources === 'string') {
        // 单张图片下载
        const link = document.createElement('a');
        link.href = imageSources;
        link.download = `webkubor_${new Date().getTime()}.png`;
        link.click();
    }
}

/**
 * getPreviewUrl 函数返回的是一个 Base64 格式的字符串，它代表了文件的内容
 * @param file - 要获取预览 URL 的文件
 * @returns 一个 Promise，成功时解析为文件的预览 URL，失败时拒绝。
 */
export function getPreviewUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
}



/**
 * Base64 转成 Canvas，带错误处理
 * @param base64 图片的 Base64 数据
 * @returns Promise 返回 Canvas 对象或错误信息
 */
export async function imgToCanvas(base64: string): Promise<HTMLCanvasElement | Error> {
    try {
        const img = document.createElement('img');
        img.setAttribute('src', base64);

        // 等待图片加载完成
        await new Promise((resolve) => (img.onload = resolve));
        
        // 计算图片原始宽高比
        const originalRatio = img.width / img.height;
        
        // 设置合理的尺寸限制
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        
        let width = img.width;
        let height = img.height;
        
        // 先检查宽度是否超出限制
        if (width > MAX_WIDTH) {
            width = MAX_WIDTH;
            height = Math.round(width / originalRatio);
        }
        
        // 再检查高度是否超出限制
        if (height > MAX_HEIGHT) {
            height = MAX_HEIGHT;
            width = Math.round(height * originalRatio);
        }
        
        // 确保宽高比与原图一致，防止图片变形
        console.log(`原始尺寸: ${img.width} x ${img.height}, 缩放后: ${width} x ${height}`);
        
        // 创建 Canvas，并绘制缩放后的图像
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
            // 设置平滑缩放
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);
        }
        
        return canvas;
    } catch (error) {
        // 捕获并返回错误信息
        return new Error(`转换失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
}



/**
 * 将 Canvas 转换为 Img 元素
 * @param canvas 要转换的 Canvas 对象
 * @param type 图片类型，默认为 "image/png"
 * @returns 返回 Image 元素
 */
export function canvasToImg(canvas: HTMLCanvasElement, type = "image/png"): HTMLImageElement {
    const image = new Image();
    image.src = canvas.toDataURL(type);
    return image;
}

// 将图片转为 Base64 字符串
export const imageToBase64 = (imgUrl: string) => {
    return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';  // 设置跨域允许
        img.src = imgUrl;
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/png');
                resolve(dataURL);
            } else {
                reject('Canvas context is null');
            }
        };

        img.onerror = (err) => {
            reject(err);
        };
    });
};