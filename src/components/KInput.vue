<template>
  <div class="k-input">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
    />
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
}>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false
})

const emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void }>()

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', props.type === 'number' ? Number(target.value) : target.value)
}
</script>
<style scoped>
.k-input input {
  width: 100%;
}
</style>