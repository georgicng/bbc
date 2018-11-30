<template>
	<section class="page-wrapper innerpage-section-padding">
		<div id="categories-page">
			<div class="container" id="categories">
				 <div class="row">
					<template v-for="item in categories">
						<div :key="item.id" class="col-md-6 col-lg-4 col-xl-3 my-3">
							<router-link :to="getLink(item)">
								<div class="card">
									<img class="w-100" :src="getImage(item)" alt="Card image cap">
									<div class="btn view-btn">{{item.name}}</div>
								</div>
							</router-link>
						</div>
					</template>
				 </div>				
			</div><!-- end container-fluid -->
		</div>
		
	</section>
</template>

<script>
import { PAGE_COVER } from "../store/mutation-types";
import { API_ROOT } from "../config";
export default {
	name: "categories",
	data() {
		return {
			msg: "Welcome to Your Vue.js App"
		};
	},
	mounted() {
		this.$store.commit(PAGE_COVER, false);
	},
	created() {
		if (!this.categories || this.categories.length < 1 ) {
			this.$store.dispatch('allCategories');
		}		
	},
	computed: {
		categories () {
			return this.$store.getters.allCategories;
		},
	},
	methods: {
		getImage: function(category) {
			if (category.image) {
				return `${API_ROOT}${category.image.data.url}`;
			} else {
				return 'static/images/no-image.png';
			}
		},
		getLink: function(category) {
			if (category.id == 4) {
				//const product = category.products.data[0];
				//return `/details/${product.id}`;
				return `/custom`;
			}
			return `/products?category=${category.id}`;
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
figure {
    margin: 0 0;
}
#categories .card:hover {
    transition: all 0.3s ease;
    box-shadow: 12px 15px 20px 0px rgba(46,61,73,0.15);
}

#categories img {

}

#categories .view-btn {
    background-color: #e6de08;
    margin: -25px 0 0 0;
    border-radius: 0 0 0 0;
    font-size: 24px;
    border: #e6de08;
    color: #000;

}
#categories .btn:hover {
	background-color: #ff4444;
	color: #fff;
	border: 2px solid #ff4444;
	transition: all 0.3s ease;
	box-shadow: 12px 15px 20px 0px rgba(46,61,73,0.15);
}
</style>