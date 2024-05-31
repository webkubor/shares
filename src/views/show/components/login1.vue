<template>
    <div class="login-view">
        <div class="login-box">
            <h1>Manager</h1>
            <input type="text" placeholder="Username">
            <input type="password" placeholder="Password">
            <button>Login</button>
            <button>Register</button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
button {
    width: 100%;
    height:50px;
    border: none;
    outline: none;
    color: white;
    border-radius: 20px;
    font-size: 18px;
    cursor: pointer;
    margin-top: 20px;
    background: #8bcfea;
    transition: all 0.3s ease-in-out;
    &:hover {
    background: #43CBFF;
    filter: drop-shadow(0px 4px 10px rgba(255, 255, 255, 0.2));
    transform: translateY(2px);
    box-shadow: 0 0 12px rgba(#43CBFF, 0.5);

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
    font-size: 22px;
    letter-spacing: 3px;
    width: 90%;
    caret-color: #43CBFF;
    &:focus {
        background: rgba(255, 255, 255, 0.2);
        outline: none;
    filter: drop-shadow(0px 4px 10px #43CBFF);

        box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
    }
    &::placeholder {
        color: white;
        opacity: 0.5;
    }
    &:first-child {
        margin-top: 0;
    }

}

.login-view {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, rgb(28, 29, 56), rgb(57, 174, 238));
    background-color: #222;
    color: white;
    padding: 0;
    margin: 0;
    font-family: Arial, sans-serif
}

.login-box {
  border-radius: 20px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.3);
  position: relative;
  padding: 10px 20px 40px;
  text-align: center;
  @include glass-effect(#ffffff, 10, 0.2);
  &:hover {
    box-shadow: 0 0 12px rgba(#43CBFF, 0.5);
  }
  h1 {
    font-size: 30px;
    margin-bottom: 20px;
  }
}


</style>