//Importamos nuestras constantes 
import {
    PRODUCT_BY_ID,
    PRODUCT_BY_ID_SUCCESS,
    PRODUCT_BY_ID_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART,
    CLEAR_CART,
    ALL_PRODUCTS,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAILURE,
    ALL_MANUFACTURERS,
    ALL_MANUFACTURERS_SUCCESS,
    ALL_MANUFACTURERS_FAILURE,
    ADD_SHIPPING_ADDRESS,
    ADD_SHIPPING_METHOD,
    ALL_SHIPPING_METHODS,
    ALL_SHIPPING_METHODS_SUCCESS,
    ALL_SHIPPING_METHODS_FAILURE,
    ADD_PAYMENT_METHOD,
    ALL_PAYMENT_METHODS,
    ALL_PAYMENT_METHODS_SUCCESS,
    ALL_PAYMENT_METHODS_FAILURE,
    CONFIRM_ORDER,
    CONFIRM_ORDER_SUCCESS,
    CONFIRM_ORDER_FAILURE,
    COMPLETE_ORDER,
    COMPLETE_ORDER_SUCCESS,
    COMPLETE_ORDER_FAILURE,
    ERROR_MSG,
  } from './mutation-types' 
  
  export const productMutations = {
    [ALL_PRODUCTS] (state) {
      state.showLoader = true;
      // this[]
    },
    [ALL_PRODUCTS_SUCCESS] (state, payload) {
      console.log('success', payload);
      state.showLoader = false;
      state.products.entries.push({ page: payload.page, items: payload.items });
      state.products.total = payload.total;
      state.products.current_page = payload.page;
    },
    [ALL_PRODUCTS_FAILURE] (state, payload) {
      state.showLoader = false
    },
    [PRODUCT_BY_ID] (state) {
      state.showLoader = true
    },
    [PRODUCT_BY_ID_SUCCESS] (state, payload) {
      state.showLoader = false
      state.product = payload
    },
    [PRODUCT_BY_ID_FAILURE] (state, payload) {
      state.showLoader = false
    },
    [ERROR_MSG] (state, payload) {}
  }
  
  export const cartMutations = {
    [ADD_TO_CART]: (state, payload) => state.order.cart.push(payload),
    [UPDATE_CART]: (state, payload) => {
      state.order.cart[payload.index].quantity = payload.quantity
    },
    [REMOVE_FROM_CART]: (state, payload) => {
      state.order.cart.splice(payload, 1)
    },
    [CLEAR_CART]: (state) => {
      state.order.cart = []
    }
  }

  export const orderMutations = {
    [ADD_SHIPPING_ADDRESS]: (state, payload) => state.order.address = payload,
    [ADD_SHIPPING_METHOD]: (state, payload) => {
      state.order.shipping = payload
    },
    [ADD_PAYMENT_METHOD]: (state, payload) => {
      state.order.payment = payload
    },
    [ALL_SHIPPING_METHODS]: (state) => {
      state.showLoader = true
    },
    [ALL_SHIPPING_METHODS_SUCCESS]: (state, payload) => {
      state.showLoader = false
      state.shipping_methods = payload
    },
    [ALL_SHIPPING_METHODS_FAILURE]: (state, payload) => {
      state.showLoader = false
    },
    [ALL_SHIPPING_METHODS]: (state) => {
      state.showLoader = true
    },
    [ALL_PAYMENT_METHODS]: (state) => {
      state.showLoader = true
    },
    [ALL_PAYMENT_METHODS_SUCCESS]: (state, payload) => {
      state.showLoader = false
      state.payment_methods = payload
    },
    [ALL_PAYMENT_METHODS_FAILURE]: (state, payload) => {
      state.showLoader = false
    },
    [CONFIRM_ORDER]: (state) => {
      state.showLoader = true
    },
    [CONFIRM_ORDER_SUCCESS]: (state, payload) => {
      state.showLoader = false
      state.order.id = payload.id
      state.order.total = payload.total
      state.order.meta = payload.payment_meta
    },
    [CONFIRM_ORDER_FAILURE]: (state, payload) => {
      state.showLoader = false
    },
    [COMPLETE_ORDER]: (state) => {
      state.showLoader = true
    },
    [COMPLETE_ORDER_SUCCESS]: (state, payload) => {
      state.showLoader = false
      state.order = { id: 0, cart: [], shipping: 0, payment: 0, total: 0, meta: {} }
    },
    [COMPLETE_ORDER_FAILURE]: (state, payload) => {
      state.showLoader = false
    }
  }
  
  export const manufacturerMutations = {
    [ALL_MANUFACTURERS] (state) {
      state.showLoader = true
    },
    [ALL_MANUFACTURERS_SUCCESS] (state, payload) {
      state.showLoader = false
      state.manufacturers = payload
    },
    [ALL_MANUFACTURERS_FAILURE] (state, payload) {
      state.showLoader = false
    }
  }

  export const initialisationMutations = {
    initialiseStore(state) {
      // Check if the ID exists
      if(localStorage.getItem('store')) {
        // Replace the state object with the stored item
        console.log('store: ', localStorage.getItem('store'));
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        );
      }
    },
    loader(state, payload) {
      state.showLoader = payload
    },
    toggleNav(state, payload) {
      state.showNav = payload
    },
    toggleCart(state, payload) {
      state.showCart = payload
    },
  }