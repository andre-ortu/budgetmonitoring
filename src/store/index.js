import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import app from './app'
import VuexPersistence from "vuex-persist";
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    app
  },
  plugins: [vuexLocal.plugin]
})
