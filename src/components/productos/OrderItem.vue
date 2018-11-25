<template>
	<li>
		<div class="order">
			<div class="order-item">
				<div class="order-item-info">
					<h4><a href="#">{{product.name}}</a></h4>
					<div class="d-flex flex-wrap" v-html="getOptionDetails(line.product, line.options)"></div>
				</div><!-- end order-item-info -->

				<div class="order-item-img">
					<a href="#"><img :src="getImage(product)" class="img-responsive" :alt="product.name"></a>
				</div><!-- end order-img -->
			</div><!-- end order-item -->
			
			<div class="total">
				<p>{{quantity}} x N{{line.price}} = <span>N{{price}}</span></p>
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
			return this.line.product;
		},
		price() {
			return this.line.price * this.quantity
		}
  },
  methods: {
    getImage: function(product) {
      if (product.image) {
        return `${API_ROOT}${product.image.data.url}`;
      } else {
        return 'static/images/no-image.png';
      }
		},
		getOptionDetails(product, options) {
			return this.$store.getters.optionDescription(product, options);
		}
  }
};
</script>

<style>
.dlist-inline {
    margin: 2px;
    padding: 2px;
}
</style>