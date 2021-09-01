import Vue from "vue";
import Router from "vue-router";
import PortalVue from "portal-vue";
import App from "./App.vue";
import store from "./store";
import "./plugins/bootstrap";

Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(PortalVue);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "root",
      component: App,
    },
  ],
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
