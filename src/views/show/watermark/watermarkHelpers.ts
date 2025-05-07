/**
 * 在画布上绘制图片水印
 * @param canvas Canvas 对象
 * @param ctx Canvas 上下文
 * @param imageUrl 图片水印的 URL
 * @param scaleFactor 缩放因子
 * @param globalAlpha 透明度
 * @returns Promise<CanvasRenderingContext2D>
 */
export async function drawImageWatermark(
  canvas: HTMLCanvasElement, 
  ctx: CanvasRenderingContext2D,
  imageUrl: string,
  scaleFactor: number = 0.5,
  globalAlpha: number = 0.7
): Promise<CanvasRenderingContext2D> {
  return new Promise((resolve, reject) => {
    const watermarkImg = new Image();
    watermarkImg.onload = () => {
      const imgWidth = watermarkImg.width * scaleFactor;
      const imgHeight = watermarkImg.height * scaleFactor;
      
      const x = (canvas.width - imgWidth) / 2;
      const y = (canvas.height - imgHeight) / 2;
      
      ctx.globalAlpha = globalAlpha;
      ctx.drawImage(watermarkImg, x, y, imgWidth, imgHeight);
      ctx.globalAlpha = 1.0;
      
      resolve(ctx);
    };
    watermarkImg.onerror = (error) => {
      reject(error);
    };
    watermarkImg.src = imageUrl;
  });
}

/**
 * 在画布上添加文字标题
 * @param ctx Canvas 上下文
 * @param canvas Canvas 对象
 * @param config 配置对象
 * @returns HTMLCanvasElement
 */
export function addTextTitle(
  ctx: CanvasRenderingContext2D, 
  canvas: HTMLCanvasElement,
  config: {
    color: string;
    weight: number;
    font: number;
    fontFamily: string;
    title: string;
    letterSpacing: number;
  }
): HTMLCanvasElement {
  ctx.fillStyle = config.color;
  ctx.font = `${config.weight} ${(ctx.canvas.width / config.font)}px ${config.fontFamily}`;
  
  const textToAdd = config.title;
  const padding = canvas.width / 18;
  const paddingH = canvas.height / 15;
  
  for (let i = 0; i < textToAdd.length; i++) {
    ctx.fillText(
      textToAdd[i], 
      padding, 
      (i + 1) * (config.letterSpacing) + paddingH + i * config.letterSpacing
    );
  }
  
  return canvas;
}

/**
 * 在画布上添加文字水印
 * @param ctx Canvas 上下文
 * @param canvas Canvas 对象
 * @param text 水印文字
 * @param fontFamily 字体
 * @returns HTMLCanvasElement
 */
export function addTextWatermark(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  text: string,
  fontFamily: string
): HTMLCanvasElement {
  // 确保字体存在，如果不存在则使用默认字体
  const fontExists = document.fonts.check(`12px ${fontFamily}`);
  const actualFont = fontExists ? fontFamily : 'Arial';
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.font = `bold ${(ctx.canvas.width / 14)}px ${actualFont}`;
  
  console.log(`使用字体: ${actualFont}`);
  
  const padding = (ctx.canvas.width / 18);
  ctx.fillText(text, canvas.width / 2, canvas.height - padding);
  
  return canvas;
}

/**
 * 导出为 ZIP 文件
 * @param items 要导出的图片项数组
 * @param zipFilename ZIP 文件名
 * @returns Promise<void>
 */
export async function exportImagesToZip(
  items: Array<{ src: string, name?: string }>,
  zipFilename: string = `watermark_images_${new Date().getTime()}.zip`
): Promise<void> {
  if (!items.length) {
    throw new Error('没有可导出的图片');
  }
  
  // 这里需要动态导入 JSZip 和 file-saver
  const JSZip = (await import('jszip')).default;
  const { saveAs } = await import('file-saver');
  
  const zip = new JSZip();
  const promises = [];
  
  // 按排序添加图片到ZIP
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const imgName = `image_${i + 1}.png`;
    
    // 将base64转换为binary
    const promise = fetch(item.src)
      .then(res => res.blob())
      .then(blob => {
        zip.file(imgName, blob);
      });
      
    promises.push(promise);
  }
  
  await Promise.all(promises);
  
  // 生成并下载ZIP
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, zipFilename);
}
