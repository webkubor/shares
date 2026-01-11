<template>
  <section class="featured-section animate-fadeInUp animate-delay-200">
    <div class="featured-container">
      <div class="section-header">
        <h2 class="section-title">Featured Tools</h2>
        <p class="section-subtitle">最常用的核心工具，集中入口与清晰定位。</p>
      </div>

      <div class="featured-grid">
        <article v-for="tool in featuredTools" :key="tool.id" class="featured-card">
          <div class="card-top">
            <div class="card-title">{{ tool.name }}</div>
            <span class="card-stage">{{ stageLabel[tool.stage] || tool.stage }}</span>
          </div>
          <p class="card-desc">{{ tool.description }}</p>
          <div class="card-tags">
            <span v-for="tag in tool.tags" :key="tag" class="card-tag">{{ tag }}</span>
          </div>
          <div class="card-actions">
            <a v-if="tool.url" :href="tool.url" target="_blank" rel="noopener noreferrer">
              立即打开 →
            </a>
            <router-link v-else-if="tool.route" :to="tool.route">进入工具 →</router-link>
            <span v-else class="card-empty">待补充链接</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import toolchain from '@/data/toolchain.json'

const stageLabel: Record<string, string> = {
  collect: '采集',
  generate: '生成',
  apply: '应用',
  verify: '验证'
}

const featuredTools = computed(() => {
  return toolchain.tools.filter((tool) => tool.flags?.includes('featured')).slice(0, 4)
})
</script>

<style scoped lang="scss">
.featured-section {
  padding: 80px 24px 100px;
  background: #ffffff;
}

.featured-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 40px;
}

.section-title {
  font-size: clamp(30px, 5vw, 44px);
  font-weight: 800;
  margin-bottom: 12px;
}

.section-subtitle {
  color: #555;
  font-size: 16px;
  max-width: 520px;
  line-height: 1.6;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.featured-card {
  padding: 24px;
  border-radius: 24px;
  background: linear-gradient(135deg, #fff4ea 0%, #fff 100%);
  border: 1px solid rgba(255, 122, 0, 0.15);
  box-shadow: 0 16px 32px rgba(255, 122, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
}

.card-stage {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 122, 0, 0.2);
  color: #b04a00;
  font-weight: 600;
}

.card-desc {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.card-tag {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.04);
  color: #555;
}

.card-actions a,
.card-actions a:visited {
  color: #ff7a00;
  font-weight: 700;
  text-decoration: none;
}

.card-empty {
  font-size: 12px;
  color: #888;
}
</style>
