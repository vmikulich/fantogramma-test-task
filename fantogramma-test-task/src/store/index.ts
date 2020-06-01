import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexStore } from 'vuex-simple';
import { Fruits } from './fruits';

Vue.use(Vuex)

const instance = new Fruits

export default createVuexStore(instance, {
  strict: false,
  modules: {},
  plugins: []
})
