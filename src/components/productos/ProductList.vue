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
    created () {
      if (this.products.length === 0) {
        this.$store.dispatch('allProducts')
      }
    },
    computed: {
      products () {
        return this.$store.getters.allProducts
      }
    },
    data () {
      return {
      }
    },
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