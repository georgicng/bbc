<template>
  <div class="cart-info text-right">
      <h4>Item(s) : <span>{{count}}</span></h4>
      <h4>Sub-total: <span>N{{subtotal}}</span></h4>
      <h4 v-show="discount > 0">Discount (coupon): <span>- N{{discount}}</span></h4>
      <h4>Total: <span>N{{total}}</span></h4>
      <router-link v-if="link == 'cart'" to="/cart" class="btn btn-black">View Cart</router-link>
      <router-link v-if="link == 'products'" to="/products" class="btn btn-black">Continue Shopping</router-link>
      <router-link to="/checkout" class="btn btn-orange">Pay Now</router-link>
  </div>
</template>

<script>
  export default {
    name: 'cart-totals',
    props: ['link'],
    computed: {
      subtotal () {
        return this.$store.getters.subtotal;
      },
      count() {
        return this.$store.getters.count;
      },
      discount() {
        return this.$store.getters.discount;
      },
      total() {
        return this.subtotal - this.discount;
      }
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