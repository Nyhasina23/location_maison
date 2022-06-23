<template>
  <div class="logementModal">
      <div class="logement-content">
            <div class="logement-img">
              <p class="para text-2xl mb-2 font-semibold">Réservations</p>
              <p class="mb-8 para">Veuillez glisser les deux boutons sur le calendrier pour choisir votre date de réservation</p>
              <div class="flex w-full ">
                  <div id="draggable-start" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Date d'entrée</div>
                  <div id="draggable-end"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >Date d'arrivée</div>
              </div>
                  <div class="calendar" id="calendar"></div>
                  <button @click="mount" class="text-white mt-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Reéssayer</button>
            </div>
            <div class="logement-detail">
                <h1 class="text-xl mb-10 mt-4 font-semibold">Vos Informations</h1>
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre de personne</label>
                    <input type="number" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date d'entrée</label>
                    <input type="text" v-model="startDisplay" disabled id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date de sortie</label>
                    <input type="text" v-model="endDisplay" disabled id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                
                 <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Heure d'entrée</label>
                    <input type="time" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                 <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Heure de sortie</label>
                    <input type="time" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>

                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Logement</label>
                 <select id="countries" class="bg-gray-50 mb-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Non payé</option>
                    <option>avec acompte</option>
                    <option>payé</option>
                 </select>
                 <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Transport</label>
                 <select id="countries" class="bg-gray-50 mb-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Non payé</option>
                    <option>avec acompte</option>
                    <option>payé</option>
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
                                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Veuillez entrer la référence de votre paiement</h3>
                                <form class="space-y-6" action="#">
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Référence</label>
                                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                    </div>
                                    <div>
                                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Type de transfert</label>
                                         <select id="countries" class="bg-gray-50 mb-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                             <option>Non payé</option>
                                             <option>avec acompte</option>
                                             <option>payé</option>
                                         </select>
                                    </div>
                                    <p class="text-sm underline" >Total à payer</p>
                                    <p class="text-xl">150 000 AR</p>
                                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider réservation</button>
                                  
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 

                <a class="btn-primary" @click="showDetail" data-modal-toggle="authentication-modal">Reserver</a>
            </div>
    </div>
  </div>
</template>

<script>

import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {Draggable} from "@fullcalendar/interaction";
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
      defaultPrice : 5000 ,
      day : 0 ,
      disponibilityRaw : [] ,

    }
  } ,

 
  methods: {
    async mount(){
      document.getElementById('draggable-start').style.display = 'block'
      document.getElementById('draggable-end').style.display = 'block'
      let disponibility = await this.getDisponibility();

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
                    if((e.start <= this.start && e.end > this.start)) can = false;
                })
                if(can){
                  this.startDisplay = this.start.getDate() + '-' + (this.start.getMonth() + 1 )+ '-' + this.start.getFullYear()
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
                  
                    if((e.start <= this.end && e.end > this.end)) can = false;
                })
                if(can){
                  this.endDisplay = this.end.getDate() + '-' + (this.end.getMonth() + 1 )+ '-' + this.end.getFullYear()
                }else{
                  this.endDisplay = "Choisissez une date valide"
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
    getDisponibility(){
    this.disponibilityRaw = [
          {
            title : 'test' , 
            start : '2022-07-15',
            end : '2022-07-17',
            color : 'red'
          } ,
          {
            title : 'test' , 
            start : '2022-07-20',
            end : '2022-07-23'
          }
      ]
    let disponibility = []
    this.disponibilityRaw.forEach(e => {
      let start = new Date(e.start)
      start.setHours(0,0,0,0)
      let end = new Date(e.end)
      end.setHours(0,0,0,0)
      disponibility.push({
        start , 
        end
      })
    })

    return disponibility;

    }
  }
}
</script>

<style scoped>
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
</style>