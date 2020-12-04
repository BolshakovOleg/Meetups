import Vue from "vue";
import app from "./app.vue";
import router from "./router";
import store from './store';
import './assets/styles/index.css';

import { ToasterPlugin } from '@/plugins/toaster';
Vue.use(ToasterPlugin, {});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount("#app");
