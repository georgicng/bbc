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
  productOptions: (state, getters) => (id) => {
    const product = getters.productById(id);
    if (product.options && product.options.data.length > 0) {
      return product.options.data.reduce((groups, y) => {
        const name = y.option_id.data.name;
        if (groups[name] === undefined) {
          groups[name] = {
            option_id: y.option_id.data.id,
            type: y.option_id.data.type,
            name,
          };
        }
        return groups;
      }, {});
    }
    return {};
  },
  optionValues: (state, getters) => (id, optionId) => {
    const product = getters.productById(id);
    if (product.options && product.options.data.length > 0) {
      return product.options.data
        .filter(item => item.option_id.data.id == optionId)
        .map((item) => {
          return {
            id: item.id,
            name: item.option_value_id.data.value,
            increment: item.price_increment,
          };
        });
    }
    return [];
  },
  optionIncrement: (state, getters) => (id, productOptionId) =>  {
    const product = getters.productById(id);
    if (product.options && product.options.data.length > 0) {
      const item = product.options.data.find(obj => obj.id == productOptionId);
      if (item && item.price_increment) {
        return parseFloat(item.price_increment);
      }
    }
    return 0;
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
  orderReference: state => state.order.reference || false,
  shippingInfo: state => state.order.address || false,
  shippingMethod: state => state.order.shipping || false,
  shippingRate: (state) => {
    if (state.order.shipping !== 0) {
      const shipping = state.shipping_methods.find(y => y.id == state.order.shipping);
      return shipping ? shipping.cost : 0;
    }
    return 0;
  },
  paymentMethod: state => state.order.payment || false,
  paymentName: (state, getters) => (id) => {
    if (state.payment_methods && state.payment_methods.length > 0) {
      const method = getters.paymentMethods.find(item => item.id == id);
      return method ? method.name : '';
    }
    return '';
  },
  tax: state => state.order.tax || 0,
  orderTotal: (state, getters) =>
    parseFloat(getters.subtotal) + parseFloat(getters.shippingRate) + parseFloat(getters.tax),
  orderMeta: state => (key) => {
    if (state.order.meta && state.order.meta.length > 0) {
      const meta = state.order.meta.find(item => item.key == key);
      return meta.value ? meta.value : '';
    }
    return '';
  },
};
