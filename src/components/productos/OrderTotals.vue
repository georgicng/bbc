<template>
  <div class="cart-info text-right">
    <h4>Sub-Total: <span>N{{subtotal}}</span></h4>
    <h4>Delivery Cost: <span>N{{shipping}}</span></h4>
    <h4 v-show="discount > 0">Discount (coupon): <span>- N{{discount}}</span></h4>
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
      discount() {
        return this.$store.getters.discount
      },
      shippingName() {
        let name = this.$store.getters.shippingName(this.$store.getters.shippingMethod);
        if (name == 'Deliver to me' && this.$store.state.order.express) {
          name += ' (Express)';
        }
        return `${name} shipping`;
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