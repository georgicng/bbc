// ./src/store/getters
//Con esto podemos traer la data de los productos (todos o por id) y de los manufacturers
export const productGetters = {
  allProducts: (state, getters) => {
    return state.products;
  },
  productById: (state, getters) => id => {
    if (getters.allProducts.length > 0) {
      return getters.allProducts.filter(p => p.id == id)[0];
    } else {
      return state.product;
    }
  },
  allManufacturers: state => {
    return state.manufacturers;
  }
};

export const manufacturerGetters = {
  allManufacturers: state => state.manufacturers
};

export const cartGetters = {
  allItems: state => state.cart.items || [],
  count: state => (state.cart.items ? state.cart.items.length : 0),
  itemByIndex: (state, getters) => id => getters.allItems[id] || {},
  subtotal: state => {
    if (!state.cart.items || state.cart.items.length == 0) {
      return 0;
    } else {
      var sum = 0;
      state.cart.items.forEach(item => (sum += item.price * item.quantity));
      return sum;
    }
  },
  shipping: state => {
    if (state.order.shipping !== undefined) {
      var shipping = state.shipping_methods.find(y => y.id == state.order.shipping)
      return shipping.cost;
    } else {
      return 0;
    }
  },
  tax: state => state.cart.tax || 0,
  cartTotal: (state, getters) =>
    parseFloat(getters.subtotal) + parseFloat(getters.shipping) + parseFloat(getters.tax)
};

export const orderGetters = {
  shippingMethods: state => state.shipping_methods || [],
  shippingCities: (state, getters) => {
    var cities = getters.shippingMethods
      .filter(x => x.shipping_method.data.id === 3)
      .map(y => y.title);
    cities.push("Other");
    return cities;
  },
  shippingList: (state, getters) => {
    return state.shipping_methods.reduce((groups, y) => {
      const val = y.shipping_method.data.name;
      groups[val] = groups[val] || [];
      groups[val].push({ id: y.id, title: y.title, cost: y.cost });
      return groups;
    }, {});
  },
  paymentMethods: state => state.payment_methods || [],
  orderID: state => state.order.id || false,
  shippingInfo: state => state.order.address || false,
  shippingMethod: state => state.order.shipping || false,
  shippingRate: state => {
    if (state.order.shipping !== undefined) {
      var shipping = state.shipping_methods.find(y => y.id == state.order.shipping)
      return shipping.cost;
    } else {
      return 0;
    }
  },
  paymentMethod: state => state.order.payment || {},
  taxRate: state => state.order.tax || 0,
  orderTotal: (state, getters) => 0
};
