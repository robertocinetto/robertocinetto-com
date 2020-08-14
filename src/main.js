import "bootstrap/scss/bootstrap.scss";
import "bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueParticles from "vue-particles";
import i18n from "./i18n";

library.add(faHamburger);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(VueParticles);

router.beforeEach((to, from, next) => {
  let language = to.params.lang;
  if (!language) {
    language = "en";
  }

  i18n.locale = language;
  next();
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
