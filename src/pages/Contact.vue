<template>
    <!--Section: Contact v.2-->
    <section class="page-wrapper innerpage-section-padding">
      	<div id="contact-page">
          <div class="container-fluid text-center">
              <div class="innerpage-heading">
                  <h3>Contact us</h3>
                  <hr class="page-heading-line">
                  <p>Do you have any questions? Please do not hesitate to contact us directly.</p>
              </div><!-- end innerpage-heading -->
              <div class="no-back">
             <div class="row">
                  <!--Grid column-->
                  <div class="col-md-6 offset-lg-2 col-lg-4 my-3">                    
                          <vue-form-generator @validated="onValidated" :model="model" :schema="contactSchema" :options="formOptions" :isNewModel="true" ref="vfg"></vue-form-generator>
                          <!--Grid row-->
                          <div class="text-center text-md-left">
                            <button @click="processForm" :disabled="!valid" class="btn btn-orange">Send</button>
                        </div>
                      <div class="status form-group" v-html="status"></div>
                  </div>                 
                  <div class="col-md-6 col-lg-4 my-3 text-left">
                      <div class="d-flex flex-row border h-10 rounded mb-2">
                        <div class="p-0 w-20">
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABxVBMVEUAAAATFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUyqUt7AAAAlnRSTlMAAQIDBAUGBwgJCgsMDQ4QERITFBgaHB0fICEjJSYnKSorLS8xMjM0NTY3ODo7PD0+QEFCQ0RFSUpLTE1OUFFSVFVXWFlbXWFiY2ZnaGtsbW9wcXV3eHl7foKDhYaIi4yOj5GSlJWXmpudnqCio6Wmra+ytLW3ubzAwcPFyMrMz9HT19na3uDi5Obo6evt7/Hz9ff5+/2NVB1dAAADS0lEQVQYGc3B+1dUVRgG4PecOTDgSNog1QSZQnctSDIc7UKak2ZqlBeiMsuKCrsoQubEZZA7ijMD8/69/WCrxfnOZe99zp61eh5o8wpvXZy4d//h1urc9NcfvrwH1nWeKVOo/njYgz3eewsMN94NO1o/rjNauRcWHKsx3lQeKXXOUG3EQRpDDeoo70ZizvfUVDuIhLw71DeIRLKzNFFCAt4szQzDmDtNUwMwNU5zBZh5lwlsZGGii4lMwoBTYTJD0HeKETYmRkofnPniT0aoZaGrfZth5k/sxr/cwug2w1yHrksMcf8gfFo/ZZgnoCfbYNCIAyk/z6AvoecjBjReQAh3gkFt0LJKabuAcNcZUISOpxnQiwjO75RmoOMzSmcRyVui1AENCxRmHETroXQYallKzyLOBIWvoLafwl3E2kdhHWrHKfQjXoVCBkpXKGQRr0RhD5T+oN8iFAoUeqA0Q78foNBO4SUoLdPvPBQcCgNQqtHvNFQoFKFUp18JKhSKUFql30UouBTehNI8/X6CQo7Cq1C6Q781KDxH4XkojVHIId45CnkonaRQRLwVCi1Q6qNQQaxuCo+g1k6pD3GmKNyAhhUKyy6ivUZpEBrOUxpDpF2blHLQsJcBxxAhc4/SLWiZZkA/Qrm3GdAHLfsZNIwQ2b8YsAhNswwab4V04AGDBqDpRYaonnCxU/4Xhlh3oGuRYaqXChk8lntjkqGOQ1s/oyzevDZ2Y6rKCI9caHPWmMxpGCgyka0WGHA3mcQFGDnFBBptMOLVaW4Uhj6huQ4YyjZo6jsYu0xTeRjL0dBvSOAazTyFBPbSyBQS+ZkmepDIPhr4Gwndor4+JFSgtgUkdpe6XkdiB6hp1UFyc9QzhBReoZZNFyk4S9RxEqkcoYa6h1ScDaqdQ0rvUKmRRUqZKlWuILUSVXJIrWWL8b6BBRcY70lY0NZgnAlYMco4XbCigzFuw5JvGa0bluQZqQxrbjJKL6zpYoQKLJpkuEOwqJuhVhzYVGaYt2FVL0M8dGFXhUHDsOwQA2oeLHOWKZ2FdUcpNFphnfuAfp+jCd6n3y40QWaTO11FUxzhDksumuMy/7PWiWYZrPKxySyaxzv663p97uoz+B/6BzrJIh9SyTfWAAAAAElFTkSuQmCC" class="img-fluid border-0" />
                        </div>
                        <div class="pl-3 pt-2 pr-2 pb-2 w-80 border-left">
                            <h4 class="py-2"> 15a, Thomas Salako Street, <br>Ogba, Lagos </h4>
                        </div>
                      </div>
                      <div class="d-flex flex-row border h-10 rounded mb-2">
                        <div class="p-0 w-20">
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABX1BMVEUAAAATFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRXyghicAAAAdHRSTlMAAQIDBQYICQoLDA0OERITFxgZGhscHR8gISImKCkuLzAzNTg5Ozw9P0BBREVHS09XWFtcXV9hYmdrbW9wdXd4fICDhYuMj5GUlZeYmp6go6WmqKqrr7Cyt77Aw8XIzM7P1dfe4OLk5ujp6+3v8fP19/n7/UGqoFgAAALhSURBVBgZtcGLO1NhHAfw786ZsZqltIjcGmohKtdaMRJZLoWkiKJmuc32/f+fero8sfO+5z3b+/P5oFxt6+Dk/Kt+XBq3I5PjH89wOeKzJf7XgsswzAu+hCBvhmUGIC7Ncj8cCEvSawSyogV6FSMQtUGVGUjqoVocctw81d5CzhPqNEOKe0KdLUgZpF4SMkJ56n13IKKZfkYhYop+SnUQEDqhrywExGnQDnvdNDisgbUXNMnC2iqNWmFrm0afYOuAZhFYKtLsKiwd0mgHtnZp1AhbKzR5AGtpGvTDXi/99ULANfo5ug0Rp9T7HIWMOWrNOxBylzqPISZMjfsQ9I5KHZDURZU+iHLO6LUOYRl6pSAsQa8hSNujxzakPaJXA4RdodcapH2gVyeEJemVcyDLKdBrHMKeUyEGWTEqrELYEhXaIStBhX0HstapkIGsm1Rpg6xlKhyEISpGlQXImqDKQ4hyv1HlFkTdoUo+AlEvqbIZgiR3nypZiGqi0jREjVHpKURtUGkYkmpyVHoKSTdKVJqG0dUIgkpRLRuCr8Yd8lMrAkpTbTMCHw/425saBLNItfwtaPXzr8N2BOJ8pMZDaNzjf9k6BBH+So2FMFRu87ziqIMAogfUyLfBK3rEi74nEUD9MXUyDso4n+mx1QyzhlPq7LfjotdUeRuHUaJArdUYznlMjZkITJrOqDfu4J8UtYojDgyazqiX68QfHfTzYyAEf4lT+lhrwC99NPjSAn8NR/SzPZRap9kz+KvPUUA//EW/0t4rGIQ/0to8TJxF2pqEWZqWBhFAqkQrrQjieo42ahFIzQarl0NQY6xaBoE17bNKHQjOfcmqlFxUou0bqzCLyrgTrFwclYots0LDqEJinZWYQXUSSwwsjarFnhcYRCEJG07yA43eR2HryqM9+sn3QEQic0aN4ycupDhd76iQH3QhKnx37pTnnUw1h3AJrvWmV3YPiwfbqy+64yGU+wlSA9K9+Y5JVAAAAABJRU5ErkJggg==" class="img-fluid border-0" />

                        </div>
                        <div class="pl-3 pt-2 pr-2 pb-2 w-80 border-left">
                            <h4 class="py-3">
                              +234 814 975 0282
                            </h4>
                        </div>
                      </div>
                      <div class="d-flex flex-row border h-10 rounded mb-2">
                        <div class="p-0 w-20">
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABrVBMVEUAAAATFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRWQq865AAAAjnRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRweHyAhIyQlJicpKissLzI1Njg5Oj0+P0BDRUdKS01QUVVWV1hZW15fYmNmZ2hpa2xtcHF1eHt8foKDhYiJjI6RkpSXmJqboKKjpaqrr7C0tbe5ury+wcPFx8jKzM7P0dPX2tze4OLk6Onr7e/x8/X3+fv9rE4E/QAAAuFJREFUGBntwftDU2UAx+HPGdsCtCE4xKCilmUFXbRMu0hlmVSUSmRpmpBm2UUm1MpKLdgAd/n+zQ0a78vYznYGe88v7Xno6Oj430mdS2fVdtn50wfYNJCWM1/H2DC0JofuJiiLLsmpe3FgWo5dhXhJrg1xRM59wAU5N88vci5LVs4tk5NzC9yScxeYlHMvMSznemFRjn0DPC3HRiiblVNfsS6ek0Mr3Wx4XA4douKEnHkX44wcOc8Wn8iJc1Q5KQfeY5tDK2qztcPU6P5ObfVDL0YC40RJbVN6EyPBcj/GvgW1SWY/Rv8yyiUxvDNqi489jGROSIUXsIb/0q7dexRrvCChss8jGJEZ7dIXXRjeeZWhdb8PYR3Oahdyz2L1L2gd+s/7HkZ8Tjt2LY7hTZS0AVVkklhH8tqRwitY/bdVgYxTHsaen7QDt/ZivVXSJmQtDmCdVMveweqbl4W2KE14GPt/U0vuDGK9UdIWqEp6H4Y3pRZ8GsF4+GdVQdVKr2M9dl8B/TOK9VpR1dB2P+7B6PpSgVyKYvR+r+1QjcKrWM+tqqnVMayjedVAddzowej+Vk3c6MZ46LrqQPWsvYh1vKgGisexnl9VPai+qzGMvkX5WuzDiF5WfchH9hkMb0o+pjyMp5bkA/maiWCkllXH0pMYkWn5Qv7uDmPEZlVjNobxyJ/yhxo57WGMr6jKyjiGd0qNoIbSCYzYjLb4LIaxd14NocYKR7EGr6viWhLr5bwaQ81ciWL1vX0zm705kcCKXlEzqKn7IzQw8reaQgFMevjwJhUACiIzSF0HMgoCBXM2To34WQWDAip82EOVno8KCggFd2nUo8IbvazgUCtWLx4bPXjwiWMX19QKFAIUAhQCFAIUAhQCFAIUAhQCFAIUAhQCHsi5B2Tk3K9My7lpUnIuBbflWBoYyMup/ABlqYIcKqTYkPxDztxJsmlsrigHinNjVOmKtV0XHR0dHW78C27E2iYOFzKjAAAAAElFTkSuQmCC" class="img-fluid border-0" />
                        </div>
                        <div class="pl-3 pt-2 pr-2 pb-2 w-80 border-left">
                            <h4 class="py-3">
                              butterbakescakes@gmail.com
                            </h4>
                        </div>
                      </div>
                       <div class="d-flex flex-row border h-10 rounded mb-2">
                        <div class="p-0 w-20">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAACKFBMVEUAAAATFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUTFRUXK7GiAAAAt3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT9AQUNERUZHSUpLTE1PUFFSVFVWWFlbXF1eX2FiY2RmZ2lrbG1vcHFzdHV3eHl7fH5/gIKDhYaIiY6PkZKUlZeYmpudnqCipaaoqqutr7CytLW3ubq8vsDBw8XHyMrMzs/R09XX2drc3uDi5Obo6evt7/Hz9ff5+/3BLlOeAAAGl0lEQVQYGa3BiUMU5x0G4PebXSSiGA4PgkaRNcihXKLgGY1GozY2NTZN45G0UZOCjbG1Voq1mibG6C6HIhgpnsi9XAv7/nvFnd/s7szOzCo7zwMnWl7FvhPfXv0x1NM/MDIZidLW7PT4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" class="img-fluid border-0" />
                        </div>
                        <div class="pl-3 pt-2 pr-2 pb-2 w-80 border-left">
                            <h4 class="py-3">
                             <a href="//instagram.com/butterbakesng">@butterbakesng</a>
                            </h4>
                        </div>
                      </div>
                  </div>
                </div>
    </div>
          </div><!-- end container-fluid -->
      </div>
    </section>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css"
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
        name: null,
        subject: null,
        email: null,
        message: null
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
                fieldIsRequired: "The message cannot be empty",
            }),
            styleClasses: "",
            onChanged: function(model, errors, field) {
                this.validate();
            }
          }
        ]
      },
      status: "",
      valid: false,
    };
  },
  components: {
    "vue-form-generator": VueFormGenerator.component,
  },
  methods: {
    processForm: function() {
        if (this.$refs.vfg.validate()) {
          client
            .createItem("enquiries", this.model)
            .then(res => {
              this.model = {};
              this.valid = false;
              this.status = `Your message has been sent`;
              this.$router.push('/success');
            })
            .catch(err => {
              this.status = `Could't process your request, please try again`;
            });
        }
    },
    onValidated(isValid, errors) {
      if (isValid) {
        this.valid = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.form-control.error {
  border-color: #e84444;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(232, 68, 68, 0.6);
}
#contact-page .vue-form-generator .form-control {
  padding: 20px 12px !important;
}
.h-10 {
    max-height: 80px;
}
.w-20 {
  width: 80px;
}
</style>