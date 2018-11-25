<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="contact-page">
        <div class="container-fluid">
            <div class="innerpage-heading text-center">
                <h3>About Us</h3>
                <hr class="page-heading-line">
                <p>Welcome to the world of beautiful buttercream cakes</p>
            </div><!-- end innerpage-heading -->
            
            <div class="no-back">
             <div class="row">
                 <div class="col-sm-12 offset-lg-2 col-lg-8"> 
              <p>We take pride in offering our clients fluffy delicious cakes, adorned with simple but beautiful buttercream
                      frostings and served to you at the most affordable rate we can possibly offer.</p>
              <p>WE CHOSE THE SIMPLE LIFE. Having a cake gorgeous cake should be simple too.</p>
              <p>Our team of bakers, decorators and service experts are professionally trained to give you the very best
                    experience from cravings to delivery.</p>
            </div>
             </div>
    </div>
        </div><!-- end container-fluid -->
    </div>	
  </section>
</template>

<script>
import { PAGE_TITLE, PAGE_ICON, PAGE_COVER } from "../store/mutation-types";
  export default {
    name: 'about',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }, 
    mounted () {      
      this.$store.commit(PAGE_ICON, 'fas fa-users');
      this.$store.commit(PAGE_TITLE, 'About');
      this.$store.commit(PAGE_COVER, true);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>