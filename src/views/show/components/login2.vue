<template>
    <div class="login-view">
        <div class="login">
            <h1>Login</h1>
            <form method="post">
                <input type="password" hidden autocomplete="new-password" />
                <input type="text" name="u" placeholder="Username" required="required" />
                <input type="password" name="p" placeholder="Password" required="required" />
                <button  class="btn btn-primary btn-block btn-large">登录</button>
            </form>
        </div>

    </div>
</template>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

// 颜色变量
$primary-color: #4a77d4;
$primary-color-hover: #6eb6de;
$border-color: rgba(0, 0, 0, 0.1);
$border-color-dark: rgba(0, 0, 0, 0.25);
$background-color: #f5f5f5;
$text-color: #333333;
$white: #ffffff;
$glow-color: #00ffff;
$button-shadow-color: rgba(0, 0, 0, 0.05);
$input-background: rgba(0, 0, 0, 0.3);
$input-border: rgba(0, 0, 0, 0.3);
$input-focus-shadow: rgba(100, 100, 100, 0.4);
$input-shadow: rgba(100, 100, 100, 0.2);
$input-shadow-focus: rgba(100, 100, 100, 0.4);

input {
    width: 100%;
    margin-bottom: 10px;
    background: $input-background;
    border: none;
    outline: none;
    padding: 10px;
    font-size: 13px;
    color: $white;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    border: 1px solid $input-border;
    border-radius: 4px;
    box-shadow: inset 0 -5px 45px $input-shadow, 0 1px 1px rgba(255, 255, 255, 0.2);
    transition: box-shadow .5s ease;

    &:focus {
        box-shadow: inset 0 -5px 45px $input-shadow-focus, 0 1px 1px rgba(255, 255, 255, 0.2);
    }
}

.login-view {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104, 128, 138, .4) 10%, rgba(138, 114, 76, 0) 40%),
        linear-gradient(to bottom, rgba(57, 173, 219, .25) 0%, rgba(42, 60, 87, .4) 100%),
        linear-gradient(135deg, #670d10 0%, #092756 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#3E1D6D', endColorstr='#092756', GradientType=1);
    overflow: hidden;
    font-family: 'Open Sans', sans-serif;
    position: relative;

    .login {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -150px 0 0 -150px;
        width: 300px;
        height: 300px;

        h1 {
            color: $white;
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            letter-spacing: 1px;
            text-align: center;
        }
    }
}

.btn {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    padding: 4px 10px 4px;
    margin-bottom: 0;
    font-size: 13px;
    line-height: 18px;
    color: $text-color;
    text-align: center;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
    vertical-align: middle;
    background-color: $background-color;
    background-image: linear-gradient(top, $white, #e6e6e6);
    background-repeat: repeat-x;
    filter: progid:dximagetransform.microsoft.gradient(startColorstr=$white, endColorstr=#e6e6e6, GradientType=0);
    border-color: #e6e6e6;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px $button-shadow-color;
    cursor: pointer;
    *margin-left: .3em;

    &.btn-large {
        padding: 9px 14px;
        font-size: 15px;
        line-height: normal;
        border-radius: 5px;
    }

    &:hover,
    &:active,
    &.active,
    &.disabled,
    &[disabled] {
        background-color: #e6e6e6;
    }

    &:hover {
        color: $text-color;
        text-decoration: none;
        background-position: 0 -15px;
        transition: background-position 0.1s linear;
    }

    &.btn-primary,
    &.btn-primary:hover {
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
        color: $white;
    }

    &.btn-primary.active {
        color: rgba(255, 255, 255, 0.75);
    }

    &.btn-primary {
        background-color: $primary-color;
        background-image: linear-gradient(top, $primary-color-hover, $primary-color);
        background-repeat: repeat-x;
        filter: progid:dximagetransform.microsoft.gradient(startColorstr=$primary-color-hover, endColorstr=$primary-color, GradientType=0);
        border: 1px solid #3762bc;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    &.btn-primary:hover,
    &.btn-primary:active,
    &.btn-primary.active,
    &.btn-primary.disabled,
    &.btn-primary[disabled] {
        filter: none;
        background-color: $primary-color;
    }

    &.btn-block {
        width: 100%;
        display: block;
    }
}
</style>