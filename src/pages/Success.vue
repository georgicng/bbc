<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="contact-page">
        <div class="container text-center">
            <div class="innerpage-heading">
              <div class="jumbotron text-xs-center">
                <h1 class="display-3">Thank You!</h1>
                <p class="lead"><strong>Your order has been recorded</strong> .</p>
                <hr>
                <p>
                  Having trouble?  <router-link to="/complaint">Contact us</router-link>
                </p>
                <p class="lead">
                   <router-link to="/" class="btn btn-primary btn-sm" role="button">Continue to homepage</router-link>
                </p>
              </div>
            </div><!-- end innerpage-heading -->
        </div><!-- end container-fluid -->
    </div>	
  </section>
</template>

<script>
  export default {
    name: 'success',
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