<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }

        this.$emit('increment', event.target)
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count > 0) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .cartcontrol{
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      padding: 6px;
      &.fade-enter-active, &.fade-leave-active {
        transition: all 0.4s linear;
        transform: translate3d(0, 0, 0);
      }
      &.fade-enter, &.fade-leave-active {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner{
          transform: rotate(180deg)
        }
      }
      .inner{
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0,160,220);
        transform: rotate(0);
        transition: all 0.4s linear;
      }
    }
    .cart-count{
      display: inline-block;
      font-size: 10px;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
    }
    .cart-add{
      font-size: 24px;
      line-height: 24px;
      display: inline-block;
      padding: 6px;
      color: rgb(0,160,220);
    }
  }
</style>
