import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import VueSocketIO from 'vue-socket.io'
import BootstrapVue from 'bootstrap-vue'
import VueGoogleCharts from 'vue-google-charts'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Components
import alertIcon from 'vue-material-design-icons/Alert.vue'
import WebSocket from './components/WebSocket.vue'
import bsnControl from './routes/bsn_control.vue'
import history from './routes/history.vue'
import monitor from './routes/monitor.vue'
import teste from './components/teste.vue'
import home from './routes/home.vue'

// Usages
Vue.use(BootstrapVue)

Vue.use(VueAxios, axios)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8081/',  
}));

Vue.use(VueRouter);

Vue.use(VueGoogleCharts);

Vue.component('alert-icon', alertIcon);

// Initializations

const routes = [
  { path: '/teste', component: teste },
  { path: '/monitor', component: monitor },
  { path: '/history', component: history },
  { path: '/control', component: bsnControl },
  { path: '/', component: home },
  { path: '/ws', component: WebSocket }
];

const router = new VueRouter({
  routes
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
