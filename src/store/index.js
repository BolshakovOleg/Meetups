import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import auth from "./modules/auth";
import meetups from "./modules/meetups";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["meetups"]
});

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  modules: {
    auth,
    meetups
  },

  plugins: [vuexLocal.plugin]
});
