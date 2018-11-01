<template>
  <div class="form-group">
    <label for="coupon">Enter Promo Code</label>
    <input type="text" class="form-control" id="coupon" v-model="coupon" placeholder="test with LICIOUS">
    <button @click="getCoupon"  class="my-3 btn btn-orange">Redeem</button>
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