<template>
<section class="main">
       <!--============ SIDE-NAV =============-->
  <div class="sidenav-content">
    <div id="mySidenav" class="sidenav" :class="{ 'to-left-toggle' : showNav }" >

        <div id="main-menu">
            <div class="sidenav-closebtn">
                <button class="btn btn-default" id="sidenav-close" @click="openNav(false)">&times;</button>
            </div><!-- end sidenav-closebtn -->                    
            <div class="list-group panel">
              <router-link to="/" class="list-group-item"><i class="fa fa-home"></i> Home</router-link>
              <router-link to="/categories" class="list-group-item"><i class="fa fa-user"></i> Products</router-link>
              <router-link to="/about" class="list-group-item"><i class="fa fa-user"></i> About</router-link>
              <router-link to="/contact" class="list-group-item"><i class="fa fa-user"></i> Contact</router-link>
              <router-link to="/complaint" class="list-group-item"><i class="fa fa-user"></i> Support</router-link>
              <router-link to="/terms" class="list-group-item"><i class="fa fa-user"></i> Terms and Conditions</router-link>                  
            </div><!-- end list-group -->
        </div><!-- end main-menu -->
    </div><!-- end mySidenav -->
  </div><!-- end sidenav-content -->
      
          
          
      <!--================ SHOPPING-CART ==============-->
      <div id="shopping-cart-sidebar" class="shc-sidebar" :class="{ 'to-right-toggle' : showCart }">
        <div class="sidecart-closebtn">
                <button class="btn btn-default" id="sidecart-close" @click="openCart(false)">&times;</button>
            </div><!-- end sidenav-closebtn -->  
          <cart-items :orders="orders" />
          <cart-totals link="cart" />
      </div><!-- shopping-cart-sidebar -->
         <div class="canvas">
            
            <div class="overlay-black" v-show="showNav || showCart"></div>
            
            <!--========= HEADER =========-->
            <div class="header height-auto">                               
                <div class="nav-bar">
                	<div class="container-fluid">
                    	<div class="row">
                        	<div class="col-xs-2 col-sm-2">
                                <div class="header-links f-none">
                                    <ul class="list-unstyled list-inline">
                                        <li><a href="javascript:void(0)" id="sidenav-open" @click="openNav(true)"><span><i class="fa fa-bars"></i></span></a></li>
                                    </ul>
                                </div><!-- end header-links -->
                            </div><!-- end columns -->
                            
                        	<div class="col-xs-8 col-sm-8">
                                <div class="header-logo f-none text-center">
                                    <router-link to="/"><img class="logo" src="static/images/logo.png"></router-link>
                                </div><!-- end header-logo -->
                            </div><!-- end columns -->
                            
                            <div class="col-xs-2 col-sm-2">
                                <div class="header-links">
                                    <ul class="list-unstyled list-inline">
										<li class="shopping-cart"><a href="javascript:void(0)" id="shc-side-open" @click="openCart(true)"><span><i class="fa fa-shopping-cart"></i></span><span class="cart-badge">{{cartItemsCount}}</span></a></li>
                                    </ul>
                                </div><!-- end header-links -->
                            </div><!-- end columns -->
                        </div><!-- end row -->
                    </div><!-- end container-fluid -->
                </div><!-- end nav-bar -->
            </div><!-- end header -->      
        
        
        <router-view></router-view>
        <section id="footer" class="pd-t-b-30"> 
          <div class="container-fluid text-center">

              <ul class="footer-social no-back bordered-social mg-t15-b0 list-unstyled list-inline">
                  <li><a href="#"><span><i class="fab fa-facebook-f"></i></span></a></li>
                  <li><a href="#"><span><i class="fab fa-instagram"></i></span></a></li>
                  <li><a href="#"><span><i class="fab fa-pinterest"></i></span></a></li>
                  <li><a href="#"><span><i class="fab fa-twitter"></i></span></a></li>
                  <li><a href="#"><span><i class="fab fa-dribbble"></i></span></a></li>
              </ul>
              <p class="copyright">© 2018 <a href="#"><span><i class="far fa-star"></i></span>BBC</a>. All rights reserved.</p>
          </div><!-- end container-fluid -->
      </section>
           <!--====== LOADER =====-->
     <div class="loader" v-show="showLoader"></div>
    </div><!-- end canvas -->
  </section>

</template>

<script>
import CartItems from "./components/productos/CartItems";
import CartTotals from "./components/productos/CartTotals";
import toastr from "toastr";
import { ERROR_MSG, ADD_TO_CART } from "./store/mutation-types";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    this.$store.subscribe(mutation => {
      switch (mutation.type) {
        case ERROR_MSG:
          toastr.error(mutation.payload.content, mutation.payload.title);
          break;
        case ADD_TO_CART:
          toastr.success("Product added to cart");
          break;
      }
    });
  },
  mounted() {
    // Cache Selectors
	  
    this.$store.commit('loader', false);
  },
  computed: {
    cartItemsCount() {
      return this.$store.getters.count;
    },
    showLoader() {
      return this.$store.state.showLoader;
    },
    showNav() {
      return this.$store.state.showNav;
    },
    showCart() {
      return this.$store.state.showCart;
    },
    orders() {
      return this.$store.getters.allItems;
    }
  },
  methods: {
    openNav(truthy) {
      this.$store.commit('toggleNav', truthy);
      this.$store.commit('toggleCart', false);
    },
    openCart(truthy) {
      this.$store.commit('toggleCart', truthy);
      this.$store.commit('toggleNav', false);
    },
    closeSidebar(){
      if(this.showCart) {        
        this.$store.commit('toggleCart', false);
      }
      if(this.showNav) { 
        this.$store.commit('toggleNav', false);
      }
    }
  },
  components: {
    cartItems: CartItems,
    cartTotals: CartTotals
  }
};
</script>
<style>
#mySidenav .sidenav-closebtn {
  background: rgba(255, 255, 255, 0.6);
  position: relative;
  left: 0;
  color: black;
  right: 0;
}
#mySidenav #sidenav-close {
    background: transparent;
    font-size: 30px;
    text-decoration: none;
    padding: 0px;
    line-height: 1.0em;
    border: 0px;
    color: black;
}
</style>