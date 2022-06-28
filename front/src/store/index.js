import {createStore} from 'vuex'
import createVuexAlong from "vuex-along";

const store =  createStore({
    state : {
            isAuth : false,
            name:'',
            logement:'',
            nbr_pers : '',
            date_enter : '',
            date_leave: '',
            transport : '',
            hour_leave : '',
            hour_enter : '',
            reference:'',
            typeTransfert:'',
            payed : '',
            toPay: '',
            idLog : '' ,
            modalite : ''
    },
    mutations : {
        setModalite(state , value){
            state.modalite = value ;
        } ,
        isAuthenticated(state, value){
        state.isAuth = value
        },
        setIdLog(state , value){
            state.idLog  = value
        } ,
        setToPay(state, value){
            state.toPay = value;
        },
        setReference(state,value){
            state.reference = value;
        },
        setTypeTransfert(state,value){
            state.typeTransfert = value;
        },
        setPayed(state,value){
            state.payed = value;
        },
        setModal(state,value){
            state.modalMessage = value;
        },
      
        setHour_enter(state , value){
            state.hour_enter =value
        },
        setNbr_pers(state , value){
            state.nbr_pers = value
        },
        setLogement(state , value){
            state.logement = value
        },
        setDate_enter(state , value){
            state.date_enter = value
        },
        setDate_leave(state , value){
            state.date_leave = value
        },
        setTransport(state , value){
            state.transport = value
        },
        setHour_leave(state , value){
            state.hour_leave = value
        },
    
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
export {store}