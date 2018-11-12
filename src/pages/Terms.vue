<template>
  <section class="page-wrapper innerpage-section-padding">
	<div id="tos-page">
        <div class="container-fluid">
            <div class="innerpage-heading  text-center">
                <h3 class="page-heading">Terms and Conditions</h3>
                <hr class="page-heading-line">
                <p>Thanks for your interest in butterbakes cakes. Before you proceed with your order we would like you to be familiar with a our processes and mode of operations.</p>
            </div><!-- end innerpage-heading -->
            <div class="no-back">
             <div class="row">
                 <div class="col-sm-12 offset-lg-2 col-lg-8">    
                    <p>We produce quick retail cakes, and the most affordable rates we can possibly offer.</p>
                    <p>We offer 3 flavours and you may choose two flavours. Additional flavour will incur additional cost.</p>
                    <p>All our cakes are 3 inches high except double rate is paid for double height.</p>
                    <p>All extra high cakes will be delivered through uber/taxify only. You may however pick up from our stores or retail partners, We will not deliver them on bikes.</p>
                    <p>All are cakes can be delivered door to door at a premium rate based on location and mode of delivery, or picked up from our pick up partners are a subsidized rate usually N800.</p>
                    <p>All cakes cake be picked up from our retail partners or our stores for free.</p>
                    <p>We are buttercream specialists, all our cakes are room temperature stable unless otherwise stated.</p>
                    <p>Our dessert products are SLB (see, like buy) we do not customize them with designs or decorations, only messages can changed.</p>
                    <p>Our dessert cakes are made with whipped cream and must be kept in the fridge.</p>
                    <p>All our products have a shelf life of 48hours inside or outside the fridge pls ensure you keep to this time span for maximum freshness.</p>
                    <p>We do not take responsibility for products that are damaged after payment has been made and cakes have been received or picked from our store. pls handle carefully.</p>
                    <p>We charge for redressing damaged products.</p>
                    <p>Products received in good condition cannot be returned.</p>
                    <p>We do not accept payment on delivery.</p>
                    <p>We deliver within a time frame only. between 11am and 1pm / 1pm and 3pm / 3pm and 5pm.</p>
                    <p>We do not respond to messages after  work hours and on Sundays but you may send your order via our website and we will proceed once we resume work.</p>
                    <p>Full payment is required before we proceed with any transaction our fastest mode of communication is via email and phone calls.</p>
                    <p>Please report all unsatisfactory transaction via email at butterbakescakes@gmail.com.</p>
            </div> 
            </div><!-- end container-fluid -->
    </div>          
        </div><!-- end container-fluid -->
    </div>
   
  </section>
</template>

<script>
import { PAGE_TITLE, PAGE_ICON, PAGE_COVER } from "../store/mutation-types";
export default {
    name: "terms",
    data() {
        return {
        msg: "Welcome to Your Vue.js App"
        };
    },
    mounted () {
        this.$store.commit(PAGE_TITLE, 'Terms');
        this.$store.commit(PAGE_ICON, 'fas fa-phone');
        this.$store.commit(PAGE_COVER, true);
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>