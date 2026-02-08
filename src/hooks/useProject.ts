import { reactive } from "vue";
const projects = reactive({
  list: [
    {
      pic: "/projects/google-flow.png",
      title: "Google Flow - 沉浸式 AI 创作助手",
      descrition: "Google Labs 推出的下一代创意写作工具。通过流式 AI 协作，将灵感碎片化为连贯的叙事，重塑人机协同的创作体验。",
      tags: ["Creative", "Writing", "AI Labs", "Google", "Highly Recommended"],
      source: "https://labs.google/flow/about",
      time: '2026-02'
    },
    {
      pic: "/projects/v0-dev.png",
      title: "v0.dev - AI 驱动的 UI 工业化生成",
      descrition: "Vercel 推出的生成式 UI 平台。只需自然语言描述，即可秒级生成高质量、可直接运行的 React/Tailwind 组件，定义前端开发新范式。",
      tags: ["UI Generation", "React", "Vercel", "Frontend", "Highly Recommended"],
      source: "https://v0.dev",
      time: '2026-02'
    },
    {
      pic: "/projects/cursor.png",
      title: "Cursor - AI 原生编程编辑器",
      descrition: "目前最顶尖的 AI 编程助手。深度集成 Claude 3.5 Sonnet 与 GPT-4o，支持全库代码索引与智能补全，是每一位开发者的提效神兵。",
      tags: ["AI Editor", "Coding", "Productivity", "Highly Recommended"],
      source: "https://cursor.com",
      time: '2026-02'
    },
    {
      pic:"/projects/cogitator.png",
      title: "Cogitator - AI 辩论竞技场",
      descrition: "让顶尖 AI 模型在逻辑的荒原上交锋。一个全自动的 AI 辩论对战平台，支持多模型对抗、观点演化分析，探索大语言模型的思辨边界。",
      tags: ["AI Battle", "Logic", "LLM Arena", "Vue3"],
      source: "https://cogitator.webkubor.online/",
      github: "https://github.com/webkubor/battle",
      time: '2026-02'
    },
    {
      pic:"/projects/lumiverse-real.png",
      title: "LUMIVERSE AI Studio",
      descrition: "定义下一代数字创意工作流。LUMIVERSE 是一个集 AI 驱动、设计稿自动化转化与多维视觉呈现于一体的创意工作室，致力于打破创意与工程之间的边界。",
      tags: ["Creative", "Design Automation", "AIGC", "Studio"],
      source: "https://lumiverse-ruby.vercel.app/",
      github: "https://github.com/webkubor/LUMIVERSE",
      time: '2026-02'
    },
    {
      pic:"/projects/xhs-case.jpg",
      title: "Gemini XHS Vision",
      descrition: "📸 极致质感的 AI 人像视觉引擎。深挖小红书商业美学，通过 AI 锁死人像特征，实现冷白皮与瓷感肌的标准化输出，自带自动化 R2 交付链路。",
      tags: ["Commercial Art", "Xiaohongshu", "AIGC", "Vision"],
      source: "https://github.com/webkubor/gemini-xhs-vision",
      github: "https://github.com/webkubor/gemini-xhs-vision",
      time: '2026-02'
    },
    {
      pic:"/projects/omni-chatbot-real.png",
      title: "Omni Chatbot SDK",
      descrition: "工业级聊天机器人前端 UI 解决方案。原子化组件设计，完美适配多端响应式，支持流式交互与多模型协议，让 AI 对话界面的集成步入毫秒时代。",
      tags: ["SDK", "UI Kit", "Chatbot", "TypeScript"],
      source: "https://omni-chatbot-sdk.vercel.app/",
      github: "https://github.com/webkubor/omni-chatbot-sdk",
      time: '2026-02'
    },
    {
      pic:"/projects/bannerforge.png",
      title: "BannerForge AI",
      descrition: "专业级游戏资产生成平台。利用 Gemini AI 旗舰模型，一键生成高转化率、多尺寸的游戏营销 Banner，大幅缩短从创意到上线的周期。",
      tags: ["Game Assets", "AIGC", "Marketing", "Banner"],
      source: "https://bannerforge.vercel.app/",
      github: "https://github.com/webkubor/banner",
      time: '2026-02'
    },
    {
      pic:"/projects/envai-manage.png",
      title: "envAI RAG System",
      descrition: "个人大脑的数字孪生。构建高性能、可扩展的 RAG 基础设施，利用向量语义内核实现海量知识的精准检索与 Agent 长期记忆扩展。",
      tags: ["RAG", "Knowledge Graph", "Vector DB", "System"],
      source: "https://github.com/webkubor/envAI-System",
      github: "https://github.com/webkubor/envAI-System",
      time: '2026-02'
    },
    {
      pic:"/projects/dreamfit.png",
      title: "DreamFit AI",
      descrition: "深耕商业场景的精准 AI 出图工具。专注于人物换装与空间装修，探索极致的前端性能表现与现代化的 UI 交互范式。",
      tags: ["React 19", "Health", "Commercial Art"],
      source: "https://dreamfit-seven.vercel.app/",
      github: "https://github.com/webkubor/dreamfit",
      time: '2026-02'
    },
    {
      pic:"/projects/ai-common.png",
      title: "AI Common Infrastructure",
      descrition: "One Context to Rule Them All. 全球首个标准化 AI 上下文工程协议库，统一 Agent 的行为准则、技能路由与认知地图，构建 AI 协作的底层操作系统。",
      tags: ["Protocol", "Standard", "AI Ops", "Memory"],
      source: "https://webkubor.github.io/AI_Common/",
      github: "https://github.com/webkubor/AI_Common",
      time: '2026-01'
    },
    {
      pic:"/projects/milvus-tools.png",
      title: "Milvus Vector Tools",
      descrition: "专为向量工程打造的生产力工具。自动化文档处理流，支持大规模向量库同步与监控，为 LLM 应用提供坚实的实时检索支撑。",
      tags: ["Data Pipeline", "Milvus", "DevOps"],
      source: "https://webkubor.github.io/milvus-tools/",
      github: "https://github.com/webkubor/milvus-tools",
      time: '2026-01'
    },
    {
      pic:"/projects/gemini-vercel.png",
      title: "Gemini Skill: Vercel",
      descrition: "Agent 部署领域的 DevOps 专家。针对 Gemini CLI 深度定制，实现 Vercel 全生命周期自动化管理，让云端部署如呼吸般自然。",
      tags: ["Automation", "CLI", "Vercel", "Agent Skill"],
      source: "https://github.com/webkubor/gemini-skill-vercel",
      github: "https://github.com/webkubor/gemini-skill-vercel",
      time: '2026-02'
    },
    {
      pic:"/projects/remotion-studio.png",
      title: "Remotion Video Studio",
      descrition: "代码驱动的短视频工业化生产线。基于 Remotion 框架，将 AI 逻辑与视频渲染深度耦合，实现音视频内容的规模化、程序化自动产出。",
      tags: ["Programmable Video", "Remotion", "Automation"],
      source: "https://github.com/webkubor/remotion-studio",
      github: "https://github.com/webkubor/remotion-studio",
      time: '2026-01'
    },
    {
      pic:"/projects/bloom-theme.png",
      title: "Typora Bloom Theme",
      descrition: "让写作回归平静。已被 Typora 官方主题商店 (theme.typora.io) 深度收录。专为长文创作者设计的极简主题，追求极致的阅读舒适度与排版仪式感。",
      tags: ["Typography", "Design", "Official Featured"],
      source: "https://typora-bloom-theme.webkubor.online/",
      github: "https://github.com/webkubor/typora-Bloom-theme",
      time: '2026-01'
    },
    {
      pic:"https://bookcover.yuewen.com/qdbimg/349573/1040818015/600.webp",
      title: "《雪夜无名》",
      descrition: "起点中文网签约作品。雪夜无声，名动四方。跨越现实与虚幻的文学叙事，探索生命在极致环境下的张力与温情。",
      tags: ["Literature", "Storytelling", "Qidian"],
      source: "https://www.qidian.com/book/1040818015/",
      github: "https://my.qidian.com/author/433262531/",
      time: '2025-12'
    },
    {
      pic:"https://wallpaper.webkubor.online/favicon.ico",
      title: "壁纸样机生成器",
      descrition: "专为营销展示设计的快速样机渲染工具。一键将图片贴入真实样机逻辑，提供极速的社交物料产出流程。",
      tags: ["Marketing", "Mockup", "Efficiency"],
      source: "https://wallpaper.webkubor.online",
      github: "https://github.com/webkubor/shares", // 属于 shares 内部模块
      time: '2024-10'
    },
    {
      pic:"https://wechat.webkubor.online/favicon.ico",
      title: "WeChat Sticker Pro",
      descrition: "微信表情包全流程生产工具。支持自动规格适配、规则校验及一键导出，专为表情包作者打造。",
      tags: ["Sticker", "WeChat", "Toolkit"],
      source: "https://github.com/webkubor/ip",
      github: "https://github.com/webkubor/ip",
      time: '2026-01'
    },
    {
      pic:"https://iframe.webkubor.online/favicon.ico",
      title: "Iframe 调试工具",
      descrition: "纯粹、实用的 Iframe 预览与测试工具。专为研发同学设计，快速验证页面嵌入效果与适配问题。",
      tags: ["DevTools", "Iframe", "Utility"],
      source: "https://iframe.webkubor.online/",
      github: "https://github.com/webkubor/shares",
      time: '2024-08'
    }
  ],
  detail: null,
});

export function useProject() {
  function initDetail() {
    projects.detail = null;
  }

  return {
    initDetail,
    projects,
  };
}