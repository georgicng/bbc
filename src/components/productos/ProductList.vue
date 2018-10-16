<template>
  <section class="section">
    <div class="products">
      <div class="row">
        <template v-for="product in products">
          <product-item :product="product"></product-item>
        </template>
      </div>
    </div>
  </section>
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