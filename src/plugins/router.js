import VueRouter from "vue-router";
import Home from "../components/Home";
import List from "../components/List";

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
