import Vue from "vue";
import App from "./App.vue";
import firebase from "./plugins/firebase";
import VueFirebase from "vue-firebase";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  VueFirebase,
  firebase,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
