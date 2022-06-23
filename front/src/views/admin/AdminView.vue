<template>
  <div class="admin">
       <div class="leftSideBar">
          <ul>
              <li @click="showCalendarView">Calendrier</li>
              <li @click="showReservationView">Réservations</li>
          </ul>
      </div>
      <div class="right">
          <h3>Vos réservations</h3>
          <div v-if="showReservation" class="reservation">
              <div class="reservationContent">
                  <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                        <div class="p-4">
                            <label for="table-search" class="sr-only">Search</label>
                            <div class="relative mt-1">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
                            </div>
                        </div>
                        <table class="mb-4" >
                             <thead class="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" @click="toggleActive" id="link1"  class="px-6 py-3 link active">
                                        Toutes les réservations
                                    </th>
                                    <th scope="col" @click="toggleActive" id="link2"  class="px-6 py-3 link ">
                                        Non Payé 
                                    </th>
                                    <th scope="col" @click="toggleActive" id="link3" class="px-6 py-3 link">
                                        Avec acompte 
                                    </th>
                                    <th scope="col" @click="toggleActive" id="link4" class="px-6 py-3 link">
                                        Payé
                                    </th>
                                </tr>
                            </thead>
                        </table>

                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nom 
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Date d'entrée
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Date de sortie
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        Ny Hasina
                                    </th>
                                    <td class="px-6 py-4">
                                        15-05-2022
                                    </td>
                                    <td class="px-6 py-4">
                                        20-05-2022
                                    </td>
                                    <td class="px-6 py-4">
                                        Payé
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
              </div>
          </div>
          <div v-if="showCalendar" class="calendar" id="calendar"></div>


      </div>
  </div>
</template>

<script>

import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
export default {
    name : 'AdminView' ,
    data() {
        return {
            showCalendar : true ,
            showReservation : false ,
        }
    },
    mounted() {
         let calendarElement = document.getElementById('calendar')
         let calendar = new Calendar(calendarElement , {
          initialView : 'dayGridMonth' ,
          plugins : [dayGridPlugin , interactionPlugin] ,
          editable : false ,
          droppable : true ,
          events : this.disponibilityRaw ,
        })
          
        calendar.render()
    },

    methods: {
        toggleActive(e){
            const link = document.querySelectorAll('.link');
            for(let i=0; i < link.length;i++){
              if(link[i].id === e.target.id){
                  if(e.target.classList.contains('active')){
                          e.target.classList.remove('active')
                   }else{
                          e.target.classList.add('active')
                   }
              }else{
                link[i].classList.remove('active')
              }
            }
        } ,
        showCalendarView(){
            this.showCalendar = true;
            this.showReservation = false;
            window.location.reload()
            
        },
        showReservationView(){
            this.showReservation = true;
            this.showCalendar = false;
        }
    },
}
</script>

<style scoped>
.active{
    color : rgb(0, 132, 255);
    border-bottom : 2px solid rgb(0, 132, 255);
}
.calendar{
  width:65% ;
}
.admin{
    display: flex;
}
.leftSideBar{
    display: flex;
    flex-direction: column;
    align-items: center;
    flex : 2;
    background: rgb(26, 33, 41);
    height : 100vh;
    width : 100%;

}
.leftSideBar ul{
    width : 100%;
}
.leftSideBar ul li{
    font-size: 1.1rem;
    margin-top:2rem;
    margin-bottom:2rem;
    padding : 1rem;
    background: rgba(255, 255, 255, 0.041);
    border-radius : 0.5rem;
    font-weight: 400;
    color : rgb(247, 247, 247);
    list-style-type: none;
}
.right{
    display: flex;
    flex-direction : column;
    align-items: center;
    margin : 1rem;
    flex : 7;
}
.reservation{
    display : flex ;
    align-items: flex-start;
    flex-direction : column;
    width : 100%;
}
.reservationContent{
    display: flex;
    width : 100%;
}
.link:hover{
    color : rgb(0, 132, 255);
    border-bottom : 2px solid rgb(0, 132, 255);
}

</style>