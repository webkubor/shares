<template>
  <div
    :class="['k-card', { 'is-hover': hover, 'has-title': !!title }]"
    :data-shadow="shadow"
    :data-gradient="gradient"
  >
    <div v-if="title" class="k-card-header">
      <div class="k-card-title">{{ title }}</div>
      <slot name="header-extra" />
      <div class="k-card-title-decoration"></div>
    </div>
    <div class="k-card-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  hover?: boolean
  shadow?: 'none' | 'light' | 'medium' | 'strong'
  title?: string
  gradient?: 'none' | 'soft' | 'glass' | 'aurora'
}>(), {
  hover: true,
  shadow: 'light',
  title: '',
  gradient: 'none'
})
</script>

<style scoped>
.k-card {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

/* 渐变背景效果 */
[data-gradient="soft"] {
  background: linear-gradient(135deg, 
    rgba(255, 107, 53, 0.05) 0%, 
    var(--bg-surface) 50%, 
    rgba(255, 182, 39, 0.05) 100%);
}

[data-gradient="glass"] {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
}

[data-gradient="aurora"] {
  background: linear-gradient(135deg, 
    rgba(255, 107, 53, 0.1) 0%, 
    rgba(255, 182, 39, 0.08) 25%, 
    rgba(255, 107, 53, 0.06) 50%, 
    rgba(255, 107, 53, 0.04) 75%, 
    rgba(255, 182, 39, 0.02) 100%);
}

/* 标题区域 */
.k-card-header {
  position: relative;
  margin-bottom: 20px;
  padding-bottom: 12px;
}

.k-card-title {
  font-weight: 700;
  font-size: 18px;
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 2;
}

/* 标题装饰线 */
.k-card-title-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: var(--brand-gradient);
  border-radius: 2px;
  opacity: 0.8;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 鼠标悬停时装饰线展开效果 */
.k-card-header:hover .k-card-title-decoration {
  width: 100%;
}

/* 内容区域 */
.k-card-content {
  position: relative;
  z-index: 1;
}

/* 边框发光效果 */
.k-card::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, 
    var(--color-primary), 
    var(--color-secondary), 
    var(--color-accent));
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

/* 阴影等级 */
[data-shadow="none"] {
  box-shadow: none;
}

[data-shadow="light"] {
  box-shadow: 0 8px 24px var(--shadow-light);
}

[data-shadow="medium"] {
  box-shadow: 0 12px 32px var(--shadow-medium);
}

[data-shadow="strong"] {
  box-shadow: 0 16px 48px var(--shadow-strong);
}

/* 悬停效果 */
.is-hover:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: transparent;
  box-shadow: 0 20px 40px var(--shadow-hover);
}

.is-hover:hover::before {
  opacity: 0.3;
}

/* 有标题时的特殊样式 */
.has-title {
  padding-top: 28px;
}
</style>