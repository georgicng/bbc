<template>
  <section class="product-details">
    
<div class="card">
	<div class="row no-gutters">
		<aside class="col-sm-5 border-right">
<article class="gallery-wrap"> 
<div class="img-big-wrap">
  <div><img :src="getImage(product)"></div>
</div> <!-- slider-product.// -->
</article> <!-- gallery-wrap .end// -->
		</aside>
		<aside class="col-sm-7">
<article class="p-5">
	<h3 class="title mb-3">{{product.name}}</h3>

<div class="mb-3"> 
	<var class="price h3 text-warning"> 
		<span class="currency">NGN N</span><span class="num">{{product.price}}</span>
	</var> 
</div> <!-- price-detail-wrap .// -->
<dl>
  <dt>Description</dt>
  <dd>{{product.description || 'This is for sale'}}</dd>
</dl>


<hr>
	<div class="row">
		<div class="col">
			<dl class="dlist-inline">
			  <dt>Quantity: </dt>
			  <dd> 
			  	<select class="form-control form-control-sm" style="width:70px;">
			  		<option> 1 </option>
			  		<option> 2 </option>
			  		<option> 3 </option>
			  	</select>
			  </dd>
			</dl>  <!-- item-property .// -->
		</div> <!-- col.// -->
		<div class="col">
			<dl class="dlist-inline">
				  <dt>Size: </dt>
				  <dd>
				  	<select class="form-control form-control-sm" style="width:70px;">
					  <option> 8 inches </option>
			  		<option> 10 inches </option>
			  		<option> 12 inches </option>
			  	</select>
				  </dd>
			</dl>  <!-- item-property .// -->
		</div> <!-- col.// -->
    <div class="col">
			<dl class="dlist-inline">
				  <dt>Color: </dt>
				  <dd>
				  	<select class="form-control form-control-sm" style="width:70px;">
					  <option> Yellow </option>
			  		<option> White </option>
			  		<option> Blue </option>
			  	</select>
				  </dd>
			</dl>  <!-- item-property .// -->
		</div> <!-- col.// -->
	</div> <!-- row.// -->
	<hr>
	<buy-button :product="product"></buy-button>
  <product-button :product="product"></product-button>
</article> <!-- card-body.// -->
		</aside> <!-- col.// -->
	</div> <!-- row.// -->
</div> <!-- card.// -->

  </section>
</template>

<script>
  import ProductButton from './ProductButton'
  import BuyButton from './BuyButton'
  import { API_ROOT } from "../../config";
  export default {
    props: ['product'],
    components: {
      'product-button': ProductButton,
      'buy-button': BuyButton
    },
    methods: {
      getImage: function (product) {
        return `${API_ROOT}${product.image.data.url}`
      },
      getCategory: function (product) {
        return `${product.category_id.data.name}`
      }
    }
  }
</script>

<style>
  .product-details {
    border-bottom: 2px solid #F5F5F5;
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