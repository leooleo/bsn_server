import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import vueHeadful from 'vue-headful';
import VueSocketIO from 'vue-socket.io'
import BootstrapVue from 'bootstrap-vue'
import VueGoogleCharts from 'vue-google-charts'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Components
import alertIcon from 'vue-material-design-icons/Alert.vue'
import WebSocket from './components/WebSocket.vue'
import history from './routes/history.vue'
import monitor from './routes/monitor.vue'
import home from './routes/home.vue'

// Usages
Vue.use(BootstrapVue)

Vue.use(VueAxios, axios)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://bsnapi.herokuapp.com/',
}));

Vue.use(VueRouter);

Vue.use(VueGoogleCharts);

Vue.component('alert-icon', alertIcon);
Vue.component('vue-headful', vueHeadful);

// Initializations

const routes = [
  { path: '/monitor', name:'BSN', component: monitor, meta: { title: 'BSN' } },
  { path: '/history', name:'BSN', component: history, meta: { title: 'BSN' } },
  { path: '/', name:'BSN', component: home, meta: { title: 'BSN' } },
  { path: '/ws', name:'BSN', component: WebSocket, meta: { title: 'BSN' } }
];

const router = new VueRouter({
  routes
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
