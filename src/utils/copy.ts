import useClipboard from 'vue-clipboard3'


/**
 * @description: 新Clipboard API
 * @param {string} text
 * @return {*}
 */
export async function writeClipboard(
  text: string,
  successContent: string = "copy successfully"
) {
    if (!text) {
    console.log('Copy content is empty')
      return
    }
  try {
    const { toClipboard } = useClipboard()
    // await navigator.clipboard?.writeText(text);
    await toClipboard(text)
    console.log('Copied to clipboard')
    window.$message?.success(successContent);
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description 读取剪切板内容
 * @return {string}
 */
export async function readClipboard() {
   if (navigator.clipboard && navigator.clipboard.readText) {
    return navigator.clipboard.readText();
  }

  // 使用 execCommand('paste') 方法获取粘贴板内容
  var textarea = document.createElement('textarea');
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.focus();
  document.execCommand('paste');
  var content = textarea.value;
  document.body.removeChild(textarea);

  return Promise.resolve(content);
}




export function clearClipboard() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    alert("请手动清除粘贴板内容。\n\n1. 长按粘贴板区域。\n2. 选择清除或删除选项。");
  } else {
    alert("无法直接清除粘贴板内容。\n\n请使用设备自带的粘贴板管理功能来清除粘贴板。");
  }
}
