<template>
  <div class="tool-stack">
    <div class="tool-filters">
      <button
        v-for="filter in toolchain.filters"
        :key="filter.id"
        class="filter-chip"
        :class="{ active: activeFilter === filter.id }"
        @click="activeFilter = filter.id"
      >
        {{ filter.label }}
      </button>
    </div>

    <div class="tool-grid animate-fadeInUp">
      <k-card
        v-for="group in toolsByCategory"
        :key="group.id"
        :title="group.label"
        gradient="aurora"
        shadow="medium"
      >
        <p class="category-summary">{{ group.summary }}</p>
        <div class="tool-list">
          <div v-for="tool in group.tools" :key="tool.id" class="tool-item">
            <div class="tool-info">
              <div class="tool-title">
                <span class="tool-name">{{ tool.name }}</span>
                <span class="tool-stage">{{ stageMap[tool.stage] || tool.stage }}</span>
              </div>
              <p class="tool-desc">{{ tool.description }}</p>
              <div class="tool-tags">
                <span v-for="tag in tool.tags" :key="tag" class="tool-tag">
                  {{ tag }}
                </span>
                <span v-for="flag in tool.flags" :key="flag" class="tool-tag is-flag">
                  {{ flagLabel[flag] || flag }}
                </span>
              </div>
            </div>
            <div class="tool-action">
              <k-button
                v-if="tool.url"
                :href="tool.url"
                variant="primary"
              >
                打开外链
              </k-button>
              <k-button
                v-else-if="tool.route"
                variant="default"
                @click="router.push(tool.route)"
              >
                进入工具
              </k-button>
              <span v-else class="tool-empty">待补充链接</span>
            </div>
          </div>
        </div>
      </k-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import KCard from '@/components/KCard.vue'
import KButton from '@/components/KButton.vue'
import toolchain from '@/data/toolchain.json'

const router = useRouter()
const activeFilter = ref('all')

const stageMap: Record<string, string> = {
  collect: '采集',
  generate: '生成',
  apply: '应用',
  verify: '验证'
}

const flagLabel: Record<string, string> = {
  featured: '核心',
  released: '已发布',
  experimental: '实验',
  planned: '规划'
}

const filteredTools = computed(() => {
  if (activeFilter.value === 'all') return toolchain.tools
  return toolchain.tools.filter((tool) => tool.flags?.includes(activeFilter.value))
})

const toolsByCategory = computed(() => {
  return toolchain.categories
    .map((category) => ({
      ...category,
      tools: filteredTools.value.filter((tool) => tool.category === category.id)
    }))
    .filter((group) => group.tools.length > 0)
})
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.tool-stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tool-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.filter-chip {
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  color: var(--text-primary);
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip.active,
.filter-chip:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
  box-shadow: 0 12px 24px var(--shadow-hover);
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.category-summary {
  color: var(--text-secondary);
  margin: 0 0 18px;
  font-size: 14px;
}

.tool-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.tool-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.4));
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 24px rgba(255, 122, 0, 0.1);
}

.tool-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tool-name {
  font-size: 16px;
  font-weight: 700;
}

.tool-stage {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255, 122, 0, 0.15);
  color: var(--color-primary);
}

.tool-desc {
  margin: 6px 0 0;
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.5;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.tool-tag {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: rgba(43, 31, 22, 0.7);
  background: rgba(255, 255, 255, 0.6);
}

.tool-tag.is-flag {
  color: var(--color-primary);
  border-color: rgba(255, 122, 0, 0.4);
}

.tool-action {
  display: flex;
  justify-content: flex-start;
}

.tool-empty {
  font-size: 12px;
  color: var(--text-tertiary);
}

@media (min-width: 900px) {
  .tool-item {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .tool-action {
    flex-shrink: 0;
  }
}
</style>
