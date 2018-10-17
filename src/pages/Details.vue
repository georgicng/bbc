<template>
  <!--<transition-->
    <!--name="custom"-->
    <!--enter-active-class="animated zoomIn"-->
  <!--&gt;-->
  <div class="page-wrapper innerpage-section-padding">
    <product-details :product="product" :isAdding="true"></product-details>
  </div>
  <!--</transition>-->
</template>

<script>
  import ProductDetails from '../components/productos/ProductDetails'
  export default {
    created () {
      if (!this.product.name) {
        this.$store.dispatch('productById', this.$route.params['id'])
      }
    },
    mounted () {
      (function($) {
	
        "use strict";
        
        // Cache Selectors
        var mainDocument		=$(document),
          menuGallery			=$('#menu-gallery');
          
        mainDocument.on('ready', function() {
                
          menuGallery.lightSlider({
            gallery:true,
            item:1,
            thumbItem:9,
            slideMargin: 0,
            speed:500,
            auto:false,
            loop:true,
            onSliderLoad: function() {
              menuGallery.removeClass('cS-hidden');
            }  
          });
        });

      })(jQuery);
    },
    computed: {
      product () {
        return this.$store.getters.productById(this.$route.params['id'])
      }
    },
    data () {
      return {
//        product: this.$store.getters.productById(this.$route.params['id'])
      }
    },
    components: {
      'product-details': ProductDetails
    }
  }
</script>