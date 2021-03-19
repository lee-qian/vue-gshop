<template>
  <div>
    <div class="goods">
      <!--左侧菜单列表-->
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--右侧食物列表-->
      <div class="foods-wrapper">
        <ul ref="foodsUi">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <!--添加组件Food，具体为某个食物的详情-->
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from "../../../components/CartControl/CartControl"
  import Food from '../../../components/Food/Food'
  import ShopCart from "../../../components/ShopCart/ShopCart";

  export default {
    data(){
      return {
        scrollY: 0, //右侧滑动的Y轴坐标（滑动过程中实时变化）
        tops: [],  //所有右侧分类li的top组成的数组（列表第一次显示后就不再变化）
        food: {},  //需要显示的food
      }
    },
    mounted(){  //可以采用监视watch，也可以采用以下回调函数
      this.$store.dispatch('getShopGoods', ()=>{  //数据更新后执行
        this.$nextTick(()=>{   //列表数据更新显示后，立即调用（此语句要写在更新数据之后）
          this._initScroll()
          this._initTops()
        })
      })  //异步触发action调用
    },

    computed: {
      ...mapState(['goods']),  //从vuex中的state读取数据
      currentIndex(){   //计算得到当前分类的下标 （初始和相关数据发生了变化）
        //得到条件数据
        const {scrollY, tops} = this
        //根据条件计算产生一个结果
        const index = tops.findIndex((top, index)=>{
          return scrollY >= top && scrollY < tops[index+1]
        })
        //返回结果
        return index
      }
    },
    methods:{   //methods一般放事件回调函数的相关方法，_可以区分开
      _initScroll(){  //初始化滚动
        new BScroll('.menu-wrapper', {
          click: true
        })  //列表显示以后创建
        this.foodsScroll = new BScroll('.foods-wrapper',{
          probeType: 2,  //手指离开后不会触发（惯性不会触发）
          click: true,
        })
        //给右侧列表绑定scroll监听,(一旦监听到就返回scrollY)
        this.foodsScroll.on('scroll',({x, y})=>{ //一定要写{x,y},不能直接写 x,y
          this.scrollY = Math.abs(y)   //x=0
        })
        //给右侧列表绑定scroll结束监听（防止惯性滑动结束后没有返回scrollY导致左侧不懂）
        this.foodsScroll.on('scrollEnd', ({x, y})=>{
          this.scrollY = Math.abs(y)   //因为手指离开以后没有收集scrollY的值，所以左侧不会更新
        })
      },
      _initTops(){   //初始化tops
        const tops =[]
        let top =0
        tops.push(top)
        const lis = this.$refs.foodsUi.getElementsByClassName('food-list-hook')  //找到所有分类的li
        Array.prototype.slice.call(lis).forEach(li=>{  //得到各个分类框的长度
          top += li.clientHeight
          tops.push(top)
        })
        this.tops = tops  //一旦tops收集好后就不再变化，随着页面的滑动变化的是scrollY
      },
      clickMenuItem(index){  //左侧点击后右侧滑动到相应的位置
        //使右侧列表滑动到相应的位置
        const scrollY = this.tops[index]  //获取对应下标的scrollY的值
        this.scrollY = scrollY  //立即更新scrollY（让当前的分类项成为当前分类）
        this.foodsScroll.scrollTo(0, -scrollY, 300)  //使右侧0.3s时间滑到相应的位置
      },
      showFood(food){  //显示点击的food
        //设置food(添加到要显示的Food组件中的food对象中)
        this.food = food
        //显示food组件(在父组件中调用子组件函数，即去调用子组件对象)
        this.$refs.food.toggleShow()
      }
    },
    components:{
      CartControl,
      Food,
      ShopCart,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
