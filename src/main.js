import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import qs from 'qs'

Vue.prototype.qs=qs;
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;


//Axios.defaults.baseURL = '';

//Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
