import Vue from "vue";
import { router } from "../../router";

const state = {
    products : []
}

const getters = {
    getProducts(state){
        return state.products;
    },
    getProduct(state){
            return key => state.products.filter(element => {
                return element.key == key;
        })
    }
}

const mutations = {
    updateProductList(state,product){
        
        // Uyuglamadan Gelen Product İçerisindeki Bilgileri Listelenmesi İçin Pushlama

        state.products.push(product)
    }
}

const actions = {
    initApp({commit}){
       // Firebase'den ProductList Getirme

       Vue.http.get("https://urun-islemleri-uygulamas-aa333-default-rtdb.firebaseio.com/products.json")
       .then(response => {
        console.log(response.body)

        let data = response.body;
        for(let key in data){
            // datanın içerisindeki gelicek olan key değerini datadaki key'den al
            data[key].key = key;
            commit("updateProductList",data[key])
        }
       })
    },
    saveProduct({dispatch, commit , state}, product){
        // Verileri Firebase'e Göndermek
        Vue.http.post("https://urun-islemleri-uygulamas-aa333-default-rtdb.firebaseio.com/products.json" ,product)
        .then((response) => {

                        // Ürün Listesinin Güncellenmesi
            
            product.key = response.body.name;
            commit("updateProductList",product)

            /************ Alış , Satış, Bakiye Bilgilerinin Güncellenmesi */

            let tradeResult = {
                purchase : product.price,
                sale : 0,
                count : product.count
            }

            dispatch("setTradeResult", tradeResult)

            // Kaydet Dedikten Sonra Anasayfaya Dönmeyi Sağlamak

            router.replace("/");


        })
    },
    sellProduct({commit},payload){
        // Vue Resource İşlemleri...
    }
    
}

export default {
    state,
    getters,
    mutations,
    actions
}

