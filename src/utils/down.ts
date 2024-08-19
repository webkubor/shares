/**
 * @description: Canvas组件转PNG下载
 * @param {*} id
 * @param {*} fileName
 * @return {*}
 */
function exportCanvasAsPNG(id, fileName) {
    const canvasElement = document.getElementById(id);
  
    const MIME_TYPE = "image/png";
  
    const imgURL = canvasElement.toDataURL(MIME_TYPE);
  
    const dlLink = document.createElement("a");
    dlLink.download = fileName || "photo";
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(
      ":"
    );
  
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
  }
  

  

  function saveFile(data, filename = 'qrcode.png') {
    const image = new Image();
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      const event = new MouseEvent("click");
      a.download = filename || "photo";
      a.href = url;
      a.dispatchEvent(event);
    };
    image.src = data;
  }