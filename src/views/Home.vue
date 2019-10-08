<template>
<div>
  <div class="home">
   <img src="@/assets/logo.png" class="logo" @click="jump">
    <div class="container">
      <el-menu :default-active="active" 
      class="el-menu-demo" 
      :router=true
      mode="horizontal" 
      text-color="#515151"
      active-text-color="#3278e6"
      @select="handleSelect">
        <el-menu-item index="/query">查询快递<br/><div style="font-size:1rem;letter-spacing:.1rem;text-align:center;margin-top:-1.8rem">Query　All</div> </el-menu-item>
        <el-menu-item index="/send" v-if="isLogin">发快递<br/><div style="font-size:1rem;letter-spacing:.1rem;text-align:center;margin-top:-1.8rem">Send　Goods</div></el-menu-item>
        <el-menu-item index="/us">联系我们<br/><div style="font-size:1rem;letter-spacing:.1rem;text-align:center;margin-top:-1.8rem">Connect　Us</div></el-menu-item>
        <el-menu-item index="/pcupload" v-if="isLogin&&!buShow">补全证件<br/><div style="font-size:1rem;letter-spacing:.1rem;text-align:center;margin-top:-1.8rem">Repair ID</div></el-menu-item>
        <el-menu-item index="/login" v-html="isLogin?`我的订单<br/><div style='font-size:1rem;letter-spacing:.1rem;margin-top:-1.8rem;text-align:center;'>My　Order</div>`:`登录下单<br/><div style='font-size:1rem;letter-spacing:.1rem;margin-top:-1.8rem;text-align:center;'>Login　Now</div>`"></el-menu-item>
        <el-menu-item index="/reg">注册账户<br/><div style='font-size:1rem;margin-top:-1.8rem;letter-spacing:.1rem;text-align:center;'>Join　Us</div></el-menu-item>
      </el-menu>
    </div>
  </div>
  <!-- <div style="text-align:center; width:100vw;overflow:hidden" class="img-container">
    <img src="../assets/font1.png" style="position:relative;z-index:-1" >
  </div> -->
  <div class="router">
    <div class="poi-container">
      <transition name="fade" 
        enter-active-class="animated rollIn"
        leave-active-class="animated zoomOutUp"
      >
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view :class="$route.path==='/query'?'posi2':(($route.path==='/login'||$route.path==='/reg')?'posi3':($route.path==='/pcupload'?'posi0':'posi1'))"></router-view>
        </keep-alive>
          <router-view :class="$route.path==='/query'?'posi2':($route.path==='/login'?'posi3':($route.path==='/pcupload'?'posi0':($route.path==='/reg'?'posi4':'posi1')))" v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>
  </div>

  
  
</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'home',
  data(){
    return{
      active:"",
      buShow:false,
    }
  },
  methods:{
    ...mapMutations(['hasIdChange']),
    handleSelect(){

    },
    
    jump(){
      this.$router.push('/query')
    }
  },
  computed: {
      ...mapState(['isLogin','hasId'])
  },
  watch:{
    $route: {
      handler: function(val, oldVal){
        this.active=val.path
      },
      // 深度观察监听
      deep: true
    }
  },
  created () {
    this.active=this.$route.path;
    this.buShow=Boolean(window.sessionStorage.hasId-0)&&Boolean(window.sessionStorage.hasAddr-0)
    // console.log(this.hasId);
    // this.hasIdChange(Number(window.sessionStorage.hasId));
    // console.log(this.hasId)


  },
  components: {
    
  }
}
</script>

<style scoped>
@import '../../public/animate.css';
.home{
  text-align: right;
  border-top: 1px solid #ccc; 
  border-bottom: 1px solid #ccc; 
  width: 100vw;
  overflow: hidden;
}
.container{
    width:69vw;
    float:right;
    margin:.2rem 0 0 0;
}
.container >>> .el-menu.el-menu--horizontal{
  border-bottom: 0;
}
.container >>> .el-menu-item{
  font-size: 2.1rem;
  font-weight: 400;
  padding: .5rem 2rem;
  height:5.8rem;
}
.container >>> .el-menu-item:hover{
  color:#409EFF!important;
}
.logo{
  margin:0 3rem 0 0;
  width: 18rem;
  transition: 2s;
  transform: scale(1.2);
}
.logo:hover{
  cursor: pointer;
  animation: bounceIn 2.5s infinite;
}
.router{
  margin: 0 auto;
  width: 100vw;
  position: relative;
  top: 0;
  left: 0;
}
.poi-container{
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
}
.posi0{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    width: 100vw;
    background: url('../assets/zheng.jpg');
    background-size: cover;
    height: 87vh;
}

.posi1{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  width: 100vw;
  background: url('../assets/bg4.jpg');
  background-size: cover;
  height: 90vh;
  box-shadow: 0 0 20px #c0e6fb;
}
.posi2{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  width: 100vw;
  background: url('../assets/fly1.png');
  background-size: 100% 100%;
  box-shadow: 0 0 20px #c0e6fb;
}
.posi3{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  width: 100vw;
  background: url('../assets/kefu.jpg');
  background-size: cover;
  height: 100vh;
  box-shadow: 0 0 20px #c0e6fb;
}
.posi4{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  width: 100vw;
  background: url('../assets/kefu1.jpg');
  background-size: cover;
  height: 100vh;
  box-shadow: 0 0 20px #c0e6fb;
}
.img-container:hover img{
  animation: flip 2.5s infinite;
}
</style>
