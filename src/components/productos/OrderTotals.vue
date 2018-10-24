<template>
  <div class="cart-info text-center">
    <h4>Sub-Total: <span>N{{subtotal}}</span></h4>
    <h4>{{shippingName}}: <span>N{{shipping}}</span></h4>
    <h4>Total Price: <span>N{{total}}</span></h4>
  </div><!-- end cart-info -->
</template>

<script>
  export default {
    name: 'cart-totals',
    props: ['link'],
    computed: {
      subtotal () {
        return this.$store.getters.subtotal
      },
      shipping() {
        return this.$store.getters.shippingRate
      },
      shippingName() {
        return this.$store.getters.shippingName(this.$store.getters.shippingMethod)
      },
      total() {
        return this.$store.getters.orderTotal
      },
    },
    data () {
      return {
      }
    }
  }
</script>

<style>

</style>