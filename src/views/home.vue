<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-07-31 19:45:17
-->
<template>
   <h2>webkubor的项目分享</h2>
  <n-divider title-placement="left">关于我</n-divider>
  <n-space>
    <n-tag> 爱在西元前 </n-tag>
    <n-tag type="success"> 不该 </n-tag>
    <n-tag type="warning"> 超人不会飞 </n-tag>
    <n-tag type="error"> 手写的从前 </n-tag>
    <n-tag type="info"> 哪里都是你 </n-tag>
  </n-space>
  <n-divider title-placement="left">关于项目</n-divider>
  <n-grid :x-gap="12" :y-gap="8" :cols="4">
    <n-grid-item>
      <n-card title="带封面的卡片">
        <template #cover>
          <img
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </template>
        卡片内容
      </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card title="带封面的卡片">
        <template #cover>
          <img
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </template>
        卡片内容
      </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card title="带封面的卡片">
        <template #cover>
          <img
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </template>
        卡片内容
      </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card title="带封面的卡片">
        <template #cover>
          <img
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </template>
        卡片内容
      </n-card>
    </n-grid-item>
  </n-grid>
  <n-divider title-placement="left">关于生活</n-divider>
  <div class="mylife">
    <div class="left">
 <n-timeline item-placement="left" size="large">
      <n-timeline-item content="啊" />
      <n-timeline-item
        type="success"
        title="成功"
        content="哪里成功"
        time="2018-04-03 20:46"
      />
      <n-timeline-item
        type="error"
        content="哪里错误"
        time="2018-04-03 20:46"
      />
      <n-timeline-item
        type="warning"
        title="警告"
        content="哪里警告"
        time="2018-04-03 20:46"
      />
      <n-timeline-item
        type="info"
        title="信息"
        content="是的"
        time="2018-04-03 20:46"
      />
    </n-timeline>
    </div>
    <div class="right">
   <n-image-group>
    <n-space>
      <n-image
        width="100"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      <n-image
        width="100"
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
    </n-space>
  </n-image-group>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.n-card {
  max-width: 800px;
  max-height: 500px;
}
.mylife {
  display: flex;
  .left {
    flex: 2;
  }
  .right {
    flex: 3;
  }

}
</style>
