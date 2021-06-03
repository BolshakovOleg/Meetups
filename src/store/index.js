import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import auth from "./modules/auth";
import form from "./modules/form";
import meetups from "./modules/meetups";
import meetup from "./modules/meetup";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["auth, form, meetups, meetup"]
});

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  modules: {
    auth,
    form,
    meetups,
    meetup
  },

  plugins: [vuexLocal.plugin]
});
