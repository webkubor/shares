<template>
  <section class="projects-section animate-fadeInUp">
    <div class="projects-container">
      <div class="section-header">
        <h2 class="section-title">My Lab Works</h2>
        <p class="section-subtitle">从基建到应用，探索 AI 落地生产力的无限可能。</p>
      </div>

      <div class="projects-grid">
        <div v-for="item in featuredProjects" :key="item.title" class="project-card" @click="openUrl(item.source)">
          <div class="project-image">
            <img :src="item.pic" :alt="item.title" />
            <div class="project-overlay">
              <span class="view-btn">View Project →</span>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">{{ item.title }}</h3>
            <p class="project-desc ellipsis-2">{{ item.descrition }}</p>
            <div class="project-tags">
              <span v-for="tag in item.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section-footer">
        <router-link to="/projects" class="all-projects-btn">
          探索更多实验室成果 ({{ projects.list.length }}+) →
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProject } from '@/hooks/useProject'

const { projects } = useProject()

const featuredProjects = computed(() => {
  // 只在首页展示前3个最硬核的自研项目
  return projects.list.slice(0, 3)
})

const openUrl = (url: string) => {
  if (url) window.open(url, '_blank')
}
</script>

<style scoped lang="scss">
.projects-section {
  padding: 80px 24px 120px;
  background: #f2f8f7;
}

.projects-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 48px;
  text-align: left;
}

.section-title {
  font-size: clamp(30px, 5vw, 44px);
  font-weight: 800;
  margin-bottom: 12px;
}

.section-subtitle {
  color: rgba(16, 20, 24, 0.6);
  font-size: 16px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.project-card {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(32, 196, 182, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(32, 196, 182, 0.15);
    .project-image img { transform: scale(1.05); }
    .project-overlay { opacity: 1; }
  }
}

.project-image {
  height: 200px;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(32, 196, 182, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.view-btn {
  padding: 10px 20px;
  background: #fff;
  color: #0f8f83;
  border-radius: 999px;
  font-weight: 700;
  font-size: 14px;
}

.project-body {
  padding: 24px;
}

.project-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #1a1a1a;
}

.project-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.project-tags {
  display: flex;
  gap: 8px;
}

.tag {
  font-size: 11px;
  padding: 4px 10px;
  background: rgba(32, 196, 182, 0.08);
  color: #0f8f83;
  border-radius: 6px;
  font-weight: 600;
}

.section-footer {
  margin-top: 50px;
  text-align: center;
}

.all-projects-btn {
  display: inline-block;
  color: #20c4b6;
  font-weight: 700;
  text-decoration: none;
  font-size: 16px;
  transition: opacity 0.2s;
  &:hover { opacity: 0.8; }
}

.ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>