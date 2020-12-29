<template>
  <meetup-view :meetup="meetup" />
</template>

<script>
import { mapGetters } from "vuex";
import MeetupView from "@/components/meetup/meetup-view";
import store from "@/store";

export default {
  name: "meetup-page",
  components: { MeetupView },
  beforeRouteEnter(to, from, next) {
    store
      .dispatch("meetup/FETCH_MEETUP", to.params.id)
      .then(next)
      .catch(error => next(error));
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    ...mapGetters("meetup", {
      rawMeetup: "GET_MEETUP"
    }),
    meetup() {
      let meetup = this.rawMeetup;
      if (!meetup) return undefined;
      return {
        ...meetup,
        date: new Date(meetup.date)
      };
    }
  }
};
</script>

<style scoped></style>
