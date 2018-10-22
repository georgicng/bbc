<template>
	<li>
		<div class="order">
			<div class="order-item">
				<div class="order-item-info">
					<h4><a href="#">{{product.name}}</a></h4>
					<p>category</p>
					<p class="order-item-price"><span>Price : N{{line.price}}</span> , Qty : {{quantity}}</p>
				</div><!-- end order-item-info -->

				<div class="order-item-img">
					<a href="#"><img :src="getImage(product)" class="img-responsive" :alt="product.name"></a>
				</div><!-- end order-img -->
			</div><!-- end order-item -->
			
			<div class="total">
				<p>{{quantity}} x N{{product.price}} = <span>N{{price}}</span></p>
			</div><!-- end total -->
		</div><!-- end order-->
	</li>
</template>

<script>
import { API_ROOT } from "../../config";
export default {
  name: "cart-item",
	props: ["line"],
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
		}
  }
};
</script>

<style>

</style>