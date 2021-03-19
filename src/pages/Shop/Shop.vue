<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
        <!--切换这些路由组件是采用push的方法，而不是replace的方法，
        所以back返回按钮需要将栈中的都一个个取出来才会返回-->
        <!--使用replace模式实现路由跳转-->
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <!--若没有keep-alive，会有问题。
    路由对象都是在切换路由组件时新产生的，则当切换路由组件时，
    所有数据都被重新获取，而购物车内的数据是存在vuex中的，所以会产生不一致-->
    <!--缓存路由组件对象：在浏览器端的内存中将组件对象缓存起来-->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>

</template>


<script>
  import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
  /*import ShopGoods from "./ShopGoods/ShopGoods";
  import ShopRatings from "./ShopRatings/ShopRatings";
  import ShopInfo from "./ShopInfo/ShopInfo";*/
  export default {
    mounted(){
      this.$store.dispatch('getShopInfo')
    },
    components: {
      ShopHeader,
      /*ShopGoods,
      ShopRatings,
      ShopInfo,*/
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
