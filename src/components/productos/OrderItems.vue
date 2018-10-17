<template>
  <ul class="list-unstyled">
    <order-item v-for="(line, index) in orders" :index="index" :line="line" :key="index"></order-item>
  </ul> <!-- card.// -->
</template>

<script>
  import OrderItem from './OrderItem.vue'
  export default {
    name: 'cart-items',
    props: ["orders"],
    data () {
      return {
      }
    },
    components: {
      'orderItem': OrderItem
    }
  }
</script>

<style>

</style>