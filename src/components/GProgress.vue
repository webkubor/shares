<template>
        <div class="progress-slider" ref="totalSider" >
            <div class="progress-bar" :style="{ width: progress + '%' }">
                <div class="end thumb" ref="endElement" @onpointerStart="onDragStart"></div>
            </div>
        </div>

</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { add, subtract, multiply, divide } from "@/utils/math"
let props = defineProps(
    {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        value: {
            type: Number,
            default: 0
        }
    }
)

let emit = defineEmits(['change'])

const progress = ref(0);
const endElement = ref<HTMLElement | null>(null);
const totalSider = ref<HTMLElement | null>(null);



watch(() => props.value, (newValue) => {
    progress.value = ((newValue - props.min) / (props.max - props.min)) * 100;
    console.log("显示进度为", progress.value);
    console.log("传参为", newValue);
});

onMounted(() => {
    // initDrog()
})

const onClick = (event: MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;
    const percentage = (offsetX / width) * 100;
    unpdateProgress(percentage)
};

function initDrog() {
    if (!endElement.value) return
    if (!totalSider.value) return
    endElement.value.onmousedown = function (event) {
        event.preventDefault(); // prevent selection start (browser action)
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        function onMouseMove(event) {
            let progressWidth = event.clientX - totalSider.value.getBoundingClientRect().left; //进度宽度
            const pointer = endElement.value.offsetWidth //指示器宽度
            const totalWidth = totalSider.value.getBoundingClientRect().width - pointer; //进度总宽度
            if (progressWidth < 0) progressWidth = 0;
            if (progressWidth > totalWidth) progressWidth = totalWidth
            let percentage = (progressWidth / totalWidth) * 100;
            unpdateProgress(percentage)
        }

        function onMouseUp(event) {
            console.log(event.clientX, "onMouseUp");
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }

    };
    endElement.value.ondragstart = function () {
        return false;
    };
}

function unpdateProgress(percentage) {
    let progress = parseInt(percentage) //显示的进度
    let tatal = subtract(props.max, props.min)
    let outNumber = divide(multiply(progress, tatal), 100) + props.min;
    if (outNumber > props.max) outNumber = props.max;
    if (outNumber < props.min) outNumber = props.min;
    outNumber = parseInt(String(outNumber))
    emit('change', outNumber);
}


function onDragStart(event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    console.log(rect, "开始拖拽");
}


</script>

<style lang="scss" scoped>


.progress-slider {
    position: relative;
    background-color: #131314;
    width: 100%;
    height: 15px;
    border-radius: 10px;
    box-sizing: border-box;

    &:hover {
        border: 1px solid $default-primary;
        border-radius: 10px;
        filter: drop-shadow(0px 0px 10px $default-primary);
    }

    .progress-bar {
        height: 100%;
        border-radius: 4px;
        background: linear-gradient(90deg, #D0458F 0%, #FF8863 100%);
        position: relative;

        .end {
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            height: 30px;
            width: 30px;
            background: #ffffff;
            border: 3px solid $default-primary;
            border-radius: 50%;
            cursor: pointer;

            &:hover {
                filter: drop-shadow(0px 0px 10px $default-primary);
                transform: translateY(-50%) scale(1.2);

            }
        }
    }
}

@media screen and (max-width: 1000PX) {
    .progress-slider {
        height: 35px;

        .progress-bar {
            .end {
                width: 50px;
                height: 50px;
            }
        }
    }

}
</style>
