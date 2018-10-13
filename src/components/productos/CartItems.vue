<template>
  <div class="card">
<table class="table table-hover shopping-cart-wrap">
<thead class="text-muted">
<tr>
  <th scope="col">Product</th>
  <th scope="col" width="120">Quantity</th>
  <th scope="col" width="120">Price</th>
  <th scope="col" width="200" class="text-right">Action</th>
</tr>
</thead>
<tbody>
        <template v-for="(line, index) in orders">
          <cart-item :index="index" :line="line"></cart-item>
        </template>
      </tbody>
</table>
</div> <!-- card.// -->
</template>

<script>
  import CartItem from './CartItem.vue'
  export default {
    name: 'cart-items',
    computed: {
      orders () {
        return this.$store.getters.allItems
      }
    },
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