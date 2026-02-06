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
  // --- 技术与创作精华 (Restored) ---
  { text: "代码是理性的诗，旋律是感性的逻辑。", tag: "Dualism", cover: "https://images.unsplash.com/photo-1516280440614-37939bbdd4f1?q=80&w=1000" },
  { text: "在雪夜里无声行走，名动四方前先听见自己的心跳。", tag: "雪夜无名", cover: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000" },
  { text: "所有的工具，最终都是为了抵达那个不可言说的灵魂。", tag: "Toolchain", cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000" },
  { text: "我们用 0 和 1 模拟世界，却在文字里寻找真实。", tag: "Literature", cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000" },
  { text: "One Context to Rule Them All, 一颗心容纳整个宇宙。", tag: "AI Common", cover: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000" },
  { text: "所谓创作，不过是在众声喧哗中，留住那一秒钟的寂静。", tag: "Music", cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000" },
  
  // --- 武侠与侠义 (New) ---
  { text: "侠之大者，不在于剑有多快，而在于心中的灯火从未熄灭。", tag: "武侠", cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000" },
  { text: "仗剑走天涯的年纪过了，现在的剑是手中那支写给岁月的笔。", tag: "武侠", cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000" },
  { text: "少年时的那场江湖梦，至今还湿在我的心底。", tag: "情怀", cover: "https://images.unsplash.com/photo-1437315306147-09239286039a?q=80&w=1000" },
  { text: "归隐不是逃避，是带着满身风尘，去赴一场内心的约会。", tag: "武侠", cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000" },

  // --- 亲情与家庭 (New) ---
  { text: "父母在，人生尚有来处；父母去，人生只剩归途。", tag: "亲情", cover: "https://images.unsplash.com/photo-1507501336603-6e31db2be093?q=80&w=1000" },
  { text: "所谓家，就是那个你走得再远，回头都能看见灯火的地方。", tag: "亲情", cover: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?q=80&w=1000" },
  { text: "儿时不懂那碗热汤的重，等懂的时候，汤已在记忆里变凉。", tag: "亲情", cover: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000" },
  { text: "一壶浊酒，半生雪夜，名动四方不如归家团圆。", tag: "雪夜无名", cover: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000" },

  // --- 友情与生活 (Refined) ---
  { text: "所谓的避风港，不过是几个志同道合的朋友，和一顿冒着热气的火锅。", tag: "友情", cover: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000" },
  { text: "在这个快节奏的世界里，想和老友慢条斯理地虚度光阴。", tag: "知己", cover: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=1000" },
  { text: "既然留不住时光，那就把最好的自己，留在每一个当下。", tag: "生活", cover: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?q=80&w=1000" },
  { text: "万物皆有裂痕，那是光照进来的地方。", tag: "哲学", cover: "https://images.unsplash.com/photo-1470252649358-96f12ad7d9af?q=80&w=1000" },
  { text: "老街的旧书店关了，却关不住那些在文字里躲雨的灵魂。", tag: "人文", cover: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1000" },
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
