<template>
  <div class="logementModal">
      <div class="logement-content">
            <div class="logement-img">
              <p class="para text-2xl mb-2 font-semibold"> {{$t('bookings')}} </p>
              <p class="mb-8 para text-left"> {{$t('book_head')}} </p>
              <div class="flex w-full ">
                  <button @click="mount" class="text-white mt-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{{$t('try')}}</button>
                  <div id="draggable-start" class="toDrag"> {{$t('entry_date')}} </div>
                  <div id="draggable-end"  class="toDrag" > {{$t('release_date')}} </div>
              </div>
                  <div class="calendar" id="calendar"></div>
            </div>
            <div class="logement-detail">
                <h1 class="text-xl mb-10 mt-4 font-semibold"> {{$t('info')}} </h1>
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> {{$t('nbr_pers')}} </label>
                    <input type="number" v-model="nbr_pers" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> {{$t('entry_date')}} </label>
                    <input type="text" v-model="startDisplay" disabled id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                </div>
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> {{$t('release_date')}} </label>
                    <input type="text" v-model="endDisplay" disabled id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                
                 <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> {{$t('entry_time')}} </label>
                    <input type="time" id="base-input" v-model="entry_hour" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                
                </div>
                 <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> {{$t('exit_time')}} </label>
                    <input type="time" id="base-input" v-model="leave_hour" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>

                 <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"> {{$t('transport')}}</label>
                 <select id="countries" v-model="transport" class="bg-gray-50 mb-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="AT" >{{$t('AT')}} </option>
                    <option value="ST" > {{$t('ST')}}</option>
                    <option value="AR" > {{$t('AR')}}</option>
                 </select>

                <!-- Main modal -->

                <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                        <!-- Modal content -->
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                            </button>
                            <div class="py-6 px-6 lg:px-8">
                                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white"> {{$t('payment_ref')}}</h3>
                                <form class="space-y-6" action="#">
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> {{$t('ref')}}</label>
                                        <input v-model="reference" type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="">

                                    </div>
                                    <div>
                                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"> {{$t('transfer')}}</label>
                                         <select id="countries" v-model="transfert" class="bg-gray-50 mb-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                             <option>MVola</option>
                                             <option>BNI</option>
                                             <option>Paypal</option>
                                         </select>
                                    </div>
                                    <p class="text-sm methode" >Mvola : +2613489758426</p>
                                    <p class="text-sm methode" >BNI : 108 1235 45 5452</p>
                                    <p class="text-sm methode" >Paypal : nyhasina@gmail.com</p>
                                    <p class="text-sm underline" > {{$t('toPay')}}</p>
                                    <p class="text-xl">{{price ? price : '0'}} AR</p>
                                    <button type="button" @click="sendReservation" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> {{$t('confirm_res')}}</button>
                                  
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 

                <button class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" data-modal-toggle="authentication-modal" @click="submitReservation">{{$t('reserve')}}</button>
            </div>

            <div v-if="success" id="popup-modal" tabindex="-1" class="modals overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
                <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      
                        <div class="p-6 text-center check-modal">
                            <img src="../assets/check.svg" class="img-check mb-4" alt="">
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Votre réservation à été envoyée</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="error" id="popup-modal" tabindex="-1" class="modals overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
                <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                      
                        <div class="p-6 text-center check-modal">
                            <img src="../assets/error.svg" class="img-check mb-4" alt="">
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Votre réservation n'a pas été envoyée , veuillez réessayer</h3>
                            <div class="flex">
                              <a href="/" data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                  Annuler
                              </a>
                              <button @click="disableError" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Réessayer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  </div>
</template>

<script>

