<template>
  <form-layout title="Создание митапа">
    <meetup-form
      submit-text="Сабмит"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </form-layout>
</template>

<script>
import MeetupForm from "@/components/forms/meetup-form";
import FormLayout from "@/components/layouts/form-layout";
import { mapMutations } from "vuex";
import store from "@/store";

export default {
  name: "meetup-create-page",
  components: { FormLayout, MeetupForm },

  beforeRouteEnter(to, from, next) {
    if ( !store.state["form"].meetup ) {
      store.commit("form/REMOVE_MEETUP")
    }
    next();
  },
  
  methods: {
    ...mapMutations("form", {
      clearMeetupForm: "REMOVE_MEETUP"
    }),

    handleSubmit(meetup) {
      console.log(meetup);
    },

    handleCancel() {
      this.$router.push({ name: 'meetups' });
      this.clearMeetupForm();
    },
  },
};
</script>

<style scoped></style>
