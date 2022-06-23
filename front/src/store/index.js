import {createStore} from 'vuex'
import createVuexAlong from "vuex-along";

const store =  createStore({
    state : {
            isAuth : false,
            
    },
    mutations : {

    } , 

    getters : {
       
    }
    ,
    actions : {
      
    }, 
    modules : {
    },
    plugins : [
        createVuexAlong({
            name: "store",
            local: { list: 'store', isFilter: true },
          })
    ]
})
export  {store}