import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {Draggable} from "@fullcalendar/interaction";
import axios from 'axios'
export default {
    name : 'ReservationDetail' ,
    components : {
    },
    async mounted() {

      let startEl = document.getElementById('draggable-start')
      let endEl = document.getElementById('draggable-end')
      
        new Draggable(startEl , {
          
          eventData : function(){
            return {
              title : 'Start' ,
            }
          },
        })
        new Draggable(endEl , {
          
          eventData : function(){
            return {
              title : 'End' ,
            }
          },
        })


      document.addEventListener('DOMContentLoaded' , () => {
       
       this.mount()


      })
    },
      data() {
    return {
      start : undefined ,
      end : undefined ,
      startDisplay : '' ,
      endDisplay : '' ,
      price : 0 ,
      defaultPrice : '' ,
      day : 0 ,
      disponibilityRaw : [] ,
      nbr_pers : '' ,
      entry_hour : '' ,
      leave_hour : '' ,
      transport : '' ,
      reference : '' ,
      transfert : '' ,
      success : false ,
      error : false ,

    }
  } ,

 
  methods: {
    disableError(){
      this.error = false
    },
    async mount(){
      document.getElementById('draggable-start').style.display = 'block'
      document.getElementById('draggable-end').style.display = 'block'

      let disponibility = await this.getDisponibility();
      console.log(this.disponibilityRaw)
      for(let i=0; i<this.disponibilityRaw.length; i++){
        this.disponibilityRaw[i].color = "#3788d8"
      }
       let calendarElement = document.getElementById('calendar')
        let calendar = new Calendar(calendarElement , {
          initialView : 'dayGridMonth' ,
          plugins : [dayGridPlugin , interactionPlugin] ,
          editable : false ,
          droppable : true ,
          events : this.disponibilityRaw ,
          eventAllow : (info , event) => {

              let now = new Date(Date.now());
              now.setHours(0,0,0,0)

              if( event._def.title == 'Start' ){
                let can = false ;
                this.start = new Date(info.start)
                this.start.setHours(0,0,0,0)

                if(this.end){
                  if(this.end >= this.start) can = true
                  if(can){
                    let dateCount = ((this.end - this.start) / (1000 * 60 * 60 * 24 )) + 1 
                    if(dateCount > 0 ){
                      for(let i = 0 ; i < dateCount; i++) {
                        for(let j = 0; j < disponibility.length; j++) {

                          if( disponibility[j].start >= this.start && disponibility[j].end <= this.end){
                            can = false
                          }
                          if(!can) {break;}
                        }
                        if(!can) {break;}
                      }
                      if(!can) return false;
                    }
                  }
                }else{
                  if(this.start >= now) can =  true
                }

                disponibility.forEach(e => {
                    const date = new Date(e.end);
                    let tempEnd = date.setDate(date.getDate()+1);
                    if((e.start <= this.start && tempEnd > this.start)) can = false;
                })
                if(can){
                  let month; 
                  let day;
                  if(this.start.getDate() < 10){
                    day = '0'+this.start.getDate()
                  }else{
                    day = this.start.getDate()
                  }

                  if((this.start.getMonth() + 1) < 10 ){
                      month = '0'+(parseInt(this.start.getMonth()) + 1)
                  }else{
                    month = parseInt(this.start.getMonth()) + 1
                  }
                      this.startDisplay = this.start.getFullYear() + '-'+ month + '-' + day
                }else{
                  this.startDisplay = "Choisissez une date valide"
                }
                return can;
              }
              if( event._def.title == 'End' ){
                // eslint-disable-next-line
                let can = false ;
                this.end = new Date(info.start)
                this.end.setHours(0,0,0,0)
                
                if(this.start){
                    if(this.start <= this.end) can =  true
                    if(can){
                    let dateCount = ((this.end - this.start) / (1000 * 60 * 60 * 24 )) + 1 
                    if(dateCount > 0 ){
                      for(let i = 0 ; i < dateCount; i++) {
                        for(let j = 0; j < disponibility.length; j++) {
                          if( disponibility[j].start >= this.start && disponibility[j].end <= this.end){
                            can = false
                          }
                          if(!can) {break;}
                        }
                        if(!can) {break;}
                      }
                      if(!can) return false;
                    }
                  }
                }else{
                  if(this.end >= now ) can =  true
                }
                disponibility.forEach(e => {
                    const date = new Date(e.end);
                    let tempEnd = date.setDate(date.getDate()+1);
                    if((e.start <= this.end && tempEnd > this.end)) can = false;
                })
                
                if(can){

                  let month; 
                  let day;
                  if(this.end.getDate() < 10){
                    day = '0'+this.end.getDate()
                  }else{
                    day = this.end.getDate()
                  }

                  if((this.end.getMonth() + 1) < 10 ){
                      month = '0'+(parseInt(this.end.getMonth()) + 1)
                  }else{
                    month = parseInt(this.end.getMonth()) + 1
                  }

                  this.endDisplay = this.end.getFullYear() + '-'+ month + '-' + day
                }else{
                  this.endDisplay = "Choisissez une date valide"
                  this.end = false;
                }
               return can;
              }

          } ,
          drop : (info) => {
            info.draggedEl.style.display = 'none'

          }
   
        })
          
        calendar.render()
    } ,
    async getDisponibility(){
    const idLog = this.$store.state.idLog;
    let disponibility = []
    await axios.get(process.env.VUE_APP_URL+'/logement/getOneLogement/'+idLog)
    .then((res) => {
        this.defaultPrice = res.data.price[0].date.value
        this.disponibilityRaw = res.data.disponibility;
        this.disponibilityRaw.forEach(e => {
          let start = new Date(e.start)
          start.setHours(0,0,0,0)
          let end = new Date(e.end)
          end.setHours(0,0,0,0)
          disponibility.push({
            start , 
            end ,
          })
        })
        let dispo =  res.data.disponibility;
        for(let i = 0; i<dispo.length; i++){
          const date = new Date(dispo[i].end);
          date.setDate(date.getDate() + 1);
          dispo[i].end = date;
          dispo[i].allDay = true;
        }
    }).catch(error => { 
      console.log(error);
    }) 

    return disponibility;

    },

    submitReservation(){

      this.$store.commit('setNbr_pers' , this.nbr_pers);
      this.$store.commit('setHour_enter' ,this.entry_hour);
      this.$store.commit('setHour_leave' ,this.leave_hour);
      this.$store.commit('setTransport' ,this.transport);
      const toPay = this.defaultPrice * ((new Date(this.endDisplay).setHours(0,0,0,0) - new Date(this.start).setHours(0,0,0,0) ) / (1000 * 60 * 60 * 24 ) + 1)
      this.$store.commit('setToPay' , toPay)
      this.price = toPay

      
    } ,
    async sendReservation(){
      const nbr_pers = this.$store.state.nbr_pers;
      const idLog = this.$store.state.idLog;     
      const date_enter = this.startDisplay;
      const date_leave = this.endDisplay;
      const transport = this.$store.state.transport;
      const hour_enter = this.$store.state.hour_enter;
      const hour_leave = this.$store.state.hour_leave;
      const toPay = this.$store.state.toPay;

      await axios.post(process.env.VUE_APP_URL+'/reservation/' , {
          logement : idLog ,
          nbr_pers,
          date_enter,
          date_leave,
          transport,
          hour_enter,
          hour_leave,
          reference : this.reference,
          typeTransfert : this.transfert,
          toPay
      } , {
        headers : {
          Authorization : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(async () => {
        this.success = true;
        setTimeout( () => {
            window.location.href = '/'
          } , 2000)
      }).catch((error) => {
          console.log('error while sending reservation : ',error);
          this.success = false;
          this.error = true

      })


    }
  }
}
</script>

<style scoped>
.toDrag{
  margin:8px;
  padding: 1px 2px;
  border-radius: 3px;
  font-size: .85em;
  position: relative;
  white-space: nowrap;
  background-color: #3788d8;
  border: 1px solid #3788d8;
  display: block;
  font-stretch: inherit;
  font-weight: inherit;
  line-height: inherit;
  font-family: inherit;
  box-sizing: inherit;
  color: white;
  height:fit-content;
  width: 155px;
  
}
.text-sm.methode{
  margin-top : 0 !important;
  padding: 0 !important;
}
.calendar{
  width:100% ;
}
.logement-content{
    display: flex;
    width: 100%;
    margin-right: 1rem;
    margin-bottom: 1rem;
}
.logement-img {
    display: flex;
    flex-direction: column;
    flex: 5;
    align-items: center;
    justify-content: center;
    padding: 2%;
}
.logement-img img {
    width : 100% ;
    height: 100%;
    object-fit: cover;
}
.logement-detail {
    display: flex;
    flex: 3;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-left: 1.2rem;
    margin-right: 1.2rem;
    padding: 1rem;

}
.logement-detail h3 {
    margin-top: 1rem;
}

.logement-detail .btn-primary{
    text-decoration: none;
    color : white ;
    padding : 0.8rem 1rem 0.8rem 1rem;
    background: red;
    border: 2px solid red;
    width: 100%;
    margin-top: 1rem;
}
.logement-detail .btn-primary:hover{
    background: rgb(211, 2, 2);
}
.mb-6{
  width : 100%;
}
.logement-detail label {
  font-size: 0.9rem;
}
.para{
    width: 100%;
    align-items: flex-start;
    display: flex;
}
.img-check{
  width : 3.5rem;
}
.check-modal{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
#popup-modal{
  background: #000000ad;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>