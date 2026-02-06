<template>
  <section class="sentiment-section">
    <div class="sentiment-card" @click="refreshQuote">
      <div class="card-bg" :style="{ backgroundImage: `url(${currentQuote.cover})` }"></div>
      
      <div class="card-content">
        <div class="card-header">
          <span class="quote-mark">“</span>
          <span class="category">{{ currentQuote.tag }}</span>
        </div>
        
        <div class="quote-text animate-fade" :key="currentQuote.text">
          {{ currentQuote.text }}
        </div>
        
        <div class="card-footer">
          <div class="author-info">
            <span class="line"></span>
            <span class="name">{{ currentQuote.author || '月栖洲' }}</span>
          </div>
          <div class="refresh-hint">点击卡片 捕捉共鸣</div>
        </div>
      </div>

      <div class="vinyl-record" :class="{ rotating: true }"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const quotes = [
  { text: "在这个快节奏的世界里，我想和你慢条斯理地虚度光阴。", tag: "陪伴", cover: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=1000" },
  { text: "总有一首歌，让你想起那个没能说出口的告别。", tag: "遗憾", cover: "https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=1000" },
  { text: "所谓的避风港，不过是几个志同道合的朋友，和一顿冒着热气的火锅。", tag: "友情", cover: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000" },
  { text: "既然留不住时光，那就把最好的自己，留在每一个当下。", tag: "生活", cover: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?q=80&w=1000" },
  { text: "世界很长，人生很短，我们要大步流星地奔向自己热爱的事物。", tag: "热爱", cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000" },
  { text: "万物皆有裂痕，那是光照进来的地方。", tag: "微光", cover: "https://images.unsplash.com/photo-1470252649358-96f12ad7d9af?q=80&w=1000" },
  { text: "哪怕是擦肩而过，也是这世界温柔的馈赠。", tag: "遇见", cover: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1000" },
  { text: "晚风路过窗口，带走了我没说出口的那句想念。", tag: "思念", cover: "https://images.unsplash.com/photo-1507501336603-6e31db2be093?q=80&w=1000" },
  { text: "撑伞不是为了躲雨，是为了在雨中等那个一起淋湿的人。", tag: "守候", cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1000" },
  { text: "少年时的那场大雨，至今还湿在我的心底。", tag: "青春", cover: "https://images.unsplash.com/photo-1437315306147-09239286039a?q=80&w=1000" },
  { text: "孤独不是没人陪，而是想说话时发现没人在听。", tag: "独白", cover: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1000" },
  { text: "所有的不期而遇，都是久别重逢。", tag: "缘分", cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000" },
  { text: "今天的夕阳很美，可惜你不在我身边。", tag: "瞬时", cover: "https://images.unsplash.com/photo-1470252649358-96f12ad7d9af?q=80&w=1000" },
  { text: "去远方不一定要见风景，有时候只是为了找回自己。", tag: "行者", cover: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000" },
  { text: "寄不出的信，最后都成了心里的朱砂痣。", tag: "旧信", cover: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?q=80&w=1000" },
  { text: "戴上耳机的那一刻，世界与我无关。", tag: "自由", cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000" },
  { text: "梦里梦见的人，醒来记得去见见。", tag: "梦境", cover: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?q=80&w=1000" },
  { text: "别走太快，等等那个还在原地发呆的灵魂。", tag: "慢活", cover: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000" },
  { text: "哪怕世界荒芜，也要在心里开出一朵花来。", tag: "坚韧", cover: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1000" },
  { text: "愿你遍历山河，觉得人间值得。", tag: "祝愿", cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000" }
]

const currentQuote = ref(quotes[0])

const refreshQuote = () => {
  let next;
  do {
    next = quotes[Math.floor(Math.random() * quotes.length)];
  } while (next.text === currentQuote.value.text);
  currentQuote.value = next;
}

onMounted(() => {
  refreshQuote()
})
</script>

<style scoped lang="scss">
.sentiment-section {
  padding: 60px 24px 120px;
  display: flex;
  justify-content: center;
  background: #ffffff;
}

.sentiment-card {
  width: min(100%, 850px);
  height: 480px;
  border-radius: 40px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 50px 120px rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  transition: all 0.8s cubic-bezier(0.2, 1, 0.2, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 60px 140px rgba(32, 196, 182, 0.15);
  }
}

.card-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(35px) brightness(0.7);
  transform: scale(1.15);
  transition: background-image 1.2s ease-in-out;
  z-index: 0;
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 70px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .quote-mark {
    font-size: 100px;
    font-family: "Georgia", serif;
    opacity: 0.4;
    line-height: 0.1;
    margin-top: 40px;
  }
  .category {
    font-size: 12px;
    letter-spacing: 6px;
    text-transform: uppercase;
    opacity: 0.7;
    font-weight: 400;
    border: 1px solid rgba(255,255,255,0.25);
    padding: 6px 16px;
    border-radius: 999px;
    backdrop-filter: blur(10px);
  }
}

.quote-text {
  font-size: clamp(22px, 4.5vw, 34px);
  font-weight: 400;
  line-height: 1.8;
  letter-spacing: 1px;
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
  max-width: 85%;
  font-family: "Noto Serif SC", "Source Han Serif CN", serif;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 16px;
  .line {
    width: 50px;
    height: 1px;
    background: #fff;
    opacity: 0.4;
  }
  .name {
    font-size: 20px;
    font-family: "Noto Serif SC", serif;
    letter-spacing: 3px;
    font-weight: 300;
  }
}

.refresh-hint {
  font-size: 11px;
  opacity: 0.4;
  letter-spacing: 2px;
}

.vinyl-record {
  position: absolute;
  right: -80px;
  top: 50%;
  transform: translateY(-50%);
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, #111 30%, #222 40%, #000 50%, #111 70%);
  border-radius: 50%;
  opacity: 0.08;
  z-index: 1;
  border: 15px solid rgba(255,255,255,0.03);
}

.rotating {
  animation: rotate 25s linear infinite;
}

@keyframes rotate {
  from { transform: translateY(-50%) rotate(0deg); }
  to { transform: translateY(-50%) rotate(360deg); }
}

.animate-fade {
  animation: fadeInBlur 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeInBlur {
  from { opacity: 0; filter: blur(10px); transform: translateY(10px); }
  to { opacity: 1; filter: blur(0); transform: translateY(0); }
}

@media (max-width: 600px) {
  .card-content { padding: 40px; }
  .quote-text { font-size: 20px; max-width: 100%; }
  .author-info .line { width: 30px; }
}
</style>
