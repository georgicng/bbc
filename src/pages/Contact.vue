<template>
    <!--Section: Contact v.2-->
    <section class="section">

        <!--Section heading-->
        <h2 class="h1-responsive font-weight-bold text-center my-5">Contact us</h2>
        <!--Section description-->
        <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
            matter of hours to help you.</p>

        <div class="row">

            <!--Grid column-->
            <div class="col-lg-6 mb-4">
                <form id="contact-form" @submit.prevent="processForm">

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
                                <label for="subject" class="">Subject</label>
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
                                <label for="message">Your message</label>
                                <textarea type="text"  v-validate="'required'" name="message" v-model="model.message" rows="2" class="form-control md-textarea" v-bind:class="{'form-control': true, 'error': errors.has('message') }"></textarea>
                                <span v-show="errors.has('message')" class="text-danger">{{ errors.first('message') }}</span>
                            </div>

                        </div>
                    </div>
                    <!--Grid row-->
                    <div class="text-center text-md-left">
                    <button type="submit" class="btn" :disabled="errors.any()">Send</button>
                </div>

                </form>

                
                <div class="status" v-html="status"></div>
            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-lg-6 mb-4">
                <ul class="list-unstyled mb-0">
                    <li><i class="fa fa-map-marker fa-2x"></i>
                        <p>Order and pick up point: cutlery restaurant. Odessey
                                place . Plot 4 kuboye road. Opposite Ebeano supermarket. Oniru. Lekki.</p>
                    </li>

                    <li><i class="fa fa-phone mt-4 fa-2x"></i>
                        <p>+234 814 975 0282</p>
                    </li>

                    <li><i class="fa fa-envelope mt-4 fa-2x"></i>
                        <p><a href="mailto:butterbakescakes@gmail.com">butterbakescakes@gmail.com</a></p>
                    </li>
                    <li><i class="fa fa-instagram mt-4 fa-2x"></i>
                        <p><a href="//instagram.com/butterbakesng">@butterbakesng</a></p>
                    </li>
                </ul>
            </div>
            <!--Grid column-->

        </div>

    </section>
</template>

<script>
import VeeValidate from "vee-validate";
import { client } from "../api";
export default {
  name: "contact",
  data() {
    return {
        model : {
            name: "Welcome to Your Vue.js App",
            subject: "",
            email: "",
            message: "",
        },
        status: ""
    }
  },
  methods: {
    processForm: function() {
      this.$validator.validate().then(result => {
        if (result) {
          console.log(this.model);
          client
            .createItem("enquiries", this.model)
            .then(res => {
              this.model = {}
              this.status = `Your message has been sent`;
            })
            .catch(err => {
              console.log(err);
              this.status = `Could't process your request, please try again`;
            });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .form-control.error {
      border-color: #E84444;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(232,68,68,.6);
    }
</style>