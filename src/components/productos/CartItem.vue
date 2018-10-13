<template>
 <tr>
	<td>
<figure class="media">
	<div class="img-wrap"><img :src="getImage(product)" class="img-thumbnail img-sm"></div>
	<figcaption class="media-body">
		<h6 class="title text-truncate">{{product.name}} </h6>
		<dl v-if="line.options !== undefined" class="dlist-inline small">
		  <dt>Size: </dt>
		  <dd>{{line.options['size']}}</dd>
		</dl>
		<dl v-if="line.options !== undefined " class="dlist-inline small">
		  <dt>Color: </dt>
		  <dd>{{line.options['color']}}</dd>
		</dl>
	</figcaption>
</figure> 
	</td>
	<td> 
		<input type="number" v-model="quantity" @change="update()" class="form-control">
	</td>
	<td> 
		<div class="price-wrap"> 
			<var class="price">{{price}}</var> 
			<small class="text-muted">({{product.price}} each)</small> 
		</div> <!-- price-wrap .// -->
	</td>
	<td class="text-right"> 
	<a @click="remove()" class="btn btn-outline-danger"> × Remove</a>
	</td>
</tr>
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
        return this.$store.getters.productById(this.line.productid)
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
				this.$store.commit(UPDATE_CART, {index: this.index, quantity: this.quantity})
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