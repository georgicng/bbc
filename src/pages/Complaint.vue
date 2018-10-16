<template>
      <!--Section: Contact v.2-->
    <section class="section">

        <!--Section heading-->
        <h2 class="h1-responsive font-weight-bold text-center my-5">Lodge a Complaint</h2>
        <!--Section description-->
        <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
            matter of hours to help you.</p>
                <form id="support-ticket"  @submit.prevent="processForm">

                    <!--Grid row-->
                    <div class="row">

                        <!--Grid column-->
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                 <label for="name" class="">Your name</label>
                                <input type="text"  v-validate="'required'" name="name" v-model="model.name" class="form-control" v-bind:class="{'form-control': true, 'error': errors.has('name') }">
                                <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
                            </div>
                        </div>
                        <!--Grid column-->

                        <!--Grid column-->
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                <label for="email" class="">Your email</label>
                                <input type="text"  v-validate="'required|email'" name="email" v-model="model.email" class="form-control" v-bind:class="{'form-control': true, 'error': errors.has('email') }">
                                <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                            </div>
                        </div>
                        <!--Grid column-->

                    </div>
                    <!--Grid row-->

                    <!--Grid row-->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="md-form mb-0">
                                <label for="subject" class="">Issue</label>
                                <input type="text"  v-validate="'required'" name="subject" v-model="model.subject" class="form-control" v-bind:class="{'form-control': true, 'error': errors.has('subject') }">
                                <span v-show="errors.has('subject')" class="text-danger">{{ errors.first('subject') }}</span>
                            </div>
                        </div>
                    </div>
                    <!--Grid row-->

                    <!--Grid row-->
                    <div class="row">

                        <!--Grid column-->
                        <div class="col-md-12">

                            <div class="md-form">
                                <label for="message">Describe the problem</label>
                                <textarea type="text"  v-validate="'required'" name="description" v-model="model.description" rows="2" class="form-control md-textarea" v-bind:class="{'form-control': true, 'error': errors.has('description') }"></textarea>
                                <span v-show="errors.has('message')" class="text-danger">{{ errors.first('description') }}</span>
                            </div>

                        </div>
                    </div>
                    <!--Grid row-->
                    <div class="row">
                        <!--Grid column-->
                        <div class="col-md-12">
                            <div class="custom-file">                                
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
                    <button type="submit" class="btn btn-primary" :disabled="errors.any()">Submit</button>
                </form>
                <div class="status" v-html="status"></div>
    </section>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import { client } from "../api";
import VueBase64FileUpload from "vue-base64-file-upload";
export default {
  name: "complaint",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      customImageMaxSize: 3, // megabytes
      model: {
        name: "Welcome to Your Vue.js App",
        subject: "",
        email: "",
        description: ""
      },
      status: "",
      file: ""
    };
  },
  components: {
    VueBase64FileUpload
  },
  methods: {
    onFile(file) {
      // file object
      this.file = file;
    },
    onLoad(dataUri) {
      console.log(dataUri); // data-uri string
      this.base = dataUri;
    },
    onSizeExceeded(size) {
      alert(
        `Image ${size}Mb size exceeds limits of ${this.customImageMaxSize}Mb!`
      );
    },
    processForm() {
      this.$validator.validate().then(result => {
        if (result) {
          if (this.base) {
            client
              .createFile({
                title: this.file.name,
                name: this.file.name,
                data: this.base // Base64 file content
              })
              .then(res => {
                this.model.upload = res.data.id;
                client.createItem("issues", this.model);
              })
              .then(res => {
                this.model = {};
                this.status = `Your message has been sent`;
              })
              .catch(err => {
                console.log(err);
                this.status = `Could't process your request, please try again`;
              });
          } else {
            client
              .createItem("issues", this.model)
              .then(res => {
                this.model = {};
                this.status = `Your message has been sent`;
              })
              .catch(err => {
                console.log(err);
                this.status = `Could't process your request, please try again`;
              });
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control.error {
  border-color: #e84444;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(232, 68, 68, 0.6);
}
</style>