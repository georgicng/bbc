<template>
  <div>
    <div class="title">
      <h1><i class="fa fa-braille"></i> In Stock</h1>
    </div>
    <product-list :products="products"></product-list>
  </div>
</template>

<script>
  import ProductList from '../components/productos/ProductList.vue'
  export default {
    name: 'products',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    props: ['limit', 'offset', 'depth', 'filters'],
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
    components: {
      'product-list': ProductList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>