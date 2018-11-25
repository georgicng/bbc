<template>
    <section class="page-wrapper innerpage-section-padding">
      <div id="complaint-page">
            <div class="container-fluid">
                <div class="innerpage-heading  text-center">
                    <h3>Oops!</h3>
                    <hr class="page-heading-line">
                    <p>{{ payload.title}}</p>
                </div><!-- end innerpage-heading -->
                <div class="no-back">
                  <div class="row">
                    <div class="col-sm-12 offset-lg-2 col-lg-8">
                        <div class="jumbotron">
                            <p class="lead">{{ payload.message }}</p>
                            <p class="lead">
                                <router-link to="/" exact class="btn btn-primary btn-lg">
                                    <span class="glyphicon glyphicon-home"></span> Go to home page
                                </router-link>
                                <a @click="$router.go(-1)" class="btn btn-default btn-lg">
                                    <span class="glyphicon glyphicon-envelope"></span> Go Back 
                                </a>
                            </p>                        
                        </div>
                    </div>
                  </div>
                </div>
            </div><!-- end container-fluid -->
        </div>                
    </section>
</template>

<script>
export default {
    props: ['payload']
};
</script>