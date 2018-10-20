import axios from "axios";
import { client } from "../api";

import {
  PRODUCT_BY_ID,
  PRODUCT_BY_ID_SUCCESS,
  PRODUCT_BY_ID_FAILURE,
  ALL_PRODUCTS,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAILURE,
  ALL_MANUFACTURERS,
  ALL_MANUFACTURERS_SUCCESS,
  ALL_MANUFACTURERS_FAILURE,
  ALL_PAYMENT_METHODS,
  ALL_SHIPPING_METHODS,
  ALL_SHIPPING_METHODS_SUCCESS,
  ALL_SHIPPING_METHODS_FAILURE,
  ALL_PAYMENT_METHODS_SUCCESS,
  ALL_PAYMENT_METHODS_FAILURE,
  CONFIRM_ORDER,
  CONFIRM_ORDER_SUCCESS,
  CONFIRM_ORDER_FAILURE,
  COMPLETE_ORDER,
  COMPLETE_ORDER_SUCCESS,
  COMPLETE_ORDER_FAILURE,
} from "./mutation-types";

export const productActions = {
  allProducts({ commit }, payload) {
    commit(ALL_PRODUCTS);
    const page = (payload && payload.page) ? payload.page - 1 : 0;
    const offset = page * 10;
    const args = {
      depth: 2,
      limit: 10,
      offset: offset,
    };
    client
      .getItems("products", args)
      .then(res => commit(ALL_PRODUCTS_SUCCESS, { page: page + 1, items: res.data, total: res.meta.total_entries }))
      .catch(err => commit(ALL_PRODUCTS_FAILURE, err));
  },
  productById({ commit }, payload) {
    commit(PRODUCT_BY_ID);
    client
      .getItem("products", payload)
      .then(res => commit(PRODUCT_BY_ID_SUCCESS, res.data))
      .catch(err => commit(PRODUCT_BY_ID_FAILURE, err));
  }
};

export const manufacturerActions = {
  allManufacturers({ commit }) {
    commit(ALL_MANUFACTURERS);
    client
    .getItems("categories", {depth: 2})
    .then(res => commit(ALL_MANUFACTURERS_SUCCESS, res.data))
    .catch(err => commit(ALL_MANUFACTURERS_FAILURE, err));
  }
};

export const orderActions = {
  allShippingMethods({ commit }) {
    commit(ALL_SHIPPING_METHODS);
    client
    .getItems("shipping_rates")
    .then(res => commit(ALL_SHIPPING_METHODS_SUCCESS, res.data))
    .catch(err => commit(ALL_SHIPPING_METHODS_FAILURE, err));
  },
  allPaymentMethods({ commit }) {
    commit(ALL_PAYMENT_METHODS);
    client
    .getItems("payment_methods")
    .then(res => commit(ALL_PAYMENT_METHODS_SUCCESS, res.data))
    .catch(err => commit(ALL_PAYMENT_METHODS_FAILURE, err));
  },
  confirmOrder({ commit }, payload) {
    commit(CONFIRM_ORDER);
    client
    .createItems("order", payload)
    .then(res => commit(CONFIRM_ORDER_SUCCESS, res.data))
    .catch(err => commit(CONFIRM_ORDER_FAILURE, err));
  },
  completeOrder({ commit }, payload) {
    commit(COMPLETE_ORDER);
    client
    .createItems("order", payload)
    .then(res => commit(COMPLETE_ORDER_SUCCESS, res.data))
    .catch(err => commit(COMPLETE_ORDER_FAILURE, err));
  }
};
