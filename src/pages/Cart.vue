<template>
<section class="section">
  <div v-if="cart && cart.length > 0">
    <div class="title">
      <h1><i class="fa fa-superpowers"></i> Your Cart <button @click="clear()">clear cart</button></h1>
    </div>
      <div class="row mb-3">
    <div class="col">
          <cart-items />
    </div>
  </div>
<div class="row mb-3">
  <div class="col-sm-6 offset-sm-6">
    <cart-totals />
  </div>
</div>
<div class="row mb-3">
  <div class="col-sm-6 text-left">
        <router-link to="/products" class="btn"><i class="fa fa-home"></i> Continue Shopping</router-link>
  </div>
  <div class="col-sm-6 text-right">
    <router-link to="/checkout" class="btn"><i class="fa fa-home"></i> Checkout</router-link>
  </div>
</div>
    

  </div>
  <div v-else class="title"><h1><i class="fa fa-superpowers"></i> Your Cart is Empty</h1></div>
  </section>
</template>

<script>
import {
    CLEAR_CART
  } from '../store/mutation-types'
  import CartItems from '../components/productos/CartItems'
  import CartTotals from '../components/productos/CartTotals'
  export default {
    data () {
      return {
        cart: this.$store.state.cart.items
      }
    },
    components: {
      cartItems: CartItems,
      cartTotals: CartTotals
    },
    methods: {
		clear() {
				this.$store.commit(CLEAR_CART)
		}
  }
  }
</script>