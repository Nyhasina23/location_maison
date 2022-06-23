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
            hour_leave : [],
            hour_enter : [],
            reference:'',
            typeTransfert:'',
            payed : '',
            toPay: {}
    },
    mutations : {
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
        isAuhtenticated(state , status){
            state.isAuth = status
        },
        setModal(state,value){
            state.modalMessage = value;
        },
        setName(state , value){
            state.name = value
        },
        setHour_enter(state , value){
            state.hour_enter.push(value)
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
            state.hour_leave.push(value)
        },
        deleteContact(state){
            state.contact  = []
        },
        deleteCategory(state){
            state.category = []
        },
        deleteDeviantWalletId(state){
            state.deviantWalletId = []
        },
        deleteCoordonates(state){
            state.coordonates = []
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
export  {store}