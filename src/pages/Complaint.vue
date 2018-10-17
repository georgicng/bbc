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
            <vue-form-generator :model="model" :schema="contactSchema" :options="formOptions" ref="form">
              </vue-form-generator>
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
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <div class="status" v-html="status"></div>
    </section>
</template>

<script>

import { client } from "../api";
import VueBase64FileUpload from "vue-base64-file-upload";
import VueFormGenerator from "vue-form-generator";
export default {
  name: "complaint",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      customImageMaxSize: 3, // megabytes
      model: {
        name: "",
        subject: "",
        email: "",
        description: ""
      },
      formOptions: {
        validationErrorClass: "has-error",
        validationSuccessClass: "has-success",
        validateAfterChanged: true,
        validateAfterLoad: true,
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
      status: "",
      file: ""
    };
  },
  components: {
    VueBase64FileUpload,
    "vue-form-generator": VueFormGenerator.component,
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
      if (this.$refs.form.validate()){
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