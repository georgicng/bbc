<template>
	<section class="page-wrapper innerpage-section-padding">
		<div id="categories-page">
			<div class="container-fluid">
				 <div class="row">
					<div class="code_itemside_img4  my-3 border-0 col-md-6 offset-lg-1 col-lg-5">
					<div class="card shadow-lg">
						<router-link :to="'/products'">
						<figure class="itemside d-flex">
							<img class="img-bg" height="120" src="static/images/items/men-sm.png">
							<figcaption class="card-body">
								<h2 class="title">Cakes for Men </h2>
								<router-link :to="'/categories'">Shop Now</router-link>
							</figcaption>
						</figure>
						</router-link>
					</div> <!-- card.// -->
					</div>
				
				<div class="code_itemside_img4 my-3 border-0 col-md-6 col-lg-5">
				<div class="card shadow-lg ">
					<router-link :to="'/products'">
						<figure class="itemside d-flex">
							<img class="img-bg" height="120" src="static/images/items/women-sm.png">
							<figcaption class="card-body">
								<h2 class="title">Cakes for Women </h2>
								<span>Shop Now</span>
							</figcaption>
						</figure>
					</router-link>
				</div> <!-- card.// -->
				</div>
				</div>
              	<div class="row">
				<div class="code_itemside_img4 my-3 border-0 col-md-6 offset-lg-1 col-lg-5">
				<div class="card shadow-lg">
					<router-link :to="'/products'">
						<figure class="itemside d-flex">
							<img class="img-bg" height="120" src="static/images/items/kid-sm.png">
							<figcaption class="card-body">
								<h2 class="title">Cakes for Kids </h2>
								<span>Shop Now</span>
							</figcaption>
						</figure>
					</router-link>
				</div> <!-- card.// -->			
				</div>
				<div class="code_itemside_img4 my-3 border-0 col-md-6 col-lg-5">
				<div class="card shadow-lg">
					<router-link :to="'/custom'">
						<figure class="itemside d-flex">
							<img class="img-bg" height="120" src="static/images/items/custom-sm.png">
							<figcaption class="card-body">
								<h2 class="title">Custom Cake</h2>
								<span>Shop Now</span>
							</figcaption>
						</figure>
					</router-link>
				</div> <!-- card.// -->
				</div>
				 </div>				
			</div><!-- end container-fluid -->
		</div>
		
	</section>
</template>

<script>
import { PAGE_COVER } from "../store/mutation-types";
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
figure {
    margin: 0 0;
}
</style>