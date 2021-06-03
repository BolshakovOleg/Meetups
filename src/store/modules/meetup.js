import { fetchMeetupWithApi, participateInMeetupWithApi, cancelParticipationInMeetupWithApi } from "@/api";

const state = () => ({
  meetup: null,
});

const getters = {
  GET_MEETUP(state) {
    return state.meetup;
  },
};

const mutations = {
  SET_MEETUP(state, meetup) {
    state.meetup = meetup;
  },
};

const actions = {
  FETCH_MEETUP({ commit }, id) {
    return fetchMeetupWithApi(id).then(meetup => {
      commit("SET_MEETUP", meetup);
    });
  },
  PARTICIPATE({ dispatch }, id) {
    return participateInMeetupWithApi(id).then(() => {
      dispatch("FETCH_MEETUP", id);
    });
  },
  CANCEL_PARTICIPATION({ dispatch }, id) {
    return cancelParticipationInMeetupWithApi(id).then(() => {
      dispatch("FETCH_MEETUP", id);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
