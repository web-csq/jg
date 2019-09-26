import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Us from './views/Us.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        keepAlive:false
      },
      redirect:"/query",
      children:[
        {
          path: '/query',
          name: 'query',
          meta:{
            keepAlive:false
          },
          component: ()=>import('./views/Query.vue'),
        },
        {
          path: '/send',
          name: 'send',
          meta:{
            keepAlive:false
          },
          component: ()=>import('./views/Send.vue'),
        },
        {
          path: '/us',
          name: 'us',
          meta:{
            keepAlive:true
          },
          component: Us,
        },
        {
          path: '/login',
          name: 'login',
          meta:{
            keepAlive:false
          },
          component: ()=>import('./views/Login.vue'),
        },
        {
          path: '/reg',
          name: 'reg',
          meta:{
            keepAlive:false
          },
          component: ()=>import('./views/Register.vue'),
        },
        {
          path:"/pcupload",
          name:"pcupload",
          component:()=>import('./views/PcUpload.vue')
        }
      ]
    },
    {
      path:"/qrcode",
      name:"qrcode",
      component:()=>import('./views/Qrcode.vue')
    },
    {
      path:"/upload",
      name:"upload",
      component:()=>import('./views/Upload.vue')
    }
  ]
})
