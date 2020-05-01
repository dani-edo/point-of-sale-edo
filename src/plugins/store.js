import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const variable = {
  state: {
    loader: true,
  },
  mutations: {
    LOADING: (state, condition) => {
      state.loader = condition;
    },
  },
  actions: {
    loading: (context, condition) => {
      context.commit("LOADING", condition);
    },
  },
};

export default new Vuex.Store(variable);
