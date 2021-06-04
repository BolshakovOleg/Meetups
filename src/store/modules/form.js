import { buildAgendaItem, buildMeetup } from "@/services/meetup-service";

const state = () => ({
  meetup: null,
});

const getters = {
  GET_AGENDA_ITEM_BY_INDEX(state) {
    return (index) => state.meetup.agenda[index];
  },
};

const mutations = {
  SET_MEETUP(state, meetup) {
    state.meetup = meetup;
  },

  SET_MEETUP_FIELD(state, { field, value }) {
    state.meetup[field] = value;
  },

  // Или можно было бы передавать новый элемент программы в полезной нагрузке
  PUSH_AGENDA_ITEM(state) {
    const agendaItem = buildAgendaItem();
    if ( state.meetup.agenda.length > 0 ) {
      agendaItem.startsAt = state.meetup.agenda[state.meetup.agenda.length - 1].endsAt;
      agendaItem.endsAt = state.meetup.agenda[state.meetup.agenda.length - 1].endsAt;
    } 
    state.meetup.agenda.push(agendaItem);
  },

  // Вместо индекса мог быть ID
  REMOVE_AGENDA_ITEM(state, index) {
    state.meetup.agenda.splice(index, 1);
  },

  SET_MEETUP_AGENDA_ITEM_FIELD(state, { index, field, value }) {
    state.meetup.agenda[index][field] = value;
  },

  REMOVE_MEETUP(state) {
    const meetup = buildMeetup();
    state.meetup = meetup;
  }

};

const actions = {
  // FETCH_MEETUP for edit
  // SAVE_MEETUP on api
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

