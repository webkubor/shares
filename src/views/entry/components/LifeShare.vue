<template>
  <div class="mylife">
    <n-grid
      cols="1 s:1 m:1 l:1 xl:1 2xl:1"
      x-gap="15"
      y-gap="15"
      responsive="screen"
    >
      <n-grid-item>
        <iframe
          class="weibo"
          src="https://www.yuque.com/webkubor/blog"
          frameborder="0"
        ></iframe>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script>
import { useUser } from "@/hooks/useUser";
export default {
  setup() {
    let { user } = useUser();
    return {
      user,
    };
  },
};
</script>
<style lang="scss" scoped>
.mylife {
  display: flex;
  padding: 10px;
  font-size: 20px;
  .yuque {
    width: 100%;
    height: 800px;
  }
  .weibo {
    width: 100%;
    height: 800px;
  }
}
</style>
