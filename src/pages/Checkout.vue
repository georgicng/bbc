<template>
  <section class="page-wrapper innerpage-section-padding">
     <div class="container-fluid">
       <div class="no-back">
             <div class="row">
                 <div class="col-sm-12 offset-lg-2 col-lg-8"> 
    <form-wizard @on-complete="onComplete" title="Checkout" subtitle="Complete your order" color="gray" error-color="#a94442">
          <tab-content title="Shipping Address" icon="ti-user" :before-change="validateFirstTab">
              <vue-form-generator :model="model" :schema="contactSchema" :options="formOptions" ref="firstTabForm">
              </vue-form-generator>
          </tab-content>
          <tab-content title="Shipping and Payment Method" icon="ti-truck" :before-change="validateSecondTab">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="card my-3">
                  <div class="card-header">
                    Delivery Method
                  </div>
                  <template v-for="(value, key) in shipping_options">
                  <div class="card-body"  :key="key" v-show=" key != 'City Shipping' || (key == 'City Shipping'  && model.city != 'Other')">
                      <h4 class="card-title">
                          {{key}}
                      </h4>
                         <template v-if="key == 'Deliver to me'">                         
                            <template v-for="item in value" v-if="model.city == item.title">
                              <div class="custom-control custom-radio" :key="item.id">
                              <input type="radio" v-model="shipping" :id="'customRadio'+item.id"  :value="item.id" class="custom-control-input">
                              <label class="custom-control-label" :for="'customRadio'+item.id">
                                <h4>{{ item.title }} <span class="badge">N{{item.cost}}</span></h4>
                              </label>
                              </div>
                            </template>                            
                            <div class="custom-control custom-checkbox" v-show="shippingName == 'Deliver to me'">
                              <input type="checkbox" name="express" id="express" v-model="express" class="custom-control-input">
                              <label class="custom-control-label" for="express"><h4>Express Delivery <span class="badge">N1000</span></h4></label>
                            </div>
                        </template>
                        <template v-else>
                          <div v-for="item in value"  class="custom-control custom-radio" :key="item.id">
                            <input type="radio" v-model="shipping" :id="'customRadio'+item.id"  :value="item.id" class="custom-control-input">
                            <label class="custom-control-label" :for="'customRadio'+item.id">
                              <h4>{{ item.title }} <span class="badge">N{{item.cost}}</span></h4>
                            </label>
                            </div>
                        </template>
                  </div>
                  </template>
                  <div class="card-body error" v-if="!shipping">Please select a delivery method</div>
                </div>
                <div class="card my-3">
                  <div class="card-header">
                    Delivery Day
                  </div>
                  <div class="card-body">
                    <div class="form-group mb-3">
                      <label for="delivery_date" class="font-weight-bold">Delivery Date</label>
                      <datepicker v-model="deliveryDate" :disabledDates="disabledDates" :disabled="express" name="delivery_date" id="delivery_date" input-class="form-control"></datepicker>
                      <div class="error" v-show="!deliveryDate || deliveryDate == ''">Please select a delivery date</div>
                    </div>
                    <div class="form-group mb-3">
                      <label  for="delivery_date" class="font-weight-bold">Delivery Time</label>
                      <select v-model="deliveryTime" name="delivery_date" id="delivery_date" class="form-control">
                        <option value="*">Select delivery time</option>
                        <option value="12-2">12 Noon - 2 PM</option>
                        <option v-show="shippingName != 'Deliver to pick up partner'" value="3-5">3 PM - 5 PM</option>
                      </select>
                      <div class="error" v-show="!deliveryTime || deliveryTime == '*'">Please select a delivery time</div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div class="col-md-6 mb-3">
                <div class="counter text-center my-3">
                  <i class="fa fa-code fa-2x"></i>
                  <h2 class="timer count-title count-number">N{{shippingRate}}</h2>
                  <p class="count-text ">Total Shipping</p>
                </div>              
                <div class="card my-3">
                  <div class="card-header">
                    Payment Method
                  </div>
                  <div class="card-body">
                    <div v-for="item in payment_options"  class="custom-control custom-radio panel my-3" :key="item.id">
                      <input type="radio" v-model="payment" :id="'customRadio'+item.id" name="paymentRadio" :value="item.id" class="custom-control-input">
                      <label class="custom-control-label panel-body" :for="'customRadio'+item.id">                    
                        <h3>{{ item.name }}</h3>
                        <p>{{item.description}}</p>
                      </label>
                    </div>
                    <div class="error" v-if="!payment">Please select a payment method</div>
                  </div>
                </div>           
              </div>
            </div>
          </tab-content>
          <tab-content title="Confirm Order" icon="ti-save" :before-change="validateThirdTab">

            <div class="innerpage-heading text-center">
                <h3>Confirm Order</h3>
                <p>We need to save your order</p>
            </div>
            <div class="order-list">
              <order-items :orders="orders" />
              <order-totals />              
            </div>
            <div class="custom-control custom-checkbox my-3">
                <input type="checkbox" name="toc" id="tos" v-model="tos" class="custom-control-input">
                <label class="custom-control-label" for="tos">
                  <h4>I agree to <router-link to="/terms" target='_blank'>Terms of Service</router-link></h4>
                </label>
                <div class="error" v-show="!tos">You are required to agree to the terms and conditions</div>
            </div>
          </tab-content>
          <tab-content title="Complete Order" icon="ti-check">
            <div class="innerpage-heading text-center">
                <h3>Complete Order</h3>
                <p>We need to confirm your Order</p>
            </div>
            <template v-if="paymentProvider == 'Paystack'">
              <div class="payment-message">Please click on the button below to make payment and complete the transaction</div>
            </template>
             <template v-if="paymentProvider  == 'Bank Transfer'">
               <div class="payment-message">Find our bank transfer details below and <strong> click on the complete button to confirm the order</strong></div>
                <div class="bank-message" v-html="getKey('bank_details')"></div>
            </template>
          </tab-content>
      </form-wizard>
       </div>
             </div>
    </div>  
      </div>
  </section>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import Datepicker from 'vuejs-datepicker';
