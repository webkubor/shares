<!--
 * @Date: 2021-07-31 19:27:24
 * @LastEditTime: 2021-10-13 14:51:55
-->
<template>
  <n-divider title-placement="left">关于我</n-divider>
  <n-space>
    <n-tag v-for="(item, index) in user.tags" :key="item + index" :type="getRandomType()"> {{item}} </n-tag>
  </n-space>
</template>
<script>
import { useUser } from "hooks/useUser";
export default {
  setup() {
    let { user, updateAge } = useUser();
    console.log(user, "test");
    updateAge()

    /**
     * @description: 获取随机状态
     * @param {*}
     * @return {*}
     */    
    function getRandomType() {
      let typeList = ["success", "warning", "error","info", ""]
      let index  = Math.floor(Math.random() * typeList.length)
       return typeList[index]
    }

    return {
      getRandomType,
      user
    };
  },
};
</script>
