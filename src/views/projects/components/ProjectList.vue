<template>
  <div class="grid">
    <div class="grid-item" v-for="(item, index) in projects.list" :key="item.title + index">
      <div class="card" @click="toDetail(item.source)">
        <img :src="item.pic" />
        <div class="card-title">{{ item.title }}</div>
        <div class="content">
          <div class="tags-container">
            <span
              v-for="(tag, i) in item.tags.slice(0, 4)"
              :key="tag + i"
              class="tag"
            >{{ tag }}</span>
            <span v-if="item.tags.length > 4" class="tag more-tag">+{{ item.tags.length - 4 }}</span>
          </div>
          <div class="item ellipsis-2">
            {{ item.descrition }}
          </div>
          <div class="item link" @click.stop="openUrl(item.source, item.title + index)">
            {{ item.source }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useProject } from "@/hooks/useProject";
import { getRandomType } from "@/utils/random";

const {projects} = useProject();

const toDetail = (source: string) => {
  window.open(source, "_blank");
};

const openUrl = (url: string, id: string) => {
  window.open(url, "_blank");
};
</script>
<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  align-items: stretch; /* 确保卡片高度一致 */
}

.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  backdrop-filter: blur(12px);
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 1px;
    background: var(--brand-gradient);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: var(--shadow-hover);

    &::before {
      opacity: 0.6;
    }
  }
}

img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
}

.card:hover img {
  transform: scale(1.08);
}

.card-title {
  font-weight: 700;
  padding: 20px 24px 12px;
  color: var(--text-primary);
  font-size: 18px;
  position: relative;
  z-index: 2;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.content {
  font-size: 14px;
  padding: 0 24px 20px;
  color: var(--text-secondary);
  line-height: 1.6;
  position: relative;
  z-index: 2;
  letter-spacing: -0.01em;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
  max-height: 40px;
  overflow: hidden;
  align-items: flex-start;
}

.tag {
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  color: var(--text-secondary);
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  letter-spacing: -0.01em;
  white-space: nowrap;
  display: inline-block;
  margin: 2px;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-color);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-primary);
    color: var(--color-primary);
    box-shadow: var(--shadow-hover);
  }
}

.more-tag {
  background: var(--bg-surface) !important;
  border-style: dashed !important;
  opacity: 0.7;
}

.item {
  margin-bottom: 8px;
}

.link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
  cursor: pointer;

  &:hover {
    color: var(--color-accent);
    text-decoration: underline;
  }
}

.ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 深色主题适配
:global(.dark_theme) {
  .card {
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
    border-color: rgba(148, 163, 184, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .card-title {
    color: #f1f5f9;
  }

  .content {
    color: #cbd5e1;
  }

  .tag {
    background: rgba(30, 41, 59, 0.7);
    border-color: rgba(148, 163, 184, 0.3);
    color: #cbd5e1;
    
    &:hover {
      border-color: #ff6b35;
      color: #ff6b35;
      background: rgba(255, 107, 53, 0.1);
    }
  }

  .link {
    color: #ff6b35;
    
    &:hover {
      color: #ff8c42;
    }
  }
}

// 移动端适配
@media (max-width: 799px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .card {
    margin: 0 -4px;
  }
}
</style>