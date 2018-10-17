<template>
  <div>
    <button v-if="!added" @click="addToCart" class="btn">Add to cart<span><i class="fa fa-shopping-cart"></i></span></button>
    <button v-else class="btn btn-outline-success">Added to cart<span><i class="fa fa-shopping-cart"></i></span></button>
  </div>
</template>

<script>
  import {
    ADD_TO_CART,
    REMOVE_FROM_CART
  } from '../../store/mutation-types'
  export default {
    props: ['product'],
    data () {
      return {
        cart: this.$store.state.cart.items,
        added: false
      }
    },
    methods: {
      addToCart () {
        this.$store.commit(ADD_TO_CART, {productid: this.product.id, quantity: 1, price: this.product.price}),
        this.added = true;
      }
    }
  }
</script>