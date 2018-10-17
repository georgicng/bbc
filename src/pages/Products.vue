<template>
  <div id="menu-page" class="menu-grid">
      <div class="container-fluid text-center menu">
          <div class="innerpage-heading">
              <h3>Cakes</h3>
          </div><!-- end innerpage-heading -->
          
          <div id="breakfast-dishes" class="tab-content">                  
            <product-list :products="products"></product-list>
          </div>
              
      </div><!-- end container-fluid -->
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