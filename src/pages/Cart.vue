<template>
  <section class="page-wrapper innerpage-section-padding">  
    <div id="shopping-cart-page">
        <div class="container-fluid">
            <div class="innerpage-heading text-center">
              <h3  class="page-heading">Your Cart</h3>
              <hr class="page-heading-line">
            </div><!-- end innerpage-heading -->
            <div class="no-back">
              <div class="row">
                <div class="col-sm-12 offset-lg-2 col-lg-8"> 
                  <template v-if="count > 0">
                    <cart-items :orders="orders" />
                    <coupon v-show="discount <= 0" /> 
                    <cart-totals link="products" /> 
                  </template> 
                  <template v-else>
                    <h1><i class="fab fa-superpowers"></i> Your Cart is Empty</h1>
                    <router-link to="/products" class="btn btn-orange"><i class="fa fa-home"></i> Go Shopping</router-link> 
                  </template>
                </div>
              </div>
            </div>     
        </div><!-- end container-fluid -->
    </div>
  </section>
</template>

<script>
import { CLEAR_CART, PAGE_TITLE, PAGE_ICON, PAGE_COVER } from "../store/mutation-types";
import CartItems from "../components/productos/CartItems";
import CartTotals from "../components/productos/CartTotals";
import Coupon from "../components/productos/Coupon";
export default {
   mounted () {
    this.$store.commit(PAGE_TITLE, 'Shopping Cart');
    this.$store.commit(PAGE_ICON, 'fa fa-shopping-cart');
    this.$store.commit(PAGE_COVER, true);
  },
  computed: {
    count() {
      return this.$store.getters.count;
    },
    orders() {
      return this.$store.getters.allItems;
    },
    discount() {
      return this.$store.getters.discount;
    }
  },
  components: {
    cartItems: CartItems,
    cartTotals: CartTotals,
    Coupon: Coupon
  },
  methods: {
    clear() {
      this.$store.commit(CLEAR_CART);
    }
  }
};
</script>