<template>
  <div>
    <button v-if="!added" class="btn  btn-outline-primary" @click="addToCart"><i class="fa fa-cart-plus"></i> Add to Cart</button>
    <button v-else class="btn  btn-outline-success"><i class="fa fa-check"></i> Added to Cart</button>
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