<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toogleFavorite">
          <i class="icon-favorite" :class="{'active':FAVORITE}"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from 'components/star/star'
  import split from 'components/split/split'
  import { mapGetters } from 'vuex'

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    beforeUpdate() {
      this.$nextTick(() => {
        this._initScroll()
        this._picInitScroll()
      })
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll()
        this._picInitScroll()
      })
    },
    created() {
      this.$store.dispatch('setFavorite')

      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    computed: {
      ...mapGetters(['FAVORITE']),
      favoriteText() {
        return this.FAVORITE ? '已收藏' : '收藏'
      }
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$el, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      _picInitScroll() {
        if (!this.picScroll) {
          if (this.seller.pics) {
            let picWidth = 120
            let margin = 6
            let width = (picWidth + margin) * this.seller.pics.length - margin
            this.$refs.picList.style.width = width + 'px'
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          }
        } else {
          this.picScroll.refresh()
        }
      },
      toogleFavorite(event) {
        if (!event._constructed) {
          return
        }
        this.$store.dispatch('changeFavorite')
      }
    },
    components: {
      split,
      star
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../assets/less/mixin";

  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      position: relative;
      padding: 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .desc {
        padding-bottom: 18px;
        font-size: 0px;
        .border-1px(rgba(7, 17, 27, 0.1));
        .star {
          display: inline-block;
          vertical-align: top;
          margin-right: 8px;
        }
        .text {
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          margin-right: 12px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border-right: none;
          }
          h2 {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 149);
            margin-bottom: 8px;
          }
          .content {
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 24px;
            }
          }
        }
      }
      .favorite {
        position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;
        .icon-favorite {
          display: block;
          margin-bottom: 4px;
          color: #d4d6d9;
          font-size: 24px;
          line-height: 24px;
          &.active {
            color: rgb(240, 20, 20);
          }
        }
        .text {
          font-size: 10px;
          line-height: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .content-wrapper {
        padding: 0 12px 16px;
        .border-1px(rgba(7, 17, 27, 0.1));
        .content {
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }
      }
      .supports {
        .support-item {
          padding: 16px 12px;
          font-size: 0;
          .border-1px(rgba(7, 17, 27, 0.1));
          &:last-child {
            .border-none;
          }
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            &.decrease {
              .bg-image('seller', 'decrease_4');
            }
            &.discount {
              .bg-image('seller', 'discount_4');
            }
            &.guarantee {
              .bg-image('seller', 'guarantee_4');
            }
            &.invoice {
              .bg-image('seller', 'invoice_4');
            }
            &.special {
              .bg-image('seller', 'special_4');
            }
          }
          .text {
            font-size: 12px;
            line-height: 16px;
            color: rgb(7, 17, 27);
          }
        }
      }
    }
    .pics {
      padding: 18px;
      .title {
        margin-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child {
              margin: 0;
            }
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0;
      color: rgb(7, 17, 27);
      .title {
        padding-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
        .border-1px(rgba(7, 17, 27, 0.1));
      }
      .info-item {
        padding: 16px 12px;
        line-height: 16px;
        font-size: 12px;
        .border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          .border-none
        }
      }
    }
  }
</style>
