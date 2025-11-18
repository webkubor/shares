
<template>
  <div class="not-found">
    <div class="result">
      <div class="status">404</div>
      <div class="title">Can't find the order page</div>
    </div>
  </div>
</template>
<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.result { text-align: center; }
.status { font-size: 64px; font-weight: 800; color: #CF1322; }
.title { margin-top: 8px; font-weight: 600; }

.test-demo {
  border-bottom: 2px solid;
  .GR8Uc {
    display: none;
  }
}
</style>
