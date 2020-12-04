<template>
  <form class="form" @submit="checkForm">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" class="form-control" v-model="email" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input type="text" class="form-control" v-model="fullname" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password2" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox">
        <input type="checkbox" v-model="checked" /> Я согласен с условиями
        <span></span>
      </label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт? <router-link to="/login">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "register-form",
  data() {
    return {
      fullname: null,
      email: null,
      password: null,
      password2: null,
      checked: false
    };
  },
  methods: {
    ...mapActions("auth", {
      register: "REGISTER"
    }),
    checkForm(e) {
      e.preventDefault();
      if (!this.email) {
        this.$toaster.error("Требуется ввести Email");
        return;
      }
      if (!this.fullname) {
        this.$toaster.error("Требуется ввести полное имя");
        return;
      }
      if (!this.password) {
        this.$toaster.error("Требуется ввести пароль");
        return;
      }
      if (this.password.length < 6) {
        this.$toaster.error("Пароль должен состоять как минимум из 6 символов");
        return;
      }
      if (this.password !== this.password2) {
        this.$toaster.error("Пароли не совпадают");
        return;
      }
      if (!this.checked) {
        this.$toaster.error("Требуется согласиться с условиями");
        return;
      }
      this.register({
        email: this.email,
        fullname: this.fullname,
        password: this.password
      })
        .then(() => {
          this.$toaster.success("Регистрация выполнена успешно");
          this.$router.push("login");
        })
        .catch(error => {
          this.$toaster.error(error.message);
        });
    }
  }
};
</script>

<style scoped></style>
