<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <!--stop阻止事件冒泡，因为点击该div会影响到外层上，触发Food组件显示-->
    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
  export default {
    props: {
      food: Object,
    },
    methods: {
      updateFoodCount(isAdd){  //因为更新food的属性，food是goods里的，所以应该使用vuex去触发更新
        this.$store.dispatch('updateFoodCount',{isAdd, food:this.food})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active  /*添加（0加1）（1减0）左右移动的效果*/
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)  /*平移+旋转*/
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
