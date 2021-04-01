<template>
  <div>
    <h4>测试快捷访问的相对路径</h4>
      <el-button type="primary" @click="$router.push('/user')">users</el-button>
  <el-button type="success" @click="$router.push('/center')">center</el-button>
  <el-button type="info" @click="$router.push('/test')">test</el-button>
  <el-button type="warning" @click="$router.push('/layout')">测试跳转4</el-button>
  <el-button type="danger">危险按钮</el-button>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple">
            1
          </div
      ></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple-light">
          2
          </div
      ></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple">
          3</div
      ></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple-light">
          4</div
      ></el-col>
    </el-row>
  </div>
</template>
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

