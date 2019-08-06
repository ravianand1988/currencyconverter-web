import Vue from 'vue'
// import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
// import i18n from './plugins/i18n'

// import Vuelidate from 'vuelidate'
// import Meta from 'vue-meta'
// import FlagIcon from 'vue-flag-icon'
// import moment from 'moment'

// styles
// import 'vuetify/dist/vuetify.min.css'

// Vue.use(Vuelidate)
// Vue.use(Meta, {
//   refreshOnceOnNavigation: true
// })
// Vue.use(FlagIcon)

Vue.config.productionTip = false
// moment.locale('en')
// Vue.prototype.moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
