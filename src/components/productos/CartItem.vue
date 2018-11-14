<template>
	<li>
		<div class="cart-item">
				<div class="item-text dish-list-text">
						<h4><a href="#">{{product.name}}</a></h4>
						<h5>Qty: <input type="number" min="1" v-model="quantity" @change="update()" class="form-control"> x N{{line.price}}</h5>
				</div><!-- end item-text -->

				<div class="item-img">
						<a href="#"><img :src="getImage(product)" class="img-responsive" :alt="product.name"></a>
				</div><!-- end item-img -->
				
				<div class="d-flex" v-html="getOptionDetails(line.product, line.options)"></div>
				<h4 class="total">Total: <span>N{{price}}</span></h4>
				
				<div class="item-close">
						<button class="btn" @click="remove()"><span><i class="fa fa-times-circle"></i></span></button>
				</div><!-- end item-close -->
		</div><!-- end cart-item -->
	</li>
</template>

<script>
import {
    UPDATE_CART,
    REMOVE_FROM_CART
  } from '../../store/mutation-types'
import { API_ROOT } from "../../config";
export default {
  name: "cart-item",
	props: ["line", "index"],
	data () {
		return {
			quantity: this.line.quantity
		}
	},
  computed: {
    product() {
      return this.line.product;
		},
		price() {
			return this.line.price * this.quantity
		}
  },
  methods: {
    getImage: function(id) {
      return `${API_ROOT}${this.product.image.data.url}`;
		},
		remove() {
			this.$store.commit(REMOVE_FROM_CART, this.index)
		},
		update() {
			if (!this.quantity) {
				this.quantity = 1;
			}
				this.$store.commit(UPDATE_CART, {index: this.index, quantity: this.quantity})
		},
		getOptionDetails(product, options) {
			return this.$store.getters.optionDescription(product, options);
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