<template>
  <div class="logementModal">
      <h3>Détails</h3>
      <div class="logement-content">
            <div class="logement-img">
                <img src="../assets/img(1).jpg" alt="">
                <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500</p>
                <FullCalendar class="calendar" 
                    :options="calendarOptions"
                    
                  />
            </div>
            <div class="logement-detail input-field">
                <h3>Vos Informations</h3>
                <input type="text" name="" id="" placeholder="Nom..."   >
                <input type="text" name="" id="" placeholder="Prénoms..." >
                <input type="text" name="" id="" placeholder="Adresse..." >
                <input type="text" name="" id="" placeholder="Tél..." >
                <input type="text" name="" id="" placeholder="mail..." >
                <input type="number" name="" id="" placeholder="Nombre Personne..."  >
                <label for="entrydate">Date d'entrée</label>
                <input type="date" v-model="entryDate" name="" id="entrydate">
                <label for="leavedate">Date de sortie</label>
                <input type="date" v-model="leaveDate" name="" id="leavedate">
                <label for="transport">Transport Ivato /logement </label>
                <select name="" id="transport">
                  <option value="AT">Avec transport aller</option>
                  <option value="ST">Sans transport</option>
                  <option value="AR">Avec aller et retour</option>
                </select>
                <label for="entryhour">Heure d'entrée</label>
                <input type="time" name="" id="entryhour">
                <label for="leavehour">Heure de sortie</label>
                <input type="time" name="" id="leavehour">
                <a class="btn-primary" @click="showDetail">Reserver</a>
            </div>
    </div>
  </div>
</template>

<script>

import FullCalendar from '@fullcalendar/vue3'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
export default {
    name : 'LogementModal' ,
    components : {
        FullCalendar
    },
      data() {
    return {
     calendarOptions: {
        plugins: [ DayGridPlugin, InteractionPlugin , TimeGridPlugin ],
        initialView: 'dayGridMonth' ,
        selectable : true ,
        dateClick : this.handleDateClick ,
        select : this.handleSelect ,
        events: [] , 
        
      } , 
      entryDate : '' ,
      leaveDate : '' ,

      data : [
        {
          title : 'réservé' ,
          start : '2022-06-06' ,
          end : '2022-06-11'
        },
        {
          title : 'réservé' ,
          start : '2022-06-12' ,
          end : '2022-06-15'
        },
      ]

    }
  } ,

  mounted() {
    this.data.forEach(e => {
      let data = {
        title : e.title,
        start : e.start,
        end : e.end
      }
      this.calendarOptions.events.push(data);
      
    })
  },
  methods: {
   
    handleSelect(arg){
      console.log(arg);
        this.entryDate = arg.startStr
        this.leaveDate = arg.endStr
        this.calendarOptions.events.push(
        { title : 'je reserve' , 
          start : this.entryDate ,
          end : this.leaveDate ,
          color : 'green' , 
          allDay : true
        });

    }
  },
}
</script>

<style scoped>
.calendar{
  width:80% ;
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
    width: 87%;
    margin-top: 1rem;
}
.logement-detail .btn-primary:hover{
    background: rgb(211, 2, 2);
}

.input-field input{
  padding : 0.7rem;
  margin : 0.7rem 0.5rem 0.7rem 0.5rem;
  width: 90%;
}
.input-field select{
  padding : 1rem;
  margin : 0.5rem;
  width: 95%;
}
</style>