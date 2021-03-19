/*
直接更新state的多个方法的对象
*/
import Vue from 'vue'
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER_INFO, RESET_USER_INFO,
  RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,DECREMENT_FOOD_COUNT,
  CLEAR_CART,RECEIVE_SEARCH_SHOPS} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state, {address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, {categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {shops}){
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state, {userInfo}){
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state){
    state.userInfo = {}
  },

  [RECEIVE_INFO](state, {info}){
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}){
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}){
    state.goods = goods
  },

  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){  //首先判断其是否有count
      //food.count = 1  //新增属性（没有数据绑定）
      //Vue.set传入参数：对象，属性名，属性值
      //这样就可以让新增的属性也有数据绑定
      Vue.set(food, 'count', 1)
      //多个引用变量指向同一个对象，一个引用变量改变对象的数据，其他引用变量也可以看见
      //两个应用变量指向同一个对象， 一个应用变量指向另一个对象，其他引用变量还是指向原来的对象
      //将food添加到cartFoods中
      state.cartFoods.push(food)
    }else{
      food.count ++  //count增加，cartFoods里面也会相应的变化
    }
  },
  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){  //防止count无值导致其为负数（只有有值才去减）
      food.count --
      if(food.count===0){
        //将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART](state){
    //清除food中的count
    state.cartFoods.forEach(food=>food.count=0)
    //移除购物车中所有购物项
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOPS](state,{searchShops}){
    state.searchShops = searchShops
  }
}


