<template>
  <div class="row">
      <template >
        <product-item v-for="(product, index) in products" :product="product" :key="index"></product-item>
      </template>
  </div>
</template>

<script>
  import ProductItem from './ProductItem.vue'
  export default {
    name: 'product-list',
    props: ['products'],
    components: {
      'product-item': ProductItem
    }
  }
</script>

<style>
  .products {
    background: #F7F8FB;
    padding: 30px 0;
  }
</style>