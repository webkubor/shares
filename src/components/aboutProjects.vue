<!--
 * @Date: 2021-07-31 19:26:47
 * @LastEditTime: 2021-10-14 15:59:10
-->
<template>
    <n-divider title-placement="left">关于项目</n-divider>
    <n-grid :x-gap="12" :y-gap="8" :cols="3">
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
</template>
<style lang="scss" scoped>
.n-card {
  max-width: 800px;
  max-height: 350px;
}
</style>