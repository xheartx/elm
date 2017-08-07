<template>
  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="商品图片">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating || 0}}%</span>
          </div>
          <div class="price">
            <span class="now">&yen;{{food.price}}</span><span v-show="food.oldPrice" class="old">&yen;{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" @increment="incrementFood"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @increment="incrementTotal"
                        :select-type="selectType"
                        :only-content="onlyContent"
                        :desc="desc"
                        :ratings="food.ratings">
          </ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <i :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></i>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'
  import {formatDate} from 'assets/js/date'

//  const POSITIVE = 0
//  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show() {
        this.showFlag = true
        this.selecType = ALL
        this.onlyContent = false
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$el, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.showFlag = false
      },
      addFirst(event) {
        if (!event._constructed) {
          return
        }
        this.$emit('increment', event.target)
        Vue.set(this.food, 'count', 1)
      },
      incrementFood() {
        this.$emit('increment', event.target)
      },
      incrementTotal(type, data) {
        this[type] = data
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../assets/less/mixin";

  .food{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    transform: translate3d(0, 0, 0);
    &.move-enter-active, &.move-leave-active {
      transition: all 0.2s linear;
    }
    &.move-enter, &.move-leave-active {
      transform: translate3d(100%, 0, 0);
    }
    .image-header{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back{
        position: absolute;
        top: 10px;
        left: 0;
        .icon-arrow_lift{
          display: block;
          padding: 10px;
          font-size: 20px;
          color: rgba(255,255,255,0.8);
        }
      }
    }
    .content{
      position: relative;
      padding: 18px;
      .title{
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7,17,27);
      }
      .detail{
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0;
        .sell-count,.rating{
          font-size: 10px;
          color: rgb(147,153,159);
        }
        .sell-count{
          margin-right: 12px;
        }
      }
      .price{
        font-weight: 700;
        line-height: 24px;
        .now{
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240,20,20);
        }
        .old{
          text-decoration: line-through;
          font-size: 10px;
          color: rgb(147,153,159);
        }
      }
      .cartcontrol-wrapper{
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
      .buy{
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 12px;
        border-radius: 12px;
        color: #fff;
        background: rgb(0,160,220);
        opacity: 1;
        &.fade-enter-active, &.fade-leave-active {
          transition: all 0.2s;
        }
        &.fade-enter, &.fade-leave-active {
          opacity: 0;
        }
      }
    }
    .info{
      padding: 18px;
      .title{
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .text{
        line-height: 24px;
        font-size: 12px;
        color: rgb(77,85,93);
        padding: 0 8px;
      }
    }
    .rating{
      padding-top: 18px;
      .title{
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .rating-wrapper{
        padding: 0 18px;
        .rating-item{
          position: relative;
          padding: 16px 0;
          .border-1px(rgba(7,17,27,0.2));
          .user{
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            font-size: 0;
            .name{
              display: inline-block;
              vertical-align: top;
              font-size: 10px;
              color: rgb(147,153,159);
              margin-right: 6px;
            }
            .avatar{
              border-radius: 50%;
            }
          }
          .time{
            margin-bottom: 6px;
            font-size: 10px;
            color: rgb(147,153,159);
            line-height: 12px;
          }
          .text{
            line-height: 16px;
            font-size: 12px;
            color: rgb(7,17,27);
            .icon-thumb_up,.icon-thumb_down{
              line-height: 16px;
              margin-right: 4px;
              font-size: 12px;
              vertical-align: middle;
            }
            .icon-thumb_up{
              color: rgb(0,160,220);
            }
            .icon-thumb_down{
              color: rgb(147,153,159);
            }
          }
        }
      }
      .no-rating{
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147, 153, 159);
      }
    }
  }
</style>
