import Vue from "vue";
import App from "./App.vue";
import firebase from "./plugins/firebase";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import router from "./plugins/router";
import store from "./plugins/store";
import './registerServiceWorker'

Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  store,
  firebase,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
