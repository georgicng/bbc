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
  import CustomProduct from '../components/productos/CustomProduct'
  export default {
    created () {
        this.$store.dispatch('customProduct')
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