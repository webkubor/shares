<template>
    <n-divider title-placement="center">关于我近期的生活</n-divider>
    <div class="mylife">
      <div class="left">
        <n-timeline item-placement="left" size="large">
          <n-timeline-item
           v-for="(item, index) in user.timeLine"
            type="success"
            :key="index"
            :title="item.title"
            :content="item.content"
            :time="item.time"
          />
        </n-timeline>
      </div>
      <div class="right">
            <n-image
              width="100"
              src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
            />
      </div>
    </div>
</template>
<script>
import { useUser } from "hooks/useUser";
export default {
  setup() {
    let { user } = useUser();
    return {
      user
    }
  },
}
</script>
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