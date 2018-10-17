// ./src/store/index
import Vue from 'vue'
import Vuex from 'vuex'

import { productGetters, manufacturerGetters, cartGetters, orderGetters  } from './getters'
import { productMutations, cartMutations, orderMutations, manufacturerMutations, initialisationMutations } from './mutations'
import { productActions, manufacturerActions, orderActions } from './actions'

Vue.use(Vuex)


const store = new Vuex.Store({
    strict: true,
    state: {
      //order items
      order: { cart: [] },
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
    mutations: Object.assign({}, productMutations, cartMutations, orderMutations, manufacturerMutations, initialisationMutations),
    getters: Object.assign({}, productGetters, manufacturerGetters, cartGetters, orderGetters),
    actions: Object.assign({}, productActions, manufacturerActions, orderActions)
  })
  
  store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
  })

  export default store
