// ./src/store/getters
//Con esto podemos traer la data de los productos (todos o por id) y de los manufacturers
export const pageGetters = {
  pageTitle: state => state.pageTitle,
  pageIcon: state => state.pageIcon,
  pageCover: state => state.pageCover,
};

export const productGetters = {
  allProducts: state => state.products.entries.reduce((acc, val) => acc.concat(val.items), []),
  productByPage: state => (pagenum) => {
    const page = state.products.entries.find(element => element.page == pagenum);
    if (page) {
      return page.items;
    }
    return [];
  },
  productById: (state, getters) => (id) => {
    if (getters.allProducts.length > 0) {
      return getters.allProducts.filter(p => p.id == id)[0];
    }
    return state.product;
  },
  customProduct: state => state.custom,
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
  optionDescription: (state, getters) => (productid, options) => {
    let product = null;
    
    if (productid == 12) {
      product = getters.customProduct;
    } else {
      product = getters.productById(productid);
    }
    let remark = '';
    if (options && options.length > 0) {
      //get value  from option valu id
      const optionList = options.map((option) => {
        let value = option.value;
        const item = product.options.data.find(element => element.option_id.data.slug == option.name);

        if (item) {
          const optionValue = item.option_values.data.find(element => element.id == option.value);

          if (optionValue) {
            value = optionValue.option_value.data.value;
          }
        }

        return {
          name: option.name,
          value,
        };
      });

      //group values related to an option
      const collate = optionList.reduce((groups, y) => {
        const found = groups.find(element => element.name == y.name);
        if (found) {
          found.value += `, ${y.value}`;
        } else if (y.value) {
          groups.push({
            name: y.name,
            value: y.value,
          });
        }
        return groups;
      }, []);

      //return option list
      collate.forEach((x) => {
        remark += `<dl class="dlist-inline small p-2">
          <dt>${x.name}: </dt>
          <dd>${x.value}</dd>
        </dl>`;
      });
    }
    return remark;
  },
};

export const orderGetters = {
  shippingMethods: state => state.shipping_methods || [],
  shippingCities: (state, getters) => {
    const cities = getters.shippingMethods
      .filter(x => x.shipping_method.data.id === 3)
      .map(y => y.title);
    cities.push('Other');
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
      if (shipping && state.order.express) {
        return parseFloat(shipping.cost) + 1000;
      }
      return shipping ? shipping.cost : 0;
    }
    return 0;
  },
  shippingName: (state, getters) => (id) => {
    if (state.shipping_methods && state.shipping_methods.length > 0) {
      const method = getters.shippingMethods.find(item => item.id == id);
      /*if (method && state.order.express) {
        return `Shipping: (${method.shipping_method.data.name} + Express)`;
      }*/
      return method ? method.shipping_method.data.name : '';
    }
    return '';
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
  discount: (state, getters) => {
    if (state.order.coupon && state.coupon) {
      if (state.coupon.type == 'amount') {
        return parseFloat(state.coupon.discount);
      } else if (state.coupon.type == 'percentage') {
        return parseFloat(getters.subtotal) * (parseFloat(state.coupon.discount) / 100);
      }
    }
    return 0;
  },
  orderTotal: (state, getters) =>
    (parseFloat(getters.subtotal) + parseFloat(getters.shippingRate) + parseFloat(getters.tax)) - parseFloat(getters.discount),
  orderMeta: state => (key) => {
    if (state.order.meta && state.order.meta.length > 0) {
      const meta = state.order.meta.find(item => item.key == key);
      return meta.value ? meta.value : '';
    }
    return '';
  },
  orderRecord: (state, getters) => {
    const order = {
      cart: state.order.cart,
      address: state.order.address,
      shipping: state.order.shipping,
      payment: state.order.payment,
      delivery_date: state.order.delivery_date,
      delivery_time: state.order.delivery_time,
      express: state.order.express,
    };

    if (getters.orderID && getters.orderID > 0) {
      order.id = getters.orderID;
    }

    if (state.order.coupon) {
      order.coupon = state.order.coupon;
    }

    return order;
  },
};
