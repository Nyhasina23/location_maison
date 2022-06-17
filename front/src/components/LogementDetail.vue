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
                <input  type="date" name="" id="entrydate">
                <label for="leavedate">Date de sortie</label> 
                <input type="date" name="" id="leavedate">
                <label for="transport">Transport Ivato / Logement</label>
                <select name="" id="transport">
                  <option value="AT avec transport aller">AT avec transport aller</option>
                  <option value="ST sans transport ">ST sans transport </option>
                  <option value="AR avec aller et retour">AR avec transport aller et retour </option>
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
        eventClick : this.handleSelect ,
        events: [
          { title: 'réservé', date: '2022-06-16' },
          { title: 'réservé', date: '2022-06-17' , color: 'red' }
        ] , 
        
      }

    }
  } ,

  methods: {
    handleDateClick(arg){
      console.log(arg);
        this.calendarOptions.events.push({title : 'test' , date : arg.dateStr , color : 'green'});
        console.log(this.calendarOptions.events);
    },
    handleSelect(arg){
      console.log(arg)
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
  width: 95%;
  padding : 1rem;
}
label {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>