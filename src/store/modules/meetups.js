import { fetchMeetupsWithApi } from "@/api";

const state = () => ({
  meetups: []
});

const getters = {
  GET_MEETUPS(state) {
    return state.meetups;
  }
};

const mutations = {
  SET_MEETUPS(state, meetups) {
    state.meetups = meetups;
  }
};

const actions = {
  FETCH_MEETUPS({ commit }) {
    return fetchMeetupsWithApi().then(meetups => {
      commit("SET_MEETUPS", meetups);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
