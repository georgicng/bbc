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
                            <input type="text" class="form-control" :id="product_option.slug" :name="product_option.slug">                         
                      </template>
                      <template v-else-if="product_option.type == 'select'">
                        <label :for="product_option.slug" class="font-weight-bold">{{product_option.name}}</label>
                        <select class="form-control" :id="product_option.slug" :name="product_option.slug" @change="updateIncrement()">
                            <option value="*">Select {{product_option.name}}</option>
                                <template v-for="(value, index) in getValues(product_option.option_id)">
                                  <option :value="value.id" :key="index">{{value.name}} ...{{getTotal(value.increment)}}</option>
                                </template>
                            </select>
                      </template>
                       <template v-else-if="product_option.type == 'radio'">
                         <label :for="product_option.slug" class="font-weight-bold">{{product_option.name}}</label>
                          <template v-for="(value, index) in getValues(product_option.option_id)">
                            <div class="custom-control custom-radio" :key="index">
                              <input type="radio" class="custom-control-input" :name="product_option.slug" :id="product_option.slug+index" :value="value.id" @change="updateIncrement()">
                              <label class="custom-control-label" :for="product_option.slug+index">{{value.name}}</label>
                            </div>
                         </template>
                      </template>
                      <template v-else-if="product_option.type == 'checkbox'">
                        <label :for="product_option.slug" class="font-weight-bold">{{product_option.name}}</label>
                        <template v-for="(value, index) in getValues(product_option.option_id)">
                            <div class="custom-control custom-checkbox" :key="index">
                              <input type="checkbox" class="custom-control-input"
                                :name="product_option.slug" 
                                :id="product_option.slug+index" 
                                :value="value.id" @change="updateIncrement()">
                              <label class="custom-control-label" :for="product_option.slug+index">{{value.name}}</label>
                            </div>
                        </template>
                      </template>
                      <template v-if="product_option.type == 'textarea'">                         
                            <label :for="product_option.slug" class="font-weight-bold">{{product_option.name}}</label>
                            <textarea class="form-control" :id="product_option.slug" :name="product_option.slug"></textarea>                         
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
              </div><!-- end menu-info -->
                     
          </div>
          </div>
          <div class="row my-4">
            <div class="offset-lg-2 col-lg-8">
              <ul class="nav nav-tabs justify-content-center">
                  <li class="nav-item"><a class="nav-link active" href="#size" data-toggle="tab"><span><i class="fa fa-info"></i></span> Size Examples</a></li>
              </ul>
              
              <div class="tab-content">
                  <div id="size" class="tab-pane active">
                      <p>Insert Images here</p>
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
      return $("#productform")
        .serializeArray()
        .filter(item => item.name !== "quantity");
    },
    price() {
      return (
        (parseFloat(this.product.price) + parseFloat(this.increment)) *
        parseInt(this.quantity)
      );
    },
    unitPrice() {
      return parseFloat(this.product.price) + parseFloat(this.increment);
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
        return this.product.options.data.map((option) => {
          return {
            option_id: option.id,
            type: option.option_id.data.type,
            name: option.option_id.data.name,
            slug: option.option_id.data.slug,
            increment: option.price_increment,
            comment: option.comment
          };
        });
      }
      return {};
    },
    getValues(option_id) {
      if (this.product.options && this.product.options.data.length > 0) {
        const item = this.product.options.data
          .find(item => item.id == option_id || item.option_id.data.slug == option_id);
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
        const item = options.find(
          obj => obj.option_id == product_option_id
        );
        if (item && item.increment) {
          return parseFloat(item.increment);
        }
      }
      return 0;
    },
    getValueIncrement(slug, product_option_value_id) {
      const values = this.getValues(slug);
      if (values && values.length > 0) {
        const item = values.find(
          obj => obj.id == product_option_value_id
        );
        if (item && item.increment) {
          return parseFloat(item.increment);
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
          const name = $(this).attr('name')? $(this).attr('name') : $(this).parent().attr('name');
          if (value !== "*" && value !== "") {
            price += self.getValueIncrement(name, value);
          }
        });
      //add 1000 if all flavour selected
      if ($('input[name=flavours]:checked').size() == 3) {
        price += 1000;
      }

      //ensure not more than two sizes are selected
      if($('input[name=colors]:checked').length == 3) {
          $('input[name=colors]:not(:checked)').attr('disabled', 'disabled');
      } else {
        $('input[name=colors]').removeAttr('disabled');
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
</style>