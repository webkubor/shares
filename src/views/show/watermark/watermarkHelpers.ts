/**
 * 在画布上绘制图片水印
 * @param canvas Canvas 对象
 * @param ctx Canvas 上下文
 * @param imageUrl 图片水印的 URL
 * @param scaleFactor 缩放因子
 * @param globalAlpha 透明度
 * @param position 水印位置 'center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
 * @param offsetX X轴偏移量（百分比，-100到100）
 * @param offsetY Y轴偏移量（百分比，-100到100）
 * @returns Promise<CanvasRenderingContext2D>
 */
export async function drawImageWatermark(
  canvas: HTMLCanvasElement, 
  ctx: CanvasRenderingContext2D,
  imageUrl: string,
  scaleFactor: number = 0.5,
  globalAlpha: number = 0.7,
  position: string = 'center',
  offsetX: number = 0,
  offsetY: number = 0
): Promise<CanvasRenderingContext2D> {
  return new Promise((resolve, reject) => {
    const watermarkImg = new Image();
    watermarkImg.onload = () => {
      const imgWidth = watermarkImg.width * scaleFactor;
      const imgHeight = watermarkImg.height * scaleFactor;

      // 调试输出图片水印参数
      console.log('[水印调试] imageUrl:', imageUrl);
      console.log('[水印调试] imgWidth:', imgWidth, 'imgHeight:', imgHeight, 'canvas.width:', canvas.width, 'canvas.height:', canvas.height);
      console.log('[水印调试] scaleFactor:', scaleFactor, 'globalAlpha:', globalAlpha, 'position:', position, 'offsetX:', offsetX, 'offsetY:', offsetY);
      
      // 计算基础位置
      let x = 0;
      let y = 0;
      
      // 根据位置参数设置水印位置
      switch (position) {
        case 'center':
          x = (canvas.width - imgWidth) / 2;
          y = (canvas.height - imgHeight) / 2;
          break;
        case 'top-left':
          x = canvas.width * 0.05;
          y = canvas.height * 0.05;
          break;
        case 'top-right':
          x = canvas.width * 0.95 - imgWidth;
          y = canvas.height * 0.05;
          break;
        case 'bottom-left':
          x = canvas.width * 0.05;
          y = canvas.height * 0.95 - imgHeight;
          break;
        case 'bottom-right':
          x = canvas.width * 0.95 - imgWidth;
          y = canvas.height * 0.95 - imgHeight;
          break;
        default:
          x = (canvas.width - imgWidth) / 2;
          y = (canvas.height - imgHeight) / 2;
      }
      
      // 应用偏移量调整（将百分比转换为像素）
      x += (canvas.width * offsetX / 100);
      y += (canvas.height * offsetY / 100);
      
      ctx.globalAlpha = globalAlpha;
      ctx.drawImage(watermarkImg, x, y, imgWidth, imgHeight);
      ctx.globalAlpha = 1.0;
      
      resolve(ctx);
    };
    watermarkImg.onerror = (error) => {
      console.error('[水印调试] 图片加载失败:', imageUrl, error);
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
