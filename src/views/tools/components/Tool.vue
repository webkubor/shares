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
      <div
        v-for="group in toolsByCategory"
        :key="group.id"
        class="category-group"
      >
        <div class="category-header">
          <h2 class="category-title">{{ group.label }}</h2>
          <div class="category-line"></div>
        </div>
        <p class="category-summary">{{ group.summary }}</p>
        
        <div class="tool-list">
          <div v-for="tool in group.tools" :key="tool.id" class="tool-item">
            <div class="tool-main">
              <div class="tool-header">
                <span class="tool-name">{{ tool.name }}</span>
                <div class="tool-badges">
                  <span class="tool-stage">{{ stageMap[tool.stage] || tool.stage }}</span>
                  <span v-for="flag in tool.flags" :key="flag" class="tool-flag">
                    {{ flagLabel[flag] || flag }}
                  </span>
                </div>
              </div>
              <p class="tool-desc" :title="tool.description">{{ tool.description }}</p>
              <div class="tool-tags">
                <span v-for="tag in tool.tags" :key="tag" class="tool-tag">
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="tool-action">
              <k-button
                v-if="tool.url"
                :href="tool.url"
                variant="primary"
                size="sm"
              >
                打开外链
              </k-button>
              <k-button
                v-else-if="tool.route"
                variant="default"
                size="sm"
                @click="router.push(tool.route)"
              >
                进入工具
              </k-button>
              <span v-else class="tool-empty">待补充链接</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
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
  gap: 32px;
}

.tool-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding-bottom: 8px;
}

.filter-chip {
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  color: var(--text-primary);
  padding: 8px 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-chip.active,
.filter-chip:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
  box-shadow: 0 8px 16px var(--shadow-hover);
  transform: translateY(-1px);
}

.tool-grid {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.category-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 4px;
}

.category-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--text-primary);
  white-space: nowrap;
}

.category-line {
  height: 1px;
  flex-grow: 1;
  background: linear-gradient(90deg, var(--color-primary) 0%, transparent 100%);
  opacity: 0.3;
}

.category-summary {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 20px;
  opacity: 0.8;
}

.tool-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}

.tool-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
  border: 1px solid rgba(32, 196, 182, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  min-height: 200px;
}

.tool-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(32, 196, 182, 0.12);
  border-color: rgba(32, 196, 182, 0.4);
}

.tool-main {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tool-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.tool-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

.tool-badges {
  display: flex;
  gap: 6px;
}

.tool-stage, .tool-flag {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 999px;
  text-transform: uppercase;
}

.tool-stage {
  background: rgba(32, 196, 182, 0.12);
  color: var(--color-primary);
}

.tool-flag {
  background: rgba(255, 138, 61, 0.1);
  color: #e67e22;
}

.tool-desc {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 4.8em; /* 3 lines * 1.6 line-height */
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.tool-tag {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(16, 20, 24, 0.05);
  color: var(--text-secondary);
  font-weight: 500;
  border: 1px solid rgba(16, 20, 24, 0.05);
}

.tool-action {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(16, 20, 24, 0.05);
  padding-top: 16px;
  margin-top: 8px;
}

.tool-empty {
  font-size: 12px;
  color: var(--text-tertiary);
}

@media (max-width: 600px) {
  .tool-list {
    grid-template-columns: 1fr;
  }
}
</style>
