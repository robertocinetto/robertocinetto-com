import Vue from "vue";
import VueMeta from "vue-meta";
import Router from "vue-router";
import i18n from "./i18n";

Vue.use(Router);
Vue.use(VueMeta);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: `/${i18n.locale}`,
    },
    {
      path: "/:lang",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/Home.vue"),
        },
        {
          path: "/:lang/experiments/experiment-1",
          name: "experiment-1",
          component: () => import("@/views/experiments/Experiment-1.vue"),
        },
      ],
    },
  ],
});
