import { reactive } from "vue";
const projects = reactive({
  list: [
    {
      pic:"/projects/omni-chatbot-real.png",
      title: "Omni Chatbot SDK",
      descrition: "通用轻量级聊天机器人前端 UI SDK。支持流式输出、Markdown 渲染、多主题切换，可快速接入 DeepSeek, OpenAI 等主流模型。",
      tags: ["SDK", "Chatbot", "React", "TypeScript", "AI"],
      source: "https://omni-chatbot-sdk.vercel.app/",
      time: '2026-02'
    },
    {
      pic:"/projects/xhs-case.jpg",
      title: "Gemini XHS Vision",
      descrition: "📸 极致质感的 AI 人像生成。针对小红书审美优化，支持冷白皮、胶原蛋白感等特征锁定，自动 R2 上传并生成 Markdown 链接。",
      tags: ["AI Gen", "Xiaohongshu", "AIGC", "Vision"],
      source: "https://github.com/webkubor/gemini-xhs-vision",
      time: '2026-02'
    },
    {
      pic:"/projects/ai-common.png",
      title: "AI Common Infrastructure",
      descrition: "One Context to Rule Them All. 标准化的 AI 上下文工程基建，为各种 Agent 提供统一的记忆、规则与技能路由。",
      tags: ["Context Engineering", "Protocol", "Memory", "Infra"],
      source: "https://webkubor.github.io/AI_Common/",
      time: '2026-01'
    },
    {
      pic:"/projects/gemini-vercel.png",
      title: "Gemini Skill: Vercel",
      descrition: "全自动 Vercel 专家。支持一键部署、项目关联、域名配置以及多环境 Git 自动同步。",
      tags: ["Gemini", "CLI", "Vercel", "Automation"],
      source: "https://github.com/webkubor/gemini-skill-vercel",
      time: '2026-02'
    },
    {
      pic:"/projects/envai-system.png",
      title: "envAI System",
      descrition: "个人大脑的向量知识库。基于 Milvus 的 RAG 基础设施，支持海量本地文档的语义检索与 AI 增强。",
      tags: ["RAG", "Knowledge Base", "Vector DB"],
      source: "https://github.com/webkubor/envAI-System",
      time: '2026-02'
    },
    {
      pic:"/projects/remotion-studio.png",
      title: "Remotion Studio",
      descrition: "像写代码一样写视频。自动化视频生成流，可将 AI 逻辑直接转化为视觉内容，支持大规模视频渲染。",
      tags: ["Video", "Remotion", "Automation"],
      source: "https://github.com/webkubor/remotion-studio",
      time: '2026-01'
    },
    {
      pic:"/projects/bloom-theme.png",
      title: "Typora Bloom Theme",
      descrition: "让写作回归平静。一款温润如玉的 Typora 主题，针对长文排版深度优化，支持多种护眼模式。",
      tags: ["Design", "Typora", "Theme"],
      source: "https://typora-bloom-theme.webkubor.online/",
      time: '2026-01'
    },
    {
      pic:"https://github.com/webkubor/picx-images-hosting/raw/master/blog/FigmaCover040bef78cc67e2feef02a5fee6a9ea4c.6m3ulu5n58.webp",
      title: "XBox CsGo 开箱模拟",
      descrition: "沉浸式 CsGo 皮肤开箱体验，基于 Vue3 实现的高流畅度抽奖动画与盲盒算法。",
      tags: ["Game", "Vue3", "Animation"],
      source: "https://csgo-api.tpservice.ai/#/p/home",
      time: '2023-11'
    },
    {
      title: "midjourney 极简教程",
      pic: "https://github.com/webkubor/picx-images-hosting/raw/master/blog/image.pf9qhnl1w.webp",
      descrition: "AIGC 零基础入门手册。涵盖提示词工程、垫图技巧及 Midjourney 全场景实操案例。",
      tags: ["AIGC", "Midjourney", "Guide"],
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