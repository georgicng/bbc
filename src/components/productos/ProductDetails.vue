<template>
    <div id="menu-detail-page">
      <div class="container-fluid">
          <div class="menu-detail offset-lg-2 col-lg-8">
              <div class="menu-title">
                  <div class="menu-name">
                      <p>Name</p>
                      <h3>{{product.name}}</h3>
                  </div>
                  <div class="menu-price">
                      <p>Price</p>
                      <h3>N{{price}}</h3>
                  </div>
              </div><!-- end page-title -->
              </div>
              <div class="no-back">
             <div class="row">
                 <div class="col-sm-12 col-md-6 offset-lg-2 col-lg-4"> 
              <ul id="menu-gallery" class="gallery list-unstyled cS-hidden menu-gallery text-center">
                  <li :data-thumb="getImage(product)">
                      <div class="p-img">
                          <img :src="getImage(product)" :alt="product.name"/>
                      </div>
                  </li>
              </ul> 
              </div> 
                <div class="col-sm-12 col-md-6 col-lg-4">                         
              <div class="menu-info">                  
                  <div class="mb-3" v-html="product.description"></div>
                  <div class="form mb-3">
                  <form @submit.prevent="" id="productform">
                    <template v-for="product_option in getOptions()">
                      <div class="form-group" :key="product_option.slug" :data-option="product_option.option_id">
                        <template v-if="product_option.type == 'textbox'">                         
                              <label :for="product_option.slug" class="font-weight-bold">{{product_option.name}}</label>
                              <template v-if="product_option.maximum"> 
                                <input type="text" class="form-control" :id="product_option.slug" v-model="optionValues[product_option.slug]" :maxlength="product_option.maximum">
                              </template>
                              <template v-else> 
                                <input type="text" class="form-control" :id="product_option.slug" v-model="optionValues[product_option.slug]">
                              </template>                         
                        </template>
                        <template v-else-if="product_option.type == 'select'">
                          <label :for="product_option.slug" class="font-weight-bold">{{product_option.name}}</label>
                          <multiselect track-by="id" label="name" selectLabel="Click to select" deselectLabel="Click to remove" v-model="optionValues[product_option.slug]" :options="getValues(product_option.option_id)" :searchable="false"></multiselect>
                        </template>
                        <template v-else-if="product_option.type == 'radio'">
                          <label :for="product_option.slug" class="font-weight-bold">{{product_option.name}}</label>
                            <template v-for="(value, index) in getValues(product_option.option_id)">
                              <div class="custom-control custom-radio" :key="index">
                                <input type="radio" class="custom-control-input" :name="product_option.slug" :id="product_option.slug+index" :value="value.id">
                                <label class="custom-control-label" :for="product_option.slug+index">{{value.name}}</label>
                              </div>
                          </template>
                        </template>
                        <template v-else-if="product_option.type == 'checkbox'">
                          <label :for="product_option.slug" class="font-weight-bold">{{product_option.name}}</label> 
                          <template v-if="product_option.maximum"> 
                            <multiselect :multiple="true" track-by="id" label="name" selectLabel="Click to select" deselectLabel="Click to remove" :max="product_option.maximum" v-model="optionValues[product_option.slug]" :options="getValues(product_option.option_id)" :searchable="false"></multiselect>
                          </template>
                          <template v-else> 
                            <multiselect :multiple="true" track-by="id" label="name" selectLabel="Click to select" deselectLabel="Click to remove" v-model="optionValues[product_option.slug]" :options="getValues(product_option.option_id)" :searchable="false"></multiselect>
                          </template>
                        </template>
                        <template v-if="product_option.type == 'textarea'">                         
                              <label :for="product_option.slug" class="font-weight-bold">{{product_option.name}}</label>
                              <textarea class="form-control" :id="product_option.slug" v-model="optionValues[product_option.slug]"></textarea>                         
                        </template>
                        <div class="small mark" v-if="product_option.comment">{{product_option.comment}}</div>
                    
                      </div>
                       
                    </template>
                      <div class="form-group" v-if="multi">
                            <label class="font-weight-bold">Quantity :</label>
                            <input type="text" class="form-control"  id="quantity" name="quantity" min="1" max="100" v-model="quantity">
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold">Total :</label>
                            <span class="price">N{{price}}</span>
                        </div> 
                        <div class="error" v-show="showErrors" v-html="errorMessages"></div>                      
                        <button @click="addToCart" class="btn btn-orange">Add to cart <span><i class="fa fa-shopping-cart"></i></span></button>
                    </form>
                    </div>               
              </div><!-- end menu-info -->
                     
          </div>
          </div>
          <div class="row my-4">
            <div class="offset-lg-2 col-lg-8">
              <ul class="nav nav-tabs justify-content-start">
                  <li class="nav-item"><a class="nav-link active" href="#size" data-toggle="tab">Size Examples</a></li>
              </ul>
              
              <div class="tab-content">
                  <div id="size" class="tab-pane active">
                      <div id="img-tab" class="nav nav-pills my-5 justify-content-center"  role="tablist">
                        <a href="#inches-6" class="nav-item nav-link active" data-toggle="tab" role="tab">
                          6 Inches
                        </a>
                        <a href="#inches-8" class="nav-item nav-link" data-toggle="tab" role="tab">
                          8 Inches
                        </a>
                        <a href="#inches-10" class="nav-item nav-link" data-toggle="tab" role="tab">
                          10 Inches
                        </a>
                        <a href="#inches-12" class="nav-item nav-link" data-toggle="tab" role="tab">
                          12 Inches
                        </a>
                      </div>
                      <div class="tab-content my-5">
                        <div class="tab-pane active" id="inches-6" role="tabpanel">
                          <img class="img-fluid" src="static/images/examples/6-inches.jpg">
                        </div>
                        <div class="tab-pane" id="inches-8" role="tabpanel">
                          <img class="img-fluid" src="static/images/examples/8-inches.jpg">
                        </div>
                        <div class="tab-pane" id="inches-10" role="tabpanel">
                          <img class="img-fluid" src="static/images/examples/10-inches.jpg">
                        </div>
                        <div class="tab-pane" id="inches-12" role="tabpanel">
                          <img class="img-fluid" src="static/images/examples/12-inches.jpg">
                        </div>
                      </div>
                  </div>
              </div><!-- end tab-content -->  
            </div>
            </div>
           
          </div>
      </div><!-- end container-fluid -->
    </div>
