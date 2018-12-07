// ./src/store/getters
//Con esto podemos traer la data de los productos (todos o por id) y de los manufacturers
export const pageGetters = {
  pageTitle: state => state.pageTitle,
  pageIcon: state => state.pageIcon,
  pageCover: state => state.pageCover,
};

export const productGetters = {
  allProducts: state => state.products.entries,
  productByPage: state => (pagenum, category) => {
    if (state.products.current_page == pagenum && state.products.current_category == category) {
      return state.products.entries;
    }
    return null;
  },
  productById: (state, getters) => (id) => {
    let product = null;
    if (state.product.id == id) {
      product = state.product;
    } else if (getters.allProducts.length > 0) {
      const found = getters.allProducts.find(p => p.id == id);
      if (found) {
        product = found;
      }
    }
    if (product) {
      product.options.data.sort((a, b) => a.option_id.data.sort - b.option_id.data.sort);
    }
    return product;
  },
  customProduct: (state) => {
    const product = state.custom ? state.custom : null;
    if (product) {
      product.options.data.sort((a, b) => a.option_id.data.sort - b.option_id.data.sort);
    }
    return product;
  },
  productCount: state => state.products.total,
};

export const categoriesGetters = {
  allCategories: state => state.categories,
  categoryName: (state, getters) => (id) => {
    if (getters.allCategories.length > 0) {
      const category = getters.allCategories.find(item => item.id == id);
      if (category) {
        return category.name;
      }
    }
    return 'Cakes';
  },
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
  optionDescription: (state, getters) => (product, options) => {

    let remark = '';
    if (options && options.length > 0) {
      //get value  from option valu id
      const optionList = options.map((option) => {
        let value = option.value;
        let name = option.name;
        const item = product.options.data.find(element => element.option_id.data.slug == option.name);

        if (item) {
          const optionValue = item.option_values.data.find(element => element.id == option.value);

          if (optionValue) {
            value = optionValue.option_value.data.value;
          }

          if (item.option_id) {
            name = item.option_id.data.name;
          }
        }

        return {
          name,
          value,
        };
      });

      //group values related to an option
      const collate = optionList.reduce((groups, y) => {
        const found = groups.find(element => element.name == y.name);
        if (found) {
          found.value += ` <span class="badge badge-pill badge-secondary">${y.value}</span>`;
        } else if (y.value) {
          groups.push({
            name: y.name,
            value: `<span class="badge badge-pill badge-secondary">${y.value}</span>`,
          });
        }
        return groups;
      }, []);

      //return option list
      collate.forEach((x) => {
        remark += `<dl class="dlist-inline small">
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
      .filter((x) => {
        if (x.shipping_method) {
          return x.shipping_method.data.id === 3;
        }
        return false;
      })
      .map(y => y.title);
    cities.push('Other');
    return cities;
  },
  shippingList: (state) => {
    if (state.shipping_methods && state.shipping_methods.length > 0) {
      return state.shipping_methods.reduce((groups, y) => {
        if (y.shipping_method) {
          const val = y.shipping_method.data.name;
          groups[val] = groups[val] || [];
          groups[val].push({ id: y.id, title: y.title, cost: y.cost });
        }        
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
  paymentMode: (state, getters) => (id) => {
    let mode = null;
    if (state.payment_methods && state.payment_methods.length > 0) {
      const method = getters.paymentMethods.find(item => item.id == id);
      if (method) {
        mode = method.mode;
      }
    }
    return mode;
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
    const items = state.order.cart.map((item) => {
      const line = {
        productid: item.productid,
        quantity: item.quantity,
        price: item.price,
      };
      if (item.options) {
        line.options = item.options;
      }
      return line;
    });
    const order = {
      cart: items,
      address: state.order.address,
      shipping: state.order.shipping,
      payment: state.order.payment,
      delivery_date: new Date(state.order.delivery_date).toLocaleDateString('en-NG'),
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
