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
          <div class="item-links">
            <div class="item link" @click.stop="openUrl(item.source, item.title + index)">
              🌐 Official Site
            </div>
            <div v-if="item.github" class="item link github-link" @click.stop="openUrl(item.github, item.title + index)">
              🐙 GitHub Repo
            </div>
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.45));
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 45px rgba(32, 196, 182, 0.14);
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
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(120deg, rgba(32, 196, 182, 0.6), rgba(79, 224, 210, 0.4), rgba(255, 138, 61, 0.25));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.3), transparent 60%);
    opacity: 0.2;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 26px 60px rgba(32, 196, 182, 0.24);

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
  gap: 6px;
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
  color: rgba(16, 20, 24, 0.75);
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.7);
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
  box-shadow: 0 8px 16px rgba(32, 196, 182, 0.1);

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(32, 196, 182, 0.5);
    color: #20c4b6;
    box-shadow: 0 12px 24px rgba(32, 196, 182, 0.2);
  }
}

.more-tag {
  background: rgba(255, 255, 255, 0.7) !important;
  border-style: dashed !important;
  opacity: 0.7;
}

.item {
  margin-bottom: 8px;
}

.item-links {
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.6);
}

.link {
  color: #20c4b6;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  font-size: 13px;

  &:hover {
    color: #ff8a3d;
    text-decoration: underline;
  }
}

.github-link {
  color: #1a1a1a;
  &:hover {
    color: #20c4b6;
  }
}

.ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
