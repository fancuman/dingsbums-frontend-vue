import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import item from './item'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { user, item }
})
