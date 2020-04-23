import VueRouter from "vue-router";
import Home from "../components/Home";
import List from "../components/List";

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/list",
      name: "List",
      component: List,
    },
  ],
  mode: "history",
});
