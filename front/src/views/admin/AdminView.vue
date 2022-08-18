/* eslint-disable */
<template>
  <div v-if="adminStatus" class="admin">
       <div class="leftSideBar">
          <ul>
             <li v-if=" adminStatus > 1" @click="showAddLogement" class="cursor-pointer">
                <span>
                    <box-icon type='solid' name='clinic' class="mr-2"></box-icon>
                    Ajouter Logement
                </span>
              </li>
              <li @click="showLogementView" class="cursor-pointer">
                <span>
                
                    <box-icon type='solid' name='building' class="mr-2"></box-icon>
                    Logements
                </span>
              </li>
               <li @click="showReservationView" class="cursor-pointer">
                <span>
                    <box-icon type='solid' name='food-menu' class="mr-2"></box-icon>
                    Réservations
                </span>
              </li>
             <li @click="showAddCars" class="cursor-pointer">
                <span>
                    <box-icon type='solid' name='clinic' class="mr-2"></box-icon>
                    Ajouter Voiture
                </span>
              </li>
              <li @click="showCarView" class="cursor-pointer">
                <span>
                    <box-icon type='solid' name='building' class="mr-2"></box-icon>
                    Voitures
                </span>
              </li>
              <li @click="showCarReservationView" class="cursor-pointer">
                <span>
                    <box-icon type='solid' name='food-menu' class="mr-2"></box-icon>
                    Réservations Voitures
                </span>
              </li>
              <li @click="showUserView" class="cursor-pointer">
                <span>
                    <box-icon type='solid' name='user' class="mr-2"></box-icon>
                    Utilisateurs
                </span>
              </li>
              <li v-if=" adminStatus > 1" @click="showFeedbackView" class="cursor-pointer">
                <span>
                    <box-icon type='solid' name='smile' class="mr-2"></box-icon>
                    Feedbacks
                </span>
              </li>
          </ul>
      </div>
      <div class="right">

          <router-view></router-view>

          <div v-if="showReservation" class="reservation">
              <div class="reservationContent">
                  <div class="relative w-full overflow-x-auto   sm:rounded-lg reservations">
                        <h3 class="addLogText mt-4 text-2xl mb-4 font-semibold w-fitC">Liste des réservations</h3>

                        <table class="mb-4 table1" >
                             <thead class="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" @click="toggleActive($event); allReservation();" id="link1"  class="py-3 link active">
                                        Toutes les réservations
                                    </th>
                                    <th scope="col" @click="toggleActive($event); reservationNotPayed(); " id="link2"  class="py-3 link ">
                                        Non Payé 
                                    </th>
                                    <th scope="col" @click="toggleActive($event); reservationAcompte();" id="link3" class="py-3 link">
                                        Avec acompte 
                                    </th>
                                    <th scope="col" @click="toggleActive($event); reservationPayed()" id="link4" class="py-3 link">
                                        Payé
                                    </th>
                                    <th scope="col" @click="toggleActive($event); reservationCanceled()" id="link4" class="py-3 link">
                                        Annulé
                                    </th>
                                </tr>
                            </thead>
                        </table>

                        <table class="table2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                                        {{  res.state === 4  ?   'Annulé' :  res.state === 3 ?  'Non payé' :  res.state === 2 ?  'Avec acompte' : 'Payé' }}
                                    </td>
                                    <td v-if=" adminStatus > 1" class="px-6 py-4 ">
                                        <router-link to="#"  @click="getResId(res._id) " class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><box-icon type='solid' name='edit' class="icons edit" ></box-icon></router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
              </div>
          </div>
          <div v-if="showCarReservation" class="reservation">
              <div class="reservationContent">
                  <div class="relative w-full overflow-x-auto   sm:rounded-lg reservations">
                        <h3 class="addLogText mt-4 text-2xl mb-4 font-semibold w-fitC">Liste des réservations Voitures</h3>

                        <table class="mb-4 table1" >
                             <thead class="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" @click="toggleActive($event); allCarReservation();" id="link1"  class="py-3 link active">
                                        Toutes les réservations
                                    </th>
                                    <th scope="col" @click="toggleActive($event); reservationCarNotPayed(); " id="link2"  class="py-3 link ">
                                        Non Payé 
                                    </th>
                                    <th scope="col" @click="toggleActive($event); reservationCarAcompte();" id="link3" class="py-3 link">
                                        Avec acompte 
                                    </th>
                                    <th scope="col" @click="toggleActive($event); reservationCarPayed()" id="link4" class="py-3 link">
                                        Payé
                                    </th>
                                </tr>
                            </thead>
                        </table>

                        <table class="table2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                                <tr v-for="res in reservationCar" v-bind:key="res._id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                        {{  res.state === 4  ?   'Annulé' :  res.state === 3 ?  'Non payé' :  res.state === 2 ?  'Avec acompte' : 'Payé' }}
                                    </td>
                                    <td class="px-6 py-4 ">
                                        <router-link to="#"  @click="getCarResId(res._id) " class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><box-icon type='solid' name='edit' class="icons edit" ></box-icon></router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
              </div>
          </div>
          <div v-if="showLogement" class="relative w-full overflow-x-auto sm:rounded-lg">
                        <h3 class="addLogText mt-4 text-2xl mb-4 font-semibold w-fitC">Liste des logements</h3>

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
                                        Prix moyen
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Addresse
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Surface
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
                                <tr v-for="log in logement" v-bind:key="log._id"  class="maxHeightLogement bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                       {{log.name}}
                                    </th>
                                    <td class="px-6 py-4 text-left">
                                        {{log.type}}
                                    </td>
                                    <td class="px-6 py-4 text-left">
                                        {{log.price[0].date.value}} €
                                    </td>
                                    <td class="px-6 py-4 text-left">
                                        {{log.address}}
                                    </td>
                                    <td class="px-6 py-4 text-left">
                                        {{log.surface}}
                                    </td>
                                    <td class="px-6 py-4 text-left">
                                        {{log.reservation.length}}
                                    </td>
                                    <td class="px-6 py-4  flex w-full justify-center">
                                        <router-link to="/logement/calendar" @click="showCalendarView(log._id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <box-icon type='solid' name='calendar'  class="icons calendars"></box-icon>
                                        </router-link>
                                        <li v-if=" adminStatus > 1" @click="showEditLogement(log._id)" class="font-medium li-link text-blue-600 dark:text-blue-500 hover:underline ml-8" style="list-style-type:none">
                                            <box-icon type='solid' name='edit' class="icons edit" ></box-icon>
                                        </li>
                                        <li  @click="deleteLogement(log._id)" class="font-medium li-link text-blue-600 dark:text-blue-500 hover:underline ml-8" style="list-style-type:none">
                                            <box-icon type='solid' name='trash' class="icons trash"></box-icon>
                                        </li>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-if="logementDeletedAlert" class="flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                            <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                            <div>
                                <span class="font-medium">Logement supprimé avec succès!</span>
                            </div>
                        </div>
          </div>
          <div v-if="showCar" class="relative w-full overflow-x-auto sm:rounded-lg">
                        <h3 class="addLogText mt-4 text-2xl mb-4 font-semibold w-fitC">Liste des voitures</h3>

                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Marque 
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Type
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Prix
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Places
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
                                <tr v-for="car in cars" v-bind:key="car._id"  class="maxHeightLogement bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                       {{car.marque}}
                                    </th>
                                    <td class="px-6 py-4 text-left">
                                        {{car.type}}
                                    </td>
                                    <td class="px-6 py-4 text-left">
                                        {{car.price}} Ar
                                    </td>
                                    <td class="px-6 py-4 text-left">
                                        {{car.nbr_place}}
                                    </td>
                                    <td class="px-6 py-4 text-left">
                                        {{car.reservation.length}}
                                    </td>
                                    <td class="px-6 py-4  flex w-full justify-center">
                                        <router-link to="/car/calendar" @click="showCarCalendarView(car._id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <box-icon type='solid' name='calendar'  class="icons calendars"></box-icon>
                                        </router-link>
                                        <li  @click="showEditCars(car._id)" class="font-medium li-link text-blue-600 dark:text-blue-500 hover:underline ml-8" style="list-style-type:none">
                                            <box-icon type='solid' name='edit' class="icons edit" ></box-icon>
                                        </li>
                                        <li  @click="deleteCar(car._id)" class="font-medium li-link text-blue-600 dark:text-blue-500 hover:underline ml-8" style="list-style-type:none">
                                            <box-icon type='solid' name='trash' class="icons trash"></box-icon>
                                        </li>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-if="logementDeletedAlert === true" class="flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                            <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                            <div>
                                <span class="font-medium">Voiture supprimé avec succès!</span>
                            </div>
                        </div>
          </div>
       
            <div v-if="showValidate" class="edit-profile relative w-full overflow-x-auto   sm:rounded-lg">
            <div class="form">
                <h3 class="mt-4 text-2xl mb-4 font-semibold">Validation de la réservation</h3>
                <form class="">
                    <p class="mb-2">
                    <label for="" class="mb-2">Nom</label>
                    <input type="text"  disabled  v-model="oneReservation.firstname" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Prenoms</label>
                    <input type="text" disabled  v-model="oneReservation.lastname" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Email</label>
                    <input type="text" disabled  v-model="oneReservation.email" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Adresse</label>
                    <input type="text" disabled  v-model="oneReservation.address" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Date d'arrivée</label>
                    <input type="text"  disabled v-model="oneReservation.date_enter" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Date de départ</label>
                    <input type="text"  disabled v-model="oneReservation.date_leave" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Heure d'entrée</label>
                    <input type="text" disabled  v-model="oneReservation.hour_enter" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Heure de sortie</label>
                    <input type="text"  disabled v-model="oneReservation.hour_leave" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Transport</label>
                    <input type="text"  disabled v-model="oneReservation.transport" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Type de transfert</label>
                    <input type="text"  disabled v-model="oneReservation.typeTransfert" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Logement réservé</label>
                    <input type="text" disabled  v-model="userLogement" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Montat à payé</label>
                    <input type="text" disabled  v-model="toPay" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Status</label>
                    <input type="text"  disabled :value="oneReservation.state === 4  ?   'Annulé' :  oneReservation.state === 3 ?  'Non payé' :  oneReservation.state === 2 ?  'Avec acompte' : 'Payé'" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Montant Payé</label>
                    <input type="text" v-model="payed" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p>
                    </p>
                    <p v-if="payedError" class="error p-4 mt-2 text-sm text-red-700 bg-red-100 rounded dark:bg-red-200 dark:text-red-800" role="alert">{{ payedError }}</p>

                    <p>
                    </p>
                    
                </form>

            </div>
           
                <div class="flex-col mt-4">
                    <div v-if="validError === true" class="flex alert p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                    <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <div>
                        <span class="font-medium">Veuillez vérifier tous les champs</span> 
                    </div>
                  </div>

                  <div v-if="validError === false" class="flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                    <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <div>
                        <span class="font-medium">Validation avec succès!</span>
                    </div>
                  </div>
                    <button @click="validChange" class="btn-valid text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Valider</button>
                    <button v-if="!isWaitAddLogement && oneReservation.state != 4 " @click="cancelReservation" type="button" class=" mb-4 w-fitC text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 inline-flex items-center">
                            Annuler réservation
                        </button>
                        <div class="cancel">

                        </div>
                        <button v-if="isWaitAddLogement" disabled type="button" class=" w-fitC py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-red-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center cursor-not-allowed">
                            <svg role="status" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                            </svg>
                            Loading...
                        </button>
                        <div v-if="cancelError === true" class=" w-fitC flex alert p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                        <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div>
                            <span class="font-medium">Mot de passe invalide!</span> 
                        </div>
                        </div>
                        <div v-if="cancelError === false" class=" w-fitC flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                        <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div>
                            <span class="font-medium">Annulation avec succès!</span>
                        </div>
                        </div>
                </div>

          </div>

            <div v-if="showCarValidate" class="edit-profile relative w-full overflow-x-auto   sm:rounded-lg">
            <div class="form">
                <h3 class="mt-4 text-2xl mb-4 font-semibold">Validation de la réservation</h3>
                <form class="">
                    <p class="mb-2">
                    <label for="" class="mb-2">Nom</label>
                    <input type="text"  disabled  v-model="oneCarReservation.firstname" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Prenoms</label>
                    <input type="text" disabled  v-model="oneCarReservation.lastname" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Email</label>
                    <input type="text" disabled  v-model="oneCarReservation.email" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Adresse</label>
                    <input type="text" disabled  v-model="oneCarReservation.address" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Date d'arrivée</label>
                    <input type="text"  disabled v-model="oneCarReservation.date_enter" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Date de départ</label>
                    <input type="text"  disabled v-model="oneCarReservation.date_leave" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Type de transfert</label>
                    <input type="text"  disabled v-model="oneCarReservation.typeTransfert" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Voiture réservé</label>
                    <input type="text" disabled  v-model="userCar" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Montat à payé</label>
                    <input type="text" disabled  v-model="toPayCar" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Status</label>
                    <input type="text"  disabled :value="oneCarReservation.state === 4  ?   'Annulé' :  oneCarReservation.state === 3 ?  'Non payé' :  oneCarReservation.state === 2 ?  'Avec acompte' : 'Payé'" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Montant Payé</label>
                    <input type="text" v-model="payedCar" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p>
                    </p>
                    <p v-if="payedError" class="error p-4 mt-2 text-sm text-red-700 bg-red-100 rounded dark:bg-red-200 dark:text-red-800" role="alert">{{ payedError }}</p>

                    <p>
                    </p>
                    
                </form>

            </div>
           
                <div class="flex-col mt-4">
                    <div v-if="validError === true" class="flex alert p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                    <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <div>
                        <span class="font-medium">Veuillez vérifier tous les champs</span> 
                    </div>
                  </div>

                  <div v-if="validError === false" class="flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                    <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <div>
                        <span class="font-medium">Validation avec succès!</span>
                    </div>
                  </div>
                    <button @click="validCarChange" class="btn-valid text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Valider</button>
                    <button v-if="!isWaitAddLogement && oneCarReservation.state != 4 " @click="cancelCarReservation" type="button" class=" mb-4 w-fitC text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 inline-flex items-center">
                            Annuler réservation
                        </button>
                        <div class="cancelCarRes">

                        </div>
                        <button v-if="isWaitAddLogement" disabled type="button" class=" w-fitC py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-red-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center cursor-not-allowed">
                            <svg role="status" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                            </svg>
                            Loading...
                        </button>
                        <div v-if="cancelError === true" class=" w-fitC flex alert p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                        <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div>
                            <span class="font-medium">Mot de passe invalide!</span> 
                        </div>
                        </div>
                        <div v-if="cancelError === false" class=" w-fitC flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                        <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div>
                            <span class="font-medium">Annulation avec succès!</span>
                        </div>
                        </div>
                </div>

          </div>

          <div v-if="showAddCar" class="edit-profile relative w-full overflow-x-auto  sm:rounded-lg">
            <h3 class="addLogText mt-4 text-2xl mb-4 font-semibold w-fitC">Ajouter une voiture</h3>
            <div class="form">
                <form class="">
                    <p class="mb-2">
                        <label for="" class="mb-2">Type</label>
                        <input type="text" v-model="typeCar" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Marque</label>
                        <input type="text" v-model="marqueCar" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Description</label>
                        <input type="text" v-model="descCar" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Nombre Place</label>
                        <input type="text" v-model="nbr_placeCar" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Prix</label>
                        <input type="text" v-model="priceCar" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2"  >
                        <label for="file-input" class="mb-2">Ajouter photos</label>
                        <input type="file" @change="uploadFile" multiple id="file-input" accept="image/png, image/jpeg" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <div id="images"></div>
                </form> 
            </div>
            
            <div v-if="addLogError === true" class="flex alert p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
              <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <div>
                  <span class="font-medium">Veuillez vérifier tous les champs</span> 
              </div>
            </div>
            <div v-if="addLogError === false" class="flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
              <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <div>
                  <span class="font-medium">Voiture ajouté avec succès!</span>
              </div>
            </div>
            <button v-if="!isWaitAddLogement" @click="addCar" type="button" class="mb-8 w-fitC ml-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                Valider
            </button>
            <button v-if="isWaitAddLogement" disabled type="button" class="ml-8 w-fitC py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center cursor-not-allowed">
                <svg role="status" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
                Loading...
            </button>
          </div>
          <div v-if="showAddLog" class="edit-profile relative w-full overflow-x-auto  sm:rounded-lg">
            <h3 class="addLogText mt-4 text-2xl mb-4 font-semibold w-fitC">Ajouter un logement</h3>
            <div class="form">
                <form class="">
                    <p class="mb-2">
                        <label for="" class="mb-2">Nom du logement</label>
                        <input type="text" v-model="logementName" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Type</label>
                        <input type="text" v-model="logementType" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Surface</label>
                        <input type="text" v-model="logementSurface" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Chambres</label>
                        <input type="text" v-model="logementChambre" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Nombre de personnes</label>
                        <input type="text" v-model="logementPers" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Loyer</label>
                        <input type="text" v-model="logementLoyer" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Adresse</label>
                        <input type="text" v-model="logementAddress" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2"  >
                        <label for="file-input" class="mb-2">Ajouter photos</label>
                        <input type="file" @change="uploadFile" multiple id="file-input" accept="image/png, image/jpeg" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Description (en)</label>
                        <textarea rows="4" v-model="logementDescEN" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Description (mg)</label>
                        <textarea rows="4" v-model="logementDescMG" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                    </p>
                
                    <p class="mb-2">
                        <label for="" class="mb-2">Description (fr)</label>
                        <textarea rows="4" v-model="logementDescFR" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                    </p>
                    
                    
                    <div id="images"></div>
                    <p class="mb-2">
                        <label for="" class="mb-2">Modalité</label>
                    </p>
                </form> 
            </div>
            <div class="flex-col mb-4 ml-4">
                <div class="flex flex-wrap btn-category ml-4">
                    <button  class="btn-cat mod text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" data-value="a"  type="button" > Parking</button>
                    <button  class="btn-cat mod text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" data-value="b" type="button" > Cuisine </button>
                    <button  class="btn-cat mod text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" data-value="c" type="button" > Douche </button>
                    <button  class="btn-cat mod text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" data-value="d" type="button" > Eau chaude </button>
                    <button  class="btn-cat mod text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" data-value="e" type="button" > Wifi </button>
                    <button  class="btn-cat mod text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" data-value="f" type="button" > Télé satellite </button>
                    <button  class="btn-cat mod text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" data-value="g" type="button" > Salle de jeu </button>
                    <button  class="btn-cat mod text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" data-value="h" type="button" > Gardien </button>
                </div>
            </div>
            
            <div v-if="addLogError === true" class="flex alert p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
              <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <div>
                  <span class="font-medium">Veuillez vérifier tous les champs</span> 
              </div>
            </div>
            <div v-if="addLogError === false" class="flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
              <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <div>
                  <span class="font-medium">Logement ajouté avec succès!</span>
              </div>
            </div>
            <button v-if="!isWaitAddLogement" @click="addLogement" type="button" class="mb-8 w-fitC ml-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                Valider
            </button>
            <button v-if="isWaitAddLogement" disabled type="button" class=" w-fitC py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center cursor-not-allowed">
                <svg role="status" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
                Loading...
            </button>
          </div>

          <div v-if="showEditLog" class="edit-profile relative w-full overflow-x-auto   sm:rounded-lg">
          
                <h3 class="mt-4 text-2xl mb-4 font-semibold">Modifier un logement</h3>
                <div class="form">
                <form class="">
                    <p class="mb-2">
                        <label for="" class="mb-2">Nom du logement</label>
                        <input type="text" v-model="oneLogementName" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Type</label>
                        <input type="text" v-model="oneLogementType" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Surface</label>
                        <input type="text" v-model="oneLogementSurface" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Chambres</label>
                        <input type="text" v-model="oneLogementChambre" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Nombre de personnes</label>
                        <input type="text" v-model="oneLogementPers" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Loyer</label>
                        <input type="text" v-model="oneLogementPrice" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Adresse</label>
                        <input type="text" v-model="oneLogementAddress" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Description (en)</label>
                        <textarea rows="4" v-model="oneLogementDescEN" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Description (mg)</label>
                        <textarea rows="4" v-model="oneLogementDescMG" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                    </p>
                
                    <p class="mb-2">
                        <label for="" class="mb-2">Description (fr)</label>
                        <textarea rows="4" v-model="oneLogementDescFR" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                    </p>
                    <p></p>
                    <p></p>
                </form>
                
            </div>
              <div class="flex-col  mt-4">
                  <div v-if="editLogError === true" class="flex alert p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                    <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <div>
                        <span class="font-medium">Veuillez vérifier tous les champs</span> 
                    </div>
                  </div>

                  <div v-if="editLogError === false" class="flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                    <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <div>
                        <span class="font-medium">Logement modifié avec succès!</span>
                    </div>
                  </div>
                <button @click="editLogement" class="btn-valid mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Valider</button>
            </div>
          </div>

          <div v-if="showEditCar" class="edit-profile relative w-full overflow-x-auto   sm:rounded-lg">
          
                <h3 class="mt-4 text-2xl mb-4 font-semibold">Modifier une voiture</h3>
                <div class="form">
                <form class="">
                    <p class="mb-2">
                        <label for="" class="mb-2">Marque</label>
                        <input type="text" v-model="oneCarMarque" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Type</label>
                        <input type="text" v-model="oneCarType" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Description</label>
                        <input type="text" v-model="oneCarDescription" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Places</label>
                        <input type="text" v-model="oneCarPers" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                        <label for="" class="mb-2">Prix</label>
                        <input type="text" v-model="oneCarPrice" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p></p>
                    <p></p>
                </form>
                
            </div>
              <div class="flex-col  mt-4">
                  <div v-if="editLogError === true" class="flex alert p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                    <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <div>
                        <span class="font-medium">Veuillez vérifier tous les champs</span> 
                    </div>
                  </div>

                  <div v-if="editLogError === false" class="flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                    <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <div>
                        <span class="font-medium">Voiture modifié avec succès!</span>
                    </div>
                  </div>
                <button @click="editCar" class="btn-valid mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Valider</button>
            </div>
          </div>

          <div v-if="showUser" class="edit-profile relative w-full overflow-x-auto   sm:rounded-lg">
                 <div class="relative w-full overflow-x-auto   sm:rounded-lg reservations">
                        <h3 class="addLogText mt-4 text-2xl mb-4 font-semibold w-fitC">Liste des utilisateurs</h3>
                        <div class="flex">
                            
                            <input type="text" v-model="searchFilter" placeholder="Rechercher" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                            <button v-if="!isWaitSearchUser" @click="searchUser" type="button" class=" mb-4 w-fitC ml-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                Rechercher
                            </button>
                            <button v-if="isWaitSearchUser" disabled type="button" class=" ml-8 w-fitC py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center cursor-not-allowed">
                                <svg role="status" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                </svg>
                                Loading...
                            </button>
                        </div>

                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nom 
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Prénoms
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Adresse
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Téléphone
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" v-bind:key="user._id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {{user.firstname}}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{user.lastname}}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{user.email}}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{user.address}}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{user.phoneNumber}}
                                    </td>
                                 
                                    <td class="px-6 py-4 flex justify-center items-center">
                                        <li v-if=" adminStatus > 1" @click="makeAdmin(user._id)" class="font-medium li-link text-blue-600 dark:text-blue-500 hover:underline ml-8" style="list-style-type:none">
                                            <box-icon type='solid' name='edit' class="icons edit" ></box-icon>
                                        </li>
                                        <a href="#"  @click="deleteUser(user._id) " class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><box-icon type='solid' name='trash' class="icons trash"></box-icon></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-if="userDeletedAlert === true" class="flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                            <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                            <div>
                                <span class="font-medium">Utilisateur supprimé avec succès!</span>
                            </div>
                        </div>
                        
                    </div>
          </div>
          <div v-if="showFeedback" class="edit-profile relative w-full overflow-x-auto   sm:rounded-lg">
            <h3 class="addLogText mt-4 text-2xl mb-4 font-semibold w-fitC">Vos feedbacks</h3>
            <div class="form feedback">
                     <a v-for="feedback in feedbacks" v-bind:key="feedback._id" href="#" class="flex block mb-2 p-6 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div class="w-full">
                            <h5 class="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white"> {{feedback.author}} </h5>
                            <p class="font-normal text-gray-700 dark:text-gray-400"> {{feedback.content}} </p>
                            <p class="font-normal text-gray-700 dark:text-gray-400 mt-4 note ">{{feedback.note}} / 10</p>
                        </div>
                        <div class="emoji">
                            <img v-if="feedback.note > 9" src="../../assets/star.png" alt="">
                            <img v-if="feedback.note > 7 && feedback.note < 9" src="../../assets/smile.png" alt="">
                            <img v-if="feedback.note >= 5 && feedback.note < 7" src="../../assets/rolling.png" alt="">
                            <img v-if="feedback.note < 5" src="../../assets/sad.png" alt="">
                        </div>
                    </a>
            </div>
          </div>

      </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
    name : 'AdminView' ,
    data() {
        return {
            isWaitSearchUser: false,
            searchFilter:'',
            showLogement : false ,
            showCar : false ,
            showReservation : false ,
            showCarReservation : false ,
            showValidate : false ,
            showCarValidate : false ,
            showEditLog : false ,
            showEditCar : false ,
            cancelError : '',
            showUser : false ,
            showCalendar : true ,
            showAddLog : true ,
            showAddCar : false ,
            showFeedback : false,
            reservation : '' ,
            reservationCar : '' ,
            carReservation : '' ,
            oneLogementName : '' ,
            oneLogementType : '' ,
            oneLogementSurface : '' ,
            oneLogementDesc : [] ,
            oneLogementDescFR : '' ,
            oneLogementDescMG : '' ,
            oneLogementDescEN : '' ,
            oneLogementPrice : '' ,
            oneLogementAddress : '' ,
            oneLogementChambre : '' ,
            oneLogementPers : '' ,
            oneReservation : '' ,
            oneCarReservation : '' ,
            oneCarMarque : '',
            oneCarType : '',
            oneCarDescription : '',
            oneCarPers : '',
            oneCarPrice : '',
            oneLogement : '' ,
            logement : '' ,
            userLogement : '' ,
            userCar : '' ,
            payed : '',
            toPay : '' ,
            payedError : '',
            addLogError : '',
            editLogError : '',
            validError : '' ,
            logementName : '' ,
            logementType : '' ,
            logementDescFR : '' ,
            logementDescMG : '' ,
            logementDescEN : '' ,
            logementDesc : [],
            logementSurface : '' ,
            logementChambre : '' ,
            logementPers : '' ,
            logementLoyer : '' ,
            logementAddress : '',
            files: null,
            users : '',
            userDeletedAlert : false,
            isWaitAddLogement: false,
            logementDeletedAlert : false,
            roleStatus: 0,
            feedbacks : '',
            cars : '',
            typeCar : '',
            marqueCar : '',
            descCar : '',
            nbr_placeCar : '',
            priceCar : ''
        }
    },
    async mounted() {
        await this.getadminStatus();
        if(1>this.adminStatus){
            this.$router.push('/')
        }
        await axios.get(process.env.VUE_APP_URL+'/reservation')
        .then((res) => {
            this.reservation = res.data
        }).catch(error => {
            console.log(error);
        })
        await axios.get(process.env.VUE_APP_URL+'/car/reservation')
        .then((res) => {
            this.reservationCar = res.data
        }).catch(error => {
            console.log(error);
        })

        await axios.get(process.env.VUE_APP_URL+'/logement/list')
        .then((res) => {
            this.logement = res.data
        }).catch(error => {
            console.log(error);
        })
        await axios.get(process.env.VUE_APP_URL+'/car/')
        .then((res) => {
            this.cars = res.data
        }).catch(error => {
            console.log(error);
        })

        const mod = document.querySelectorAll('.mod');
        let modalite = ''
        for(let i=0; i<mod.length; i++){
        mod[i].addEventListener('click' , () => {
          mod[i].classList.toggle('actives')
          
          if(!mod[i].classList.contains('actives')){
            modalite = modalite.replace(mod[i].dataset.value.toString() , '')
          }else{
            modalite+=mod[i].dataset.value
          }
        this.$store.commit('setModalite' , modalite)
        console.log(this.$store.state.modalite);

        })
      }

      this.getFeedback()

    },

    methods: {
        cancelReservation(){
            const cancel = document.querySelector('.cancel')
            const cancelField = document.createElement('input')
            const cancelBtn = document.createElement('button')
            cancelField.setAttribute('class' ,'shadow-sm  ml-8 mb-2 w-64 bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light')
            cancelField.setAttribute('placeholder' , 'Entrer votre mot de passe...')
            cancelBtn.setAttribute('class' , 'mb-4 ml-8 w-fitC text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center')
            cancelBtn.innerText = "Valider"
            cancelBtn.setAttribute('type' , 'button')
            cancel.appendChild(cancelField)
            cancel.appendChild(cancelBtn)
            cancelBtn.addEventListener('click' , async () => {
                
                let password = cancelField.value;
                await axios.put(process.env.VUE_APP_URL+'/reservation/userAnnulation' , {
                    password,
                    reservationId : localStorage.getItem('idRes') ,
                } , {
                    headers : {
                        Authorization : 'Bearer '+localStorage.getItem('token')
                    }
                }).then(() => {
                    this.cancelError  = false;
                    }).catch(() => {
                    this.cancelError = true;
                })
            })

        },
        cancelCarReservation(){
            const cancel = document.querySelector('.cancelCarRes')
            const cancelField = document.createElement('input')
            const cancelBtn = document.createElement('button')
            cancelField.setAttribute('class' ,'shadow-sm  ml-8 mb-2 w-64 bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light')
            cancelField.setAttribute('placeholder' , 'Entrer votre mot de passe...')
            cancelBtn.setAttribute('class' , 'mb-4 ml-8 w-fitC text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center')
            cancelBtn.innerText = "Valider"
            cancelBtn.setAttribute('type' , 'button')
            cancel.appendChild(cancelField)
            cancel.appendChild(cancelBtn)
            cancelBtn.addEventListener('click' , async () => {
                
                let password = cancelField.value;
                await axios.put(process.env.VUE_APP_URL+'/car/reservation/userAnnulation' , {
                    password,
                    reservationId : localStorage.getItem('idCarRes') ,
                } , {
                    headers : {
                        Authorization : 'Bearer '+localStorage.getItem('token')
                    }
                }).then(() => {
                    this.cancelError  = false;
                    }).catch(() => {
                    this.cancelError = true;
                })
            })

        },
        async getFeedback(){
            await axios.get(process.env.VUE_APP_URL+'/feedback')
            .then(res => {
                this.feedbacks = res.data
            }).catch(error => {
                console.log(error);
            })
        },
        async searchUser(){
            this.isWaitSearchUser = true;
            let filter ='@'
            if(this.searchFilter){
                filter = this.searchFilter
            }
            await axios.get(process.env.VUE_APP_URL+'/user/search/'+filter)
            .then((res) => {
                this.isWaitSearchUser = false;
                this.users = res.data
            }).catch((error) => {
                console.log(error);
                this.isWaitSearchUser = false;

            })
        },
       async getResId(idRes){
            this.showValidationView()
            localStorage.setItem('idRes' , idRes)
            await axios.get(process.env.VUE_APP_URL+'/reservation/oneReservation/'+idRes)
            .then(async (res) => {
                this.oneReservation = res.data
                this.payed = res.data.payed
                this.toPay = res.data.toPay
                const idLog = res.data.logement;
                const logement = await axios.get(process.env.VUE_APP_URL+'/logement/getOneLogement/'+idLog)
                this.userLogement = logement.data.name

            }).catch(error => {
                console.log(error);
            })
        },
       async getCarResId(idCarRes){
            this.showCarValidationView()
            localStorage.setItem('idCarRes' , idCarRes)
            await axios.get(process.env.VUE_APP_URL+'/car/reservation/oneReservation/'+idCarRes)
            .then(async (res) => {
                this.oneCarReservation = res.data
                this.payedCar = res.data.payed
                this.toPayCar = res.data.toPay
                const idCar = res.data.car;
                const car = await axios.get(process.env.VUE_APP_URL+'/car/getOneCar/'+idCar)
                this.userCar = car.data.marque

            }).catch(error => {
                console.log(error);
            })
        },
        async validChange(){
            if(this.payed == ''){
            this.payedError = 'Veuillez vérifier tous les champs'
        }else{
            const idRes = localStorage.getItem('idRes')
            axios.put(process.env.VUE_APP_URL+'/reservation/validate/' , {
                reservation : idRes , 
                payed : this.payed,
            }).then(() => {
                this.validError = false
            }).catch(error => {
                console.log(error);
                this.validError = true
            })
        }
            
        } ,
        async validCarChange(){
            if(this.payedCar == ''){
            this.payedError = 'Veuillez vérifier tous les champs'
        }else{
            const idCarRes = localStorage.getItem('idCarRes')
            axios.put(process.env.VUE_APP_URL+'/car/reservation/validate/' , {
                reservation : idCarRes , 
                payed : this.payedCar,
            }).then(() => {
                this.validError = false
            }).catch(error => {
                console.log(error);
                this.validError = true
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

        async allReservation(){
            await axios.get(process.env.VUE_APP_URL+'/reservation/')
            .then(res => {
                this.reservation = res.data
            }).catch(error => {
                console.log(error);
            })
        },
        async reservationNotPayed(){
            await axios.get(process.env.VUE_APP_URL+'/reservation/notPayed')
            .then(res => {
                this.reservation = res.data
            }).catch(error => {
                console.log(error);
            })
        },
        async reservationAcompte(){
            await axios.get(process.env.VUE_APP_URL+'/reservation/acompte')
            .then(res => {
                this.reservation = res.data
            }).catch(error => {
                console.log(error);
            })
        },
        async reservationPayed(){
            await axios.get(process.env.VUE_APP_URL+'/reservation/payed')
            .then(res => {
                this.reservation = res.data
            }).catch(error => {
                console.log(error);
            })
        },
        async allCarReservation(){
            await axios.get(process.env.VUE_APP_URL+'/car/reservation/')
            .then(res => {
                this.reservationCar = res.data
            }).catch(error => {
                console.log(error);
            })
        },
        async reservationCarNotPayed(){
            await axios.get(process.env.VUE_APP_URL+'/car/reservation/notPayed')
            .then(res => {
                this.reservationCar = res.data
            }).catch(error => {
                console.log(error);
            })
        },
        async reservationCarAcompte(){
            await axios.get(process.env.VUE_APP_URL+'/car/reservation/acompte')
            .then(res => {
                this.reservationCar = res.data
            }).catch(error => {
                console.log(error);
            })
        },
        async reservationCarPayed(){
            await axios.get(process.env.VUE_APP_URL+'/car/reservation/payed')
            .then(res => {
                this.reservationCar = res.data
            }).catch(error => {
                console.log(error);
            })
        },
        showLogementView(){
            this.showLogement = true;
            this.showReservation = false;
            this.showCarReservation = false;
            this.showCalendar = false;
            this.showAddLog = false;
            this.showEditLog = false;
            this.showUser = false;
            this.showValidate = false;
            this.showCarValidate = false;
            this.showFeedback = false;
            this.showCar = false;
            this.showAddCar = false;
            this.showEditCar = false;
            
        },
        showCarView(){
            this.showCar = true;
            this.showLogement = false;
            this.showReservation = false;
            this.showCarReservation = false;
            this.showCalendar = false;
            this.showAddLog = false;
            this.showEditLog = false;
            this.showUser = false;
            this.showValidate = false;
            this.showCarValidate = false;
            this.showFeedback = false;
            this.showAddCar = false;
            this.showEditCar = false;
            
        },
        showReservationView(){
            this.showReservation = true;
            this.showCarReservation = false;
            this.showCalendar = false;
            this.showLogement = false;
            this.showAddLog = false;
            this.showEditLog = false;
            this.showUser = false;
            this.showValidate = false;
            this.showCarValidate = false;
            this.showFeedback = false;
            this.showCar = false;
            this.showAddCar = false;
            this.showEditCar = false;

            
        },
        showCarReservationView(){
            this.showCarReservation = true;
            this.showReservation = false;
            this.showCalendar = false;
            this.showLogement = false;
            this.showAddLog = false;
            this.showEditLog = false;
            this.showUser = false;
            this.showValidate = false;
            this.showCarValidate = false;
            this.showFeedback = false;
            this.showCar = false;
            this.showAddCar = false;
            this.showEditCar = false;

            
        },
        showValidationView(){
            this.showValidate = true;
            this.showCarValidate = false;
            this.showReservation = false;
            this.showCarReservation = false;
            this.showLogement = false;
            this.showAddLog = false;
            this.showEditLog = false;
            this.showUser = false;
            this.showCalendar = false;
            this.showFeedback = false;
            this.showCar = false;
            this.showAddCar = false;
            this.showEditCar = false;
        },
        showCarValidationView(){
            this.showCarValidate = true;
            this.showValidate = false;
            this.showReservation = false;
            this.showCarReservation = false;
            this.showLogement = false;
            this.showAddLog = false;
            this.showEditLog = false;
            this.showUser = false;
            this.showCalendar = false;
            this.showFeedback = false;
            this.showCar = false;
            this.showAddCar = false;
            this.showEditCar = false;
        },
        showCalendarView(id){
            this.showCalendar = true;
            this.showValidate = false;
            this.showCarValidate = false;
            this.showReservation = false;
            this.showCarReservation = false;
            this.showLogement = false;
            this.showEditLog = false;
            this.showAddLog = false;
            this.showFeedback = false;
            this.showUser = false;
            this.$store.commit('setIdLog' , id)
            this.showCar = false;
            this.showAddCar = false;
            this.showEditCar = false;

        } ,
        showCarCalendarView(id){
            this.showCalendar = true;
            this.showValidate = false;
            this.showCarValidate = false;
            this.showReservation = false;
            this.showCarReservation = false;
            this.showLogement = false;
            this.showEditLog = false;
            this.showAddLog = false;
            this.showFeedback = false;
            this.showUser = false;
            this.$store.commit('setIdCar' , id)
            this.showAddCar = false;
            this.showCar = false;
            this.showEditCar = false;

        } ,
        showAddLogement(){
            this.showAddLog = true;
            this.showCalendar = false;
            this.showValidate = false;
            this.showCarValidate = false;
            this.showReservation = false;
            this.showCarReservation = false;
            this.showLogement = false;
            this.showEditLog = false;
            this.showFeedback = false;
            this.showUser = false;
            this.showCar = false;
            this.showAddCar = false;
            this.showEditCar = false;

            window.location.reload()
        } ,
        showAddCars(){
            this.showAddCar = true;
            this.showAddLog = false;
            this.showCalendar = false;
            this.showValidate = false;
            this.showCarValidate = false;
            this.showReservation = false;
            this.showCarReservation = false;
            this.showLogement = false;
            this.showEditLog = false;
            this.showFeedback = false;
            this.showUser = false;
            this.showCar = false;
            this.showEditCar = false;

} ,
        showFeedbackView(){
            this.showFeedback = true;
            this.showAddLog = false;
            this.showCalendar = false;
            this.showValidate = false;
            this.showCarValidate = false;
            this.showReservation = false;
            this.showCarReservation = false;
            this.showLogement = false;
            this.showEditLog = false;
            this.showUser = false;
            this.showCar = false;
            this.showAddCar = false;
            this.showEditCar = false;

} ,
        async showUserView(){
            this.showUser = true;
            this.showAddLog = false;
            this.showCalendar = false;
            this.showValidate = false;
            this.showCarValidate = false;
            this.showReservation = false;
            this.showCarReservation = false;
            this.showLogement = false;
            this.showFeedback = false;
            this.showEditLog = false;
            this.showCar = false;
            this.showAddCar = false;
            this.showEditCar = false;


            await axios.get(process.env.VUE_APP_URL+'/user/search/@')
            .then((res) => {
                this.users = res.data
            }).catch((error) => {
                console.log(error);
            })

        } ,
        async showEditLogement(id){
            this.showEditLog = true;
            this.showAddLog = false;
            this.showCalendar = false;
            this.showValidate = false;
            this.showCarValidate = false;
            this.showReservation = false;
            this.showCarReservation = false;
            this.showFeedback = false;
            this.showLogement = false;
            this.showCar = false;
            this.showAddCar = false;
            this.showEditCar = false;

            this.$store.commit('setIdLog' , id)
           await axios.get(process.env.VUE_APP_URL+'/logement/getOneLogement/'+id)
           .then((res) => {
            this.oneLogementName = res.data.name
            this.oneLogementType = res.data.type
            this.oneLogementSurface = res.data.surface
            this.oneLogementChambre = res.data.chambre
            this.oneLogementPers = res.data.pers_max
            this.oneLogementPrice = res.data.price[0].date.value
            this.oneLogementAddress = res.data.address
            this.oneLogementDescFR = res.data.description[0]
            this.oneLogementDescMG = res.data.description[1]
            this.oneLogementDescEN = res.data.description[2]
           }).catch(error => {
            console.log(error);
           })
           
        } ,
        async showEditCars(id){
            this.showEditCar = true;
            this.showEditLog = false;
            this.showAddLog = false;
            this.showCalendar = false;
            this.showValidate = false;
            this.showCarValidate = false;
            this.showReservation = false;
            this.showCarReservation = false;
            this.showFeedback = false;
            this.showLogement = false;
            this.showCar = false;
            this.showAddCar = false;

            this.$store.commit('setIdCar' , id)
           await axios.get(process.env.VUE_APP_URL+'/car/getOneCar/'+id)
           .then((res) => {
               console.log(res.data)
            this.oneCarMarque = res.data.marque
            this.oneCarType = res.data.type
            this.oneCarDescription = res.data.description
            this.oneCarPers = res.data.nbr_place
            this.oneCarPrice = res.data.price
           }).catch(error => {
            console.log(error);
           })
           
        } ,
       
         uploadFile(event) {
            this.files = event.target.files;
        },
        async addLogement(){
            this.isWaitAddLogement = true;
            const formData = new FormData();
            formData.append('name' , this.logementName)
            formData.append('type' , this.logementType)
            formData.append('descriptionFR' , this.logementDescFR)
            formData.append('descriptionMG' , this.logementDescMG)
            formData.append('descriptionEN' , this.logementDescEN)
            formData.append('surface' , this.logementSurface)
            formData.append('address' , this.logementAddress)
            formData.append('chambre' , this.logementChambre)
            formData.append('pers_max' , this.logementPers)
            formData.append('modalite' , this.$store.state.modalite)
            formData.append('price' , this.logementLoyer)
            if(this.files){
               for (const i of Object.keys(this.files)) {
               formData.append("images", this.files[i]);
               }
            }
            await axios.post(process.env.VUE_APP_URL+'/logement/add' , formData)
            .then(() => {
                this.addLogError = false;
                this.isWaitAddLogement = false;
                this.showLogementView();
            }).catch((error) => {
                this.addLogError = true
                this.isWaitAddLogement = false
                console.log(error);
            })
        } ,
        async addCar(){
            this.isWaitAddLogement = true;
            const formData = new FormData();
            formData.append('type' , this.typeCar)
            formData.append('marque' , this.marqueCar)
            formData.append('description' , this.descCar)
            formData.append('nbr_place' , this.nbr_placeCar)
            formData.append('price' , this.priceCar)
            
            if(this.files){
               for (const i of Object.keys(this.files)) {
               formData.append("images", this.files[i]);
               }
            }
            await axios.post(process.env.VUE_APP_URL+'/car/add' , formData)
            .then(() => {
                this.addLogError = false;
                this.isWaitAddLogement = false;
            }).catch(() => {
                this.addLogError = true
                this.isWaitAddLogement = false
            })
        } ,
        
        async editLogement(){
            const idLog = this.$store.state.idLog;
            this.oneLogementDesc[0,1,2] = [this.oneLogementDescFR,this.oneLogementDescMG,this.oneLogementDescEN]

            await axios.put(process.env.VUE_APP_URL+'/logement/'+idLog , {
                name : this.oneLogementName,
                type : this.oneLogementType,
                descriptionFR : this.oneLogementDescFR,
                descriptionMG : this.oneLogementDescMG,
                descriptionEN : this.oneLogementDescEN,
                surface : this.oneLogementSurface,
                chambre : this.oneLogementChambre,
                pers_max : this.oneLogementPers,
                address : this.oneLogementAddress,
                price : this.oneLogementPrice,
            }).then(() => {
                this.editLogError = false
            }).catch(error => {
                console.log(error);
                this.editLogError = true
            })
        },
        async editCar(){
            const idCar = this.$store.state.idCar;

            await axios.put(process.env.VUE_APP_URL+'/car/'+idCar , {
                marque : this.oneCarMarque,
                type : this.oneCarType,
                description : this.oneCarDescription,
                nbr_place : this.oneCarPers,
                price : this.oneCarPrice,
            }).then(() => {
                this.editLogError = false
            }).catch(error => {
                console.log(error);
                this.editLogError = true
            })
        },

        async deleteUser(id){
            await axios.delete(process.env.VUE_APP_URL+'/user/'+id)
            .then(() => {
                this.userDeletedAlert = true
            }).catch((error) => {
                console.log(error);
            })
        } ,
        async deleteLogement(id){
             await axios.delete(process.env.VUE_APP_URL+'/logement/remove/'+id)
            .then(() => {
                this.logementDeletedAlert = true
            }).catch((error) => {
                console.log(error);
            })
        },
        async deleteCar(id){
             await axios.delete(process.env.VUE_APP_URL+'/car/'+id)
            .then(() => {
                this.logementDeletedAlert = true
            }).catch((error) => {
                console.log(error);
            })
        },
        async getRoleStatus(){
            await axios.get(process.env.VUE_APP_URL+'/user/getOneUser' , {
                headers : {
                    Authorization : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(async (res) => {
                this.adminStatus = res.data.role;
            }).catch(error => {
                console.log(error);
            })
        }
    }
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
    height: calc(100vh - 3.5rem);
    
}
.leftSideBar{
    display: flex;
    flex-direction: column;
    align-items: center;
    flex : 2;
    background: rgb(26, 33, 41);
    min-width: 17.4rem;
    max-width: 17.4rem;

}
.leftSideBar ul{
    width : 100%;
    overflow-y: scroll;
}
.leftSideBar ul li{
    font-size: 1.1rem;
    margin:1rem;
    padding : 1rem;
    background: rgba(255, 255, 255, 0.041);
    border-radius : 0.5rem;
    font-weight: 400;
    color : rgb(247, 247, 247);
    list-style-type: none;
}
/* .leftSideBar ul li span{
    margin-left: 1rem;
} */
.right{
    display: flex;
    flex-direction : column;
    align-items: center;
    flex : 7;
    margin: 0 2rem ;

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
.link{
    padding-right: 1.5rem;
    padding-left: 1.5rem;
}
.link:hover{
    color : rgb(0, 132, 255);
    border-bottom : 2px solid rgb(0, 132, 255);
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

.edit-profile{
    display: flex;
    flex-direction: column;
    justify-content: start;
    width : 100%;
}
.btn-valid{
    margin-left: 2rem;
    margin-bottom: 2rem;
}
li span {
    display: flex;
    align-items: center;
    justify-content: start;
}
.leftSideBar ul li:hover{
    background: rgba(255, 255, 255, 0.13);
}
li box-icon{
    fill : white;
}
.btn-primary {
  padding: 0.7rem 2rem 0.7rem 2rem;
  background: var(--primary-color-4);
  border-radius: 0.4rem;
  color: #ffffff;
  margin-top: 1.2rem;
  transition: ease all .2s;
}
.btn-primary:hover{
  background: var(--primary-color-5);
  transition: ease all .2s;
}

  .btn-cat:hover{
    background-color: var(--primary-color-3);
    color:white;
    transition: ease all .1s;
  }

  .actives{
    background-color : var(--primary-color-4);
    color: white;
    transition: ease all .2s;
  }
  .btn-cat.actives:hover{
    background-color : var(--primary-color-5);
    transition: ease all .1s;
  }
.reservations{
    overflow-y: scroll;
    max-height: 100vh;
}
.alert{
    margin-left : 2rem;
    width : fit-content;
}
.w-fitC{
    width: fit-content;
}
.addLogText{
    margin-left: 2rem !important;
    margin-top: 2rem;
}
.maxHeightLogement{
    max-height: 2rem !important;
}
tr{
    height: 2rem;
}
.li-link{
    cursor: pointer;
}
.icons{
    fill : rgb(8, 39, 59)
}
input[disabled]{
    background : #e5e5e5
}
.trash:hover{
    fill : red;
}
.edit:hover{
    fill : rgb(8, 235, 8);
}
.calendars:hover{
    fill : blue;
}
.feedback{
    overflow-y: scroll;
    max-height: (100vh - 3rem);
}
.note{
    font-size: 0.7rem;
    color : rgb(156, 156, 156);
}
.px-6 {
    padding-left: 1.5rem;
    padding-right: 0;
}
.emoji{
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: end;
}

@media 
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {
.table1 , .table2 {
    border: 0;
}

  
  .table1 thead , .table2 thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  .table1 table tr , .table2 table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  .table1 td , .table2 td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  .table1 td::before , .table2 td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  .table1 td:last-child , .table2 td:last-child {
    border-bottom: 0;
  }
}
</style>