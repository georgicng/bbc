// ./src/store/getters
//Con esto podemos traer la data de los productos (todos o por id) y de los manufacturers
export const productGetters = {
  allProducts: state => state.products.entries.reduce((acc, val) => acc.concat(val.items), []),
  productByPage: state => (pagenum) => {
    const page = state.products.entries.find(element => element.page == pagenum);
    if (page) {
      return page.items;
    }
    return [];
  },
  productById: (state, getters) => id => {
    if (getters.allProducts.length > 0) {
      return getters.allProducts.filter(p => p.id == id)[0];
    }
    return state.product;
  },
  productCount: state => state.products.total,
};

export const manufacturerGetters = {
  allManufacturers: state => state.manufacturers,
};

export const cartGetters = {
  allItems: state => state.order.cart || [],
  count: state => (state.order.cart ? state.order.cart.length : 0),
  itemByIndex: (state, getters) => id => getters.allItems[id] || {},
  subtotal: (state) => {
    if (!state.order.cart || state.order.cart.length == 0) {
      return 0;
    }
    return state.order.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
};

export const orderGetters = {
  shippingMethods: state => state.shipping_methods || [],
  shippingCities: (state, getters) => {
    console.log('getter: ', getters.shippingMethods, 'state: ', state.shipping_methods);
    const cities = getters.shippingMethods
      .filter(x => x.shipping_method.data.id === 3)
      .map(y => y.title);
    cities.push("Other");
    return cities;
  },
  shippingList: (state) => {
    if (state.shipping_methods && state.shipping_methods.length > 0) {
      return state.shipping_methods.reduce((groups, y) => {
        const val = y.shipping_method.data.name;
        groups[val] = groups[val] || [];
        groups[val].push({ id: y.id, title: y.title, cost: y.cost });
        return groups;
      }, {});
    }
    return [];
  },
  paymentMethods: state => state.payment_methods || [],
  orderID: state => state.order.id || false,
  shippingInfo: state => state.order.address || false,
  shippingMethod: state => state.order.shipping || false,
  shippingRate: state => {
    if (state.order.shipping !== 0) {
      var shipping = state.shipping_methods.find(y => y.id == state.order.shipping)
      return shipping.cost;
    } else {
      return 0;
    }
  },
  paymentMethod: state => state.order.payment || {},
  tax: state => state.order.tax || 0,
  orderTotal: (state, getters) =>
    parseFloat(getters.subtotal) + parseFloat(getters.shippingRate) + parseFloat(getters.tax),
  meta: state => key => state.order.meta[key] || 0,
};
