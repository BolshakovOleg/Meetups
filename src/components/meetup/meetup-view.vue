<template>
  <div>
    <meetup-cover :title="meetup.title" :link="link"></meetup-cover>
    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <content-tabs :tabs="tabs">
            <router-view :meetup="meetup" />
          </content-tabs>
        </div>
        <div class="meetup__aside">
          <meetup-info
            :organizer="meetup.organizer"
            :place="meetup.place"
            :date="meetup.date"
          ></meetup-info>
          <meetup-manage
            :id="meetup.id"
            :attending="meetup.attending || false"
            :organizing="meetup.organizing || false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMeetupCoverLink } from "@/api";
import MeetupCover from "./meetup-cover";
import ContentTabs from "@/components/ui/content-tabs";
import MeetupInfo from "@/components/meetup/meetup-info";
import MeetupManage from "@/components/meetup/meetup-manage";

export default {
  name: "meetup-view",
  components: {
    MeetupCover,
    ContentTabs,
    MeetupInfo,
    MeetupManage
  },
  data() {
    return {
      tabs: [
        { to: { name: "meetup-description" }, text: "Описание" },
        { to: { name: "meetup-agenda" }, text: "Программа" }
      ]
    };
  },
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },
  computed: {
    link() {
      return this.meetup?.imageId ? getMeetupCoverLink(this.meetup) : undefined;
    },
    agenda() {
      return Array.isArray(this.meetup?.agenda) ? this.meetup.agenda : [];
    }
  }
};
</script>

<style scoped></style>
