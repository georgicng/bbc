// ./src/store/index
import Vue from 'vue'
import Vuex from 'vuex'

import { productGetters, manufacturerGetters, cartGetters  } from './getters'
import { productMutations, cartMutations, manufacturerMutations, initialisationMutations } from './mutations'
import { productActions, manufacturerActions } from './actions'

Vue.use(Vuex)


const store = new Vuex.Store({
    strict: true,
    state: {
      // bought items
      cart: { items: [] },
      // ajax loader
      showLoader: false,
      // selected product
      product: {},
      // all products
      products: [],
      // all manufacturers
      manufacturers: []
    },
    mutations: Object.assign({}, productMutations, cartMutations, manufacturerMutations, initialisationMutations),
    getters: Object.assign({}, productGetters, manufacturerGetters, cartGetters),
    actions: Object.assign({}, productActions, manufacturerActions)
  })
  
  store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
  })

  export default store
