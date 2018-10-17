<template>
<div>
       <!--============ SIDE-NAV =============-->
  <div class="sidenav-content">
    <div id="mySidenav" class="sidenav" >

        <div id="main-menu">
            <div class="sidenav-closebtn">
                <button class="btn btn-default" id="sidenav-close">&times;</button>
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
      
      
<!--=============== FULLSCR-NAV ==============-->
<div id="fullscr-nav" class="fullscr-navigation">
    <button id="fullscr-close"><span><i class="fa fa-times"></i></span></button>
    <ul class="list-unstyled">
        <li><router-link to="/" class="nav-link"><i class="fa fa-home"></i> Home</router-link></li>
        <li><router-link to="/categories" class="nav-link"><i class="fa fa-user"></i> Products</router-link></li>
        <li><router-link to="/about" class="nav-link"><i class="fa fa-user"></i> About</router-link></li>
        <li><router-link to="/contact" class="nav-link"><i class="fa fa-user"></i> Contact</router-link></li>
        <li><router-link to="/complaint" class="nav-link"><i class="fa fa-user"></i> Support</router-link></li>
        <li><router-link to="/terms" class="nav-link"><i class="fa fa-user"></i> Terms and Conditions</router-link></li>
    </ul>
</div><!-- end fullscr-nav -->
          
          
      <!--================ SHOPPING-CART ==============-->
      <div id="shopping-cart-sidebar" class="shc-sidebar">
          <cart-items :orders="orders" />
          <cart-totals link="cart" />
      </div><!-- shopping-cart-sidebar -->
         <div class="canvas">
            
            <div class="overlay-black"></div>
            
            <!--========= HEADER =========-->
            <div class="header height-auto">                               
                <div class="nav-bar">
                	<div class="container-fluid">
                    	<div class="row">
                        	<div class="col-xs-2 col-sm-2">
                                <div class="header-links f-none">
                                    <ul class="list-unstyled list-inline">
                                        <li><a href="javascript:void(0)" id="sidenav-open"><span><i class="fa fa-bars"></i></span></a></li>
                                    </ul>
                                </div><!-- end header-links -->
                            </div><!-- end columns -->
                            
                        	<div class="col-xs-8 col-sm-8">
                                <div class="header-logo f-none text-center">
                                    <a href="/"><img class="logo" src="static/images/logo.png"></a>
                                </div><!-- end header-logo -->
                            </div><!-- end columns -->
                            
                            <div class="col-xs-2 col-sm-2">
                                <div class="header-links">
                                    <ul class="list-unstyled list-inline">
										<li class="shopping-cart"><a href="javascript:void(0)" id="shc-side-open"><span><i class="fa fa-shopping-cart"></i></span><span class="cart-badge">{{cartItemsCount}}</span></a></li>
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
      <div class="overlay" v-show="showLoader">
      <div class="loading-spinner">
        <div class="dot dotOne"></div>
        <div class="dot dotTwo"></div>
        <div class="dot dotThree"></div>
      </div>
    </div>
    </div><!-- end canvas -->
  </div>

</template>

