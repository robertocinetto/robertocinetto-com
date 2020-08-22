<template>
  <HomeLayout>
    <div class="home-bg">
      <section class="home">
        <div class="locale-changer">
          <span>
            <a
              href="#"
              @click.prevent="setLocale('en')"
              class="p-2"
              :class="{ active: isCurrentLocale('en') }"
              >EN</a
            >
          </span>
          <span>
            <a
              href="#"
              @click.prevent="setLocale('it')"
              class="p-2"
              :class="{ active: isCurrentLocale('it') }"
              >IT</a
            >
          </span>
        </div>
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
          :moveSpeed="0.3"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="repulse"
        ></vue-particles>
        <div class="container">
          <div class="row">
            <div
              class="col-sm-12 d-flex justify-content-center align-items-center flex-column"
            >
              <img
                class="img-fluid"
                id="logo"
                src="@/assets/logo-roberto-cinetto-bianco.svg"
                alt
              />
              <div class="contact d-flex align-items-center flex-column">
                <span>
                  email:
                  <a class="email" href="mailto:roberto.cinetto@gmail.com"
                    >roberto.cinetto@gmail.com</a
                  >
                </span>
                <span>
                  {{ $t("home.phone") }}:
                  <a
                    v-if="isCurrentLocale('it')"
                    class="tel"
                    href="tel:+393494955483"
                    >+39 349 49 55 483</a
                  >
                  <a v-else class="tel" href="tel:+12368869279"
                    >+1 236 886 9279</a
                  >
                </span>
                <div class="social">
                  <p>{{ $t("home.catch_me") }}</p>
                  <a
                    href="https://www.linkedin.com/in/robertocinetto/"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 9.328 20"
                    >
                      <defs />
                      <path
                        class="a"
                        d="M6.166,5.968V4.348a.846.846,0,0,1,.87-.949H9.289V0H6.206A3.9,3.9,0,0,0,1.976,4.19V6.008H0V10H2.016V20H6.008V10H8.972l.119-1.581.237-2.411H6.166Z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/Roberto.Cina.Cinetto"
                    target="_blank"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <defs />
                      <path
                        class="a"
                        d="M0,10.2V20H4.653V6.667H0Zm19.866.537c-.313-2.506-1.477-4.116-4.877-4.116-2.013,0-3.356.716-3.893,1.79h-.045V6.622H7.338V19.955H11.23V13.378c0-1.745.358-3.4,2.461-3.4,2.148,0,2.327,1.969,2.327,3.535V20H20V12.662a13.435,13.435,0,0,0-.134-1.924ZM2.327,0A2.311,2.311,0,0,0,0,2.327,2.311,2.311,0,0,0,2.327,4.653,2.311,2.311,0,0,0,4.653,2.327,2.311,2.311,0,0,0,2.327,0Z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <i
          @click="show = !show"
          class="show-menu arrow up"
          v-bind:class="{ 'hide-arrow': show }"
        ></i>
      </section>
      <transition name="fade-menu">
        <div v-if="show" class="bottom-menu">
          <span>
            <a href="#profile" v-smooth-scroll>{{ $t("home.profile") }}</a>
            <!-- <router-link :to="`/${$i18n.locale}/cv-resume`">{{ $t('home.profile') }}</router-link> -->
          </span>
        </div>
      </transition>
    </div>
    <Profile />
    <Resume />
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/layouts/HomeLayout.vue";
import Profile from "@/components/Profile.vue";
import Resume from "@/components/Resume.vue";

export default {
  name: "home",
  components: { HomeLayout, Profile, Resume },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.$router.push({
        params: { lang: locale },
      });
    },
    isCurrentLocale(locale) {
      return this.$i18n.locale === locale;
    },
  },
  metaInfo() {
    return {
      title: this.$t("home.meta-title"),
      meta: [
        { name: "description", content: this.$t("home.meta-description") },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.home-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)),
    url("~@/assets/home-bg.jpg") no-repeat center center;
  background-size: cover;
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
    margin: 5px 0;
  }
}

.social {
  padding: 20px;
  text-align: center;
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

//LANG SWITCHER
.locale-changer {
  position: absolute;
  top: 10px;
  right: 5px;
  z-index: 1;

  a.active {
    color: $yellow;
  }
}

//PARTICLES
.particles {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

// BOTTOM MENU
.arrow {
  border: solid white;
  border-width: 0 2px 2px 0;
  display: block;
  padding: 16px;
  position: absolute;
  bottom: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 0.5s;
}
.up {
  transform: rotate(-135deg);
}
svg .a {
  fill: #ddd;
  fill-rule: evenodd;
}

.bottom-menu {
  position: absolute;
  bottom: 12px;
  width: 100%;
  text-align: center;

  a {
    color: white;
    text-transform: uppercase;
    padding: 5px 10px;
    margin: 5px 10px;
  }
}
.fade-menu-enter-active,
.fade-menu-leave-active {
  transition: opacity 0.5s;
}
.fade-menu-enter, .fade-menu-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.arrow.hide-arrow {
  transform: rotate(45deg);
  bottom: 60px;
  transition: all 0.5s;
}
</style>
