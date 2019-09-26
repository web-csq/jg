import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

import { Button, 
  Select,
  Menu,
  Submenu,
  MenuItem, 
  Input,
  Loading,
  Form,
  FormItem,
  Timeline,
  TimelineItem,
  Option,
  Dialog,
  Table,
  TableColumn,
  Pagination,
  Upload,
  Notification 
} from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Button).use(Select)
.use(Menu).use(Submenu)
.use(MenuItem)
.use(Input)
.use(Loading)
.use(Form)
.use(FormItem)
.use(Timeline)
.use(TimelineItem)
.use(Option)
.use(Dialog)
.use(Table)
.use(TableColumn)
.use(Pagination)
.use(Upload);


import { NoticeBar,
  Uploader ,
  Toast 
 } from 'vant';
import 'vant/lib/index.css';
Vue.use(NoticeBar)
.use(Uploader)
.use(Toast);



import Axios from 'axios';
import QS from 'qs'
let axios = Axios.create({
  baseURL:"http://www.geeseexpress.com/index",
  timeout:10000,
  headers:{
    "content-type":"application/x-www-form-urlencoded"
  }
})

let loading
axios.interceptors.request.use(config=>{

  // loading=Loading.service();

    return config
  
},err=>{
  alert("网络错误");
  // loading.close();
  return Promise.reject(err);
  
 
})


axios.interceptors.response.use(response=>{

  if(response){
    // loading.close();
    return response
  }
},err=>{
  alert("网络错误");
  // loading.close();
  return Promise.reject(err);
})
Vue.prototype.$axios=axios;
Vue.prototype.qs=QS;
let isLogin=false
Vue.prototype.$isLogin=isLogin;




router.beforeEach((to, from, next) => {
 

  if(window.sessionStorage.uid){
    store.commit('login', true)

  }
  

  next()
  
})

import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}







new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
