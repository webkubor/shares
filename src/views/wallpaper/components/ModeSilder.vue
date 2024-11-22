<template>
    <n-card style="margin-bottom: 16px;height: 50vh;">
        <n-tabs type="line" animated size="large" v-model:value="paperState.model">
            <n-tab-pane :name="1" tab="移动端">
                <n-space>
                    <div class="m-item" @click="setModelSrc(config.mobile.phone.frame)">
                        <img :src="config.mobile.phone.frame" alt="">
                        <span>苹果</span>
                    </div>
                    <div class="m-item" @click="setModelSrc(config.mobile.android.frame)">
                        <img :src="config.mobile.android.frame" alt="">
                        <span>安卓</span>
                    </div>
                </n-space>
            </n-tab-pane>
            <n-tab-pane :name="2" tab="ipad">
                <div class="pc-item" v-for="(item,index) in config.ipad" @click="setModelSrc(item)">
                    <img :src="item" >
                    <span>{{ index + 1 }}</span>
                </div>
            </n-tab-pane>
            <n-tab-pane :name="3" tab="混合">
                <div v-if="config.remix.length === 0">当前功能暂未开放</div>
                <div class="pc-item" v-for="(item,index) in config.remix" @click="setModelSrc(item)">
                    <img :src="item" >
                    <span>{{ index + 1 }}</span>
                </div>
            </n-tab-pane>
        </n-tabs>
    </n-card>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import config from "../config.json"
import  {useWallpaper} from "../useWallpaper"

    const{setModelSrc,paperState} = useWallpaper()
onMounted(()=>{
})
</script>
<style lang="scss" scoped>
.m-item {
    width: 90px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-radius: 10px;
    padding: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    line-height: 40px;
    &:hover {
        color: $default-primary;
    }
    img {
        &:hover {
            filter: drop-shadow(0px 2px 10px $default-primary);
            transform: scale(1.05);
        }
    }
  


}


.pc-item {
    width: 150px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    line-height: 40px;

    img {
        width: 100px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
            filter: drop-shadow(0px 2px 10px $default-primary);
            border: 1px solid $default-primary;
            transform: scale(1.05);
        }
    }

    &:hover {
        color: $default-primary;
    }

}
</style>