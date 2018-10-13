<template>
  <div>
    <button class="btn  btn-primary" @click="addToCart"><i class="fa fa-cart-plus"></i> Buy now </button>
  </div>
</template>

<script>
  import {
    ADD_TO_CART
  } from '../../store/mutation-types'
  export default {
    props: ['product'],
    methods: {
      addToCart () {
        this.$store.commit(ADD_TO_CART, {productid: this.product.id, quantity: 1, price: this.product.price})
      }
    }
  }
</script>