import { reactive } from "vue";
import dayjs from "@/utils/dayjs";

const user = reactive({
  name: "webkubor",
  name2: "stacy",
  age: "18",
  birthday: "1995-11-13",
  Guideline: 1,
  isfirstLogin:true,
  personalSign: "Unkillable makes you stronger",
  tags: [ "前端开发工程师", "网易云音乐人", "签约小说作家", "新民乐爱好者"],
  // 人生时间线数据 - 包含月份刻度和小时间节点
  timeline: [
    {
      year: 2014,
      month: 9,
      title: "大学入学",
      description: "开始计算机科学学习之旅",
      type: "education",
      icon: "🎓",
      details: [
        { month: 9, title: "入学报到", desc: "踏入大学校园" },
        { month: 10, title: "军训开始", desc: "为期一个月的军训" },
        { month: 12, title: "第一次编程", desc: "学习C语言基础" }
      ]
    },
    {
      year: 2015,
      month: 3,
      title: "编程启蒙",
      description: "首次接触前端开发",
      type: "milestone",
      icon: "💻",
      details: [
        { month: 3, title: "HTML/CSS基础", desc: "开始学习网页制作" },
        { month: 6, title: "第一个网页", desc: "完成个人主页项目" },
        { month: 9, title: "JavaScript入门", desc: "学习动态交互开发" }
      ]
    },
    {
      year: 2016,
      month: 5,
      title: "项目实践",
      description: "完成第一个商业项目",
      type: "project",
      icon: "🚀",
      details: [
        { month: 2, title: "Vue.js学习", desc: "接触现代前端框架" },
        { month: 5, title: "商业项目", desc: "为本地企业开发官网" },
        { month: 8, title: "开源贡献", desc: "第一次向开源项目提交PR" }
      ]
    },
    {
      year: 2017,
      month: 4,
      title: "技术突破",
      description: "深入学习Vue.js和React",
      type: "skill",
      icon: "⚡",
      details: [
        { month: 1, title: "React学习", desc: "掌握组件化开发思想" },
        { month: 4, title: "状态管理", desc: "深入学习Vuex和Redux" },
        { month: 10, title: "性能优化", desc: "学习前端性能调优技巧" }
      ]
    },
    {
      year: 2018,
      month: 6,
      title: "毕业就职",
      description: "获得计算机学士学位，加入互联网公司",
      type: "career",
      icon: "🏢",
      details: [
        { month: 3, title: "毕业论文", desc: "完成毕业设计和论文答辩" },
        { month: 6, title: "毕业典礼", desc: "正式获得学士学位" },
        { month: 7, title: "入职第一天", desc: "加入互联网公司成为前端工程师" }
      ]
    },
    {
      year: 2019,
      month: 2,
      title: "全栈发展",
      description: "掌握Node.js和后端开发",
      type: "skill",
      icon: "🌐",
      details: [
        { month: 2, title: "Node.js学习", desc: "开始后端开发之旅" },
        { month: 6, title: "数据库设计", desc: "学习MongoDB和MySQL" },
        { month: 11, title: "第一个全栈项目", desc: "独立完成前后端开发" }
      ]
    },
    {
      year: 2020,
      month: 8,
      title: "音乐创作",
      description: "成为网易云音乐人",
      type: "creative",
      icon: "🎵",
      details: [
        { month: 1, title: "音乐制作学习", desc: "开始数字音乐创作" },
        { month: 5, title: "第一首单曲", desc: "发布原创音乐作品" },
        { month: 8, title: "网易云签约", desc: "正式成为网易云音乐人" }
      ]
    },
    {
      year: 2021,
      month: 11,
      title: "文学创作",
      description: "签约成为小说作家",
      type: "creative",
      icon: "✍️",
      details: [
        { month: 3, title: "小说构思", desc: "开始创作科幻小说" },
        { month: 7, title: "完成初稿", desc: "完成第一部长篇小说" },
        { month: 11, title: "出版社签约", desc: "正式成为签约作家" }
      ]
    },
    {
      year: 2022,
      month: 9,
      title: "技术专家",
      description: "成为前端技术专家",
      type: "career",
      icon: "🎯",
      details: [
        { month: 4, title: "技术分享", desc: "在公司内部进行技术培训" },
        { month: 7, title: "架构设计", desc: "主导大型项目架构设计" },
        { month: 9, title: "专家认证", desc: "获得前端技术专家称号" }
      ]
    },
    {
      year: 2023,
      month: 12,
      title: "创新突破",
      description: "开发多个创新项目",
      type: "project",
      icon: "💡",
      details: [
        { month: 6, title: "AI工具开发", desc: "集成AI功能的开发工具" },
        { month: 9, title: "开源框架", desc: "发布个人开源项目" },
        { month: 12, title: "年度总结", desc: "回顾一年的技术成长" }
      ]
    },
    {
      year: 2024,
      month: 8,
      title: "持续成长",
      description: "探索AI与前端结合",
      type: "milestone",
      icon: "🤖",
      details: [
        { month: 2, title: "AI绘画集成", desc: "在前端项目中集成AI绘画" },
        { month: 5, title: "智能代码助手", desc: "开发AI辅助编程工具" },
        { month: 8, title: "技术博客", desc: "开始分享AI开发经验" }
      ]
    },
    {
      year: 2025,
      month: 1,
      title: "30而立",
      description: "未来的路还在脚下",
      type: "current",
      icon: "⭐",
      details: [
        { month: 1, title: "新年规划", desc: "制定30岁人生新目标" },
        { month: 3, title: "技术探索", desc: "继续探索前沿技术" },
        { month: 6, title: "未来展望", desc: "规划未来发展方向" }
      ]
    }
  ]
});

export function useUser() {
  /**
   * @description: 更新年龄
   * @param {*}
   * @return {*}
   */
  function updateAge() {
    let time = dayjs(user.birthday).fromNow(true);
    user.age = time.split(" ")[0];
  }
  
  return {
    updateAge,
    user,
  };
}
