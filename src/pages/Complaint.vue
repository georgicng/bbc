<template>
      <!--Section: Contact v.2-->
    <section class="page-wrapper innerpage-section-padding">
      <div id="complaint-page">
            <div class="container-fluid text-center">
                <div class="innerpage-heading">
                    <h3>Lodge a Complaint</h3>
                    <p>Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
            matter of hours to help you.</p>
                </div><!-- end innerpage-heading -->
                <form id="support-ticket"  @submit.prevent="processForm">
                    <!--Grid row-->
                    <vue-form-generator :model="model" :schema="contactSchema" :options="formOptions" ref="form">
                    </vue-form-generator>
                    <!--Grid row-->
                                                   
                                <vue-base64-file-upload 
                                    class="v1 form-group"
                                    accept="image/png,image/jpeg"
                                    image-class="v1-image"
                                    input-class="v1-input form-control"
                                    :max-size="customImageMaxSize"
                                    @size-exceeded="onSizeExceeded"
                                    @file="onFile"
                                    @load="onLoad" />
                        
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <div class="status form-group" v-html="status"></div>
                
            </div><!-- end container-fluid -->
        </div>
                
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