<script>
import CartItems from "./components/productos/CartItems";
import CartTotals from "./components/productos/CartTotals";
import toastr from "toastr";
import {
  ERROR_MSG,
  ADD_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_SUCCESS
} from "./store/mutation-types";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    this.$store.subscribe(mutation => {
      if (mutation.payload) {
        switch (mutation.type) {
          case ERROR_MSG:
            toastr.error(mutation.payload.content, mutation.payload.title);
            break;
          case ADD_PRODUCT_SUCCESS:
            toastr.success("Product created.", "Success!");
            break;
          case UPDATE_PRODUCT_SUCCESS:
            toastr.success("Product updated.", "Success!");
            break;
          case REMOVE_PRODUCT_SUCCESS:
            toastr.warning("Product deleted.", "Deleted!");
            break;
        }
      }
    });
  },
  mounted() {
    (function($) {
      "use strict";

      // Cache Selectors
      var mainWindow = $(window),
        mainDocument = $(document),
        myLoader = $(".loader"),
        pageBody = $(".canvas"),
        fullScrNav = $("#fullscr-nav"),
        fullSrcClose = $("#fullscr-close"),
        fullSrcOpen = $("#fullscr-open"),
        sideBarNav = $(".sidenav"),
        sideBarClose = $("#sidenav-close"),
        sideBarOpen = $("#sidenav-open"),
        scSideBar = $("#shopping-cart-sidebar"),
        scOpen = $("#shc-side-open"),
        usrSideBar = $("#user-profile-sidebar"),
        usrSideOpen = $("#usr-side-open"),
        over = $(".overlay-black");

      // Loader
      mainWindow.on("load", function() {
        myLoader.fadeOut("slow");
      });

      //Full Screen Navigation
      fullSrcOpen.on("click", function(e) {
        e.stopPropagation();
        fullScrNav.toggleClass("to-top-toggle");
      });

      fullSrcClose.on("click", function(e) {
        e.stopPropagation();
        fullScrNav.toggleClass("to-top-toggle");
      });

      //Sidebar Navigation
      sideBarOpen.on("click", function(e) {
        e.stopPropagation();
        sideBarNav.toggleClass("to-left-toggle");
        over.css("visibility", "visible");
      });

      sideBarClose.on("click", function(e) {
        e.stopPropagation();
        sideBarNav.toggleClass("to-left-toggle");
        over.css("visibility", "hidden");
      });

      //Shopping Cart Sidebar
      scOpen.on("click", function(e) {
        e.stopPropagation();
        scSideBar.toggleClass("to-right-toggle");
        over.css("visibility", "visible");
      });

      //User Sidebar
      usrSideOpen.on("click", function(e) {
        e.stopPropagation();
        usrSideBar.toggleClass("to-right-toggle");
        over.css("visibility", "visible");
      });

      pageBody.on("click", function(e) {
        if (sideBarNav.hasClass("to-left-toggle")) {
          sideBarNav.toggleClass("to-left-toggle");
          over.css("visibility", "hidden");
        } else if (scSideBar.hasClass("to-right-toggle")) {
          scSideBar.toggleClass("to-right-toggle");
          over.css("visibility", "hidden");
        } else if (usrSideBar.hasClass("to-right-toggle")) {
          usrSideBar.toggleClass("to-right-toggle");
          over.css("visibility", "hidden");
        }
      });
    })(jQuery);
  },
  computed: {
    cartItemsCount() {
      return this.$store.getters.count;
    },
    showLoader() {
      return this.$store.state.showLoader;
    },
    orders() {
      return this.$store.getters.allItems;
    }
  },
  components: {
    cartItems: CartItems,
    cartTotals: CartTotals
  },
};
</script>
<style>
#sidebar {
  min-width: 150px;
}
.overlay {
  background: rgba(255, 255, 255, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
.dot {
  background: black;
  border-radius: 100%;
  color: white;
  height: 8px;
  line-height: 8px;
  text-align: center;
  width: 8px;
}
.dotOne {
  -webkit-animation: dotOneKeyframes 5s ease infinite;
  background: #f9e610;
  position: absolute;
  top: 0;
  left: 0;
}
.dotTwo {
  -webkit-animation: dotTwoKeyframes 5s ease 0.4166666666666s infinite;
  background: #efdb06;
  position: absolute;
  top: 0;
  left: 14px;
}
.dotThree {
  -webkit-animation: dotThreeKeyframes 5s ease 0.83333333333s infinite;
  background: #dbc906;
  position: absolute;
  top: 14px;
  left: 14px;
}
@-webkit-keyframes dotOneKeyframes {
  0% {
    top: 0;
    left: 0;
  }
  8.3333333333% {
    top: 14px;
    left: 0;
  }
  16.6666666666% {
  }
  25% {
    top: 14px;
    left: 0;
  }
  33.3333333333% {
    top: 14px;
    left: 14px;
  }
  41.6666666666% {
  }
  50% {
    top: 14px;
    left: 14px;
  }
  58.3333333333% {
    top: 0;
    left: 14px;
  }
  66.6666666666% {
  }
  75% {
    top: 0;
    left: 14px;
  }
  83.3333333333% {
    top: 0;
    left: 0;
  }
  91.6666666666% {
  }
  100% {
  }
}
@-webkit-keyframes dotTwoKeyframes {
  0% {
    top: 0;
    left: 14px;
  }
  8.3333333333% {
    top: 0;
    left: 0;
  }
  16.6666666666% {
  }
  25% {
    top: 0;
    left: 0;
  }
  33.3333333333% {
    top: 14px;
    left: 0;
  }
  41.6666666666% {
  }
  50% {
    top: 14px;
    left: 0;
  }
  58.3333333333% {
    top: 14px;
    left: 14px;
  }
  66.6666666666% {
  }
  75% {
    top: 14px;
    left: 14px;
  }
  83.3333333333% {
    top: 0;
    left: 14px;
  }
  91.6666666666% {
  }
  100% {
  }
}
@-webkit-keyframes dotThreeKeyframes {
  0% {
    top: 14px;
    left: 14px;
  }
  8.3333333333% {
    top: 0;
    left: 14px;
  }
  16.6666666666% {
  }
  25% {
    top: 0;
    left: 14px;
  }
  33.3333333333% {
    top: 0;
    left: 0;
  }
  41.6666666666% {
  }
  50% {
    top: 0;
    left: 0;
  }
  58.3333333333% {
    top: 14px;
    left: 0;
  }
  66.6666666666% {
  }
  75% {
    top: 14px;
    left: 0;
  }
  83.3333333333% {
    top: 14px;
    left: 14px;
  }
  91.6666666666% {
  }
  100% {
  }
}
</style>