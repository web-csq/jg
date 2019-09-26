import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    hasId:1
  },
  mutations: {
    login(state,payload){
      state.isLogin=payload
    },
    hasIdChange(state,payload){
      state.hasId=payload
    }
    

  },
})
