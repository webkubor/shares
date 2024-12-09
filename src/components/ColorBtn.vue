<template>
    <button>
        <slot>
        </slot>
    </button>
</template>
<style lang="scss" scoped>
button {
    display: flex;
    height: 3em;
    width: 100px;
    align-items: center;
    justify-content: center;
    background-color: #eeeeee4b;
    border-radius: 3px;
    letter-spacing: 1px;
    transition: all 0.2s linear;
    cursor: pointer;
    border: none;
    color: var(--webkubor-text-primary);
    background: var(--webkubor-bg);
}

button:hover>svg {
    font-size: 1.2em;
    transform: translateX(-5px);
}

button:hover {
    box-shadow: 9px 9px 33px var(--webkubor-second), -9px -9px 33px var(--webkubor-bg);
    transform: translateY(-2px);
}
</style>
