import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import router from './_helpers/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-loading-overlay/dist/vue-loading.css';
import './assets/styles.css';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import 'vue-snotify/styles/material.css';

Vue.config.productionTip = false;

// setup interceptor
import { configureInterceptor } from './_helpers/interceotor';
configureInterceptor();

// setup router
Vue.use(VueRouter);

// setup notify
const options = {
  toast: {
    position: SnotifyPosition.rightTop,
    timeout: 3000,
    showProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  },
};
Vue.use(Snotify, options);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
