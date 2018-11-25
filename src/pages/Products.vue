<template>
  <div id="menu-page" class="page-wrapper innerpage-section-padding">
      <div class="container text-center menu">
          <div class="innerpage-heading">
              <h3>Cakes</h3>
              <hr class="page-heading-line">
          </div><!-- end innerpage-heading -->
          
          <div id="breakfast-dishes" class="no-back">                  
            <product-list :products="products"></product-list>
            <nav class="my-3 d-flex justify-content-center">
              <paginate
                v-model="current"
                :page-count="total"
                :page-range="5"
                :click-handler="changePage"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'page-item'"
                :page-link-class="'page-link'"
                :prev-link-class="'page-link'"
                :next-link-class="'page-link'">
              </paginate>
            </nav>
          </div>
              
      </div><!-- end container-fluid -->
  </div>
</template>

<script>
  import Paginate from 'vuejs-paginate';
  import ProductList from '../components/productos/ProductList.vue';
  import { PAGE_COVER } from "../store/mutation-types";
  export default {
    name: 'products',
    data () {
      return {
        current: this.page,
      }
    },
    props: ['page', 'category'],
    mounted() {
      this.$store.commit(PAGE_COVER, false);
    },
    created() {
      const page = this.page;
      const category = this.category;
      this.$store.dispatch('allProducts', { page, category });
    },
    computed: {
      products () {
        return this.$store.getters.productByPage(this.page, this.category);
      },
      total() {
        return this.$store.getters.productCount / 10;
      },
      currentPage: {
        get () {
          return this.page;
        },
        set (value) {
          this.page = value;
        }

      } 
    },
    components: {
      'product-list': ProductList,
      'paginate': Paginate
    },
    methods: {
      changePage (pageNum) {
        this.$router.push({ path: `/products?page=${pageNum}&category=${this.category}` });
      }
    },
    beforeRouteUpdate (to, from, next) {
      let page = 1;
      let category = 0;

      if (to.query.page) {
        page = parseInt(to.query.page);
      }

      if (to.query.category) {
        category = parseInt(to.query.category)
      }

      this.$store.dispatch('allProducts', { page, category })
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