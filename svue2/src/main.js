import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import { router } from './router';
Vue.use(ElementUI);
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
