<template>
  <div class="container-fluid h-100" id="app">
    <div class="row h-100">
      <div class="col-2 collapse pt-2 h-100" id="sidebar">
            <ul class="nav flex-column">
                <li class="nav-item"><router-link to="/" class="nav-link"><i class="fa fa-home"></i> Home</router-link></li>
                <li class="nav-item"><router-link to="/categories" class="nav-link"><i class="fa fa-user"></i> Products</router-link></li>
                <li class="nav-item"><router-link to="/about" class="nav-link"><i class="fa fa-user"></i> About</router-link></li>
                <li class="nav-item"><router-link to="/contact" class="nav-link"><i class="fa fa-user"></i> Contact</router-link></li>
                <li class="nav-item"><router-link to="/complaint" class="nav-link"><i class="fa fa-user"></i> Support</router-link></li>
                <li class="nav-item"><router-link to="/terms" class="nav-link"><i class="fa fa-user"></i> Terms and Conditions</router-link></li>  
            </ul>
        </div>
      <div class="col p-0">
        <nav class="navbar navbar-expand-sm">
          <div class="container">
            <a href class="float-left m-3 navbar-light" data-target="#sidebar" data-toggle="collapse">
                <span class="navbar-toggler-icon"></span>
            </a>
            <router-link to="/cart" class="float-right m-3 navbar-light"><i class="fa fa-shopping-cart"></i> Cart ({{cartItemsCount}})</router-link>
        </div>
        </nav>
            <section class="header-main">
                <div class="container">
                    <div class="text-center">
                        <img class="logo" src="static/images/logo.png">
                    </div>
                    <!-- row.// -->
                </div>
                <!-- container.// -->
            </section>
            <div class="p-3 content">
              <div class="container">
                <router-view></router-view>
              </div>
            </div>
        </div>
    </div>
    
    <div class="overlay" v-show="showLoader">
      <div class="loading-spinner">
        <div class="dot dotOne"></div>
        <div class="dot dotTwo"></div>
        <div class="dot dotThree"></div>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr'
import {
  ERROR_MSG,
  ADD_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_SUCCESS
} from './store/mutation-types'
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  created () {
    this.$store.subscribe((mutation) => {
      if (mutation.payload) {
        switch (mutation.type) {
          case ERROR_MSG:
            toastr.error(mutation.payload.content, mutation.payload.title)
            break
          case ADD_PRODUCT_SUCCESS:
            toastr.success('Product created.', 'Success!')
            break
          case UPDATE_PRODUCT_SUCCESS:
            toastr.success('Product updated.', 'Success!')
            break
          case REMOVE_PRODUCT_SUCCESS:
            toastr.warning('Product deleted.', 'Deleted!')
            break
        }
      }
    })
  },
  computed: {
    cartItemsCount () {
      return this.$store.getters.count
    },
    showLoader () {
      return this.$store.state.showLoader
    }
  }
}
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
    position : absolute;
    top      : 50%;
    left     : 50%;
    -webkit-transform : translateX(-50%) translateY(-50%);
    -moz-transform : translateX(-50%) translateY(-50%);
    transform : translateX(-50%) translateY(-50%);
  }
  .dot {
    background    : black;
    border-radius : 100%;
    color         : white;
    height        : 8px;
    line-height   : 8px;
    text-align    : center;
    width         : 8px;
  }
  .dotOne {
    -webkit-animation : dotOneKeyframes 5s ease  infinite;
    background        : #F9E610;
    position          : absolute;
    top               : 0;
    left              : 0;
  }
  .dotTwo {
    -webkit-animation : dotTwoKeyframes 5s ease 0.4166666666666s infinite;
    background        : #EFDB06;
    position          : absolute;
    top               : 0;
    left              : 14px;
  }
  .dotThree {
    -webkit-animation : dotThreeKeyframes 5s ease 0.83333333333s infinite;
    background        : #DBC906;
    position          : absolute;
    top               : 14px;
    left              : 14px;
  }
  @-webkit-keyframes dotOneKeyframes {
    0% {
      top  : 0;
      left : 0;
    }
    8.3333333333% {
      top  : 14px;
      left : 0;
    }
    16.6666666666% {
    }
    25% {
      top  : 14px;
      left : 0;
    }
    33.3333333333% {
      top  : 14px;
      left : 14px;
    }
    41.6666666666% {
    }
    50% {
      top  : 14px;
      left : 14px;
    }
    58.3333333333% {
      top  : 0;
      left : 14px;
    }
    66.6666666666% {
    }
    75% {
      top  : 0;
      left : 14px;
    }
    83.3333333333% {
      top  : 0;
      left : 0;
    }
    91.6666666666% {
    }
    100% {
    }
  }
  @-webkit-keyframes dotTwoKeyframes {
    0% {
      top  : 0;
      left : 14px;
    }
    8.3333333333% {
      top  : 0;
      left : 0;
    }
    16.6666666666% {
    }
    25% {
      top  : 0;
      left : 0;
    }
    33.3333333333% {
      top  : 14px;
      left : 0;
    }
    41.6666666666% {
    }
    50% {
      top  : 14px;
      left : 0;
    }
    58.3333333333% {
      top  : 14px;
      left : 14px;
    }
    66.6666666666% {
    }
    75% {
      top  : 14px;
      left : 14px;
    }
    83.3333333333% {
      top  : 0;
      left : 14px;
    }
    91.6666666666% {
    }
    100% {
    }
  }
  @-webkit-keyframes dotThreeKeyframes {
    0% {
      top  : 14px;
      left : 14px;
    }
    8.3333333333% {
      top  : 0;
      left : 14px;
    }
    16.6666666666% {
    }
    25% {
      top  : 0;
      left : 14px;
    }
    33.3333333333% {
      top  : 0;
      left : 0;
    }
    41.6666666666% {
    }
    50% {
      top  : 0;
      left : 0;
    }
    58.3333333333% {
      top  : 14px;
      left : 0;
    }
    66.6666666666% {
    }
    75% {
      top  : 14px;
      left : 0;
    }
    83.3333333333% {
      top  : 14px;
      left : 14px;
    }
    91.6666666666% {
    }
    100% {
    }
  }
</style>