import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes }  from './routes';

import './directives/Transform.js';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({ 
	routes,
	mode : 'history' // antes era hash o padrao
 });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
