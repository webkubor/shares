<template>
  <a
    v-if="href"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :data-variant="variant"
    :data-size="size"
    :class="[{ 'is-block': block }]"
  >
    <slot />
  </a>
  <button
    v-else
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
  href?: string
  variant?: 'default' | 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  href: undefined,
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
[data-variant="default"] {
  --bg: var(--bg-card);
  --border: var(--border-color);
  --color: var(--text-primary);
}

[data-variant="primary"] {
  --bg: var(--color-primary);
  --border: var(--color-primary);
  --color: white;
}

[data-variant="ghost"] {
  --bg: transparent;
  --border: transparent;
  --color: var(--text-primary);
}

[data-variant="danger"] {
  --bg: var(--color-danger);
  --border: var(--color-danger);
  --color: white;
}

a,
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--color);
  transition: all .2s ease;
  text-decoration: none;
  cursor: pointer;
}

a:hover,
button:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
  box-shadow: 0 8px 24px var(--shadow-hover);
}

.is-block { width: 100%; }
</style>