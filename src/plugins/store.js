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
    list_temp: [],
    names: [],
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
    SORT_DATA: (state) => {
      state.list.map((e) => {
        state.names.push(e.name);
      });
      state.names.sort();
      state.list_temp = state.list;
      state.list = [];
      state.names.map((e) => {
        state.list_temp.map((el) => {
          if (el.name === e) {
            state.list.push(el);
          }
        });
      });
    },
  },
  actions: {
    loading: (context, condition) => {
      context.commit("LOADING", condition);
    },
    getFirebaseData: ({ commit }) => {
      commit("LOADING", true);
      const databaseRef = firebase.database().ref("/");
      databaseRef.once("value", (snapshot) => {
        const snap_val = snapshot.val();
        commit("EMPTY_LIST");

        if (snap_val !== null) {
          Object.entries(snap_val).map((e) => {
            e[1].key = e[0];
            e[1].price = e[1].price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

            // image input :start
            // firebase
            //   .storage()
            //   .ref("product_picture/" + e[1].image_name)
            //   .getDownloadURL()
            //   .then((data) => {
            //     e[1].imageUrl = data;
            commit("PUSH_DATA", e[1]);
            commit("LOADING", false);
            //   })
            //   .catch((error) => {
            //     console.log("error", error);
            //     commit("LOADING", false);
            //   });
            // image input :end
          });
          commit("SORT_DATA");
        } else {
          commit("LOADING", false);
          console.log("empty data");
        }
      });
    },
  },
};

export default new Vuex.Store(variable);
