import { fetchMeetupsWithApi } from "@/api";

const state = () => ({
  meetups: [],
  filter: {
    date: "all",
    participation: "all",
    search: ""
  },
  view: "list"
});

const getters = {
  GET_MEETUPS(state) {
    return state.meetups;
  },
  GET_FILTER(state) {
    return state.filter;
  },
  GET_VIEW(state) {
    return state.view;
  }
};

const mutations = {
  SET_MEETUPS(state, meetups) {
    state.meetups = meetups;
  },
  SET_FILTER_FIELD(state, { field, value }) {
    state.filter[field] = value;
  },
  SET_VIEW(state, view) {
    state.view = view;
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
