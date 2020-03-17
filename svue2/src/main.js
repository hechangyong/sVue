import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import rem from 'amfe-flexible';
import { router } from './router';
// import Clipboard from 'clipboard';
import VueClipboard from 'vue-clipboard2'
import axios from 'axios';
import tools from './tools'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
Vue.prototype.$axios = axios;
Vue.prototype.$tools = tools;
import { Lazyload, Icon,Col, Cell, CellGroup, loading, Button, Popup,Toast,Field } from 'vant';
Vue.use(Icon);
Vue.use(Col);
Vue.use(VueClipboard);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(loading);
Vue.use(Button);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Field);
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
