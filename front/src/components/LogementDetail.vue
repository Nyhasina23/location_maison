<template>
  <div class="logementModal">
      <h3>Détails</h3>
      <div class="logement-content">
            <div class="logement-img">
                <!-- <img src="../assets/img(1).jpg" alt=""> -->
                <!-- <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500</p> -->
                <!-- <FullCalendar class="calendar" 
                    :options="calendarOptions"
                    
                  /> -->
                  <div class="calendar" id="calendar"></div>
                  <div id="draggable-start"  >Start</div>
                  <div id="draggable-end"  >End</div>
                  <button @click="mount">Reéssayer</button>
            </div>
            <div class="logement-detail input-field">
                <h3>Vos Informations</h3>
              
                <input type="number" name="" id="" placeholder="Nombre Personne..."  >
                <p> Premier </p>
                <p> {{startDisplay}} </p>
                <p> Dernier Jour </p>
                <p> {{endDisplay}} </p>
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
                <h4> {{day}} jours </h4>
                <h3>Total = {{price}} Ariary</h3>
                <a class="btn-primary" @click="showDetail">Reserver</a>
            </div>
    </div>
  </div>
</template>

<script>

import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {Draggable} from "@fullcalendar/interaction";
export default {
    name : 'LogementModal' ,
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