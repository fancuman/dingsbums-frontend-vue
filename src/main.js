import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import interceptor from './middleware/interceptor'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAupS2LU66NZwpTaYHxpdujD3Shc2F-jNA',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})

const app = new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

interceptor(app)
