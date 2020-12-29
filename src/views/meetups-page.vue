<template>
  <div class="container">
    <meetups-filter />
    <transition
      v-if="filteredMeetups && filteredMeetups.length"
      name="fade"
      mode="out-in"
    >
      <meetups-list
        v-if="view === 'list'"
        :meetups="filteredMeetups"
        key="list"
      ></meetups-list>
      <meetups-calendar
        v-else-if="view === 'calendar'"
        :meetups="filteredMeetups"
        key="calendar"
      ></meetups-calendar>
    </transition>
    <app-empty v-else>Митапов по заданным условям не найдено...</app-empty>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getMeetupCoverLink } from "@/api";
import { sortByDate } from "@/utils";
import AppEmpty from "@/components/base/app-empty";
import MeetupsList from "@/components/meetups/meetups-list";
import MeetupsCalendar from "@/components/meetups/meetups-calendar";
import MeetupsFilter from "@/components/meetups/meetups-filter";

import store from "@/store";

export default {
  name: "meetups-page",

  components: {
    AppEmpty,
    MeetupsList,
    MeetupsCalendar,
    MeetupsFilter
  },

  dateFilterOptions: [
    { text: "Все", value: "all" },
    { text: "Прошедшие", value: "past" },
    { text: "Ожидаемые", value: "future" }
  ],

  beforeRouteEnter(to, from, next) {
    store
      .dispatch("meetups/FETCH_MEETUPS")
      .then(next)
      .catch(error => {
        next(vm => vm.$toaster.error(error.message));
      });
  },

  computed: {
    ...mapGetters("meetups", {
      rawMeetups: "GET_MEETUPS",
      filter: "GET_FILTER",
      view: "GET_VIEW"
    }),
    meetups() {
      return this.rawMeetups.map(meetup => ({
        ...meetup,
        cover: meetup.imageId ? getMeetupCoverLink(meetup) : undefined,
        date: new Date(meetup.date),
        localDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        ISODate: new Date(meetup.date).toISOString().substr(0, 10)
      }));
    },
    filteredMeetups() {
      let filteredMeetups = this.meetups;

      if (this.filter.date === "past") {
        filteredMeetups = filteredMeetups.filter(
          meetup => new Date(meetup.date) <= new Date()
        );
      } else if (this.filter.date === "future") {
        filteredMeetups = filteredMeetups.filter(
          meetup => new Date(meetup.date) > new Date()
        );
      }

      if (this.filter.participation === "organizing") {
        filteredMeetups = filteredMeetups.filter(meetup => meetup.organizing);
      } else if (this.filter.participation === "attending") {
        filteredMeetups = filteredMeetups.filter(meetup => meetup.attending);
      }

      if (this.filter.search) {
        const concatMeetupText = meetup =>
          [meetup.title, meetup.description, meetup.place, meetup.organizer]
            .join(" ")
            .toLowerCase();
        filteredMeetups = filteredMeetups.filter(meetup =>
          concatMeetupText(meetup).includes(this.filter.search.toLowerCase())
        );
      }

      return filteredMeetups.sort(sortByDate);
    }
  }
};
</script>

<style scoped></style>
