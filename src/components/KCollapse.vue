<template>
  <div :class="['k-collapse', { 'is-open': modelValue, 'is-disabled': disabled }]">
    <div class="k-collapse-header" @click="onToggle">
      <div class="k-collapse-title">{{ title }}</div>
      <slot name="header-extra" />
      <span v-if="chevron" class="k-collapse-chevron" />
    </div>
    <div class="k-collapse-body">
      <div class="k-collapse-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  disabled?: boolean
  chevron?: boolean
}>(), {
  modelValue: false,
  title: '',
  disabled: false,
  chevron: true
})

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void; (e: 'toggle', v: boolean): void }>()

function onToggle() {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('toggle', next)
}
</script>

<style scoped>
.k-collapse {
  border: 1px solid var(--border-color);
  background: var(--bg-elevated);
  border-radius: 12px;
}
.k-collapse-header {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  padding: 14px 16px;
  cursor: pointer;
}
.k-collapse-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}
.k-collapse-chevron {
  width: 10px;
  height: 10px;
  border-right: 2px solid var(--text-secondary);
  border-bottom: 2px solid var(--text-secondary);
  transform: rotate(-45deg);
  transition: transform .2s ease;
}
.is-open .k-collapse-chevron { transform: rotate(135deg); }
.k-collapse-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows .24s cubic-bezier(0.4, 0, 0.2, 1);
}
.is-open .k-collapse-body { grid-template-rows: 1fr; }
.k-collapse-content {
  overflow: hidden;
  border-top: 1px solid var(--border-color);
  padding: 12px 16px;
}
</style>