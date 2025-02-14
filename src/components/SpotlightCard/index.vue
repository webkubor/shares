<template>
    <div ref="divRef" @mousemove="handleMouseMove" class="card-spotlight">
        <slot></slot>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const divRef = ref(null);
const spotlightColor = ref('rgba(0, 229, 255, 0.2)');

const handleMouseMove = (e) => {
    if (!divRef.value) return;
    const rect = divRef.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.value.style.setProperty("--mouse-x", `${x}px`);
    divRef.value.style.setProperty("--mouse-y", `${y}px`);
    divRef.value.style.setProperty("--spotlight-color", spotlightColor.value);
};


</script>
<style scoped>
.card-spotlight {
    position: relative;
    border-radius: 20px;
     border: 1px solid #222; 
    background-color: #111; 
    padding: 20px;
    overflow: hidden;
    --mouse-x: 50%;
    --mouse-y: 50%;
    --spotlight-color: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    cursor: pointer;
}

.card-spotlight::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
}

.card-spotlight:hover::before,
.card-spotlight:focus-within::before {
    opacity: 0.6;
}
</style>