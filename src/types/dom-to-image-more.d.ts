declare module 'dom-to-image-more' {
  export interface DomToImageOptions {
    filter?: (node: Node) => boolean;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: Partial<CSSStyleDeclaration>;
    quality?: number;
    imagePlaceholder?: string;
    cacheBust?: boolean;
    preferCanvas?: boolean;
  }

  export interface DomToImage {
    toPng(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
    toJpeg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
    toBlob(node: HTMLElement, options?: DomToImageOptions): Promise<Blob>;
    toPixelData(node: HTMLElement, options?: DomToImageOptions): Promise<Uint8ClampedArray>;
    toCanvas(node: HTMLElement, options?: DomToImageOptions): Promise<HTMLCanvasElement>;
    toSvg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
  }

  const domtoimage: DomToImage;
  export default domtoimage;
}