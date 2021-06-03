<template>
  <calendar-view v-slot="{ date }">
    <calendar-view-event
      v-for="meetup in meetupsByDay[resetTime(date)]"
      :key="meetup.id"
      tag="router-link"
      :to="{ name: 'meetup', params: { id: meetup.id } }"
      >{{ meetup.title }}</calendar-view-event
    >
  </calendar-view>
</template>

<script>
import CalendarView from '@/components/calendar/calendar-view';
import CalendarViewEvent from '@/components/calendar/calendar-view-event';

export default {
  name: 'meetups-calendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: {
    CalendarViewEvent,
    CalendarView,
  },

  computed: {
    meetupsByDay() {
      let dates = new Set( this.meetups.map(meetup => this.resetTime(meetup.date)) );
      return Array.from(dates).reduce((acc, val) => ({
        ...acc,
        [val]: this.meetups.filter(meetup => this.resetTime(meetup.date) === val) 
      }), {});
    }
  },

  methods: {
    resetTime(date) {
      return new Date(date).setHours(0,0,0,0);
    },
  },
};
</script>

<style></style>
