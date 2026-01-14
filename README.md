# Share WebUI

<div align="center">
  <!-- 建议在此处放置项目 Logo -->
  <!-- <img src="./public/logo.svg" width="120" /> -->

  <p>一个基于 <strong>Vue 3</strong> + <strong>TypeScript</strong> + <strong>Vite</strong> 的多功能前端工具箱与 UI 组件集。</p>
  <p>集成了 WebRTC 视频通话、无感知验证、Canvas 炫酷动画及实用业务 Hooks。</p>

  <p>
    <a href="https://github.com/vuejs/core">
      <img src="https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square" alt="Vue 3" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square" alt="TypeScript" />
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square" alt="Vite" />
    </a>
    <a href="./LICENSE">
      <img src="https://img.shields.io/badge/License-MulanPSL%202.0-C81D25?style=flat-square" alt="License" />
    </a>
  </p>

  <p>
    <a href="https://www.webkubor.online/">🌐 在线预览 (自托管)</a> &nbsp;|&nbsp; 
    <a href="../../releases">📅 更新日志 (Releases)</a> &nbsp;|&nbsp;
    <a href="https://juejin.cn/user/2119514149631870">📖 掘金</a> &nbsp;|&nbsp;
    <a href="https://www.reddit.com/user/webkubor/">💬 Reddit</a>
  </p>
</div>

---

## ✨ 特性 (Features)

### 🛠 核心架构
- **Vue 3 Composition API**: 采用最新的组合式 API 写法，逻辑复用更高效。
- **Hooks First**: 抛弃传统 Store，采用 Composable Hooks (`/hooks`) 管理业务状态。
- **TypeScript**: 全量 TS 编写，类型安全。
- **i18n**: 深度集成的国际化方案。
- **Vite 5**: 极速冷启动与热更新，支持 `import.meta.glob` 动态路由加载。

### 🎨 视觉与交互 (UI/UX)
- **Canvas 动画**: 集成蜘蛛网背景、Apple 风格动效、粒子效果。
- **组件库**:
  - 自定义 `Loading` 集合
  - 炫酷 `Card` 与 `Button` 组件
  - 视频弹幕 (Barrage) 与字幕系统
- **图表可视化**: 集成各类业务图表展示。

### 🔧 实用工具 (Tools)
- **安全验证**:
  - Google ReCaptcha 无感知登录
  - Cloudflare Turnstile 验证
- **多媒体**:
  - **WebRTC**: 纯前端实现的视频通话功能
  - 图片水印处理 & 小说封面生成
- **计算器**: 房贷计算器 (等额本息/等额本金)
- **Workers**: Web Worker 多线程处理密集计算。

## 🚀 快速开始 (Quick Start)

### 环境要求
- Node.js >= 20.19
- pnpm (推荐)

### 安装与运行

```bash
# 1. 克隆项目
git clone https://github.com/your-username/share-webui.git
cd share-webui

# 2. 安装依赖 (使用 pnpm)
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 构建生产环境
pnpm build
```

## 📂 目录结构 (Structure)

```text
src/
├── api/          # 接口请求
├── assets/       # 静态资源 (字体, 音效, 图片)
├── components/   # 公共组件库 (Card, Button, Effects)
├── directives/   # 自定义指令 (Ripple, Copy, etc.)
├── hooks/        # 业务逻辑 Hooks (useMusic, useUser, etc.)
├── plugins/      # 插件 (Message, Toast)
├── router/       # 路由配置
├── styles/       # 全局样式 (SCSS)
├── utils/        # 工具函数 (Math, Http, Watermark)
└── views/        # 页面视图 (WebRTC, Tools, Home)
```

## 📝 开发笔记 (Dev Notes)

### 动态路由导入 (Vite 5)
本项目使用了 Vite 的 `import.meta.glob` 特性来替代 Webpack 的 `require.context`：

```ts
// 推荐写法 (Eager Loading)
const routesModules = import.meta.glob('../views/**/router/*.js', { eager: true });
```

### 部署脚本
项目包含自定义 Shell 脚本 `build_depoly.sh`，用于自动化构建与部署。

## 🤝 贡献 (Contribution)

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

## 📄 开源协议 (License)

本项目遵循 [MulanPSL-2.0](http://license.coscl.org.cn/MulanPSL2) 开源协议。