<template>
  <div class="main-container main">
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from "./components/Footer";

export default {
  name: "app",
  components: {
    Footer
  }
};
</script>


<style lang="scss">
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  color: $color;
  font-family: $font-family;
  font-size: 16px;

  &::before {
    content: "";
    height: 4px;
    width: 100%;
    background-color: $yellow;
    position: absolute;
  }
}

.main-container {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)),
    url("~@/assets/home-bg.jpg") no-repeat center center;
  background-size: cover;
}
</style>
