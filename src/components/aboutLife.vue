<template>
    <n-divider title-placement="center">关于我近期的生活</n-divider>
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
            <n-image
              width="100"
              src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
            />
        </n-image-group>
      </div>
    </div>
</template>
<style lang="scss" scoped>
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