import OrderItems from "../components/productos/OrderItems";
import OrderTotals from "../components/productos/OrderTotals";
import {
  ADD_SHIPPING_ADDRESS,
  ADD_SHIPPING_METHOD,
  ADD_PAYMENT_METHOD,
  ADD_EXPRESS_SHIPPING,
  ADD_DELIVERY_DATE,
  ADD_DELIVERY_TIME,
  CONFIRM_ORDER,
  COMPLETE_ORDER,
  PAGE_TITLE,
  PAGE_ICON,
  PAGE_COVER, 
} from "../store/mutation-types";
export default {
  data() {
    return {
      tos: true,
      paystackLoaded: false,
      model: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        landmark: "",
        city: "",
        alt_city: "",
      },
      formOptions: {
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
            validator: VueFormGenerator.validators.string.locale({
                fieldIsRequired: "Your first name is required!",
            }),
            styleClasses: "",
            onChanged: function(model, errors, field) {
                this.validate();
            }
          },
          {
            type: "input",
            inputType: "text",
            placeholder: "Last name",
            model: "last_name",
            required: true,
            validator: VueFormGenerator.validators.string.locale({
                fieldIsRequired: "Your last name is required!",
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
            required: false,
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
            type: "input",
            inputType: "text",
            placeholder: "Phone",
            model: "phone",
            required: true,
            validator: VueFormGenerator.validators.string.locale({
                fieldIsRequired: "Your phone number is required!",
            }),
            styleClasses: "",
            onChanged: function(model, errors, field) {
                this.validate();
            }
          },
          {
            type: "input",
            inputType: "text",
            placeholder: "Address",
            model: "address",
            required: true,
            validator: VueFormGenerator.validators.string.locale({
                fieldIsRequired: "Your address is required!",
            }),
            styleClasses: "",
            onChanged: function(model, errors, field) {
                this.validate();
            }
          },
          {
            type: "input",
            inputType: "text",
            placeholder: "Nearest Landmark",
            model: "landmark",
            required: true,
            validator: VueFormGenerator.validators.string.locale({
                fieldIsRequired: "Please enter a landmark!",
            }),
            styleClasses: "",
            onChanged: function(model, errors, field) {
                this.validate();
            }
          },
          {
            type: "select",
            label: "City",
            model: "city",
            required: true,
            validator: VueFormGenerator.validators.required.locale({
                fieldIsRequired: "Please select a city!",
            }),
            values: function () {
              return this.getCities();
            }.bind(this),
            default: "Allen",
            styleClasses: "",
            onChanged: function(model, errors, field) {
                this.validate();
            }
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
            },
            onChanged: function(model, errors, field) {
                this.validate();
            }
          }
        ]
      },
    };
  },
  beforeCreate() {
    this.$store.dispatch("checkoutOptions");
  },
  created() {
    if (this.$store.getters.shippingInfo) {
      this.model = this.shippingInfo();
    }
    if ((this.payment = this.$store.getters.paymentMethod)) {
      this.payment = this.$store.getters.paymentMethod;
    }
    if (this.$store.getters.shippingMethod) {
      this.shipping = this.$store.getters.shippingMethod;
    }
  },
  mounted () {
    this.$store.commit(PAGE_TITLE, 'Checkout');
    this.$store.commit(PAGE_ICON, 'fa fa-thumbs-up');
    this.$store.commit(PAGE_COVER, true);
    this.$loadScript("https://js.paystack.co/v1/inline.js")
    .then(() => {
      console.log('paystack loaded');
      this.paystackLoaded = true;
    })
    .catch(() => {
      // Failed to fetch script
      console.log(`couldn't load paystack`);
      this.paystackLoaded = false;
    });
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
    },
    ETA() {
      const today = new Date();
      const time = today.getHours() ;
      if (time < 13) {
        return `Today after ${time < 8 ? 11 + ' AM' : time + 3 + ' PM' }`;
      } else {
        return "Tomorrow after 11 AM";
      }
      
    },
    disabledDates() {
      return { days: [0], to: this.getDate() };
    },
    shippingName() {
      return this.$store.getters.shippingName(this.shipping);
    },
    shipping: {
      get () {
        return this.$store.state.order.shipping;
      },
      set (value) {
        const payload = { id: value, type: this.getShippingName(value) };
        console.log({payload});
        this.$store.commit(ADD_SHIPPING_METHOD, payload);
      }
    },
    payment: {
      get () {
        return this.$store.state.order.payment;
      },
      set (value) {
        this.$store.commit(ADD_PAYMENT_METHOD, value);
      }
    },
    express: {
      get () {
        return this.$store.state.order.express || false;
      },
      set (value) {
        this.$store.commit(ADD_EXPRESS_SHIPPING, value);
      }
    },
    deliveryDate: {
      get () {
        return this.$store.state.order.delivery_date || '';
      },
      set (value) {
        this.$store.commit(ADD_DELIVERY_DATE, value)
      }
    },
    deliveryTime: {
      get () {
        return this.$store.state.order.delivery_time || '*';
      },
      set (value) {
        this.$store.commit(ADD_DELIVERY_TIME, value)
      }
    },
    shippingRate() {
      return this.$store.getters.shippingRate;
    },
    paymentProvider() {
      return this.$store.getters.paymentName(this.payment) || false;
    },
  },
  methods: {
    validateFirstTab() {
      this.$store.commit(ADD_SHIPPING_ADDRESS, this.model);
      return this.$refs.firstTabForm.validate();
    },
    validateSecondTab() {
      if(this.shipping == 0 || this.shipping == false) {
        return false;
      }
      if(this.payment == 0 || this.payment == false) {
        return false;
      }
      if(this.deliveryTime == '*' || !this.deliveryTime) {
        return false;
      }
      if(this.deliveryDate == '' || !this.deliveryDate) {
        return false;
      }
      return true;
    },
    validateThirdTab() {
       if (this.tos) {
        return new Promise((resolve, reject) => {
          this.$store.dispatch('confirmOrder', this.$store.getters.orderRecord)
            .then(res => {
              resolve(true);
            })
            .catch(err => {
              reject(false);
            });
        }); 
      } else {
        return false;
      }    
    },
    onComplete: function() {
      const payload = {
        order: this.$store.getters.orderID
      };
      if (this.paymentProvider == 'Paystack' && this.paystackLoaded) {
        const paystackOptions = {
          amount: parseFloat(this.total) * 100,
          email: this.email,
          key: this.getKey('test_public_key'),
          ref: this.reference,
          callback: (response) => {
            payload.reference = response;
            console.log('payload', payload);
            this.completePayment(payload);
          },
          onClose: () => {
            this.cancelPayment();
          },
        };
        window.PaystackPop.setup(paystackOptions).openIframe()
      } else {
        payload.status = 'Pending';
        this.completePayment(payload)
      }
      
    },
    completePayment(payload) {
      this.$store.dispatch('completeOrder', payload)
      .then(res => {
        console.log('goto success');
        this.$router.push('/success');
      })
      .catch(err => {
        console.log('try again');
      });
    },
    cancelPayament() {
      //Suggest bank transfer
      console.log("Paystack closed");
    },
    getKey(key) {
      return this.$store.getters.orderMeta(key);
    },
    getDate() {
      const today = new Date(); 
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate()+1);
      if (tomorrow.getDay() == 0 || today.getHours() > 17) {
        tomorrow.setDate(today.getDate()+2);
      }
      console.log('tomorrow', tomorrow);
      return tomorrow;
    },
    getShippingName(id) {
      return this.$store.getters.shippingName(id);
    },
    getCities() {
      return this.$store.getters.shippingCities;
    },
    shippingInfo() {
      return this.$store.getters.shippingInfo;
    }
  },
  components: {
    "vue-form-generator": VueFormGenerator.component,
    FormWizard,
    TabContent,
    orderItems: OrderItems,
    orderTotals: OrderTotals,
    Datepicker
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.counter {
    background-color:#f5f5f5;
    padding: 20px 0;
    border-radius: 5px;
}

.count-title {
    font-size: 40px;
    font-weight: normal;
    margin-top: 10px;
    margin-bottom: 0;
    text-align: center;
}

.count-text {
    font-size: 13px;
    font-weight: normal;
    margin-top: 10px;
    margin-bottom: 0;
    text-align: center;
}

.fa-2x {
    margin: 0 auto;
    float: none;
    display: table;
    color: #4ad1e5;
}
</style>