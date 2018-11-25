<template>
  <section class="page-wrapper innerpage-section-padding">
    	<div id="home-page">
          <div class="container-fluid">
            <div class="row">
                <div class="card-banner my-3 col-md-6 offset-lg-2 col-lg-4">
                  <router-link :to="'/categories'">
                    <div class="card-body" style="height:250px; background-image: url('static/images/banners/cake.jpg');"> 
                      <div class="text-bottom"><h2 class="title">Order a Cake</h2></div>
                    </div>  
                  </router-link>                
                </div> <!-- card.// -->            
              
                <div class="card-banner my-3 col-md-6 col-lg-4">
                  <router-link :to="'/terms'">
                    <div class="card-body" style="height:250px; background-image: url('static/images/banners/terms.jpg');">
                      <div class="text-bottom"><h2 class="title">Terms and Conditions</h2></div>
                    </div>  
                  </router-link>               
                </div> <!-- card.// -->
              </div>
              <div class="row">
                <div class="card-banner my-3 col-md-6 offset-lg-2 col-lg-4">
                  <router-link :to="'/complaint'">
                    <div class="card-body" style="height:250px; background-image: url('static/images/banners/complaint.jpg');"> 
                      <div class="text-bottom"><h2 class="title">Lodge a Complaint</h2></div>
                    </div>  
                  </router-link>               
                </div> <!-- card.// -->
              
                <div class="card-banner my-3 col-md-6 col-lg-4">
                  <router-link :to="'/contact'">
                    <div class="card-body" style="height:250px; background-image: url('static/images/banners/contact.jpg');"> 
                      <div class="text-bottom"><h2 class="title">Contact Us</h2></div>
                    </div>
                  </router-link>        
                </div> <!-- card.// -->
                          
             </div>
          </div><!-- end container-fluid -->
      </div>
  </section>
</template>

<script>
import { PAGE_COVER } from "../store/mutation-types";
export default {
  name: "home",
  mounted() {
    this.$store.commit(PAGE_COVER, false);
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-banner .card-body {
  background-size: cover;
  position: relative;
  z-index: 10;
}
.card-banner .text-bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 7px 20px;
  padding-top: 30px;
  border-radius: 0 0 0.25rem 0.25rem;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0)),
    to(rgba(0, 0, 0, 0.8))
  );
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  color: #fff;
}
</style>