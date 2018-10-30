<template>
    <div id="menu-detail-page">
      <div class="container-fluid">
          <div class="menu-detail offset-lg-2 col-lg-8">
              <div class="menu-title">
                  <div class="menu-name">
                      <p>Product Name</p>
                      <h3>{{product.name}}</h3>
                  </div>
                  <div class="menu-price">
                      <p>Price from</p>
                      <h3>N{{product.price}}</h3>
                  </div>
              </div><!-- end page-title -->
              </div>
              <div class="no-back">
             <div class="row">
                 <div class="col-sm-12 col-md-6 offset-lg-2 col-lg-4"> 
              <ul id="menu-gallery" class="gallery list-unstyled cS-hidden menu-gallery text-center mb-3">
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
                    <template v-for="(product_option, key) in getOptions()">
                      <div class="form-group" :key="key" :data-option="product_option.option_id">
                      <template v-if="product_option.type == 'textbox'">                         
                            <label :for="$options.filters.slugify(key)" class="font-weight-bold">{{key}}</label>
                            <input type="text" class="form-control" :id="$options.filters.slugify(key)" :name="$options.filters.slugify(key)">                         
                      </template>
                      <template v-else-if="product_option.type == 'select'">
                        <label :for="$options.filters.slugify(key)" class="font-weight-bold">{{key}}</label>
                        <select class="form-control" :id="$options.filters.slugify(key)" :name="$options.filters.slugify(key)" @change="updateIncrement()">
                            <option value="*">Select {{key}}</option>
                                <template v-for="(value, index) in getValues(product_option.option_id)">
                                  <option :value="value.id" :key="index">{{value.name}} ...{{getTotal(value.increment)}}</option>
                                </template>
                            </select>
                      </template>
                       <template v-else-if="product_option.type == 'radio'">
                         <label :for="key" class="font-weight-bold">{{key}}</label>
                          <template v-for="(value, index) in getValues(product_option.option_id)">
                            <div class="radio" :key="index">
                              <label :for="$options.filters.slugify(key)+index"><input type="radio" :name="$options.filters.slugify(key)" :id="$options.filters.slugify(key)+index" :value="value.id" @change="updateIncrement()">{{value.name}}</label>
                            </div>
                         </template>
                      </template>
                      <template v-else-if="product_option.type == 'checkbox'">
                        <label :for="key" class="font-weight-bold">{{key}}</label>
                        <template v-for="(value, index) in getValues(product_option.option_id)">
                          <div class="checkbox" :key="index">
                            <label :for="$options.filters.slugify(key)+index">
                              <input type="checkbox" 
                                :name="$options.filters.slugify(key)" 
                                :id="$options.filters.slugify(key)+index" 
                                :value="value.id" @change="updateIncrement()">
                              {{value.name}}
                            </label>
                          </div>
                        </template>
                      </template>
                      <template v-if="product_option.type == 'textarea'">                         
                            <label :for="$options.filters.slugify(key)" class="font-weight-bold">{{key}}</label>
                            <textarea class="form-control" :id="$options.filters.slugify(key)" :name="$options.filters.slugify(key)"></textarea>                         
                      </template>
                      <div class="small mark" v-if="product_option.comment">{{product_option.comment}}</div>
                       </div>
                    </template>
                      <div class="form-group">
                            <label class="font-weight-bold">Quantity :</label>
                            <input type="text" class="form-control"  id="quantity" name="quantity" min="1" max="100" v-model="quantity">
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold">Total :</label>
                            <span class="price">N{{price}}</span>
                        </div>                        
                        <button @click="addToCart" class="btn btn-orange">Add to cart <span><i class="fa fa-shopping-cart"></i></span></button>
                    </form>
                  </div>
                  <div class="panel-group my-3">
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <h4 class="panel-title p-3 mb-2 bg-light text-dark">
                          <a data-toggle="collapse" href="#collapse1">Size Examples</a>
                        </h4>
                      </div>
                      <div id="collapse1" class="panel-collapse collapse">
                        <div class="panel-body">Insert Images here</div>
                      </div>
                    </div>
                  </div>                 
              </div><!-- end menu-info -->              
          </div>
          </div>
          </div>
      </div><!-- end container-fluid -->
    </div>
</template>

<script>
import {
  ADD_TO_CART
} from "../../store/mutation-types";
import { API_ROOT } from "../../config";
export default {
  props: ["product"],
  data() {
    return {
      quantity: 1,
      increment: 0
    };
  },
  computed: {
    options() {
      //add or item.value != '' or '*' to filter
      return $('#productform').serializeArray().filter(item => item.name !== 'quantity');
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
    getTotal: function(increment) {
      if (parseFloat(increment) == 0) {
        return parseFloat(this.product.price);
      }
      return parseFloat(increment) + parseFloat(this.product.price);
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
              comment: y.option_id.data.comment || '',
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
            price += self.getIncrement(value);
          }
        });
      
      //add 1000 if all flavour selected
      if ($('input[name=flavour]:checked').size() == 3) {
        price += 1000;
      }

      //ensure not more than two sizes are selected
      if($('input[name=color]:checked').length == 3) {
          $('input[name=color]:not(:checked)').attr('disabled', 'disabled');
      } else {
        $('input[name=color]').removeAttr('disabled');
      }

      this.increment = price;
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
.price {
  color: red;
  font-size: 2rem;
  font-weight: 600;
}
#menu-gallery li img {
    max-height: 450px;
}
</style>