</template>

<script>
import { ADD_TO_CART } from "../../store/mutation-types";
import { API_ROOT } from "../../config";
import Multiselect from "vue-multiselect";
export default {
  props: ["product", "multi"],
  components: { Multiselect },
  data() {
    return {
      quantity: 1,
      optionValues: {},
      showErrors: false,
      errorMessages: ""
    };
  },
  mounted() {
    const options = this.getOptions();
    if (options) {
      options.forEach(option => {
        switch (option.type) {
          case "checkbox":
            this.$set(this.optionValues, option.slug, []);
            break;
          default:
            this.$set(this.optionValues, option.slug, "");
        }
      });
    }
  },
  computed: {
    options() {
      //add or item.value != '' or '*' to filter
      const options = [];
      Object.keys(this.optionValues).forEach(key => {
        if (
          key &&
          this.optionValues[key] instanceof Array &&
          this.optionValues[key].length > 0
        ) {
          //push every value id
          this.optionValues[key].forEach(item => {
            options.push({ name: key, value: item.id });
          });
        } else if (
          this.optionValues[key] !== null &&
          typeof this.optionValues[key] === "object"
        ) {
          //push object value id
          options.push({ name: key, value: this.optionValues[key].id });
        } else {
          //push string value
          options.push({ name: key, value: this.optionValues[key] });
        }
      });
      return options;
    },
    price() {
      return (
        (parseFloat(this.product.price) + parseFloat(this.increment)) *
        parseInt(this.quantity)
      );
    },
    increment() {
      let increment = 0;
      const keys = Object.keys(this.optionValues);
      if (keys) {
        keys.forEach(key => {
          if (
            key &&
            this.optionValues[key] instanceof Array &&
            this.optionValues[key].length > 0
          ) {
            this.optionValues[key].forEach(item => {
              increment += parseFloat(item.increment);
            });
          } else if (
            this.optionValues[key] !== null &&
            typeof this.optionValues[key] === "object"
          ) {
            if (this.optionValues[key].increment) {
              increment += parseFloat(this.optionValues[key].increment);
            }
          }
        });
      }

      if (
        this.optionValues["flavours"] &&
        this.optionValues["flavours"].length > 2
      ) {
        increment += 1000;
      }

      return increment;
    },
    unitPrice() {
      return parseFloat(this.product.price) + parseFloat(this.increment);
    }
  },
  watch: {
    options: function(val) {
      this.showErrors = false;
    }
  },
  methods: {
    getImage: function(product) {
      return `${API_ROOT}${this.product.image.data.url}`;
    },
    getCategory: function(product) {
      return `${this.product.category_id.data.name}`;
    },
    getTotal: function(increment) {
      if (parseFloat(increment) == 0) {
        return parseFloat(this.product.price);
      }
      return parseFloat(increment) + parseFloat(this.product.price);
    },
    addToCart() {
      if (this.validate()) {
        this.$store.commit(ADD_TO_CART, {
          productid: this.product.id,
          quantity: this.quantity,
          price: this.unitPrice,
          options: this.options,
          product: this.product
        }),
          this.$router.push("/cart");
      } else {
        this.showErrors = true;
      }
    },
    validate() {
      let valid = true;
      this.errorMessages = "";
      const options = this.getOptions();
      if (options) {
        options.forEach(option => {
          if (option.required && !this.optionValues[option.slug]) {
            if (
              option.type == "checkbox" &&
              this.optionValues[option.slug].lenght > 0
            ) {
            }
            valid = false;
            this.errorMessages += `Please specify a ${option.name}<br>`;
          }
        });
        if (this.multi && !this.quantity) {
          valid = false;
          this.errorMessages += `Please specify the quantity<br>`;
        }
      }
      return valid;
    },
    getOptions() {
      if (this.product.options && this.product.options.data.length > 0) {
        return this.product.options.data.map(option => {
          return {
            option_id: option.id,
            type: option.option_id.data.type,
            name: option.option_id.data.name,
            slug: option.option_id.data.slug,
            increment: option.price_increment,
            comment: option.comment,
            maximum: option.maximum ? option.maximum : false,
            required: option.required
          };
        });
      }
      return [];
    },
    getValues(option_id) {
      if (this.product.options && this.product.options.data.length > 0) {
        const item = this.product.options.data.find(
          item => item.id == option_id || item.option_id.data.slug == option_id
        );
        return item.option_values.data.map(item => {
          return {
            id: item.id,
            name: item.option_value.data.value,
            increment: item.price_increment
          };
        });
      }
      return [];
    },
    getOptionIncrement(product_option_id) {
      const options = this.getOptions();
      if (options && options.length > 0) {
        const item = options.find(obj => obj.option_id == product_option_id);
        if (item && item.increment) {
          return parseFloat(item.increment);
        }
      }
      return 0;
    },
    getValueIncrement(slug, product_option_value_id) {
      const values = this.getValues(slug);
      if (values && values.length > 0) {
        const item = values.find(obj => obj.id == product_option_value_id);
        if (item && item.increment) {
          return parseFloat(item.increment);
        }
      }
      return 0;
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.product-details {
  border-bottom: 2px solid #f5f5f5;
  padding: 30px 0;
}
.product-details__image {
}
.product-details__description {
  padding-top: 30px;
}
.product-details__description small {
  color: #808080;
}
.product-details__description h3 {
  margin: 5px 0 30px 0;
}
.product-details__price-cart {
  display: flex;
  padding-top: 30px;
}
.product-details__price-cart p {
  flex-grow: 2;
  font-size: 20px;
  font-weight: bold;
}
.price {
  color: red;
  font-size: 1.2rem;
  font-weight: 600;
}
#menu-gallery li img {
  max-height: 450px;
}
.no-back .nav-tabs li {
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
  margin-left: 3px;
  margin-right: 3px;
}
.no-back .nav-tabs li a {
  border: 0px;
  color: #212121;
  padding: 11px 15px;
}
.no-back .nav-tabs li a.active {
  border-bottom: 3px solid transparent;
}
.no-back .nav-tabs li a.active {
  border-color: #ee4899;
  color: #ee4899;
}
.error {
  color: red;
  background: #f1ecee;
  padding: 10px;
}
.multiselect__tag {
  background: #ee4899;
}
.multiselect__option--highlight, .multiselect__option--highlight::after {
  background: #ee4899;
}
.multiselect__tag-icon:after {
  color: #000;
}
</style>