<template>
  <section class="page-wrapper innerpage-section-padding">  
    <div id="shopping-cart-page">
        <div class="container-fluid">
            <div class="innerpage-heading text-center">
                <h3>Your Cart</h3>
            </div><!-- end innerpage-heading -->
            <template v-if="count > 0">
              <cart-items :orders="orders" />
              <coupon v-show="discount <= 0" /> 
              <cart-totals link="products" /> 
            </template> 
            <template v-else>
              <h1><i class="fab fa-superpowers"></i> Your Cart is Empty</h1>
              <router-link to="/products" class="btn btn-orange"><i class="fa fa-home"></i> Go Shopping</router-link> 
            </template>     
        </div><!-- end container-fluid -->
    </div>
    </section>
</template>

<script>
import { CLEAR_CART } from "../store/mutation-types";
import CartItems from "../components/productos/CartItems";
import CartTotals from "../components/productos/CartTotals";
import Coupon from "../components/productos/Coupon";
export default {
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