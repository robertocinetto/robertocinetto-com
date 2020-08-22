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

h3 {
  text-decoration: underline;
  text-decoration-color: $yellow;

  &::after {
    content: "";
    border: 1px solid #ffcc00;
    position: absolute;
    height: 100%;
    right: 0;
  }
}

strong {
  font-weight: 600;
  color: $white;
}

li {
  list-style-image: url("~@/assets/check.svg");
}

section {
  padding-top: 50px;
  padding-bottom: 50px;
}

.no-margin {
}
</style>
