<template>
  <div class="meetup-agenda">
    <div v-if="agenda.length > 0">
      <meetup-agenda-item
        v-for="item in agenda"
        :key="item.id"
        :agendaItem="item"
      ></meetup-agenda-item>
    </div>
    <p v-else class="meetup-agenda__empty" style="padding-top: 33px;">
      Программа пока пуста, но когда-нибудь в ней обязательно что-нибудь
      появится!
    </p>
  </div>
</template>

<script>
import MeetupAgendaItem from "@/components/meetup/meetup-agenda-item";
export default {
  name: "meetup-agenda-page",
  components: { MeetupAgendaItem },
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },
  computed: {
    agenda() {
      return Array.isArray(this.meetup.agenda) ? this.meetup.agenda : [];
    }
  }
};
</script>

<style scoped></style>
