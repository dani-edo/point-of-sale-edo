import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

Vue.use(Vuex);

const variable = {
  state: {
    loader: true,
    list: [],
  },
  mutations: {
    LOADING: (state, condition) => {
      state.loader = condition;
    },
    EMPTY_LIST: (state) => {
      state.list = [];
    },
    PUSH_DATA: (state, payload) => {
      state.list.push(payload);
    },
  },
  actions: {
    loading: (context, condition) => {
      context.commit("LOADING", condition);
    },
    getFirebaseData: ({ commit }) => {
      const databaseRef = firebase.database().ref("/");
      databaseRef.once("value", (snapshot) => {
        const snap_val = snapshot.val();
        commit("EMPTY_LIST");

        if (snap_val !== null) {
          Object.entries(snap_val).map((e) => {
            e[1].key = e[0];
            e[1].price = e[1].price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

            firebase
              .storage()
              .ref("product_picture/" + e[1].image_name)
              .getDownloadURL()
              .then((data) => {
                e[1].imageUrl = data;
                commit("PUSH_DATA", e[1]);
                commit("LOADING", false);
              })
              .catch((error) => {
                console.log("error", error);
                commit("LOADING", false);
              });
          });
        } else {
          commit("LOADING", false);
        }
      });
    },
  },
};

export default new Vuex.Store(variable);
