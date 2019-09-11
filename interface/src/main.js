import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueSocketIO from 'vue-socket.io'
import BootstrapVue from 'bootstrap-vue'


// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Components
import WebSocket from './components/WebSocket.vue'
import teste from './components/teste.vue'
import monitor from './routes/monitor.vue'
import alertIcon from 'vue-material-design-icons/Alert.vue';

// Usages
Vue.use(BootstrapVue)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8070',
})
);

Vue.use(VueRouter);

Vue.component('alert-icon', alertIcon);

// Initializations

const routes = [
  {path: '/teste', component: teste},
  {path: '/monitor', component: monitor},
  {path: '/', component: WebSocket}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
