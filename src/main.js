import Vue from "vue";
import App from "./App.vue";
import firebase from "./plugins/firebase";
import VueFirebase from "vue-firebase";

Vue.config.productionTip = false;

new Vue({
  VueFirebase,
  firebase,
  render: (h) => h(App),
}).$mount("#app");
