<template>
  <div class="card">
<table class="table table-hover shopping-cart-wrap">

<tr>
  <td scope="col">Subtotal</td>
  <td scope="col" width="120">{{subtotal}}</td>
</tr>
<tr>
  <td scope="col">Shipping</td>
  <td scope="col" width="120">{{shipping}}</td>
</tr>
<tr>
  <td scope="col">Tax</td>
  <td scope="col" width="120">{{tax}}</td>
</tr>
<tr>
  <td scope="col">Total</td>
  <td scope="col" width="120">{{total}}</td>
</tr>
</table>
</div> <!-- card.// -->
</template>

<script>
  export default {
    name: 'cart-totals',
    computed: {
      subtotal () {
        return this.$store.getters.subtotal
      },
      shipping () {
        return this.$store.getters.shipping
      },
      tax () {
        return this.$store.getters.tax
      },
      total() {
        return this.$store.getters.cartTotal
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