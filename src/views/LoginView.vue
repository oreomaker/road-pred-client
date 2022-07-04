<template>
  <div class="login-wrapper">
    <LoginForm class="form" />
    <ImageSwiper class="swiper" />
  </div>
</template>
<script>
export default {};
</script>
<style>
body {
  background-color: aliceblue;
}

.login-wrapper {
  height: 300px;
  width: 700px;
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: 200px;
}

.form {
  width: 400px;
}

.swiper {
  width: 300px;
  height: 100%;
}
</style>
