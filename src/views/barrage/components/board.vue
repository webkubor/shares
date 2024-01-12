<template>
    <div class="barrage-board">
        <div class="show-row">
            <n-button @click="sendMessage" type="primary">发送弹幕</n-button>
            <n-input v-model="message" placeholder="输入弹幕内容" clearable   type="textarea" autosize style="min-width: 80%" ></n-input>
        </div>
        <n-color-picker />
        <div class="show-row">
        <n-button dashed type="info" @click="clearMessage" >清空弹幕</n-button>

</div>


    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const message = ref('');

const sendMessage = () => {
    // 在这里处理发送弹幕的逻辑
    console.log('发送弹幕:', message.value);
    // 清空输入框
    message.value = '';
    window.$message.success('发送成功');
};


const clearMessage = ()=>{
    console.log('清空弹幕')
    message.value = ''
}


</script>
<style lang="scss" scoped>
.barrage-board {
    padding: 20px;
    background: transparent;
}

.show-row {
    display: flex;
    margin: 10px 0;
    button {
        margin-right: 10px;
    }
}
</style>