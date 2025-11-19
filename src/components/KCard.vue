<template>
  <div
    :class="['k-card', { 'is-hover': hover }]"
    :data-shadow="shadow"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  hover?: boolean
  shadow?: 'none' | 'light' | 'medium' | 'strong'
}>(), {
  hover: true,
  shadow: 'light'
})
</script>

<style scoped>
.k-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.2s ease;
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
  transform: translateY(-2px);
  border-color: var(--color-primary);
  box-shadow: 0 12px 32px var(--shadow-hover);
}
</style>