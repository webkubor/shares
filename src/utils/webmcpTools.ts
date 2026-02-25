import domToImage from 'dom-to-image-more';

/**
 * WebMCP (Model Context Protocol) 核心驱动层 (自定义实现)
 * 遵循 webmcp.dev 的初步规范：让网页具备 AI 可操作性
 */

interface MCPTool {
  name: string;
  description: string;
  execute: (args?: any) => Promise<any>;
  schema?: any;
}

interface SetupWebMCPOptions {
  enabled?: boolean;
}

interface MCPPublicAPI {
  registerTool: (tool: MCPTool) => void;
  getTools: () => Array<{ name: string; description: string; schema?: any }>;
  callTool: (name: string, args?: any) => Promise<any>;
}

declare global {
  interface Window {
    mcp?: MCPPublicAPI;
  }
}

class WebMCPRegistry {
  private tools: Map<string, MCPTool> = new Map();

  register(tool: MCPTool) {
    this.tools.set(tool.name, tool);
    console.log(`[WebMCP] 工具注册成功: ${tool.name}`);
  }

  getPublicAPI(): MCPPublicAPI {
    return {
      registerTool: (tool: MCPTool) => this.register(tool),
      getTools: () =>
        Array.from(this.tools.values()).map((tool) => ({
          name: tool.name,
          description: tool.description,
          schema: tool.schema
        })),
      callTool: async (name: string, args?: any) => {
        const tool = this.tools.get(name);
        if (!tool) throw new Error(`工具 ${name} 未找到`);
        return tool.execute(args);
      }
    };
  }
}

let registry: WebMCPRegistry | null = null;
let initialized = false;

function getRegistry() {
  if (!registry) {
    registry = new WebMCPRegistry();
  }
  return registry;
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function shouldEnableWebMCP() {
  return import.meta.env.DEV || import.meta.env.VITE_ENABLE_WEBMCP === 'true';
}

export function setupWebMCP(options: SetupWebMCPOptions = {}) {
  if (!isBrowser()) return;

  const enabled = options.enabled ?? shouldEnableWebMCP();
  if (!enabled) return;
  if (initialized) return;

  initialized = true;
  const mcpRegistry = getRegistry();
  console.log('[WebMCP] 初始化 AI 对接层 (Shares 专版)...');

  // 将 mcp 挂载到全局，供 AI 探测
  window.mcp = mcpRegistry.getPublicAPI();

  // 工具 1: 获取页面元数据
  mcpRegistry.register({
    name: 'getPageContext',
    description: '获取当前页面的核心上下文信息，包括标题、SEO 元数据及 URL。',
    execute: async () => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
      keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content'),
      url: window.location.href,
      timestamp: new Date().toISOString()
    })
  });

  // 工具 2: 获取页面所有链接
  mcpRegistry.register({
    name: 'listPageLinks',
    description: '分析并列出页面上所有的交互链接，供 AI 进行导航或深度扫描。',
    execute: async () => {
      return Array.from(document.querySelectorAll('a'))
        .map(a => ({ text: a.innerText.trim(), href: a.href }))
        .filter(l => l.text && l.href);
    }
  });

  // 工具 3: 捕获页面截图
  mcpRegistry.register({
    name: 'capturePageSnapshot',
    description: '捕获当前页面的视觉快照（Base64 格式），供 AI 进行视觉分析。',
    execute: async (args?: { quality?: number; bgcolor?: string; includeData?: boolean }) => {
       try {
         const dataUrl = await domToImage.toPng(document.body, {
           quality: args?.quality ?? 0.8,
           bgcolor: args?.bgcolor ?? '#fff'
         });
         return {
           status: 'success',
           image: args?.includeData === false ? undefined : dataUrl,
           fullSize: dataUrl.length,
           mimeType: 'image/png'
         };
       } catch (error: any) {
         return { status: 'error', message: error.message };
       }
    }
  });

  console.log('[WebMCP] 已就绪，欢迎 AI 代理交互。');
}

// 导出 registerTool 供其他组件使用
export const registerTool = (tool: MCPTool) => getRegistry().register(tool);
