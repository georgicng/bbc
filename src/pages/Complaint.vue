<template>
      <!--Section: Contact v.2-->
    <section class="section">

        <!--Section heading-->
        <h2 class="h1-responsive font-weight-bold text-center my-5">Lodge a Complaint</h2>
        <!--Section description-->
        <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
            matter of hours to help you.</p>
                <form id="contact-form" name="contact-form" action="mail.php" method="POST">

                    <!--Grid row-->
                    <div class="row">

                        <!--Grid column-->
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                <input type="text" id="name" name="name" class="form-control">
                                <label for="name" class="">Your name</label>
                            </div>
                        </div>
                        <!--Grid column-->

                        <!--Grid column-->
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                <input type="text" id="email" name="email" class="form-control">
                                <label for="email" class="">Your email</label>
                            </div>
                        </div>
                        <!--Grid column-->

                    </div>
                    <!--Grid row-->

                    <!--Grid row-->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="md-form mb-0">
                                <input type="text" id="subject" name="subject" class="form-control">
                                <label for="subject" class="">Subject</label>
                            </div>
                        </div>
                    </div>
                    <!--Grid row-->

                    <!--Grid row-->
                    <div class="row">

                        <!--Grid column-->
                        <div class="col-md-12">

                            <div class="md-form">
                                <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                                <label for="message">Issues</label>
                            </div>

                        </div>
                    </div>
                    <!--Grid row-->
                    <div class="row">
                        <!--Grid column-->
                        <div class="col-md-12">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="customFile">
                                <label class="custom-file-label" for="customFile">Choose file</label>
                                <vue-base64-file-upload 
                                    class="v1"
                                    accept="image/png,image/jpeg"
                                    image-class="v1-image"
                                    input-class="v1-input"
                                    :max-size="customImageMaxSize"
                                    @size-exceeded="onSizeExceeded"
                                    @file="onFile"
                                    @load="onLoad" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
    </section>
</template>

<script>
import VueBase64FileUpload from 'vue-base64-file-upload';
  export default {
    name: 'complaint',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        customImageMaxSize: 3 // megabytes
      }
    },
    components: {
        VueBase64FileUpload
    },
    methods: {
        onFile(file) {
        console.log(file); // file object
        },

        onLoad(dataUri) {
        console.log(dataUri); // data-uri string
        },

        onSizeExceeded(size) {
        alert(`Image ${size}Mb size exceeds limits of ${this.customImageMaxSize}Mb!`);
        }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>