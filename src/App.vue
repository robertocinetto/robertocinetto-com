<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
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
</style>
