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
      <router-link :to="{ name: 'meetups' }" v-if="showReturnToMeetups">← Вернуться к списку</router-link>
      <router-link :to="{ name: 'login' }">Вход</router-link>
      <router-link :to="{ name: 'register' }">Регистрация</router-link>
      <a href="meetup-form.html">Создать митап</a>
    </nav>
  </header>
</template>

<script>
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
      };
    }
  },
};
</script>

<style scoped></style>
