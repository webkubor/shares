<template>
  <div class="flute-guide">
    <!-- 如何挑选你的第一支竹笛 -->
    <div class="section-card">
      <div class="card-content">
      <h3>🧐 如何挑选你的第一支竹笛</h3>
      <p>对于初学者，选择竹笛时可以考虑以下几点：</p>
      
      <div class="guide-section">
        <h4>调性选择</h4>
        <p>初学者最好购买F调、G调或E调的笛子。这类笛子笛身相对较短，指孔间距较小，对手指尚未完全打开的初学者来说更容易按孔，并且吹奏起来也相对省力，有助于建立信心。</p>
      </div>
      
      <div class="guide-section">
        <h4>材质选择</h4>
        <p>对于初学者，苦竹笛是性价比较高的选择。其音色明亮，价格相对亲民，是初学常用的笛子材质。</p>
      </div>
      
      <div class="guide-section">
        <h4>工艺与品牌</h4>
        <ul>
          <li>建议选择口碑好的品牌，它们通常在工艺和音准上有更好保障。</li>
          <li>检查笛身是否圆滑无裂纹，竹质是否干老。</li>
          <li>吹孔、膜孔、音孔等孔壁是否光滑无毛刺。</li>
          <li>有条件的话，试吹一下，检查音准（尤其注意八度关系是否准确）、音色是否统一，以及高音是否灵敏。</li>
        </ul>
      </div>
      
      <div class="guide-section">
        <h4>购买渠道</h4>
        <p>如果条件允许，最好能到实体乐器店亲自挑选和试吹。如果线上购买，要选择信誉良好的店家，并了解清楚退换货政策。</p>
      </div>
      </div>
    </div>
    
    <!-- 竹笛的保养 -->
    <div class="section-card">
      <div class="card-content">
        <h3>💡 竹笛的保养</h3>
        <p>一支好的竹笛如果保养得当，可以陪伴你很久：</p>
      
      <div class="maintenance-list">
        <div class="maintenance-item">
          <h4>用后擦拭</h4>
          <p>每次吹奏后，用软布将笛子内壁的汗水和水汽擦干。</p>
        </div>
        
        <div class="maintenance-item">
          <h4>妥善存放</h4>
          <p>将笛子放入笛袋或笛盒中，避免磕碰，远离潮湿、暴晒、高温和空调直吹的地方，以防笛子开裂或变形。</p>
        </div>
        
        <div class="maintenance-item">
          <h4>定期润滑</h4>
          <p>可以定期在接口处涂抹少量凡士林起到润滑和密封作用。</p>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 竹笛选购与保养指南组件
</script>

<style lang="scss" scoped>
.flute-guide {
  .section-card {
    margin-bottom: 32px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
    }
    
    padding: 28px;
    
    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
    }
  }

  p {
    line-height: 1.6;
    color: #475569;
    margin-bottom: 14px;
    font-size: 0.9rem;
  }

  .guide-section {
    margin-bottom: 20px;
    padding: 16px;
    background: rgba(76, 175, 80, 0.05);
    border-radius: 12px;
    border-left: 4px solid #4CAF50;

    h4 {
      color: #2e7d32;
      font-size: 1rem;
      margin-bottom: 6px;
      font-weight: 600;
    }

    p {
      margin-bottom: 0;
      color: #475569;
    }

    ul {
      margin: 0;
      padding-left: 20px;

      li {
        color: #475569;
        line-height: 1.6;
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .maintenance-list {
    .maintenance-item {
      margin-bottom: 16px;
      padding: 16px;
      background: rgba(255, 152, 0, 0.05);
      border-radius: 12px;
      border-left: 4px solid #FF9800;

      &:last-child {
        margin-bottom: 0;
      }

      h4 {
        color: #e65100;
        font-size: 1rem;
        margin-bottom: 6px;
        font-weight: 600;
      }

      p {
        margin-bottom: 0;
        color: #475569;
      }
    }
  }
}

@media (max-width: 768px) {
  .flute-guide {
    .section-card {
      margin-bottom: 24px;
      
      :deep(.n-card-header) {
        padding: 18px 20px;
        
        .n-card-header__main {
          font-size: 1.1rem;
        }
      }
      
      :deep(.n-card__content) {
        padding: 24px;
      }
    }

    .guide-section,
    .maintenance-item {
      padding: 12px;
      margin-bottom: 12px;
    }
  }
}
</style>