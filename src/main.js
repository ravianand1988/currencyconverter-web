import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'

import Vuelidate from 'vuelidate'

// styles
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
