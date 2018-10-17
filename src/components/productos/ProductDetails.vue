<template>
  <section class="page-wrapper innerpage-section-padding">
    <div id="menu-detail-page">
      <div class="container-fluid">
          <div class="menu-detail">
              <div class="menu-title">
                  <div class="menu-name">
                      <p>Product Name</p>
                      <h3>{{product.name}}</h3>
                  </div>
                  <div class="menu-price">
                      <p>Price</p>
                      <h3>NGN {{product.price}}</h3>
                  </div>
              </div><!-- end page-title -->
              <ul id="menu-gallery" class="gallery list-unstyled cS-hidden menu-gallery text-center">
                  <li :data-thumb="getImage(product)">
                      <div class="p-img">
                          <img :src="getImage(product)" :alt="product.name"/>
                      </div>
                  </li>
              </ul>                            
              <div class="menu-info">                  
                  <div>{{product.description || 'This is for sale'}}</div>
                  <product-button :product="product"></product-button>
              </div><!-- end menu-info -->              
          </div>
      </div><!-- end container-fluid -->
    </div>
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