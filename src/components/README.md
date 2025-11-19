# 组件库说明

本目录包含项目中所有的Vue组件，以下是对每个组件的功能说明和使用指南。

## 已注册的全局组件

### ColorBorder - 彩色边框组件
- **功能**：提供带颜色的边框效果
- **用途**：用于装饰和突出显示内容区域

### ColorBtn - 彩色按钮组件  
- **功能**：渐变色彩的交互按钮
- **用途**：提供美观的按钮样式

### CustomSelect - 自定义下拉选择组件
- **功能**：美观的下拉选择器，替代原生select元素
- **用途**：表单中的选择输入
- **特性**：支持自定义样式、动画效果、点击外部关闭

### SpotlightCard - 聚光灯卡片组件
- **功能**：鼠标悬停时显示跟随鼠标的聚光灯效果
- **用途**：增强卡片交互体验，提供视觉反馈
- **用法**：`<SpotlightCard>卡片内容</SpotlightCard>`

### Timeline - 时间线组件
- **功能**：垂直时间线展示，支持悬停和进度显示
- **用途**：展示个人经历、项目历程等时间相关内通
- **用法**：`<Timeline :timeline="timelineData" />`

### Tooltip - 工具提示组件
- **功能**：显示额外的信息提示框
- **用途**：为用户提供额外说明和帮助信息
- **用法**：
```vue
<Tooltip message="提示内容" position="top" :showIcon="true">
  <button>悬停查看提示</button>
</Tooltip>
```

## 未注册的专用组件

### Spider - 蜘蛛网背景组件
- **功能**：Canvas绘制的动态蜘蛛网背景
- **用途**：页面背景装饰，提供动态视觉效果
- **状态**：功能完整但用途较专用，建议按需导入

### lightMove - 光效移动组件
- **功能**：卡片3D倾斜和光线跟随效果
- **用途**：增强卡片视觉体验
- **状态**：存在事件绑定语法错误，需要修复

## 使用建议

1. **优先使用已注册组件**：对于常用组件，建议直接使用全局注册的名称
2. **专用组件按需导入**：对于Spider等专用组件，建议在需要的页面单独导入
3. **注意组件状态**：lightMove组件存在代码问题，使用前需要先修复

## 组件注册方式

在`index.ts`中注册：
```typescript
import ComponentName from "@/components/ComponentName.vue";
app.component('ComponentName', ComponentName)
```

在页面中按需导入：
```typescript
import ComponentName from "@/components/ComponentName.vue";
```