<template>
  <button
    :type="type"
    :disabled="disabled"
    :data-variant="variant"
    :data-size="size"
    :class="[{ 'is-block': block }]"
    @click="onClick"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'default' | 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
  block: false,
  type: 'button'
})

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

function onClick(ev: MouseEvent) {
  if (props.disabled) return
  emit('click', ev)
}
</script>
<style scoped>
.is-block { width: 100%; }
</style>