<template>
  <section class="section">
    <form-wizard @on-complete="onComplete" title="Checkout" subtitle="Complete your order" color="gray" error-color="#a94442">
          <tab-content title="Shipping Address" icon="ti-user" :before-change="validateFirstTab">
              <vue-form-generator :model="model" :schema="contactSchema" :options="formOptions" ref="firstTabForm">
              </vue-form-generator>
          </tab-content>
          <tab-content title="Shipping and Payment Method" icon="ti-settings" :before-change="validateSecondTab">
            <div class="row">
              <div class="col-lg-6">
                <h1>Shipping Method</h1>
                <div id="accordion">
                  <div class="card" v-for="(value, key, index) in shipping_options" :key="key">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" :data-target="'#collapse'+index" aria-expanded="true" aria-controls="collapseOne">
                          {{key}}
                        </button>
                      </h5>
                    </div>
                    <div :id="'collapse'+index" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="card-body">
                         <template v-if="key == 'Store Pickup'">
                          <div v-for="item in value"  class="custom-control custom-radio" :key="item.id">
                            <input type="radio" v-model="shipping" :id="'customRadio'+item.id"  :value="item.id" class="custom-control-input">
                            <label class="custom-control-label" :for="'customRadio'+item.id">
                              <h3>{{ item.title }} </h3> @ {{item.cost}}
                            </label>
                          </div>
                        </template>
                         <template v-if="key == 'City Shipping'">                         
                            <template v-for="item in value" v-if="model.city == item.title">
                              <div class="custom-control custom-radio" :key="item.id">
                              <input type="radio" v-model="shipping" :id="'customRadio'+item.id"  :value="item.id" class="custom-control-input">
                              <label class="custom-control-label" :for="'customRadio'+item.id">
                                <h3>{{ item.title }} </h3> @ {{item.cost}}
                              </label>
                              </div>
                            </template>
                        </template>
                        <template v-else>
                          <div class="form-group">
                          <label for="formGroupExampleInput">{{key}}</label>
                          <select name="shipping_method" class="myClass form-control" v-model="shipping">
                            <option>select shipping</option>
                                <option v-for="item in value" :value="item.id" :key="item.id">
                                {{ item.title }} - {{item.cost}}
                                </option>
                            </select>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <h1>Payment Method</h1>
                <div v-for="item in payment_options"  class="custom-control custom-radio" :key="item.id">
                  <input type="radio" v-model="payment" :id="'customRadio'+item.id" name="paymentRadio" :value="item.id" class="custom-control-input">
                  <label class="custom-control-label" :for="'customRadio'+item.id">                    
                    <h3>{{ item.name }}</h3>
                    <p>{{item.description}}</p>
                  </label>
                </div>
              </div>
            </div>
          </tab-content>
          <tab-content title="Confirm Order" icon="ti-settings" :before-change="validateThirdTab">
            <h1>Confirm Order</h1>
            <cart-items :orders="orders" />
            <cart-totals />
          
          </tab-content>
          <tab-content title="Complete Order" icon="ti-check">
          </tab-content>
      </form-wizard>
  </section>
</template>

<script>
import VueFormGenerator from "vue-form-generator"
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import CartItems from "../components/productos/CartItems";
import CartTotals from "../components/productos/CartTotals";
import {
  ADD_SHIPPING_ADDRESS,
  ADD_SHIPPING_METHOD,
  ADD_PAYMENT_METHOD
} from "../store/mutation-types";
export default {
  data() {
    return {
      shipping: "",
      paymment: "",
      model: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        landmark: "",
        city: "",
        alt_city: ""
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
            label: "First name",
            model: "first_name",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-6"
          },
          {
            type: "input",
            inputType: "text",
            label: "Last name",
            model: "last_name",
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
            type: "input",
            inputType: "text",
            label: "Phone",
            model: "phone",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-9"
          },
          {
            type: "input",
            inputType: "text",
            label: "Address",
            model: "address",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-3"
          },
          {
            type: "input",
            inputType: "text",
            label: "Nearest Landmark",
            model: "landmark",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-6"
          },
          {
            type: "select",
            label: "City",
            model: "city",
            required: true,
            validator: VueFormGenerator.validators.string,
            values: this.$store.getters.shippingCities,
            styleClasses: "col-xs-6"
          },
          {
            type: "input",
            inputType: "text",
            label: "Your City",
            model: "alt_city",
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-6",
            visible(model) {
              return model.city == "Other";
            }
          }
        ]
      }
    };
  },
  beforeCreate() {
    this.$store.dispatch("allShippingMethods");
    this.$store.dispatch("allPaymentMethods");
  },
  created() {
    if (this.$store.getters.shippingInfo) {
      this.model = this.$store.getters.shippingInfo;
    }
    if ((this.payment = this.$store.getters.paymentMethod)) {
      this.payment = this.$store.getters.paymentMethod;
    }
    if (this.$store.getters.shippingMethod) {
      this.shipping = this.$store.getters.shippingMethod;
    }
  },
  computed: {
    shipping_options() {
      return this.$store.getters.shippingList;
    },
    payment_options() {
      return this.$store.getters.paymentMethods;
    },
    orders() {
      return this.$store.getters.allItems;
    }
  },
  methods: {
    onComplete: function() {
      alert("Yay. Done!");
    },
    validateFirstTab: function() {
      this.$store.commit(ADD_SHIPPING_ADDRESS, this.model);
      return this.$refs.firstTabForm.validate();
    },
    validateSecondTab: function() {
      this.$store.commit(ADD_SHIPPING_METHOD, this.shipping);
      this.$store.commit(ADD_PAYMENT_METHOD, this.payment);
      return true;
    },
    validateThirdTab: function() {}
  },
  components: {
    "vue-form-generator": VueFormGenerator.component,
    FormWizard,
    TabContent,
    cartItems: CartItems,
    cartTotals: CartTotals
  }
};
</script>

<style scoped>
pre {
  overflow: auto;
}
pre .string {
  color: #885800;
}
pre .number {
  color: blue;
}
pre .boolean {
  color: magenta;
}
pre .null {
  color: red;
}
pre .key {
  color: green;
}
</style>