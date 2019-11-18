/* eslint-disable */
import Vue from 'vue';
import ShardsVue from 'shards-vue';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import '@/scss/shards-dashboards.scss';
import '@/assets/scss/date-range.scss';

// Core
import App from './App.vue';
import router from './router';

// Layouts
import Default from '@/layouts/Default.vue';

// Firebase
// import { firestorePlugin } from 'vuefire';
// import firebase from 'firebase';

ShardsVue.install(Vue);

Vue.component('default-layout', Default);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

// Vue.use(firestorePlugin);

// firebase.auth().onAuthStateChanged(function () {
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');
// });
