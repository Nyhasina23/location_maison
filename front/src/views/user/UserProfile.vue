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
          <div v-if="showLogement" class="edit-profile relative w-full overflow-x-auto shadow-md sm:rounded-lg">
            <div class="form">
                <h3 class="mt-4 text-2xl mb-4 font-semibold">Vos informations</h3>
                <form class="">
                    <p class="mb-2">
                    <label for="" class="mb-2">Nom</label>
                    <input type="text" v-model="firstname" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Prenoms</label>
                    <input type="text" v-model="lastname" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Email</label>
                    <input type="text" v-model="email" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Adresse</label>
                    <input type="text" v-model="address" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Nouveau mot de passe</label>
                    <input type="password" v-model="password" placeholder="******" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Téléphone</label>
                    <input type="text" v-model="phoneNumber" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p>
                  
                    </p>
                    <p>
                    </p>
                </form>

            </div>
           
                <div class="flex mt-4">
                    <button @click="update" class="btn-valid text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Valider</button>
                </div>

          </div>
          <div v-if="showValidate" class="edit-profile relative w-full overflow-x-auto shadow-md sm:rounded-lg">
            <div class="form">
                <h3 class="mt-4 text-2xl mb-4 font-semibold">Validation de la réservation</h3>
                <form class="">
                    <p class="mb-2">
                    <label for="" class="mb-2">Nom</label>
                    <input type="text" v-model="oneReservation.firstname" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Prenoms</label>
                    <input type="text" v-model="oneReservation.firstname" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Email</label>
                    <input type="text" v-model="oneReservation.email" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Adresse</label>
                    <input type="text" v-model="oneReservation.address" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Date d'arrivée</label>
                    <input type="text" v-model="oneReservation.date_enter" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Date de départ</label>
                    <input type="text" v-model="oneReservation.date_leave" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Heure d'entrée</label>
                    <input type="text" v-model="oneReservation.hour_enter" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Heure de sortie</label>
                    <input type="text" v-model="oneReservation.hour_leave" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Nombre de personne</label>
                    <input type="text" v-model="oneReservation.nbr_pers" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Transport</label>
                    <input type="text" v-model="oneReservation.transport" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Montant Payé</label>
                    <input type="text" v-model="oneReservation.payed" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Logement réservé</label>
                    <input type="text" v-model="userLogement" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p>
                  
                    </p>
                    <p>
                    </p>
                </form>

            </div>
        
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
            payedError : '' ,
            user : '',
            email : '' ,
            password : '' , 
            firstname : '' ,
            lastname : '' ,
            address : '' ,
            phoneNumber : '',
            userLogement : ''
        }
    },
    async mounted() {
              
        await axios.get(process.env.VUE_APP_URL+'/reservation/user' , {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('token') 
            }
        })
        .then((res) => {
            console.log(res);
            this.reservation = res.data
        }).catch(error => {
            console.log(error);
        })

        await axios.get(process.env.VUE_APP_URL+'/user/getOneUser' , {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async (res) => {
            this.user = res.data ;
            this.email = res.data.email ;
            this.firstname = res.data.firstname;
            this.lastname = res.data.lastname;
            this.address = res.data.address;
            this.phoneNumber = res.data.phoneNumber;
           
        }).catch(error => {
            console.log(error);
        })
    
    },

    methods: {
        async update(){
            await axios.put(process.env.VUE_APP_URL+'/user/update' , {
                firstname : this.firstname ,
                lastname : this.lastname ,
                email : this.email ,
                address : this.address ,
                phoneNumber : this.phoneNumber ,
                password : this.password 
            },
            {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
           console.log('update done');
        }).catch(error => {
            console.log(error);
        })

        },
       async getResId(id){
            this.showValidationView()
            localStorage.setItem('idRes' , id)
            // const idRes = localStorage.getItem('idRes')
            await axios.get(process.env.VUE_APP_URL+'/reservation/oneReservation/'+id)
            .then(async (res) => {
                this.oneReservation = res.data
                const idLog = res.data.logement;
                const logement = await axios.get(process.env.VUE_APP_URL+'/logement/getOneLogement/'+idLog)
                this.userLogement = logement.data.name
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
.btn-valid{
    margin-left: 2rem;
    margin-bottom: 2rem;
}
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
.edit-profile{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width : 100%;
}
.input-field{
    margin : 1rem;
}


* {
  box-sizing: border-box;
}

/**************************************/
@media (min-width: 700px) {
  .wrapper {
    overflow: hidden;
  }
  .wrapper > * {
    float: left;
    padding: 2em 2em;
  }
}

@media (min-width: 700px) {
  .contacts {
    width: 30%;
    min-height: 620px;
  }
}

@media (min-width: 700px) {
  .form {
    padding:  2rem 2rem 0rem 2rem;
  }
}

form p {
  float: left;
  width: 49%;
}
form p:not(:nth-child(2n)) {
  margin-right: 2%;
}
form p:last-child {
  clear: both;
  width: 100%;
}
form p:nth-last-child(2) {
  clear: both;
  width: 100%;
}

/**************************************/
body {
  padding: 1rem;
}

.wrapper {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}


ul {
  list-style: none;
  padding: 0;
}

.contacts {
  background: #4b5195;
  color: #fff;
}

.form {
  background: #fff;
}

form label {
  display: block;
  float:left;
}



.contain {
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding: 1em;
}
@media (min-width: 600px) {
  .contain {
    padding: 0;
  }
}

h3,
ul {
  margin: 0;
}

h3 {
  margin-bottom: 1rem;
}



</style>