<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-07-31 19:20:17
-->
<template>
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
</template>

<style lang="scss" scoped>
.n-card {
  max-width: 800px;
  max-height: 500px;
}
</style>
