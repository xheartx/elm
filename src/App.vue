<template>
  <div>
    <v-header :seller="SELLER"></v-header>
    <div class="tab border-1px">
      <router-link class="tab-item" to="/goods">商品</router-link>
      <router-link class="tab-item" to="/ratings">评论</router-link>
      <router-link class="tab-item" to="/seller">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="SELLER"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import {urlParse} from 'assets/js/util'
  import header from 'components/header/header'

  const ERR_OK = 0

  export default {
    computed: {
      ...mapGetters(['SELLER', 'ID'])
    },
    created() {
      let queryParam = urlParse()
      this.$store.dispatch('getID', queryParam.id)

      this.$http.get('/api/seller?id=' + this.ID).then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.$store.dispatch('getSeller', response.data)
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./assets/less/index";

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
      flex: 1;
      text-align: center;
    }
    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
</style>
