<template>
  <section class="home container">
    <vue-particles
      class="particles"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="1.2"
      linesColor="#dedede"
      :linesWidth="0"
      :lineLinked="false"
      :lineOpacity="0.1"
      :linesDistance="150"
      :moveSpeed=".3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="repulse"
    ></vue-particles>
    <div class="row">
      <div class="col-sm-12 d-flex justify-content-center align-items-center flex-column">
        <img class="img-fluid" id="logo" src="@/assets/logo-roberto-cinetto-bianco.svg" alt>
        <div class="contact d-flex align-items-center flex-column">
          <span>
            email:
            <a class="email" href="mailto:roberto.cinetto@gmail.com">roberto.cinetto@gmail.com</a>
          </span>
          <span>
            tel:
            <a class="tel" href="tel:+393494955483">349 49 55 483</a>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style scoped lang="scss">
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
    margin: 5px 0;
  }
}

.social {
  position: absolute;
  padding: 20px;
  bottom: 0;
  right: 0;

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
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

#logo {
  height: 120px;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>