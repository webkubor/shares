<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-07-31 18:35:39
-->
<template>
  <div>
    <h4>测试快捷访问的相对路径</h4>
    <el-button type="primary" @click="$router.push('/user')">users</el-button>
    <el-button type="success" @click="$router.push('/center')"
      >center</el-button
    >
    <el-button type="info" @click="$router.push('/test')">test</el-button>
    <el-button type="warning" @click="$router.push('/layout')"
      >测试跳转4</el-button
    >
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>
<!-- <script>
export default {
  data () {
    return {
    }
  },
  beforeCreate() {
    console.log('registerWeb3 Action dispatched from casino-dapp.vue')
    // this.$store.dispatch('registerWeb3'
  },
  created() {
    console.log('周期测试',this.web3)
  },
}
</script> -->

<style lang="scss" scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
