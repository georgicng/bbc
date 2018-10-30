//Importamos nuestras constantes 
import {
  PAGE_TITLE,
  PAGE_ICON,
  PAGE_COVER,
  PRODUCT_BY_ID,
  PRODUCT_BY_ID_SUCCESS,
  PRODUCT_BY_ID_FAILURE,
  CUSTOM_PRODUCT,
  CUSTOM_PRODUCT_SUCCESS,
  CUSTOM_PRODUCT_FAILURE,
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
  ADD_EXPRESS_SHIPPING,
  ADD_DELIVERY_DATE,
  ADD_DELIVERY_TIME,
  ADD_COUPON,
  GET_COUPON_VALUE,
  GET_COUPON_VALUE_SUCCESS,
  GET_COUPON_VALUE_FAILURE,
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
} from './mutation-types'; 
import Vue from 'vue';

export const pageMutations = {
  [PAGE_TITLE]: (state, payload) => {
    state.pageTitle = payload;
  },
  [PAGE_ICON]: (state, payload) => {
    state.pageIcon = payload;
  },
  [PAGE_COVER]: (state, payload) => {
    state.pageCover = payload;
  },
};

export const productMutations = {
  [ALL_PRODUCTS](state) {
    state.showLoader = true;
    // this[]
  },
  [ALL_PRODUCTS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.products.entries.push({ page: payload.page, items: payload.items });
    state.products.total = payload.total;
    state.products.current_page = payload.page;
  },
  [ALL_PRODUCTS_FAILURE](state, payload) {
    state.showLoader = false;
  },
  [PRODUCT_BY_ID](state) {
    state.showLoader = true;
  },
  [PRODUCT_BY_ID_SUCCESS](state, payload) {
    state.showLoader = false;
    Vue.set(state, 'product', payload);
  },
  [PRODUCT_BY_ID_FAILURE](state, payload) {
    state.showLoader = false;
  },
  [CUSTOM_PRODUCT](state) {
    state.showLoader = true;
  },
  [CUSTOM_PRODUCT_SUCCESS](state, payload) {
    state.showLoader = false;
    Vue.set(state, 'custom', payload);
  },
  [CUSTOM_PRODUCT_FAILURE](state, payload) {
    state.showLoader = false;
  },
  [ERROR_MSG](state, payload) {},
};

export const cartMutations = {
  [ADD_TO_CART]: (state, payload) => state.order.cart.push(payload),
  [UPDATE_CART]: (state, payload) => {
    state.order.cart[payload.index].quantity = payload.quantity;
  },
  [REMOVE_FROM_CART]: (state, payload) => {
    state.order.cart.splice(payload, 1);
  },
  [CLEAR_CART]: (state) => {
    state.order.cart = [];
  },
};

export const orderMutations = {
  [ADD_SHIPPING_ADDRESS]: (state, payload) => {
    Vue.set(state.order, 'address', payload);
  },
  [ADD_SHIPPING_METHOD]: (state, payload) => {
    if (payload.type != 'City Shipping') {
      Vue.set(state.order, 'express', false);
    }
    Vue.set(state.order, 'shipping', payload.id);
  },
  [ADD_PAYMENT_METHOD]: (state, payload) => {
    state.order.payment = payload;
  },
  [ADD_EXPRESS_SHIPPING]: (state, payload) => {
    Vue.set(state.order, 'express', payload);
  },
  [ADD_DELIVERY_DATE]: (state, payload) => {
    Vue.set(state.order, 'delivery_date', payload);
  },
  [ADD_DELIVERY_TIME]: (state, payload) => {
    Vue.set(state.order, 'delivery_time', payload);
  },
  [ALL_SHIPPING_METHODS]: (state) => {
    state.showLoader = true;
  },
  [ALL_SHIPPING_METHODS_SUCCESS]: (state, payload) => {
    state.showLoader = false;
    state.shipping_methods = payload;
  },
  [ALL_SHIPPING_METHODS_FAILURE]: (state, payload) => {
    state.showLoader = false;
  },
  [ALL_SHIPPING_METHODS]: (state) => {
    state.showLoader = true;
  },
  [ALL_PAYMENT_METHODS]: (state) => {
    state.showLoader = true;
  },
  [ALL_PAYMENT_METHODS_SUCCESS]: (state, payload) => {
    state.showLoader = false;
    state.payment_methods = payload;
  },
  [ALL_PAYMENT_METHODS_FAILURE]: (state, payload) => {
    state.showLoader = false;
  },
  [CONFIRM_ORDER]: (state) => {
    state.showLoader = true;
  },
  [CONFIRM_ORDER_SUCCESS]: (state, payload) => {
    state.showLoader = false;
    Vue.set(state.order, 'id', payload.order_id);
    Vue.set(state.order, 'total', payload.total);
    Vue.set(state.order, 'meta', payload.payment_meta);
    Vue.set(state.order, 'reference', payload.reference);
  },
  [CONFIRM_ORDER_FAILURE]: (state, payload) => {
    state.showLoader = false;
  },
  [COMPLETE_ORDER]: (state) => {
    state.showLoader = true;
  },
  [COMPLETE_ORDER_SUCCESS]: (state, payload) => {
    state.showLoader = false;
    Vue.set(state, 'order', { id: 0, cart: [], shipping: 0, payment: 0, total: 0, meta: {} });
    delete state.coupon;
  },
  [COMPLETE_ORDER_FAILURE]: (state, payload) => {
    state.showLoader = false;
  },
  [ADD_COUPON]: (state, payload) => {
    Vue.set(state.order, 'coupon', payload);
  },
  [GET_COUPON_VALUE]: (state) => {
    state.showLoader = true;
  },
  [GET_COUPON_VALUE_SUCCESS]: (state, payload) => {
    state.showLoader = false;
    Vue.set(state, 'coupon', payload);
  },
  [GET_COUPON_VALUE_FAILURE]: (state, payload) => {
    state.showLoader = false;
  },
};

export const manufacturerMutations = {
  [ALL_MANUFACTURERS](state) {
    state.showLoader = true;
  },
  [ALL_MANUFACTURERS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.manufacturers = payload;
  },
  [ALL_MANUFACTURERS_FAILURE](state, payload) {
    state.showLoader = false;
  },
};

export const initialisationMutations = {
  loader(state, payload) {
    state.showLoader = payload;
  },
  toggleNav(state, payload) {
    state.showNav = payload;
  },
  toggleCart(state, payload) {
    state.showCart = payload;
  },
};
