<template>
    <div id="app">
      <router-view></router-view>
      <FooterGuide v-show="$route.meta.showFooter"/>  <!--FooterGuide的显示/隐藏：通过路由的meta-->
    </div>
</template>

<script>
  //用映射函数
  import {mapActions} from 'vuex'
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'

  export default {
    mounted(){
      this.getAddress()    //或者this.$store.dispatch('getAddress')
      this.getUserInfo()   //实现自动登录效果，刷新界面或关闭浏览器再打开都不会退出登录
    },
    methods: {
      ...mapActions(['getAddress', 'getUserInfo'])
    },
    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5

</style>
