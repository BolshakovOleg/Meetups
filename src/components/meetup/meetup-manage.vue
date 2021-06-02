<template>
  <div v-if="isAuthenticated" class="meetup__aside-buttons">
    <template v-if="organizing">
      <router-link
        class="button button_primary"
        :to="{ name: 'meetup-edit', params: { id: id } }"
      >
        Редактировать
      </router-link>
      <button class="button button_danger">Удалить</button>
    </template>
    <template v-else>
      <button v-if="attending" class="button button_secondary">
        Отменить участие
      </button>
      <button v-else class="button button_primary">Участвовать</button>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  }
};
</script>

<style></style>
