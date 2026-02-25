import domToImage from 'dom-to-image-more';

/**
 * WebMCP (Model Context Protocol) 核心驱动层
 * 作用：将网页能力封装为标准化的工具接口，使 AI 代理能够以结构化方式“理解”和“操作”页面。
 * 遵循规范：webmcp.dev
 */

/** 工具定义接口 */
interface MCPTool {
  /** 工具名称，AI 调用时的唯一标识 */
  name: string;
  /** 工具描述，告知 AI 何时及如何使用该工具 */
  description: string;
  /** 执行函数，返回 Promise 结果 */
  execute: (args?: any) => Promise<any>;
  /** 参数定义，遵循 JSON Schema 规范，用于 AI 探测参数结构 */
  schema?: any;
}

/** 初始化配置项 */
interface SetupWebMCPOptions {
  /** 是否强制启用 WebMCP，默认根据环境变量判断 */
  enabled?: boolean;
}

/** 暴露给全局 window.mcp 的公共接口 */
interface MCPPublicAPI {
  /** 当前 WebMCP 的实现版本 */
  version: string;
  /** 发现协议配置，供 AI 探测入口和事件 */
  discovery: {
    entry: string;
    readyEvent: string;
    alternateLink: string;
  };
  /** 探活函数，返回系统状态和时间戳 */
  ping: () => { ok: true; version: string; timestamp: string };
  /** 运行时动态注册新工具 */
  registerTool: (tool: MCPTool) => void;
  /** 获取当前所有已注册工具的元数据列表 */
  getTools: () => Array<{ name: string; description: string; schema?: any }>;
  /** 调用指定名称的工具 */
  callTool: (name: string, args?: any) => Promise<any>;
}

declare global {
  interface Window {
    /** 全局 MCP 对象，AI 注入的核心入口 */
    mcp?: MCPPublicAPI;
  }
}

/** 
 * WebMCP 工具注册表类
 * 负责管理工具的生命周期、注册、查询与调度
 */
class WebMCPRegistry {
  private tools: Map<string, MCPTool> = new Map();
  private readonly version = '1.0.0';
  
  /** 发现元数据，需与 public/.well-known/webmcp.json 保持同步 */
  private readonly discovery = {
    entry: 'window.mcp',
    readyEvent: 'webmcp:ready',
    alternateLink: '/.well-known/webmcp.json'
  };

  /** 注册一个工具 */
  register(tool: MCPTool) {
    this.tools.set(tool.name, tool);
    console.log(`[WebMCP] 工具注册成功: ${tool.name}`);
  }

  /** 生成暴露给 window 的 API 对象 */
  getPublicAPI(): MCPPublicAPI {
    return {
      version: this.version,
      discovery: this.discovery,
      ping: () => ({
        ok: true,
        version: this.version,
        timestamp: new Date().toISOString()
      }),
      registerTool: (tool: MCPTool) => this.register(tool),
      getTools: () =>
        Array.from(this.tools.values()).map((tool) => ({
          name: tool.name,
          description: tool.description,
          schema: tool.schema
        })),
      callTool: async (name: string, args?: any) => {
        const tool = this.tools.get(name);
        if (!tool) throw new Error(`[WebMCP] 工具 ${name} 未找到，请检查名称是否正确`);
        // 这里可以扩展 JSON Schema 参数校验逻辑
        return tool.execute(args);
      }
    };
  }
}

let registry: WebMCPRegistry | null = null;
let initialized = false;

/** 获取单例注册表实例 */
function getRegistry() {
  if (!registry) {
    registry = new WebMCPRegistry();
  }
  return registry;
}

/** 简单的环境检查 */
function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/** 默认启用逻辑：开发环境或明确配置开启 */
function shouldEnableWebMCP() {
  return import.meta.env.DEV || import.meta.env.VITE_ENABLE_WEBMCP === 'true';
}

/**
 * 初始化 WebMCP
 * 建议在 main.ts 中调用
 */
export function setupWebMCP(options: SetupWebMCPOptions = {}) {
  if (!isBrowser()) return;

  const enabled = options.enabled ?? shouldEnableWebMCP();
  if (!enabled) return;
  if (initialized) return;

  initialized = true;
  const mcpRegistry = getRegistry();
  console.log('[WebMCP] 初始化 AI 对接层 (Shares 专版)...');

  // 将接口挂载到 window，这是 AI 代理探测的首选位置
  window.mcp = mcpRegistry.getPublicAPI();

  /** 内置工具 1: 页面上下文采集 */
  mcpRegistry.register({
    name: 'getPageContext',
    description: '获取当前页面的核心上下文信息，包括标题、SEO 元数据及 URL。',
    schema: {
      type: 'object',
      properties: {},
      additionalProperties: false
    },
    execute: async () => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
      keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content'),
      url: window.location.href,
      timestamp: new Date().toISOString()
    })
  });

  /** 内置工具 2: 交互链接提取 */
  mcpRegistry.register({
    name: 'listPageLinks',
    description: '分析并列出页面上所有的交互链接，供 AI 进行导航或深度扫描。',
    schema: {
      type: 'object',
      properties: {},
      additionalProperties: false
    },
    execute: async () => {
      return Array.from(document.querySelectorAll('a'))
        .map(a => ({ text: a.innerText.trim(), href: a.href }))
        .filter(l => l.text && l.href);
    }
  });

  /** 内置工具 3: 视觉快照（Base64） */
  mcpRegistry.register({
    name: 'capturePageSnapshot',
    description: '捕获当前页面的视觉快照（Base64 格式），供 AI 进行视觉分析。',
    schema: {
      type: 'object',
      properties: {
        quality: { type: 'number', description: '图片质量 (0-1)', minimum: 0, maximum: 1 },
        bgcolor: { type: 'string', description: '背景颜色' },
        includeData: { type: 'boolean', description: '是否返回 Base64 数据字符串' }
      },
      additionalProperties: false
    },
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

  /** 
   * 发送就绪事件
   * 监听方式：window.addEventListener('webmcp:ready', (e) => console.log(e.detail))
   */
  window.dispatchEvent(new CustomEvent('webmcp:ready', {
    detail: {
      version: window.mcp.version,
      entry: 'window.mcp',
      toolCount: window.mcp.getTools().length
    }
  }));

  console.log('[WebMCP] 已就绪，欢迎 AI 代理交互。');
}

/** 供业务组件动态注册自定义工具的快捷入口 */
export const registerTool = (tool: MCPTool) => getRegistry().register(tool);
