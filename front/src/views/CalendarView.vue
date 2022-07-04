<template>
  <div class="fullcalendar">
    <div class="mt-8">
        <router-link to="/admin" class="text-white mt-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Retour</router-link>
    </div>
    <div class="calendar" id="calendar">

  </div>

  </div>
</template>

<script>

import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios'
export default {
    name : 'CalendarView',
    data() {
        return {
            disponibilityRaw : []
        }
    },
    async mounted() {
    
    const idLog = this.$store.state.idLog;
    await axios.get(process.env.VUE_APP_URL+'/logement/getOneLogement/'+idLog)
    .then((res) => {
        
       let calendarElement = document.getElementById('calendar')
        let dispo =  res.data.disponibility;
        for(let i = 0; i<dispo.length; i++){
          const date = new Date(dispo[i].end);
          date.setDate(date.getDate() + 1);
          dispo[i].end = date;
          dispo[i].allDay = true;
        }

       let calendar = new Calendar(calendarElement , {
          initialView : 'dayGridMonth' ,
          plugins : [dayGridPlugin , interactionPlugin] ,
          editable : false ,
          droppable : true ,
          events : dispo,
        })
          
    calendar.render()

    }).catch(error => {
        console.log(error);
    }) 

    },
} 
</script>

<style scoped>
.calendar{
  width:65% ;
  margin : 1rem;
}
.fullcalendar{
    width : 100%;
    display: flex;
    flex-direction : column;    
    align-items: center;
    justify-content: center;
}
</style>