<template>
  <div id="menu-page" class="menu-grid">
      <div class="container-fluid text-center menu">
          <div class="innerpage-heading">
              <h3>Cakes</h3>
          </div><!-- end innerpage-heading -->
          
          <div id="breakfast-dishes" class="tab-content">                  
            <product-list :products="products"></product-list>

            <paginate
              v-model="currentPage"
              :page-count="total"
              :page-range="5"
              :click-handler="changePage"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :container-class="'pagination'"
              :page-class="'page-item'">
            </paginate>
          </div>
              
      </div><!-- end container-fluid -->
  </div>
</template>

<script>
  import Paginate from 'vuejs-paginate'
  import ProductList from '../components/productos/ProductList.vue'
  export default {
    name: 'products',
    data () {
      return {
      }
    },
    props: ['page', 'filter'],
    created () {
      this.$store.dispatch('allProducts', { page: this.page });
    },
    computed: {
      products () {
        return this.$store.getters.productByPage(this.page);
      },
      total() {
        return this.$store.getters.productCount / 10;
      },
      currentPage() {
        return parseInt(this.page);
      } 
    },
    components: {
      'product-list': ProductList,
      'paginate': Paginate
    },
    methods: {
      changePage (pageNum) {
        this.$router.push({ path: `/products?page=${pageNum}` });
      }
    },
    beforeRouteUpdate (to, from, next) {
      // react to route changes...
      // don't forget to call next()
      this.$store.dispatch('allProducts', { page: parseInt(to.params.page) })
      .then(response => {
        next()
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pagination {
}
.page-item {
}
</style>