import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home";
import List from "../components/List";
import Meta from "vue-meta";

Vue.use(Meta, {
  keyName: "metaInfo",
  attribute: "data-vue-meta",
  ssrAttribute: "data-vue-meta-server-rendered",
  tagIDKeyName: "vmid",
  refreshOnceOnNavigation: true,
});

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "Warung mbok Soinem - POS",
        metatags: [
          {
            name: "description",
            content: "Jualan menjadi lebih mudah",
          },
        ],
      },
    },
    {
      path: "/list",
      name: "List",
      component: List,
    },
  ],
  mode: "history",
});
