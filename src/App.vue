<template>
  <div>
    <router-view/>
    <Footer />
  </div>
</template>

<script>

import Footer from './components/Footer'

export default {
  name: 'app',
  components: {
    Footer
  }
}
</script>


<style lang="scss">

body {
  margin:0;
  padding: 0;
  width: 100%;
  height: 100vh;
  /* background: linear-gradient(-45deg, #24006b, #f42f8c); */
  /* background-size: 200% 200%; */
  /* animation: background 10s ease-in-out infinite; */
  color: $color;
  font-size: 16px;

  &::before {
    content: '';
    height: 4px;
    width: 100%;
    background-color: $yellow;
    position: absolute;
  }
}

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  height: 100vh;
}

a {
  transition: all $transitions-time ease-in-out;
  color: $grey;

  &:hover {
    text-decoration: none;
    color: $yellow;
  }
}

.contact {
  span {
    margin:5px 0;
  }
}

.social {
  position: absolute;
  padding: 20px;
  bottom: 0;
  right:0;

  a {
    padding: 10px;
    svg path {
      transition: fill $transitions-time ease-in-out; 
    }
    &:hover svg path {
      fill: $yellow;
    }
  }

  svg {
    height: 20px;
  }
}

a.btn {
  color: #1670f0;
  padding: 30px 60px;
  font-size: 1.3rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: 0 10px 10px rgba(0,0,0,0.1);
  background: rgba(255,255,255,.05);
}



#logo {
  height: 120px;
}
</style>
