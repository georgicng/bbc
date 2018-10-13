import axios from "axios";
import { API_BASE } from "../config";

import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  PRODUCT_BY_ID,
  PRODUCT_BY_ID_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  ALL_PRODUCTS,
  ALL_PRODUCTS_SUCCESS,
  ALL_MANUFACTURERS,
  ALL_MANUFACTURERS_SUCCESS,
} from "./mutation-types";

import { RemoteInstance } from "directus-sdk-javascript";

const client = new RemoteInstance({
  url: API_BASE,
  version: "1.1", // optional, only need to update if different from default
  accessToken: "vpqBqeRX4CGw2OgDdZxv9H26Rw8mIo4Z" // optional, can be used without on public routes
});

export const productActions = {
  allProducts({ commit }) {
    commit(ALL_PRODUCTS);
    client
      .getItems("products", {depth: 2})
      .then(res => commit(ALL_PRODUCTS_SUCCESS, res.data))
      .catch(err => console.log(err));
  },
  productById({ commit }, payload) {
    commit(PRODUCT_BY_ID);
    client
      .getItem("products", payload)
      .then(res => commit(PRODUCT_BY_ID_SUCCESS, res.data))
      .catch(err => console.log(err));
  },
  addProduct({ commit }, payload) {
    commit(ADD_PRODUCT);
    axios.post(`${API_BASE}/products`, payload).then(response => {
      commit(ADD_PRODUCT_SUCCESS, response.data);
    });
  },
  updateProduct({ commit }, payload) {
    commit(UPDATE_PRODUCT);
    axios.put(`${API_BASE}/products/${payload._id}`, payload).then(response => {
      commit(UPDATE_PRODUCT_SUCCESS, response.data);
    });
  },
  removeProduct({ commit }, payload) {
    commit(REMOVE_PRODUCT);
    axios.delete(`${API_BASE}/products/${payload}`, payload).then(response => {
      console.debug("response", response.data);
      commit(REMOVE_PRODUCT_SUCCESS, response.data);
    });
  }
};

export const manufacturerActions = {
  allManufacturers({ commit }) {
    commit(ALL_MANUFACTURERS);
    client
    .getItems("categories", {depth: 2})
    .then(res => commit(ALL_MANUFACTURERS_SUCCESS, res.data))
    .catch(err => console.log(err));
  }
};
