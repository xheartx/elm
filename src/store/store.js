import Vue from 'vue'
import Vuex from 'vuex'
import {savaToLocal, loadFromlLocal} from 'assets/js/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    seller: {
      sellerDate: {},
      favorite: false
    },
    goods: {
      goodsDate: [],
      selectFoods: []
    },
    ratings: {
      ratingDate: []
    }
  },
  getters: {
    ID: state => {
      return state.id
    },
    SELLER: state => {
      return state.seller.sellerDate
    },
    FAVORITE: state => {
      return state.seller.favorite
    },
    GOODS: state => {
      return state.goods.goodsDate
    },
    SELECT_FOODs: state => {
      return state.goods.selectFoods
    },
    RATINGS: state => {
      return state.ratings.ratingDate
    }
  },
  mutations: {
    SET_ID(state, id) {
      state.id = id
    },
    SET_SELLER_DATE(state, seller) {
      state.seller.sellerDate = seller
    },
    SET_GOODS_DATE(state, goods) {
      state.goods.goodsDate = goods
    },
    SELECT_FOODS(state, foods) {
      state.goods.selectFoods = foods
    },
    SET_RATINGS_DATE(state, ratings) {
      state.ratings.ratingDate = ratings
    },
    SET_FAVORITE(state) {
      state.seller.favorite = loadFromlLocal(state.id, 'favorite', false)
    },
    CHANGE_FAVORITE(state) {
      state.seller.favorite = !state.seller.favorite
      savaToLocal(state.id, 'favorite', state.seller.favorite)
    },
    ADD_CART(state, food) {
      if (food.count) {
        food.count++
      } else {
        food.count = 1
        state.goods.selectFoods.push(food)
      }
    },
    DECREASE_CART(food) {
      if (food.count > 0) {
        food.count--
      }
    }
  },
  actions: {
    getID({commit}, id) {
      commit('SET_ID', id)
    },
    getSeller({commit}, seller) {
      commit('SET_SELLER_DATE', seller)
    },
    getGoods({commit}, goods) {
      commit('SET_GOODS_DATE', goods)
    },
    selectFoods({commit}, foods) {
      commit('SELECT_FOODS', foods)
    },
    getRatings({commit}, goods) {
      commit('SET_RATINGS_DATE', goods)
    },
    setFavorite({commit}) {
      commit('SET_FAVORITE')
    },
    changeFavorite({commit}) {
      commit('CHANGE_FAVORITE')
    },
    addCart({commit}, food) {
      commit('ADD_CART', food)
    },
    decreaseCart({commit}, food) {
      commit('DECREASE_CART', food)
    }
  }
})

