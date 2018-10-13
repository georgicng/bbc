// ./src/store/getters
//Con esto podemos traer la data de los productos (todos o por id) y de los manufacturers
export const productGetters = {
    allProducts: (state, getters) => {
      return state.products
    },
    productById: (state, getters) => id => {
      if (getters.allProducts.length > 0) {
        return getters.allProducts.filter(p => p.id == id)[0]
      } else {
        return state.product
      }
    },
    allManufacturers: state => {
      return state.manufacturers
    }
  }
  
  export const manufacturerGetters = {
    allManufacturers: state => state.manufacturers
  }

  export const cartGetters = {
    allItems: state => state.cart.items|| [],
    count: state => state.cart.items? state.cart.items.length : 0,
    itemByIndex: (state, getters) => id => getters.allItems[id] || {},
    subtotal: state => {
      if(!state.cart.items || state.cart.items.length == 0){
        return 0;
      } else {
        var sum = 0
        state.cart.items.forEach(item => sum += item.price * item.quantity)
        return sum
      }    
    },
    shipping: state => state.cart.shipping || 0,
    tax: state => state.cart.tax || 0,
    cartTotal: (state, getters) => getters.subtotal + getters.shipping + getters.tax,
  }