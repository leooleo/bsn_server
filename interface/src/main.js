import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io';
import VueRouter from 'vue-router';
import teste from './components/teste.vue'
import WebSocket from './components/WebSocket.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8070',
})
);

Vue.use(VueRouter);

const routes = [
  {path: '/teste', component: teste},
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
