<template>
  <ul class="list-unstyled cart-list">
    <cart-item v-for="(line, index) in orders" :index="index" :line="line" :key="index"></cart-item>
  </ul> <!-- card.// -->
</template>

<script>
  import CartItem from './CartItem.vue'
  export default {
    name: 'cart-items',
    props: ["orders"],
    data () {
      return {
      }
    },
    components: {
      'cartItem': CartItem
    }
  }
</script>

<style>
  .products {
    background: #F7F8FB;
    padding: 30px 0;
  }
</style>