import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import rem from 'amfe-flexible';
import { router } from './router';
import axios from 'axios';
Vue.prototype.$axios = axios;
import { Lazyload, Icon, Cell, CellGroup, loading, Button, Toast } from 'vant';
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(loading);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Lazyload, {
  preLoad: 1.3,
  error: require('@/assets/images/products/1.jpg'),
  loading: require('@/assets/images/products/1.jpg'),
  attempt: 1,
  listenEvents: ['scroll'],
  lazyComponent: true
});

Vue.use(ElementUI);
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
