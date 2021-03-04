<template>
  <h1>{{ msg }}</h1>
  <button @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <button @click="emit('myclick')">emit</button>
</template>

<script setup>
import { defineProps, reactive, defineEmit } from 'vue'
// 属性定义
defineProps({
  msg: String
})
const state = reactive({ count: 0 })
const emit =defineEmit(['myclick'])

fetch('/api/createUser').then((res)=>res.json()).then((data) => {
  console.log(data)
})

</script>

<style scoped>
a {
  color: #42b983;
}
</style>