<template>
    <div class="login-view">
        <div class="login-box">
            <h1>Manager</h1>
            <input class="form-width" type="text" placeholder="Username">
            <input class="form-width" type="password" placeholder="Password">
            <button class="form-width">Login</button>
            <button class="form-width">Register</button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
$theme-color: #43CBFF;

h1 {
    color: darken($color: $theme-color, $amount: 20%);
}

button {
    width: 100%;
    height: 50px;
    border: none;
    outline: none;
    color: white;
    border-radius: 20px;
    font-size: 18px;
    cursor: pointer;
    margin-top: 20px;
    background: darken($color: $theme-color, $amount: 15%);
    transition: all 0.3s ease-in-out;

    &:hover {
        background: $theme-color;
        filter: drop-shadow(0px 4px 10px rgba(255, 255, 255, 0.2));
        transform: translateY(2px);
        box-shadow: 0 0 12px rgba($theme-color, 0.5);

    }
}

input {
    border: 0;
    height: 50px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 0 20px;
    margin-top: 20px;
    color: white;
    letter-spacing: 3px;
    width: 90%;
    caret-color: $theme-color;

    &:focus {
        outline: none;
        filter: drop-shadow(0px 4px 10px $theme-color);

        box-shadow: 0px 4px 10px rgba($theme-color, 0.2);
    }

    &::placeholder {
        color: white;
        opacity: 0.5;
    }

    &:first-child {
        margin-top: 0;
    }

}

.form-width {
    width: 450px;
    font-size: 18px;
    font-weight: 500;
}

.login-view {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333333;
    background: #1940c3;
}

.login-box {
    border-radius: 20px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.3);
    position: relative;
    padding: 10px 20px 40px;
    text-align: center;
    @include glass-effect(#ffffff, 10, 0.5);
    display: flex;
    flex-direction: column;

    &:hover {
        box-shadow: 0 0 12px rgba($theme-color, 0.5);
    }

    h1 {
        font-size: 30px;
        margin-bottom: 20px;
    }

}
</style>