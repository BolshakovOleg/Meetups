import { fetchMeetupWithApi } from "@/api";

const state = () => ({
  meetups: null
});

const getters = {
  GET_MEETUP(state) {
    return state.meetup;
  }
};

const mutations = {
  SET_MEETUP(state, meetup) {
    state.meetup = meetup;
  }
};

const actions = {
  FETCH_MEETUP({ commit }, id) {
    return fetchMeetupWithApi(id).then(meetup => {
      commit("SET_MEETUP", meetup);
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
