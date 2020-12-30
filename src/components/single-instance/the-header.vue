<template>
  <header class="header">
    <div>
      <h1>
        <a href="/" class="router-link-exact-active router-link-active">
          <img :src="logo" alt="Meetups" />
        </a>
      </h1>
    </div>
    <nav>
      <router-link v-for="(item, idx) in menu" :key="idx" :to="item.to">{{
        item.text
      }}</router-link>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
const LOGO = require("@/assets/img/logo.svg");
export default {
  name: "the-header",
  data() {
    return {
      logo: LOGO,
      showReturnToMeetups: false
    };
  },
  watch: {
    $route(to) {
      if (to.matched.some(record => record.meta.showReturnToMeetups)) {
        this.showReturnToMeetups = true;
      } else {
        this.showReturnToMeetups = false;
      }
    }
  },
  computed: {
    ...mapGetters("auth", {
      isAuthenticated: "IS_AUTHENTICATED",
      user: "GET_USER"
    }),
    menu() {
      if (this.isAuthenticated) {
        return [
          {
            to: { name: "meetups", query: { participation: "attending" } },
            text: "Мои митапы"
          },
          {
            to: { name: "meetups", query: { participation: "organizing" } },
            text: "Организуемые митапы"
          },
          { to: { name: "meetup-create" }, text: "Создать митап" },
          { to: { name: "meetups" }, text: `${this.user.fullname} (выйти)` }
        ];
      } else {
        return (this.showReturnToMeetups
          ? [{ to: { name: "meetups" }, text: "← Вернуться к списку" }]
          : []
        ).concat([
          { to: { name: "login" }, text: "Войти" },
          { to: { name: "register" }, text: "Регистрация" },
          { to: { name: "meetup-create" }, text: "Создать митап" }
        ]);
      }
    }
  }
};
</script>

<style scoped></style>
