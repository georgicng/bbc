<template>
<section class="main">
       <!--============ SIDE-NAV =============-->
  <div class="sidenav-content">
    <div id="mySidenav" class="sidenav" :class="{ 'to-left-toggle' : showNav }" >
        <div id="web-name">
            <div class="text-center"> <img src="static/images/logo_icon.png" class="logo" height="100"></div>             	
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
              <router-link to="/" class="list-group-item"><span><i class="fa fa-home sidebar-icon"></i></span> Home</router-link>
              <a href="#menu-categories" class="list-group-item" data-toggle="collapse"><span><i class="fas fa-shopping-bag sidebar-icon"></i></span> Product Categories <span><i class="fa fa-caret-down arrow"></i></span></a>
              <div class="sub-menu collapse" id="menu-categories" data-parent="#main-menu" style="">
                  <router-link to="/products" class="list-group-item">All Products</router-link>
                  <router-link to="/products?category=1" class="list-group-item">Buttercream Cakes</router-link>
                  <router-link to="/products?category=3" class="list-group-item">Cakes for Kids</router-link>
                  <router-link to="/products?category=5" class="list-group-item">Cream Cakes</router-link>
                  <router-link to="/custom" class="list-group-item">Quick Order Cakes</router-link>
              </div>
              <router-link to="/about" class="list-group-item"><span><i class="fas fa-users sidebar-icon"></i></span> About</router-link>
              <router-link to="/contact" class="list-group-item"><span><i class="fas fa-envelope sidebar-icon"></i></span> Contact</router-link>
              <router-link to="/complaint" class="list-group-item"><span><i class="fa fa-life-ring sidebar-icon"></i></span> Support</router-link>
              <router-link to="/faq" class="list-group-item"><span><i class="fas fa-question-circle sidebar-icon"></i></span> FAQ</router-link>
              <router-link to="/terms" class="list-group-item"><span><i class="far fa-handshake sidebar-icon"></i></span> Terms and Conditions</router-link>                  
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
            <div class="header-lg d-none d-lg-block border-bottom">
              <div class="logo-area">
                <div class="container">
                  <div class="logo_wrapper">
                    <div class="logo">
                      <a href="index.html"><img src="static/images/logo.png" class="logo" height="100"></a>	
                    </div>
                  </div>
                </div>
              </div>
              <div class="header-top">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-6 offset-lg-2">
                      <nav class="header-login d-flex">
                        <a href="tel:+2348149750282"><i class="fa fa-phone"></i> +2348149750282</a>
                        <a href="mailto:butterbakescakes@gmail.com"><i class="fa fa-envelope"></i> butterbakescakes@gmail.com</a>
                      </nav>
                    </div>
                    <div class="col-lg-4">	
                        <nav class="header-social text-right">
                          <a href="#"><span><i class="fab fa-facebook-f"></i></span></a>
                          <a href="//instagram.com/butterbakesng" target="_blank"><span><i class="fab fa-instagram"></i></span></a>
                          <a href="#"><span><i class="fab fa-twitter"></i></span></a>
                          <a href="#"><span><i class="fab fa-google-plus-g"></i></span></a>
                        </nav>					
                    </div>
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="col-lg-8 offset-lg-2">
                    <nav class="navbar navbar-expand" role="navigation">            
                        <ul class="navbar-nav lg-menu">
                          <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
                          <li class="nav-item"><router-link to="/categories" class="nav-link">Products</router-link></li>
                          <li class="nav-item"><router-link to="/about" class="nav-link">About</router-link></li>                          
                          <li class="nav-item"><router-link to="/contact" class="nav-link">Contact</router-link></li>
                          <li class="nav-item"><router-link to="/complaint" class="nav-link">Support</router-link></li>
                          <li class="nav-item"><router-link to="/faq" class="nav-link">FAQ</router-link></li>
                           <li class="nav-item"><router-link to="/terms" class="nav-link">Terms</router-link></li>
                        </ul>
                    </nav>
                  </div>
                  <div class="col-lg-2">
                    <div class="search-right text-right">
                      <div class="cart box_1">
                        <router-link to="/cart"><i class="fa fa fa-shopping-basket"></i><span class="cart-badge">{{cartItemsCount}}</span></router-link>
                      </div>
                    </div>	
                  </div>
                </div>
              </div>
            </div>
            <div class="header d-lg-none">                               
                <div class="fixed-header">
                	<div class="container-fluid">
                    	<div class="row">
                        	<div class="col d-flex justify-content-start align-items-center">
                                <div class="header-links"><a href="javascript:void(0)" id="sidenav-open" @click="openNav(true)"><span><i class="fa fa-bars"></i></span></a>
                                </div><!-- end header-links -->
                            </div><!-- end columns -->
                            
                        	<div class="col">
                                <div class="header-logo f-none text-center">
                                    <router-link to="/"><img class="logo" src="static/images/logo_text.png" height="45"></router-link>
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
                <h3><span class="d-none cover-left-icon float-left"><i :class="pageIcon"></i></span>{{pageTitle}}<span class="d-none cover-right-icon float-right"><i :class="pageIcon"></i></span></h3>
            </div><!-- end container-fluid -->
        </div>
        <app-view></app-view>
        <section id="footer" class="pd-t-b-30"> 
          <div class="container-fluid text-center">

              <ul class="footer-social no-back bordered-social mg-t15-b0 list-unstyled list-inline">
                  <li class="list-inline-item"><a href="#"><span><i class="fab fa-facebook-f"></i></span></a></li>
                  <li class="list-inline-item"><a href="#"><span><i class="fab fa-instagram"></i></span></a></li>
                  <li class="list-inline-item"><a href="#"><span><i class="fab fa-pinterest"></i></span></a></li>
                  <li class="list-inline-item"><a href="#"><span><i class="fab fa-twitter"></i></span></a></li>
                  <li class="list-inline-item"><a href="#"><span><i class="fab fa-dribbble"></i></span></a></li>
              </ul>
              <p class="copyright">© 2018 <a href="#">ButterBakes Cakes</a>. All rights reserved.</p>
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
import Error from './pages/Error';
import toastr from "toastr";
import 'toastr/build/toastr.css';
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
          //toastr.error(mutation.payload.content, mutation.payload.title);
          this.$_error(Error, {
              message: mutation.payload.message,
              title: mutation.payload.title
          });
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
.header-lg {
  background-color: #f2f2f2;
}
.header-lg .logo {
    text-align: center;
    position: absolute;
    top: 3px;
}
.header-lg .logo_wrapper {
  position: relative;
}
.header-lg .header-top {
    background-color: #2F2C2D;
    color: #fff;
    padding: 0.3em 0;
}
.header-lg .header-top a {
    color: #fff;
}
.header-login a {
    text-decoration: none;
    font-size: 0.9em;
    padding: 0.2em 1.6rem;
}
.header-lg .header-social a {
    width: 17px;
    height: 17px;
    margin: 0 0.3em;
}

.header-lg .navbar {
    padding: 0;
    margin: 2px 0;
}

.header-lg .lg-menu li {
    border-right: 1px solid #EFEFEF;
}
.header-lg .lg-menu .nav-item .nav-link {
    font-size: 1em;
    color: #3A3A3A;
    padding: 1.8em 1.6em;
}
.header-lg .search-right {
    padding: 0.6em 0 0;
}
.header-lg .cart {
    padding: 1rem;
    font-size: 1.5rem;
    position: relative;
}
.header-lg .cart .cart-badge {
    position: absolute;
    top: 0px;
    right: 10px;
    color: white;
    background: red;
    border-radius: 50%;
    font-size: 10px;
    padding: 5px;
}
.header {
    height: 60px;
}
.header .fixed-header {
  padding: 10px 4px;
}
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

.innerpage-section-padding p {
	font-size: 1rem;
}

.dlist-inline dt, .dlist-inline dd {
    display: inline-block;
}

#footer{
	background: #2F2C2D;
}
</style>