<!--
 * @Date: 2021-07-31 19:27:24
 * @LastEditTime: 2021-10-14 17:31:06
-->
<template>
  <n-avatar round  :size="48" :src="user.avatar" @click="swtichTheme"/>
  <h2>Hello ,this is {{ user.name }} ,今年 {{user.age}}</h2>
  <n-divider title-placement="left">关于我</n-divider>
  <n-space>
    <n-tag v-for="(item, index) in user.tags" :key="item + index" :type="getRandomType()"> {{item}} </n-tag>
  </n-space>

</template>
<script>
import { useUser } from "hooks/useUser";
import {useTheme} from "hooks/useTheme";
export default {
  setup() {
    let { user, updateAge } = useUser();
    let { swtichTheme} = useTheme()
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
      swtichTheme,
      user
    };
  },
};
</script>
