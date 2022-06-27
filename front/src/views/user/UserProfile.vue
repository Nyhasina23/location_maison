<template>
  <div class="admin">
       <div class="leftSideBar">
          <ul>
              <li @click="showLogementView">Profile</li>
              <li @click="showReservationView">Réservations</li>
          </ul>
      </div>
      <div class="right">

          <router-view></router-view>

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
                                <tr v-for="res in reservation" v-bind:key="res._id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {{res.firstname}}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{res.date_enter}}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{res.date_leave}}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{  oneReservation.state === 4  ?   'Annulé' :  res.state === 3 ?  'Non payé' :  res.state === 2 ?  'Avec acompte' : 'Payé' }}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <a href="#"  @click="getResId(res._id) " class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
              </div>
          </div>
          <div v-if="showLogement" class="w-full">
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
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nom 
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Type
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Réservations
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Calendar</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="log in logement" v-bind:key="log._id"  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                       {{log.name}}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{log.type}}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{log.description}}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{log.reservation.length}}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <router-link to="/logement/calendar" @click="showCalendarView(log._id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Calendar</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>



          </div>
          <div v-if="showValidate" class="editReservation">
             <form>
             <p class="mt-4 text-2xl mb-4 font-semibold">Validation de la réservation</p>
                 <div class="mb-6">
                     <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom</label>
                     <input type="text" v-model="oneReservation.firstname" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required>
                 </div>
                 <div class="mb-6">
                     <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prénoms</label>
                     <input type="text" v-model="oneReservation.lastname" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
                 </div>
                 <div class="mb-6">
                     <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                     <input type="text" v-model="oneReservation.email" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
                 </div>
                 <div class="mb-6">
                     <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Adresse</label>
                     <input type="text" v-model="oneReservation.address" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
                 </div>
                 <div class="mb-6">
                     <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Payé</label>
                     <input type="text" v-model="payed" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                     <p v-if="payedError" class="error p-4 mt-2 text-sm text-red-700 bg-red-100 rounded dark:bg-red-200 dark:text-red-800" role="alert">{{ payedError }}</p>
                 
                 </div>
             </form>
          </div>

      </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
    name : 'UserProfile' ,
    data() {
        return {
            showLogement : true ,
            showReservation : false ,
            showValidate : false ,
            showCalendar : true ,
            reservation : '' ,
            oneReservation : '' ,
            logement : '' ,
            payed : '',
            payedError : ''
        }
    },
    async mounted() {
              
        await axios.get(process.env.VUE_APP_URL+'/reservation/user' , {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('token') 
            }
        })
        .then((res) => {
            this.reservation = res.data
        }).catch(error => {
            console.log(error);
        })

        await axios.get(process.env.VUE_APP_URL+'/logement/list')
        .then((res) => {
            this.logement = res.data
        }).catch(error => {
            console.log(error);
        })
    
    },

    methods: {
       async getResId(id){
            this.showValidationView()
            localStorage.setItem('idRes' , id)
            const idRes = localStorage.getItem('idRes')
            await axios.get(process.env.VUE_APP_URL+'/reservation/oneReservation/'+idRes)
            .then((res) => {
                this.oneReservation = res.data
            }).catch(error => {
                console.log(error);
            })
        },
        async validChange(){
            if(this.payed == ''){
            this.payedError = 'ce champ est requis'
        }else{
            const idRes = localStorage.getItem('idRes')
            axios.put(process.env.VUE_APP_URL+'/reservation/validate/' , {
                reservation : idRes , 
                payed : this.payed,
            }).then(() => {
            }).catch(error => {
                console.log(error);
            })
        }
            
        } ,

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
        showLogementView(){
            this.showLogement = true;
            this.showReservation = false;
            this.showCalendar = false;
            this.showValidate = false;
            
        },
        showReservationView(){
            this.showReservation = true;
            this.showCalendar = false;
            this.showLogement = false;
            this.showValidate = false;
            
        },
        showValidationView(){
            this.showValidate = true;
            this.showReservation = false;
            this.showLogement = false;
            this.showCalendar = false;
        },
        showCalendarView(id){
            this.showCalendar = true;
            this.showValidate = false;
            this.showReservation = false;
            this.showLogement = false;
            localStorage.setItem('idLog' , id)
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
.editReservation{
    width : 100%;
    display : flex;
    align-items: center;
    justify-content: center;
}
.editReservation form{
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.editReservation label{
    align-items: start;
    width: 100%;
    display: flex;
    font-size: 0.9rem;
}
.admin{
    display: flex;
    height: 100%;
}
.leftSideBar{
    display: flex;
    flex-direction: column;
    align-items: center;
    flex : 2;
    background: rgb(26, 33, 41);
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
    height: 100vh;
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