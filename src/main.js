import Vue from 'vue'
import App from './App.vue'
import { router } from "./router"
import { store } from "./store/store"
import VueResource from "vue-resource"

  Vue.use(VueResource);


  // Alış , Satış , Bakiye verilerinin Yazım Şeklini Düzeltmek ve TL Simgesi Ekleme
  Vue.filter("currency" , (value)=> {
    return parseFloat(value).toLocaleString(undefined, {minimumFractionDigits : 2}) + " ₺"
  })

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
