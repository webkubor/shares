<template>
  <div class="flute-guide">
    <div class="header">
      <h1 class="title">竹笛演奏指导</h1>
      <p class="subtitle">学习竹笛演奏的基础知识和技巧</p>
    </div>
    
    <div class="content">
      <n-card title="基础知识" class="section-card">
        <div class="basics">
          <h3>竹笛简介</h3>
          <p>竹笛是中国传统的木管乐器，由竹子制成，音色清脆悠扬，是民族音乐中重要的独奏和合奏乐器。</p>
          
          <h3>竹笛构造</h3>
          <ul>
            <li><strong>笛身：</strong>主要的发声部分</li>
            <li><strong>笛膜：</strong>贴在膜孔上，影响音色</li>
            <li><strong>笛塞：</strong>调节音高的部件</li>
            <li><strong>音孔：</strong>控制不同音高的孔洞</li>
          </ul>
        </div>
      </n-card>
      
      <n-card title="持笛姿势" class="section-card">
        <div class="posture">
          <h3>正确的持笛方法</h3>
          <ol>
            <li>双手自然握持笛身</li>
            <li>左手在上，右手在下</li>
            <li>拇指托住笛身背面</li>
            <li>其余手指自然弯曲，指尖按孔</li>
          </ol>
          
          <h3>演奏姿势</h3>
          <ul>
            <li>身体挺直，肩膀放松</li>
            <li>笛子与身体呈45度角</li>
            <li>头部微微向左转</li>
            <li>呼吸要深而稳</li>
          </ul>
        </div>
      </n-card>
      
      <n-card title="基础指法" class="section-card">
        <div class="fingering">
          <h3>音阶指法表</h3>
          <div class="fingering-chart">
            <div class="note-item">
              <span class="note">低音5 (sol)</span>
              <span class="fingers">● ● ● ● ● ●</span>
            </div>
            <div class="note-item">
              <span class="note">低音6 (la)</span>
              <span class="fingers">● ● ● ● ● ○</span>
            </div>
            <div class="note-item">
              <span class="note">低音7 (si)</span>
              <span class="fingers">● ● ● ● ○ ○</span>
            </div>
            <div class="note-item">
              <span class="note">中音1 (do)</span>
              <span class="fingers">● ● ● ○ ○ ○</span>
            </div>
            <div class="note-item">
              <span class="note">中音2 (re)</span>
              <span class="fingers">● ● ○ ○ ○ ○</span>
            </div>
            <div class="note-item">
              <span class="note">中音3 (mi)</span>
              <span class="fingers">● ○ ○ ○ ○ ○</span>
            </div>
          </div>
          <p class="note-explanation">● 表示按住音孔，○ 表示打开音孔</p>
        </div>
      </n-card>
      
      <n-card title="练习建议" class="section-card">
        <div class="practice">
          <h3>初学者练习步骤</h3>
          <ol>
            <li><strong>长音练习：</strong>每个音保持8拍，注意音色的稳定</li>
            <li><strong>音阶练习：</strong>从低音5到高音5，上行下行反复练习</li>
            <li><strong>简单曲目：</strong>选择《茉莉花》、《小星星》等简单曲目</li>
            <li><strong>气息控制：</strong>练习腹式呼吸，保持气息稳定</li>
          </ol>
          
          <h3>练习注意事项</h3>
          <ul>
            <li>每天坚持练习30分钟以上</li>
            <li>注意手指的灵活性训练</li>
            <li>保持正确的演奏姿势</li>
            <li>循序渐进，不要急于求成</li>
          </ul>
        </div>
      </n-card>
      
      <n-card title="常见问题" class="section-card">
        <div class="faq">
          <div class="faq-item">
            <h4>Q: 为什么吹不出声音？</h4>
            <p>A: 检查笛膜是否贴好，嘴型是否正确，气息是否足够。</p>
          </div>
          
          <div class="faq-item">
            <h4>Q: 音不准怎么办？</h4>
            <p>A: 调整气息强度，检查手指按孔是否严实，练习音准感。</p>
          </div>
          
          <div class="faq-item">
            <h4>Q: 手指按不住孔怎么办？</h4>
            <p>A: 多做手指灵活性练习，确保指尖垂直按孔，逐渐增强手指力量。</p>
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// 竹笛演奏指导页面
</script>

<style lang="scss" scoped>
.flute-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
  .header {
    text-align: center;
    margin-bottom: 40px;
    
    .title {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin: 0;
    }
  }
  
  .content {
    .section-card {
      margin-bottom: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      
      h3 {
        color: #2c3e50;
        margin-bottom: 15px;
        font-size: 1.3rem;
      }
      
      h4 {
        color: #34495e;
        margin-bottom: 10px;
      }
      
      p {
        line-height: 1.6;
        color: #555;
        margin-bottom: 15px;
      }
      
      ul, ol {
        padding-left: 20px;
        
        li {
          margin-bottom: 8px;
          line-height: 1.5;
          color: #555;
        }
      }
    }
  }
  
  .fingering-chart {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    
    .note-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #e9ecef;
      
      &:last-child {
        border-bottom: none;
      }
      
      .note {
        font-weight: bold;
        color: #2c3e50;
        min-width: 120px;
      }
      
      .fingers {
        font-family: monospace;
        font-size: 1.2rem;
        color: #e74c3c;
        letter-spacing: 4px;
      }
    }
    
    .note-explanation {
      margin-top: 15px;
      font-size: 0.9rem;
      color: #6c757d;
      font-style: italic;
    }
  }
  
  .faq {
    .faq-item {
      margin-bottom: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #3498db;
      
      h4 {
        margin-bottom: 8px;
        color: #2c3e50;
      }
      
      p {
        margin: 0;
        color: #555;
      }
    }
  }
}

@media (max-width: 768px) {
  .flute-guide {
    padding: 15px;
    
    .header .title {
      font-size: 2rem;
    }
    
    .fingering-chart .note-item {
      flex-direction: column;
      align-items: flex-start;
      
      .fingers {
        margin-top: 5px;
      }
    }
  }
}
</style>