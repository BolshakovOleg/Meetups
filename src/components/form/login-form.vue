<template>
  <form class="form" @submit="checkForm">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <label>
          <input
            type="email"
            placeholder="demo@email"
            class="form-control"
            v-model="email"
          />
        </label>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <label>
          <input
            type="password"
            placeholder="password"
            class="form-control"
            v-model="password"
          />
        </label>
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта? <router-link to="/register" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'login-form',
  data() {
    return {
      email: 'demo@email',
      password: 'password',
    };
  },
  methods: {
    ...mapActions('auth', {
      login: 'LOGIN',
    }),
    checkForm(e) {
      e.preventDefault();
      if (this.email && this.password) {
        this.login({
          email: this.email, 
          password: this.password
        }).then(() => {
          this.$toaster.success('Авторизация прошла успешно');
        }).catch((error) => {
          this.$toaster.error(error.message);
        });
      }
      if (!this.email) {
        this.$toaster.error('Требуется ввести Email');
        return;
      }
      if (!this.password) this.$toaster.error('Требуется ввести пароль');
    },
  },
  mounted() {
    this.$toaster.info('Для входа с демо-пользователем нажмите "Войти"');
  },
};
</script>

<style scoped></style>
