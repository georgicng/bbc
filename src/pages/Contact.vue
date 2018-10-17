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

                    <vue-form-generator :model="model" :schema="contactSchema" :options="formOptions" ref="form"></vue-form-generator>
                    <!--Grid row-->
                    <div class="text-center text-md-left">
                    <button type="submit" class="btn">Send</button>
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
import VueFormGenerator from "vue-form-generator";
import { client } from "../api";
export default {
  name: "contact",
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
            label: "Name",
            model: "name",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-6"
          },
          {
            type: "input",
            inputType: "text",
            label: "Subject",
            model: "subject",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-6"
          },
          {
            type: "input",
            inputType: "text",
            label: "Email",
            model: "email",
            required: true,
            validator: VueFormGenerator.validators.email,
            styleClasses: "col-xs-12"
          },
          {
            type: "textArea",
            label: "Description",
            model: "description",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-9"
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
          console.log(this.model);
          client
            .createItem("enquiries", this.model)
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