// ./src/store/index
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import { pageGetters, productGetters, manufacturerGetters, cartGetters, orderGetters } from './getters';
import { pageMutations, productMutations, cartMutations, orderMutations, manufacturerMutations, initialisationMutations } from './mutations';
import { productActions, manufacturerActions, orderActions } from './actions';

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});
const store = new Vuex.Store({
  strict: true,
  state: {
    //order items
    order: { cart: [], shipping: 0, payment: 0, express: false, coupon: false },
    // ajax loader
    showLoader: true,
    // sidebar
    showNav: false,
    // cart
    showCart: false,
    // selected product
    product: {},
    // custom product
    custom: {},
    // all products
    products: {
      total: 0,
      entries: [],
    },
    shipping_methods: [],
    payment_methods: [],
    cities: [],
    // all manufacturers
    manufacturers: [],
    pageTitle: '',
    pageIcon: '',
    pageCover: true,
  },
  mutations: Object.assign({}, pageMutations, productMutations, cartMutations, orderMutations, manufacturerMutations, initialisationMutations),
  getters: Object.assign({}, pageGetters, productGetters, manufacturerGetters, cartGetters, orderGetters),
  actions: Object.assign({}, productActions, manufacturerActions, orderActions),
  plugins: [vuexLocalStorage.plugin]
});

export default store;
