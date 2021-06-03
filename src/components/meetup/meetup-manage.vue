<template>
  <div v-if="isAuthenticated" class="meetup__aside-buttons">
    <template v-if="organizing">
      <router-link
        class="button button_primary"
        :to="{ name: 'meetup-edit', params: { id: id } }"
      >
        Редактировать
      </router-link>
      <button class="button button_danger" @click="handleDeleteMeetup">Удалить</button>
    </template>
    <template v-else>
      <button v-if="attending" class="button button_secondary" @click="handleCancelParticipation">
        Отменить участие
      </button>
      <button v-else class="button button_primary" @click="handleParticipate">Участвовать</button>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { deleteMeetupWithApi } from "@/api";
export default {
  name: "meetup-manage",
  props: {
    attending: {
      type: Boolean,
      required: true
    },
    organizing: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters("auth", {
      isAuthenticated: "IS_AUTHENTICATED"
    })
  },
  methods: {
    ...mapActions("meetup", {
      participate: "PARTICIPATE",
      cancelParticipation: "CANCEL_PARTICIPATION"
    }),
    handleParticipate() {
      this.participate(this.id).then(() => {
        this.$toaster.success("Сохранено");
      }).catch(error => {
        this.$toaster.error(error.message);
      })
    },
    handleCancelParticipation() {
      this.cancelParticipation(this.id).then(() => {
        this.$toaster.success("Сохранено");
      }).catch(error => {
        this.$toaster.error(error.message);
      })
    },
    handleDeleteMeetup() {
      if ( confirm("Подтвердите удаление митапа.") ) {
        deleteMeetupWithApi(this.id).then(() => {
          this.$toaster.success("Митап удалён");
          this.$router.push({ name: "meetups" });
        }).catch(error => {
          this.$toaster.error(error.message);
        })
      }
    }
  }
};
</script>

<style></style>
