<template>
  <!--<transition-->
    <!--name="custom"-->
    <!--enter-active-class="animated zoomIn"-->
  <!--&gt;-->
  <div class="page-wrapper innerpage-section-padding">
    <product-details :product="product" :multi="true"></product-details>
  </div>
  <!--</transition>-->
</template>

<script>
  import ProductDetails from '../components/productos/ProductDetails';
  import { PAGE_COVER } from "../store/mutation-types";
  export default {
    created () {
        this.$store.dispatch('customProduct')
    },
    mounted() {
      this.$store.commit(PAGE_COVER, false);
    },
    computed: {
      product () {
        return this.$store.getters.customProduct
      }
    },
    components: {
      'product-details': ProductDetails
    }
  }
</script>