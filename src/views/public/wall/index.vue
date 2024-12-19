

  <template>
    <div class="container">
      <section>
        <img src="./img/1.png" alt="">
        <h1>PAGE 1</h1>
      </section>
      <section>
        <img src="./img/2.png" alt="">
        <h1>PAGE 2</h1>
      </section>
      <section>
        <img src="./img/3.png" alt="">
        <h1>PAGE 3</h1>
      </section>
      <section>
        <img src="./img/4.png" alt="">
        <h1>PAGE 4</h1>
      </section>
      <section>
        <img src="./img/5.png" alt="">
        <h1>PAGE 5</h1>
      </section>
    </div>
  </template>
<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css?family=Roboto:900');
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Roboto";
      font-weight: 900;
    }
    .container {
      position: relative;
      width: 100%;
    }
    .container section {
      position: sticky;
      top: 0;
      height: 100vh;
      background: #333;
      display: flex;
    }
    .container section img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .container section h1 {
      position: absolute;
      font-size: 80px;
      color: #000;
      background: #fff;
      padding: 0 20px;
      letter-spacing: 10px;
      mix-blend-mode: soft-light;
    }


</style>
