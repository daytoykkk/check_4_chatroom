import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import qs from 'qs'


Vue.use(ElementUI);

Vue.prototype.qs=qs;
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;


//Axios.defaults.baseURL = '';

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 
Axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
