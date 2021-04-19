<!-- <template>
  <h1>{{ msg }}</h1>
  <el-button @click="state.count++">count is: {{ state.count }}</el-button>
  <button @click="emit('myclick')">emit</button>
  <button @click="$store.commit('add')">提交时间-{{$store.state.counter}}</button>
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

</script> -->

