<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="menu-detail-page">
      <div class="container-fluid">
          <div class="menu-detail">
              <div class="menu-title">
                  <div class="menu-name">
                      <p>Product Name</p>
                      <h3>{{product.name}}</h3>
                  </div>
                  <div class="menu-price">
                      <p>Price</p>
                      <h3>NGN {{price}}</h3>
                  </div>
              </div><!-- end page-title -->
              <ul id="menu-gallery" class="gallery list-unstyled cS-hidden menu-gallery text-center">
                  <li :data-thumb="getImage(product)">
                      <div class="p-img">
                          <img :src="getImage(product)" :alt="product.name"/>
                      </div>
                  </li>
              </ul>                            
              <div class="menu-info">                  
                  <div>{{product.description || 'This is for sale'}}</div>
                  <form @submit.prevent="" id="productform">
                    <template v-for="(product_option, key) in getOptions()">
                      <div class="form-group" :key="key" :data-option="product_option.option_id">
                      <template v-if="product_option.type == 'textbox'">                         
                            <label :for="key">{{key}}</label>
                            <input type="text" class="form-control" :id="key">                         
                      </template>
                      <template v-else-if="product_option.type == 'select'">
                        <label :for="key">{{key}}</label>
                        <select class="form-control" :id="key" @change="updateIncrement()">
                            <option value="*" :key="index">Select {{key}}</option>
                                <template v-for="(value, index) in getValues(product_option.option_id)">
                                  <option :value="value.id" :key="index">{{value.name}} (+ {{value.increment}})</option>
                                </template>
                            </select>
                      </template>
                       <template v-else-if="product_option.type == 'radio'">
                         <label :for="key">{{key}}</label>
                          <template v-for="(value, index) in getValues(product, product_option.option_id)">
                            <div class="radio" :key="index">
                              <label><input type="radio" name="optradio" :value="value.id" @change="updateIncrement()">{{value.name}} (+ {{value.increment}})</label>
                            </div>
                         </template>
                      </template>
                      <template v-else-if="product_option.type == 'checkbox'">
                        <label :for="key">{{key}}</label>
                        <template v-for="(value, index) in getValues(product, product_option.option_id)">
                          <div class="checkbox" :key="index">
                            <label><input type="checkbox" :value="value.id" @change="updateIncrement()">{{value.name}} (+ {{value.increment}})</label>
                          </div>
                        </template>
                      </template>
                       </div>
                    </template>
                        <div class="form-group">
                            <label>Quantity :</label>
                            <input type="text" class="form-control"  id="quantity" name="quantity" min="1" max="100" v-model="quantity">
                        </div>
                        <button @click="addToCart" class="btn">Add to cart<span><i class="fa fa-shopping-cart"></i></span></button>
                    </form>                  
              </div><!-- end menu-info -->              
          </div>
      </div><!-- end container-fluid -->
    </div>
  </section>
</template>

<script>
import {
  ADD_TO_CART
} from "../../store/mutation-types";
import { API_ROOT } from "../../config";
export default {
  props: ["product"],
  mounted () {
    console.log('product', this.product);
    console.log('options', this.getOptions(this.product));
  },
  data() {
    return {
      quantity: 1,
      increment: 0
    };
  },
  computed: {
    options() {
      return {};
    },
    price () {
      return (parseFloat(this.product.price)  + parseFloat(this.increment)) * parseInt(this.quantity);
    },
    unitPrice () {
      return parseFloat(this.product.price)  + parseFloat(this.increment);
    }
  },
  methods: {
    getImage: function(product) {
      return `${API_ROOT}${product.image.data.url}`;
    },
    getCategory: function(product) {
      return `${product.category_id.data.name}`;
    },
    addToCart() {
      this.$store.commit(ADD_TO_CART, {
        productid: this.product.id,
        quantity: this.quantity,
        price: this.unitPrice,
        options: this.options
      }),
      this.$router.push("/cart");
    },
    getOptions() {
      if (this.product.options && this.product.options.data.length > 0) {
        return this.product.options.data.reduce((groups, y) => {
          const name = y.option_id.data.name;
          if (groups[name] === undefined) {
            groups[name] = {
              option_id: y.option_id.data.id,
              type: y.option_id.data.type,
              name: name
            };
          }
          return groups;
        }, {});
      }
      return {};
    },
    getValues(option_id) {
      if (this.product.options && this.product.options.data.length > 0) {
        return this.product.options.data
          .filter(item => item.option_id.data.id == option_id)
          .map(item => {
            return {
              id: item.id,
              name: item.option_value_id.data.value,
              increment: item.price_increment
            };
          });
      }
      return [];
    },
    getIncrement(product_option_id) {
      if (this.product.options && this.product.options.data.length > 0) {
        const item = this.product.options.data.find(obj => obj.id == product_option_id);
        if (item && item.price_increment) {
          return parseFloat(item.price_increment);
        }
      }
      return 0;
    },
    updateIncrement() {
      let price = 0;
      const self = this;
      $("#productform")
        .find("input:checked, option:selected")
        .each(function() {
          const value = $(this).val();
          if (value !== "*" && value !== "") {
            console.log(value);
            price += self.getIncrement(value);
          }
        });
      this.increment = price;
      console.log(price);
    }
  }
};
</script>

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
</style>