<template>
  <section class="toolchain-section animate-fadeInUp">
    <div class="toolchain-container">
      <div class="section-header">
        <h2 class="section-title">Toolchain Pipeline</h2>
        <p class="section-subtitle">JSON 可拓展结构，让工具链像流程一样清晰可读。</p>
      </div>

      <div class="pipeline-grid">
        <div v-for="stage in stages" :key="stage.id" class="pipeline-card">
          <div class="pipeline-title">
            <span class="pipeline-index">{{ stageIndex(stage.id) }}</span>
            <h3>{{ stage.title }}</h3>
          </div>
          <p class="pipeline-summary">{{ stage.summary }}</p>
          <div class="pipeline-tools">
            <span
              v-for="tool in stageTools(stage.toolIds)"
              :key="tool.id"
              class="pipeline-tool"
            >
              {{ tool.name }}
            </span>
          </div>
        </div>
      </div>

      <router-link to="/tools" class="pipeline-cta">
        查看完整工具链 →
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import toolchain from '@/data/toolchain.json'

const stages = toolchain.stages
const tools = toolchain.tools

const stageOrder = stages.map((stage) => stage.id)

function stageIndex(id: string) {
  const index = stageOrder.indexOf(id) + 1
  return index > 0 ? `0${index}` : '--'
}

function stageTools(ids: string[]) {
  return tools.filter((tool) => ids.includes(tool.id))
}
</script>

<style scoped lang="scss">
.toolchain-section {
  padding: 80px 24px 100px;
  background: linear-gradient(180deg, rgba(32, 196, 182, 0.08) 0%, #ffffff 100%);
}

.toolchain-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: left;
  margin-bottom: 48px;
}

.section-title {
  font-size: clamp(30px, 5vw, 44px);
  font-weight: 800;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.section-subtitle {
  color: rgba(16, 20, 24, 0.7);
  font-size: 16px;
  max-width: 520px;
  line-height: 1.6;
}

.pipeline-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.pipeline-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(32, 196, 182, 0.16);
  box-shadow: 0 18px 36px rgba(32, 196, 182, 0.1);
}

.pipeline-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pipeline-index {
  font-weight: 700;
  color: #20c4b6;
  font-size: 14px;
}

.pipeline-title h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.pipeline-summary {
  margin: 12px 0 16px;
  color: rgba(16, 20, 24, 0.65);
  font-size: 14px;
  line-height: 1.5;
}

.pipeline-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pipeline-tool {
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(32, 196, 182, 0.16);
  color: #11746a;
}

.pipeline-cta {
  display: inline-flex;
  margin-top: 32px;
  color: #20c4b6;
  font-weight: 700;
  text-decoration: none;
}
</style>
