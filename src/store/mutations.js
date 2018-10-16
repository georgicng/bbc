//Importamos nuestras constantes 
import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    PRODUCT_BY_ID,
    PRODUCT_BY_ID_SUCCESS,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    REMOVE_PRODUCT,
    REMOVE_PRODUCT_SUCCESS,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART,
    CLEAR_CART,
    ALL_PRODUCTS,
    ALL_PRODUCTS_SUCCESS,
    ALL_MANUFACTURERS,
    ALL_MANUFACTURERS_SUCCESS,
    ERROR_MSG,
    ADD_SHIPPING_ADDRESS,
    ADD_SHIPPING_METHOD,
    ALL_SHIPPING_METHODS_SUCCESS,
    ADD_PAYMENT_METHOD,
    ALL_PAYMENT_METHODS_SUCCESS,
    CONFIRM_ORDER,
    CONFIRM_ORDER_SUCCESS,
    COMPLETE_ORDER,
    COMPLETE_ORDER_SUCCESS,
  } from './mutation-types' 
  
  export const productMutations = {
    [ALL_PRODUCTS] (state) {
      state.showLoader = true
      // this[]
    },
    [ALL_PRODUCTS_SUCCESS] (state, payload) {
      state.showLoader = false
      state.products = payload
    },
    [PRODUCT_BY_ID] (state) {
      state.showLoader = true
    },
    [PRODUCT_BY_ID_SUCCESS] (state, payload) {
      state.showLoader = false
      state.product = payload
    },
     /* ejemplo estandar de mutacion que es reemplazado por la constante ADD_PRODUCT
        addProduct (state, payload) {
            state.showLoader = true
            state.products.push(payload)
    }*/
    [ADD_PRODUCT]: (state, payload) => { //ETAPA INTERMEDIA DE LA MUTACION (ESTADO DE ESPERA)
      state.showLoader = true
    },
    [ADD_PRODUCT_SUCCESS]: (state, payload) => { //ETAPA FINAL, AQUI SE ACTUALIZAN LOS DATOS
      state.showLoader = false
      state.products.push(payload)
    },
    [UPDATE_PRODUCT]: (state, payload) => {
      state.showLoader = true
    },
    [UPDATE_PRODUCT_SUCCESS]: (state, payload) => {
      state.showLoader = false
      state.products = state.products.map(p => {
        if (p.id === payload.id) {
          payload = {...payload, manufacturer: state.manufacturers.filter(x => x.id === payload.category_id)[0]}
          return payload
        }
        return p
      })
    },
    [REMOVE_PRODUCT]: (state, payload) => {
      state.showLoader = true
    },
    [REMOVE_PRODUCT_SUCCESS]: (state, payload) => {
      state.showLoader = false
      const index = state.products.findIndex(p => p.id === payload)
      console.debug('index', index)
      state.products.splice(index, 1)
    },
    [ERROR_MSG] (state, payload) {}
  }
  
  export const cartMutations = {
    [ADD_TO_CART]: (state, payload) => state.cart.items.push(payload),
    [UPDATE_CART]: (state, payload) => {
      state.cart.items[payload.index].quantity = payload.quantity
    },
    [REMOVE_FROM_CART]: (state, payload) => {
      state.cart.items.splice(payload, 1)
    },
    [CLEAR_CART]: (state) => {
      state.cart.items = []
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
    [ALL_SHIPPING_METHODS_SUCCESS]: (state, payload) => {
      state.shipping_methods = payload
    },
    [ALL_PAYMENT_METHODS_SUCCESS]: (state, payload) => {
      state.payment_methods = payload
    },
    [CONFIRM_ORDER]: (state) => {
      state.showLoader = true
    },
    [CONFIRM_ORDER_SUCCESS]: (state, payload) => {
      state.showLoader = false
      state.order.id = payload.id
      state.order.total = payload.total
      state.order.shipping = payload.shipping
    },
    [COMPLETE_ORDER]: (state) => {
      state.showLoader = true
    },
    [COMPLETE_ORDER_SUCCESS]: (state, payload) => {
      state.showLoader = false
      state.cart.items = []
      state.order = {}
    }
  }
  
  export const manufacturerMutations = {
    [ALL_MANUFACTURERS] (state) {
      state.showLoader = true
    },
    [ALL_MANUFACTURERS_SUCCESS] (state, payload) {
      state.showLoader = false
      state.manufacturers = payload
    }
  }

  export const initialisationMutations = {
    initialiseStore(state) {
      // Check if the ID exists
      if(localStorage.getItem('store')) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        );
      }
    }
  }