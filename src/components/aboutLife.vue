<template>
  <n-divider title-placement="center">
    关于我近期的生活
    </n-divider>
  <div class="mylife">
    <iframe
      class="yuque"
      src="https://www.yuque.com/webkubor"
      frameborder="0"
    ></iframe>
    <iframe
      class="weibo"
      src="https://www.yuque.com/webkubor/life"
      frameborder="0"
    ></iframe>
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
    width: 50vw;
    height: 800px;
  }
  .weibo {
    flex: 1;
  }
}
</style>
