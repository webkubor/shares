<template>
  <div>
    <h4>测试快捷访问的相对路径</h4>
    <!-- <div class='metamask-info'>
   <p>Metamask: {{ web3.isInjected }}</p>
   <p>Network: {{ web3.networkId }}</p>
   <p>Account: {{ web3.coinbase }}</p>
   <p>Balance: {{ web3.balance }}</p>
 </div> -->
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
