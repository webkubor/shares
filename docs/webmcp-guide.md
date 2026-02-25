# WebMCP 接入与使用教程（Shares）

## 背景
当前项目在前端运行时注入了一个全局 `window.mcp` 对象，用于让 AI 或自动化脚本以工具调用的方式读取页面信息、执行截图和扩展自定义能力。

核心实现文件：
- `src/main.ts`
- `src/utils/webmcpTools.ts`

## 目标
- 快速确认 WebMCP 是否成功初始化
- 掌握内置工具的调用方式
- 学会注册自定义工具
- 了解生产环境启用风险与控制方式

## 一、初始化与工作机制

### 1. 启动入口
在 `src/main.ts` 中调用：

```ts
setupWebMCP({ enabled: true });
```

应用启动后会：
- 注册内置工具
- 在浏览器挂载 `window.mcp`
- 输出初始化日志

### 2. 成功日志
控制台出现以下日志说明已就绪：
- `[WebMCP] 初始化 AI 对接层 (Shares 专版)...`
- `[WebMCP] 工具注册成功: getPageContext`
- `[WebMCP] 工具注册成功: listPageLinks`
- `[WebMCP] 工具注册成功: capturePageSnapshot`
- `[WebMCP] 已就绪，欢迎 AI 代理交互。`

## 二、快速上手（Console 直接调用）

打开浏览器开发者工具 Console，执行：

```js
// 查看工具列表
window.mcp.getTools()

// 获取页面上下文
await window.mcp.callTool('getPageContext')

// 获取页面链接
await window.mcp.callTool('listPageLinks')

// 页面截图（返回 base64）
await window.mcp.callTool('capturePageSnapshot')

// 仅返回截图元信息，不返回大体积图片数据
await window.mcp.callTool('capturePageSnapshot', { includeData: false })

// 指定截图质量和背景色
await window.mcp.callTool('capturePageSnapshot', { quality: 0.7, bgcolor: '#ffffff' })
```

## 三、API 说明

### `window.mcp.getTools()`
返回已注册工具元信息：

```ts
Array<{ name: string; description: string; schema?: any }>
```

### `window.mcp.callTool(name, args?)`
调用工具：

```ts
callTool(name: string, args?: any): Promise<any>
```

### `window.mcp.registerTool(tool)`
动态注册工具：

```ts
registerTool(tool: {
  name: string
  description: string
  execute: (args?: any) => Promise<any>
  schema?: any
})
```

## 四、内置工具说明

### 1) `getPageContext`
返回页面核心信息：
- `title`
- `description`（meta）
- `keywords`（meta）
- `url`
- `timestamp`

### 2) `listPageLinks`
返回页面上的 `<a>` 链接集合，包含：
- `text`
- `href`

### 3) `capturePageSnapshot`
对 `document.body` 进行截图，返回：

```ts
{
  status: 'success' | 'error'
  image?: string        // base64 data URL
  fullSize?: number     // base64 长度
  mimeType?: 'image/png'
  message?: string
}
```

## 五、注册自定义工具

建议在业务入口或组件生命周期内注册：

```ts
import { registerTool } from '@/utils/webmcpTools'

registerTool({
  name: 'getUserAgent',
  description: '返回当前浏览器 UA',
  execute: async () => ({ ua: navigator.userAgent })
})
```

验证方式：

```js
await window.mcp.callTool('getUserAgent')
```

## 六、生产环境建议

你当前配置是强制启用（`enabled: true`），会在生产环境暴露 `window.mcp`。

若后续需要按环境控制，建议改为：

```ts
setupWebMCP();
```

并通过 `VITE_ENABLE_WEBMCP=true` 控制是否启用。

## 七、排查清单

### 1) `window.mcp` 不存在
- 检查 `setupWebMCP(...)` 是否执行
- 检查是否在浏览器环境（非 SSR）
- 检查控制台是否有初始化日志

### 2) 调用时报 “工具未找到”
- 先执行 `window.mcp.getTools()` 查看名称
- 确认 `callTool` 传入名称与注册名称完全一致

### 3) 截图失败
- 检查页面中是否存在跨域资源导致 canvas 污染
- 尝试降低 `quality` 或简化页面内容后重试

## 总结
WebMCP 在本项目中的定位是“将页面能力封装为可调用工具”，便于 AI 和自动化流程以统一方式执行读取、导航与截图操作。建议团队统一工具命名、返回结构和错误格式，避免后续接入方出现兼容问题。
