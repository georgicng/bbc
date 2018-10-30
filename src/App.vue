<template>
<section class="main">
       <!--============ SIDE-NAV =============-->
  <div class="sidenav-content">
    <div id="mySidenav" class="sidenav" :class="{ 'to-left-toggle' : showNav }" >
        <div id="web-name">
            <h2> <span>BBC</span></h2>             	
            <ul class="main-menu-social list-inline list-unstyled text-center">
                <li class="list-inline-item"><a href="#"><span><i class="fab fa-facebook-f"></i></span></a></li>
                <li class="list-inline-item"><a href="#"><span><i class="fab fa-pinterest"></i></span></a></li>
                <li class="list-inline-item"><a href="#"><span><i class="fab fa-dribbble"></i></span></a></li>
                <li class="list-inline-item"><a href="#"><span><i class="fab fa-google-plus-g"></i></span></a></li>
            </ul>  
        </div><!-- end web-name -->


        <div id="main-menu">
            <div class="sidenav-closebtn">
                <button class="btn btn-default" id="sidenav-close" @click="openNav(false)">&times;</button>
            </div><!-- end sidenav-closebtn -->                    
            <div class="list-group panel">
              <router-link to="/" class="list-group-item"><i class="fa fa-home"></i> Home</router-link>
              <router-link to="/categories" class="list-group-item"><i class="fas fa-shopping-bag"></i> Products</router-link>
              <router-link to="/about" class="list-group-item"><i class="fas fa-users"></i> About</router-link>
              <router-link to="/contact" class="list-group-item"><i class="fas fa-envelope"></i> Contact</router-link>
              <router-link to="/complaint" class="list-group-item"><i class="fas fa-question-circle"></i> Support</router-link>
              <router-link to="/terms" class="list-group-item"><i class="far fa-handshake"></i> Terms and Conditions</router-link>                  
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
            <div class="header">                               
                <div class="fixed-header">
                	<div class="container-fluid">
                    	<div class="row">
                        	<div class="col d-flex justify-content-start align-items-center">
                                <div class="header-links"><a href="javascript:void(0)" id="sidenav-open" @click="openNav(true)"><span><i class="fa fa-bars"></i></span></a>
                                </div><!-- end header-links -->
                            </div><!-- end columns -->
                            
                        	<div class="col">
                                <div class="header-logo f-none text-center">
                                    <router-link to="/"><img class="logo" src="static/images/logo.png" width="85"></router-link>
                                </div><!-- end header-logo -->
                            </div><!-- end columns -->
                            
                            <div class="col d-flex justify-content-end align-items-center">
                                <div class="header-links"><a href="javascript:void(0)" id="shc-side-open" @click="openCart(true)"><span><i class="fa fa-shopping-cart"></i></span><span class="cart-badge">{{cartItemsCount}}</span></a>
                                </div><!-- end header-links -->
                            </div><!-- end columns -->
                        </div><!-- end row -->
                    </div><!-- end container-fluid -->
                </div><!-- end nav-bar -->
            </div><!-- end header -->      
        
        <div class="page-cover" v-if="pageCover">
            <div class="container-fluid">
                <h3><span class="cover-left-icon float-left"><i :class="pageIcon"></i></span>{{pageTitle}}<span class="cover-right-icon float-right"><i :class="pageIcon"></i></span></h3>
            </div><!-- end container-fluid -->
        </div>
        <router-view></router-view>
        <section id="footer" class="pd-t-b-30"> 
          <div class="container-fluid text-center">

              <ul class="footer-social no-back bordered-social mg-t15-b0 list-unstyled list-inline">
                  <li class="list-inline-item"><a href="#"><span><i class="fab fa-facebook-f"></i></span></a></li>
                  <li class="list-inline-item"><a href="#"><span><i class="fab fa-instagram"></i></span></a></li>
                  <li class="list-inline-item"><a href="#"><span><i class="fab fa-pinterest"></i></span></a></li>
                  <li class="list-inline-item"><a href="#"><span><i class="fab fa-twitter"></i></span></a></li>
                  <li class="list-inline-item"><a href="#"><span><i class="fab fa-dribbble"></i></span></a></li>
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
import { ERROR_MSG, ADD_TO_CART, PAGE_COVER } from "./store/mutation-types";
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
    this.$store.commit(PAGE_COVER, false);
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
    },
    pageCover() {
      return this.$store.getters.pageCover;
    },
    pageTitle() {
      return this.$store.getters.pageTitle;
    },
    pageIcon() {
      return this.$store.getters.pageIcon;
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
.header-links {
  position: relative;
}
.header .header-links a {
    color: #212121;
    font-size: 17px;
}
.header .header-links .cart-badge {
    position: absolute;
    top: -7px;
    right: -10px;
    min-height: 20px;
    min-width: 15px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-size: 11px;
    background: #ee4899
}
.header {
    height: 80px;
}
</style>