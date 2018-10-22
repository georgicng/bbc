<template>
  <section class="page-wrapper innerpage-section-padding">
     <div class="container-fluid">
    <form-wizard @on-complete="onComplete" @on-change="onChange" title="Checkout" subtitle="Complete your order" color="gray" error-color="#a94442">
          <tab-content title="Shipping Address" icon="ti-user" :before-change="validateFirstTab">
              <vue-form-generator :model="model" :schema="contactSchema" :options="formOptions" ref="firstTabForm">
              </vue-form-generator>
          </tab-content>
          <tab-content title="Shipping and Payment Method" icon="ti-settings" :before-change="validateSecondTab">
            <div class="row">
              <div class="col-md-6">
                <h1>Shipping Method</h1>
                <div class="panel-group" id="accordion">
                  <div class="panel panel-default" v-for="(value, key, index) in shipping_options" :key="key">
                    <div class="panel-heading" id="headingOne">
                      <h4 class="panel-title">
                        <a  data-toggle="collapse" data-parent="#accordion" :href="'#collapse'+index">
                          {{key}}
                        </a>
                      </h4>
                    </div>
                    <div :id="'collapse'+index" class="panel-collapse collapse in">
                      <div class="panel-body">
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
                          <div v-for="item in value"  class="custom-control custom-radio" :key="item.id">
                            <input type="radio" v-model="shipping" :id="'customRadio'+item.id"  :value="item.id" class="custom-control-input">
                            <label class="custom-control-label" :for="'customRadio'+item.id">
                              <h3>{{ item.title }} </h3> @ {{item.cost}}
                            </label>
                            </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <h1>Payment Method</h1>
                <div v-for="item in payment_options"  class="custom-control custom-radio panel" :key="item.id">
                  <input type="radio" v-model="payment" :id="'customRadio'+item.id" name="paymentRadio" :value="item.id" class="custom-control-input">
                  <label class="custom-control-label panel-body" :for="'customRadio'+item.id">                    
                    <h3>{{ item.name }}</h3>
                    <p>{{item.description}}</p>
                  </label>
                </div>
              </div>
            </div>
          </tab-content>
          <tab-content title="Confirm Order" icon="ti-settings" :before-change="validateThirdTab">

            <div class="innerpage-heading text-center">
                <h3>Confirm Order</h3>
                <p>We need to register your order</p>
            </div>
            <div class="order-list">
              <order-items :orders="orders" />
              <order-totals />              
            </div>
          
          </tab-content>
          <tab-content title="Complete Order" icon="ti-check">
            <div class="innerpage-heading text-center">
                <h3>Complete Order</h3>
                <p>We need to confirm your Order</p>
            </div>
            <template v-if="paymentProvider == 'Paystack'">
              <div class="payment-messag">Please click on the button below to make payment and complete the transaction</div>
                <paystack v-bind="paymentProviderOption"
                >
                  <i class="fas fa-money-bill-alt"></i>
                  Make Payment
                </paystack>
            </template>
             <template v-if="paymentProvider  == 'Bank Transfer'">
               <div class="payment-messag">Find our bank transfer details below and <strong> click on the complete button to confirm the order</strong></div>
                <div class="bank-message" v-html="getKey('bank_details')"></div>
            </template>
          </tab-content>
      </form-wizard>
      </div>
  </section>
</template>

<script>
import VueFormGenerator from "vue-form-generator"
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import OrderItems from "../components/productos/OrderItems";
import OrderTotals from "../components/productos/OrderTotals";
import paystack from 'vue-paystack';
import {
  ADD_SHIPPING_ADDRESS,
  ADD_SHIPPING_METHOD,
  ADD_PAYMENT_METHOD,
  CONFIRM_ORDER,
  COMPLETE_ORDER
} from "../store/mutation-types";
export default {
  data() {
    return {
      shipping: "",
      payment: "",
      paymentProvider: false,
      paymentProviderOption: {},
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
            placeholder: "First name",
            model: "first_name",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: ""
          },
          {
            type: "input",
            inputType: "text",
            placeholder: "Last name",
            model: "last_name",
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
            type: "input",
            inputType: "text",
            placeholder: "Phone",
            model: "phone",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: ""
          },
          {
            type: "input",
            inputType: "text",
            placeholder: "Address",
            model: "address",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: ""
          },
          {
            type: "input",
            inputType: "text",
            placeholder: "Nearest Landmark",
            model: "landmark",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: ""
          },
          {
            type: "select",
            label: "City",
            model: "city",
            required: true,
            validator: VueFormGenerator.validators.required,
            values: function () {
              return this.$store.getters.shippingCities
            },
            default: "Allen",
            styleClasses: ""
          },
          {
            type: "input",
            inputType: "text",
            placeholder: "Your City",
            model: "alt_city",
            validator: VueFormGenerator.validators.string,
            styleClasses: "",
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
    },
    total() {
      return this.$store.getters.orderTotal;
    },
    email() {
      return this.model.email;
    },
    paystack() {
      return this.$store.getters.meta('paystack');
    },
    reference() {
      return this.$store.getters.orderReference;
    }
  },
  methods: {
    validateFirstTab: function() {
      this.$store.commit(ADD_SHIPPING_ADDRESS, this.model);
      return this.$refs.firstTabForm.validate();
    },
    validateSecondTab: function() {
      this.$store.commit(ADD_SHIPPING_METHOD, this.shipping);
      this.$store.commit(ADD_PAYMENT_METHOD, this.payment);
      return true;
    },
    validateThirdTab: function() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('confirmOrder', this.$store.state.order)
          .then(res => {

            resolve(true);
          })
          .catch(err => {
            reject(false);
          });
      });      
    },
    onChange: function(prev, next) {
      if (next == 3) {
        this.paymentProvider = this.$store.getters.paymentName(this.payment);
        if (this.paymentProvider == 'Paystack') {
          this.$set(this.paymentProviderOption, 'amount', parseFloat(this.total) * 100);
          this.$set(this.paymentProviderOption, 'email', this.email);
          this.$set(this.paymentProviderOption, 'paystackkey', this.getKey('test_public_key'));
          this.$set(this.paymentProviderOption, 'reference', this.reference);
          this.$set(this.paymentProviderOption, 'callback', this.paystackCallback);
          this.$set(this.paymentProviderOption, 'close', this.paystackClose);
          this.$set(this.paymentProviderOption, 'embed', false);
        }
      }
    },
    getKey(key) {
      return this.$store.getters.orderMeta(key);
    },
    paystackCallback: function(response){
      const payload = {
        order: this.$store.getters.orderID,
        reference: response
      };
        this.$store.dispatch('completeOrder', payload)
          .then(res => {
            console.log('goto success');
            this.$router.push('/success');
          })
          .catch(err => {
            console.log('try again');
          });
    },
    paystackClose: function(){
      console.log('close');
    },    
    onComplete: function() {
      const payload = {
        order: this.$store.getters.orderID,
        status: 'Pending'
      };
      this.$store.dispatch('completeOrder', payload)
          .then(res => {
            console.log('goto success');
            this.$router.push('/success');
          })
          .catch(err => {
            console.log('try again');
          });
    },
  },
  components: {
    "vue-form-generator": VueFormGenerator.component,
    FormWizard,
    TabContent,
    orderItems: OrderItems,
    orderTotals: OrderTotals,
    paystack
  }
};
</script>

<style scoped>

</style>