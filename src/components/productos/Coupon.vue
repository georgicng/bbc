<template>
  <div class="card coupon">
    <div class="card-header" id="headingOne">
      <a  data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
        I have Promo Code
      </a>
    </div>
    <div class="collapse" id="collapseExample">
      <div class="card-body">
        <div class="form-group">
          <label for="coupon">Enter Promo Code</label>
          <input type="text" class="form-control" id="coupon" v-model="coupon" placeholder="test with LICIOUS">
          <button @click="getCoupon"  class="my-3 btn btn-orange">Redeem</button>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  import {
    GET_COUPON_VALUE,
    ADD_COUPON
  } from '../../store/mutation-types'
  export default {
    computed: {
      coupon: {
        get () {
          return this.$store.state.order.coupon || '';
        },
        set (value) {
          this.$store.commit(ADD_COUPON, value);
        }
      }
    },
    methods: {
      getCoupon () {
        this.$store.dispatch('getCouponValue', this.coupon)
      }
    }
  }
</script>