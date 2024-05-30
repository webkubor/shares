<template>
    <div class="card">
        <div class="card-header">{{ title }}</div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
    title: {
        type: String,
        required: true
    }
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.card {
    @include glass-effect(rgba(255, 255, 255), 10, 0.2);
    border-radius: 10px;
    padding: 20px;
    margin: 15px;
    width: 100%;
    max-width: 400px;
    cursor: pointer;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        background: rgba(255, 255, 255, 0.3);
    }

    &:active {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        background: rgba(255, 255, 255, 0.25);
    }


    .card-header {
        font-size: 1.5em;
        margin-bottom: 10px;
    }

    .card-body {
        font-size: 1em;
    }
}
</style>