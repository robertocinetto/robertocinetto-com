<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
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
  font-size: 18px;

  &::before {
    content: "";
    height: 4px;
    width: 100%;
    background-color: $yellow;
    position: absolute;
  }
}

h1,
h2,
h3,
h4 {
  color: white;
}

h2 {
  margin-top: 40px;
}

strong {
  font-weight: 600;
  color: $white;
}

ul {
  padding-left: 0;
}
li {
  list-style-image: url("~@/assets/check.svg");
  list-style-position: inside;
}

section {
  padding-top: 50px;
  padding-bottom: 50px;
}

.no-margin {
}
</style>
