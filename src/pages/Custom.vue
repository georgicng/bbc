<template>
  <!--<transition-->
    <!--name="custom"-->
    <!--enter-active-class="animated zoomIn"-->
  <!--&gt;-->
  <div class="page-wrapper innerpage-section-padding">
    <custom-product :product="product"></custom-product>
  </div>
  <!--</transition>-->
</template>

<script>
  import CustomProduct from '../components/productos/CustomProduct';
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
      'custom-product': CustomProduct
    }
  }
</script>