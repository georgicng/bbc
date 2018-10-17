<template>
  <div class="cart-info text-right">
      <h4>Item(s) : <span>{{count}}</span></h4>
      <h4>Total Price: <span>N{{subtotal}}</span></h4>
      <router-link v-if="link == 'cart'" to="/cart" class="btn btn-black">View Cart</router-link>
      <router-link v-if="link == 'products'" to="/products" class="btn btn-black">Continue Shopping</router-link>
      <router-link to="/checkout" class="btn btn-orange">Checkout</router-link>
  </div>
</template>

<script>
  export default {
    name: 'cart-totals',
    props: ['link'],
    computed: {
      subtotal () {
        return this.$store.getters.subtotal
      },
      count() {
        return this.$store.getters.count
      },
    },
    data () {
      return {
      }
    }
  }
</script>

<style>
  .products {
    background: #F7F8FB;
    padding: 30px 0;
  }
</style>