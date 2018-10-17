<template>
	<section class="page-wrapper innerpage-section-padding">
		<div id="categories-page">
			<div class="container-fluid">
				<router-link :to="'/products'">
					<div class="card shadow-lg my-3 border-0">
						<figure class="itemside">
							<img class="img-bg" height="120" src="static/images/items/item-sm.png">
							<figcaption class="card-body">
								<h2 class="title">Cakes for Men </h2>
								<router-link :to="'/categories'">Shop Now</router-link>
							</figcaption>
						</figure>
					</div> <!-- card.// -->
				</router-link>
				<router-link :to="'/products'">
					<div class="card shadow-lg my-3 border-0">
						<figure class="itemside">
							<img class="img-bg" height="120" src="static/images/items/item-sm.png">
							<figcaption class="card-body">
								<h2 class="title">Cakes for Women </h2>
								<span>Shop Now</span>
							</figcaption>
						</figure>
					</div> <!-- card.// -->
				</router-link>
				<router-link :to="'/products'">
					<div class="card shadow-lg my-3 border-0">
						<figure class="itemside">
							<img class="img-bg" height="120" src="static/images/items/item-sm.png">
							<figcaption class="card-body">
								<h2 class="title">Cakes for Kids </h2>
								<span>Shop Now</span>
							</figcaption>
						</figure>
					</div> <!-- card.// -->
				</router-link>
				<router-link :to="'/products'">
					<div class="card shadow-lg my-3 border-0">
						<figure class="itemside">
							<img class="img-bg" height="120" src="static/images/items/item-sm.png">
							<figcaption class="card-body">
								<h2 class="title">Do something nice for me </h2>
								<span>Shop Now</span>
							</figcaption>
						</figure>
					</div> <!-- card.// -->
				</router-link>				
			</div><!-- end container-fluid -->
		</div>
		
	</section>
</template>

<script>
export default {
  name: "categories",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
	margin: 20px 0;
	min-height: 100px;
	box-shadow: 5px 5px 10px 2px rgba(0,0,0,0.1);
}
.itemside {
	position: relative;
	padding: 10px;
}
.img-bg {
  position: absolute;
  right: 0;
	top: -20%;
}
</style>