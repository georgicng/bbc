<template>
  <section class="content">
    <div class="container">
    <router-link :to="'/categories'">
    <div class="card-banner my-3">
  <div class="card-body" style="height:250px; background-image: url('static/images/banners/slide1.jpg');"> </div>
  <div class="text-bottom"><h2 class="title">Order a Cake</h2></div>
</div> <!-- card.// -->
  </router-link>
    <router-link :to="'/terms'">
<div class="card-banner my-3">
  <div class="card-body" style="height:250px; background-image: url('static/images/banners/slide2.jpg');"> </div>
  <div class="text-bottom"><h2 class="title">Terms and Conditions</h2></div>
</div> <!-- card.// -->
  </router-link>
    <router-link :to="'/complaint'">
<div class="card-banner my-3">
  <div class="card-body" style="height:250px; background-image: url('static/images/banners/slide3.jpg');"> </div>
  <div class="text-bottom"><h2 class="title">Lodge a Complaint</h2></div>
</div> <!-- card.// -->
  </router-link>
    <router-link :to="'/contact'">
<div class="card-banner my-3">
  <div class="card-body" style="height:250px; background-image: url('static/images/banners/banner-request.jpg');"> </div>
  <div class="text-bottom"><h2 class="title">Contact Us</h2></div>
</div> <!-- card.// -->
  </router-link>
  </div>
  </section>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>