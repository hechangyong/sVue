// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 自己写的样式
import './style/characters.css'
import './lib/css/transition.css'
import './lib/css/common.css'
import 'amfe-flexible/index.js'
import {
  DatetimePicker,
  Picker
} from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
// 注册element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
