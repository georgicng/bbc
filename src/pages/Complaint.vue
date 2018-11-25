<template>
      <!--Section: Contact v.2-->
    <section class="page-wrapper innerpage-section-padding">
      <div id="complaint-page">
            <div class="container-fluid text-center">
                <div class="innerpage-heading">
                    <h3>Lodge a Complaint</h3>
                    <hr class="page-heading-line">
                    <p>Do you have any complaint about your order? Please do let us know, so we can help.</p>
                </div><!-- end innerpage-heading -->
                <div class="no-back">
             <div class="row">
                 <div class="col-sm-12 offset-lg-2 col-lg-8">
                    <!--Grid row-->
                    <vue-form-generator :model="model" :schema="contactSchema" :options="formOptions" ref="form" :isNewModel="true">
                    </vue-form-generator>
                    <!--Grid row-->
                                                   
                                <vue-base64-file-upload 
                                    class="v1 form-group"
                                    accept="image/png,image/jpeg"
                                    image-class="v1-image"
                                    input-class="v1-input form-control"
                                    :max-size="customImageMaxSize"
                                    :disable-preview="true"
                                    @size-exceeded="onSizeExceeded"
                                    @file="onFile"
                                    @load="onLoad"
                                    ref="file" />
                        
                    <button @click="processForm" class="btn btn-orange">Submit</button>
                <div class="status form-group" v-html="status"></div>
                 </div>
                </div>
    </div>
            </div><!-- end container-fluid -->
        </div>
                
    </section>
</template>

<script>

import { client } from "../api";
import VueBase64FileUpload from "vue-base64-file-upload";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css"
import { PAGE_TITLE, PAGE_ICON, PAGE_COVER } from "../store/mutation-types";
export default {
  name: "complaint",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      customImageMaxSize: 3, // megabytes
      model: {
        name: null,
        subject: null,
        email: null,
        description: null
      },
      formOptions: {
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
            validator: VueFormGenerator.validators.string.locale({
                fieldIsRequired: "Your name is required!",
            }),
            styleClasses: "",
            onChanged: function(model, errors, field) {
                this.validate();
            }
          },
          {
            type: "input",
            inputType: "text",
            placeholder: "Subject",
            model: "subject",
            required: true,
            validator: VueFormGenerator.validators.string.locale({
                fieldIsRequired: "The subject is required!",
            }),
            styleClasses: "",
            onChanged: function(model, errors, field) {
                this.validate();
            }
          },
          {
            type: "input",
            inputType: "text",
            placeholder: "Email",
            model: "email",
            required: true,
            validator: VueFormGenerator.validators.email.locale({
                fieldIsRequired: "Your email is required!",
                invalidEmail: "Please enter a valid e-mail address!",
            }),
            styleClasses: "",
            onChanged: function(model, errors, field) {
                this.validate();
            }
          },
          {
            type: "textArea",
            placeholder: "Description",
            model: "description",
            required: true,
            validator: VueFormGenerator.validators.string.locale({
                fieldIsRequired: "Please describe the issue",
            }),
            styleClasses: "",
            onChanged: function(model, errors, field) {
                this.validate();
            }
          }
        ]
      },
      status: "",
      file: null,
      base: null
    };
  },
  mounted () {      
    this.$store.commit(PAGE_ICON, 'fas fa-users');
    this.$store.commit(PAGE_TITLE, 'Support');
    this.$store.commit(PAGE_COVER, true);
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
        if (this.base && this.file) {
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
                this.file = null;
                this.status = `Your message has been sent`;
                this.$router.push('/success');
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
                this.$router.push('/success');
              })
              .catch(err => {
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