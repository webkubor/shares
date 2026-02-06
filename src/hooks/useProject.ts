import { reactive } from "vue";
const projects = reactive({
  list: [
    {
      pic:"/projects/lumiverse-real.png",
      title: "LUMIVERSE AI Studio",
      descrition: "定义下一代数字创意工作流。LUMIVERSE 是一个集 AI 驱动、设计稿自动化转化与多维视觉呈现于一体的创意工作室，致力于打破创意与工程之间的边界。",
      tags: ["Creative", "Design Automation", "AIGC", "Studio"],
      source: "https://lumiverse-ruby.vercel.app/",
      time: '2026-02'
    },
    {
      pic:"/projects/xhs-case.jpg",
      title: "Gemini XHS Vision",
      descrition: "📸 极致质感的 AI 人像视觉引擎。深挖小红书商业美学，通过 AI 锁死人像特征，实现冷白皮与瓷感肌的标准化输出，自带自动化 R2 交付链路。",
      tags: ["Commercial Art", "Xiaohongshu", "AIGC", "Vision"],
      source: "https://github.com/webkubor/gemini-xhs-vision",
      time: '2026-02'
    },
    {
      pic:"/projects/omni-chatbot-real.png",
      title: "Omni Chatbot SDK",
      descrition: "工业级聊天机器人前端 UI 解决方案。原子化组件设计，完美适配多端响应式，支持流式交互与多模型协议，让 AI 对话界面的集成步入毫秒时代。",
      tags: ["SDK", "UI Kit", "Chatbot", "TypeScript"],
      source: "https://omni-chatbot-sdk.vercel.app/",
      time: '2026-02'
    },
    {
      pic:"/projects/envai-manage.png",
      title: "envAI RAG System",
      descrition: "个人大脑的数字孪生。构建高性能、可扩展的 RAG 基础设施，利用向量语义内核实现海量知识的精准检索与 Agent 长期记忆扩展。",
      tags: ["RAG", "Knowledge Graph", "Vector DB", "System"],
      source: "https://github.com/webkubor/envAI-System",
      time: '2026-02'
    },
    {
      pic:"/projects/ai-common.png",
      title: "AI Common Infrastructure",
      descrition: "One Context to Rule Them All. 全球首个标准化 AI 上下文工程协议库，统一 Agent 的行为准则、技能路由与认知地图，构建 AI 协作的底层操作系统。",
      tags: ["Protocol", "Standard", "AI Ops", "Memory"],
      source: "https://webkubor.github.io/AI_Common/",
      time: '2026-01'
    },
    {
      pic:"/projects/milvus-tools.png",
      title: "Milvus Vector Tools",
      descrition: "专为向量工程打造的生产力工具。自动化文档处理流，支持大规模向量库同步与监控，为 LLM 应用提供坚实的实时检索支撑。",
      tags: ["Data Pipeline", "Milvus", "DevOps"],
      source: "https://webkubor.github.io/milvus-tools/",
      time: '2026-01'
    },
    {
      pic:"/projects/gemini-vercel.png",
      title: "Gemini Skill: Vercel",
      descrition: "Agent 部署领域的 DevOps 专家。针对 Gemini CLI 深度定制，实现 Vercel 全生命周期自动化管理，让云端部署如呼吸般自然。",
      tags: ["Automation", "CLI", "Vercel", "Agent Skill"],
      source: "https://github.com/webkubor/gemini-skill-vercel",
      time: '2026-02'
    },
    {
      pic:"/projects/remotion-studio.png",
      title: "Remotion Video Studio",
      descrition: "代码驱动的短视频工业化生产线。基于 Remotion 框架，将 AI 逻辑与视频渲染深度耦合，实现音视频内容的规模化、程序化自动产出。",
      tags: ["Programmable Video", "Remotion", "Automation"],
      source: "https://github.com/webkubor/remotion-studio",
      time: '2026-01'
    },
    {
      pic:"/projects/bloom-theme.png",
      title: "Typora Bloom Theme",
      descrition: "温润如玉的数字写作空间。专为长文创作者设计的 Typora 极简主题，追求极致的阅读舒适度与排版仪式感。",
      tags: ["Typography", "Design", "Writing"],
      source: "https://typora-bloom-theme.webkubor.online/",
      time: '2026-01'
    },
    {
      pic:"https://bookcover.yuewen.com/qdbimg/349573/1040818015/600.webp",
      title: "《雪夜无名》",
      descrition: "起点中文网签约作品。雪夜无声，名动四方。跨越现实与虚幻的文学叙事，探索生命在极致环境下的张力与温情。",
      tags: ["Literature", "Storytelling", "Qidian"],
      source: "https://www.qidian.com/book/1040818015/",
      time: '2025-12'
    },
    {
      pic:"https://github.com/webkubor/picx-images-hosting/raw/master/blog/FigmaCover040bef78cc67e2feef02a5fee6a9ea4c.6m3ulu5n58.webp",
      title: "XBox CsGo Simulation",
      descrition: "高交互前端游戏化实践。基于 Vue3 状态机实现的 CsGo 盲盒系统，探索 CSS 动画性能与实时抽奖算法的完美结合。",
      tags: ["Web Game", "Vue3", "Animation"],
      source: "https://csgo-api.tpservice.ai/#/p/home",
      time: '2023-11'
    },
    {
      title: "Midjourney Masters Guide",
      pic: "https://github.com/webkubor/picx-images-hosting/raw/master/blog/image.pf9qhnl1w.webp",
      descrition: "AIGC 时代的视觉进阶手册。深度解析 Midjourney 提示词工程，为开发者与创作者提供可复用的艺术生成范式。",
      tags: ["AIGC", "Midjourney", "Art Guide"],
      source: "https://webkubor.github.io/prompt-lab/",
      time: '2026-01'
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