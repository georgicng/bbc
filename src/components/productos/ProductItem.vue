<template>
  <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="dish-list my-3">
          <router-link :to="'/details/'+product.id"><img :src="getImage(product)" class="img-fluid" alt="dish-menu"></router-link>
          <div class="dish-list-text">
              <h4><router-link :to="'/details/'+product.id">{{product.name}}</router-link></h4>
              <h5>N{{product.price}}</h5>
              <!--p>{{product.category_id.data.name}}</p-->
              <router-link :to="'/details/'+product.id" class="btn">Buy Now<span><i class="fa fa-shopping-cart"></i></span></router-link>            
          </div><!-- end dish-list-text -->
      </div><!-- end dish-list -->
  </div>
</template>

<script>
  import ProductButton from './ProductButton.vue'
  import { API_ROOT } from "../../config";
  export default {
    name: 'product-item',
    props: ['product'],
    components: {
      'product-button': ProductButton
    },
    methods: {
      getImage: function (product) {
        if (product.image) {
          return `${API_ROOT}${product.image.data.url}`;
        } else {
          return 'static/images/no-image.png';
        }
      }
    }
  }
</script>

<style>
  .product {
    background: #FFF;
    margin-bottom: 30px;
    position: relative;
    overflow: hidden;
  }
  .product .product__description,
  .product .product__action {
    transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) transform;
  }
  .product:hover .product__description {
    transform: translateY(-40px);
  }
  .product:hover .product__action {
    transform: none;
  }
  .product-link {
    display: block;
    color: #3D3D3D;
  }
  .product-link:hover {
    color: #3D3D3D;
    text-decoration: none;
  }
  .product .product__image {
    width: 100%;
  }
  .product__image img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width:100%;
  }
  .product__description {
    width: 100%;
    display: flex;
    padding: 20px 20px 15px;
    background: #FFF;
  }
  .product__info {
    flex: 2;
  }
  .product__description small {
    color: #808080;
  }
  .product__description h4 {
    margin: 3px 0 5px 0;
  }
  .product__price-cart {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #51D2B7;
  }
  .product__price-cart p {
    flex-grow: 2;
    font-size: 20px;
    font-weight: bold;
  }
  .product__action {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: translateY(100%);
  }
  .product__action button {
    border-radius: 0;
    width: 100%;
    display: block;
  }
</style>