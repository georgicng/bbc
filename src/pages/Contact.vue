<template>
    <!--Section: Contact v.2-->
    <section class="page-wrapper innerpage-section-padding">
      	<div id="contact-page">
          <div class="container-fluid text-center">
              <div class="innerpage-heading">
                  <h3 class="page-heading">Contact us</h3>
                  <hr class="page-heading-line">
                  <p>Do you have any questions? Please do not hesitate to contact us directly.</p>
              </div><!-- end innerpage-heading -->
              <div class="no-back">
             <div class="row">
                  <!--Grid column-->
                  <div class="col-md-6 offset-lg-2 col-lg-4 my-3">                    
                    <form id="contact-form" @submit.prevent="processForm">
                          <vue-form-generator :model="model" :schema="contactSchema" :options="formOptions" ref="form"></vue-form-generator>
                          <!--Grid row-->
                          <div class="text-center text-md-left">
                            <button type="submit" class="btn btn-orange">Send</button>
                        </div>
                      </form>
                      <div class="status form-group" v-html="status"></div>
                  </div>                 
                  <div class="col-md-6 col-lg-4 my-3">
                      <ul class="list-unstyled">
                          <li><i class="fa fa-map-marker fa-2x"></i>
                              <p>Order and pick up point: cutlery restaurant. Odessey
                                      place . Plot 4 kuboye road. Opposite Ebeano supermarket. Oniru. Lekki.</p>
                          </li>
                          <li><i class="fa fa-phone fa-2x"></i>
                              <p>+234 814 975 0282</p>
                          </li>
                          <li><i class="fa fa-envelope fa-2x"></i>
                              <p><a href="mailto:butterbakescakes@gmail.com">butterbakescakes@gmail.com</a></p>
                          </li>
                          <li><i class="fab fa-instagram fa-2x"></i>
                              <p><a href="//instagram.com/butterbakesng">@butterbakesng</a></p>
                          </li>
                      </ul>
                  </div>
                </div>
    </div>
          </div><!-- end container-fluid -->
      </div>
    </section>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import { PAGE_TITLE, PAGE_ICON, PAGE_COVER } from "../store/mutation-types";
import { client } from "../api";
export default {
  name: "contact",
  mounted () {
    this.$store.commit(PAGE_TITLE, 'Contact');
    this.$store.commit(PAGE_ICON, 'fas fa-phone');
    this.$store.commit(PAGE_COVER, true);
  },
  data() {
    return {
      model: {
        name: "",
        subject: "",
        email: "",
        message: ""
      },
      formOptions: {
        validationErrorClass: "has-error",
        validationSuccessClass: "has-success",
        validateAfterChanged: true
      },
      contactSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            placeholder: "Name",
            model: "name",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: ""
          },
          {
            type: "input",
            inputType: "text",
            placeholder: "Subject",
            model: "subject",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: ""
          },
          {
            type: "input",
            inputType: "text",
            placeholder: "Email",
            model: "email",
            required: true,
            validator: VueFormGenerator.validators.email,
            styleClasses: ""
          },
          {
            type: "textArea",
            placeholder: "Description",
            model: "description",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: ""
          }
        ]
      },
      status: ""
    };
  },
  components: {
    "vue-form-generator": VueFormGenerator.component,
  },
  methods: {
    processForm: function() {
        if (this.$refs.form.validate()) {
          client
            .createItem("enquiries", this.model)
            .then(res => {
              this.model = {};
              this.status = `Your message has been sent`;
            })
            .catch(err => {
              this.status = `Could't process your request, please try again`;
            });
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control.error {
  border-color: #e84444;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(232, 68, 68, 0.6);
}
</style>