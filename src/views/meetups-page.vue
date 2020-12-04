<template>
  <div class="container">
    <div v-if="meetups && meetups.length">
      <div class="meetups-list transition-list" key="list">
        <transition-group name="fade-list">
          <a
            v-for="meetup in meetups"
            :href="`/meetups/${meetup.id}`"
            :key="meetup.id"
            class="meetups-list__item"
          >
            <div class="meetups-list__col">
              <div
                class="meetups-list__cover"
                :style="meetup.cover ? `--bg-url: url('${meetup.cover}')` : ''"
              >
                <h5>{{ meetup.title }}</h5>
              </div>
            </div>
            <div class="meetups-list__col">
              <div class="meetups-list__description">
                <span
                  v-if="meetup.attending"
                  class="meetups-list__badge meetups-list__badge_success"
                  >Участвую</span
                >
                <span v-if="meetup.organizing" class="meetups-list__badge"
                  >Организую</span
                >
                <ul class="info-list">
                  <li>
                    <app-icon class="info-list__icon" icon="user" />
                    {{ meetup.organizer }}
                  </li>
                  <li>
                    <app-icon class="info-list__icon" icon="map" />
                    {{ meetup.place }}
                  </li>
                  <li>
                    <app-icon class="info-list__icon" icon="cal-lg" />
                    <time :datetime="meetup.ISODate">{{
                      meetup.localDate
                    }}</time>
                  </li>
                </ul>
              </div>
            </div>
          </a>
        </transition-group>
      </div>
    </div>
    <div v-else class="meetup__empty">
      Митапов по заданным условиям не найдено...
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getMeetupCoverLink } from "@/api";
import AppIcon from "@/components/base/app-icon";

export default {
  name: "meetups-page",
  components: {
    AppIcon
  },
  computed: {
    ...mapGetters("meetups", {
      rawMeetups: "GET_MEETUPS"
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
    }
    /*
    filteredMeetups() {
      let filteredMeetups = this.meetups;

      if (this.filter.date === 'past') {
        filteredMeetups = filteredMeetups.filter((meetup) => new Date(meetup.date) <= new Date());
      } else if (this.filter.date === 'future') {
        filteredMeetups = filteredMeetups.filter((meetup) => new Date(meetup.date) > new Date());
      }

      if (this.filter.participation === 'organizing') {
        filteredMeetups = filteredMeetups.filter((meetup) => meetup.organizing);
      } else if (this.filter.participation === 'attending') {
        filteredMeetups = filteredMeetups.filter((meetup) => meetup.attending);
      }

      if (this.filter.search) {
        const concatMeetupText = (meetup) =>
          [meetup.title, meetup.description, meetup.place, meetup.organizer].join(' ').toLowerCase();
        filteredMeetups = filteredMeetups.filter((meetup) =>
          concatMeetupText(meetup).includes(this.filter.search.toLowerCase()),
        );
      }

      return filteredMeetups;
    },
*/
  },
  methods: {
    ...mapActions("meetups", {
      fetchMeetups: "FETCH_MEETUPS"
    })
  },
  mounted() {
    this.fetchMeetups();
  }
};
</script>

<style scoped></style>
