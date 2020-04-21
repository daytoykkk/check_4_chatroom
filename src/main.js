import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'


Vue.use(ElementUI);

Vue.prototype.qs=qs;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;


axios.defaults.baseURL="http://39.106.119.191/"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
