<template>
    <section class="page-wrapper innerpage-section-padding">
      <div id="complaint-page">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12 offset-lg-2 col-lg-8">
                        <div class="jumbotron text-center mt-4">
                            <h1 class="display-4">Oops!</h1>
                            <p class="lead">{{ payload.title }}</p>
                            <hr class="my-4">
                            <p>{{ payload.message }}</p>
                            <p class="lead">
                                <router-link to="/" exact class="btn btn-primary btn-lg">
                                    Go to home page
                                </router-link>
                                <a @click="$router.go(-1)" class="btn btn-danger text-white btn-lg">
                                    Go Back 
                                </a>
                            </p>                        
                        </div>
                    </div>
                </div>
            </div><!-- end container-fluid -->
        </div>                
    </section>
</template>

<script>
export default {
  props: ["payload"]
};
</script>