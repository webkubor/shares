<template>
  <div class="k-select">
    <select :value="modelValue" @change="onChange">
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
  </div>
</template>
<script setup lang="ts">
export interface Option { label: string; value: string | number }
const props = defineProps<{ modelValue?: string | number, options: Option[] }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void }>()
function onChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  emit('update:modelValue', value)
}
</script>
<style scoped>
.k-select select { width: 100%; }
</style>