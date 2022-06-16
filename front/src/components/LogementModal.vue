<template>
  <div class="logementModal">
      <h3>Détails</h3>
      <div class="logement-content">
            <div class="logement-img">
                <img src="../assets/img(1).jpg" alt="">
                <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500</p>
                <FullCalendar :options="calendarOptions" />
            </div>
            <div class="logement-detail input-field">
                <h3>Vos Informations</h3>
                <input type="text" name="" id="" placeholder="Nom..."   >
                <input type="text" name="" id="" placeholder="Prénoms..." >
                <input type="text" name="" id="" placeholder="Adresse..." >
                <input type="text" name="" id="" placeholder="Tél..." >
                <input type="text" name="" id="" placeholder="mail..." >
                <input type="number" name="" id="" placeholder="Nombre Personne..."  >
                <p>RC </p>
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
        initialView: 'dayGridMonth'
      }

    }
  }
}
</script>

<style scoped>

.logement-content{
    display: flex;
    width: 100%;
    height: 20rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
}
.logement-img {
    display: flex;
    flex-direction: column;
    flex: 5;
    overflow: scroll;
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
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 1rem;

}
.logement-detail h3 {
    margin-top: 1rem;
}
.logement-detail .btn-primary{
    padding: 2rem;
    text-decoration: none;
    color : white ;
    padding : 0.5rem 1rem 0.5rem 1rem;
    background: red;
    border: 2px solid red;
    width: 80%;
}

.input-field input{
  padding : 0.7rem;
  margin : 0.5rem;
  width: 90%;
}
</style>