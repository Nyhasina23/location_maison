<template>
  <div class="admin">
       <div class="leftSideBar">
          <ul>
             <li @click="showAddLogement">
                <span>
                    <box-icon type='solid' name='clinic' class="mr-2"></box-icon>
                    Ajouter Logement
                </span>
              </li>
              <li @click="showLogementView">
                <span>
                    <box-icon type='solid' name='building' class="mr-2"></box-icon>
                    Logements
                </span>
              </li>
              <li @click="showReservationView">
                <span>
                    <box-icon type='solid' name='food-menu' class="mr-2"></box-icon>
                    Réservations
                </span>
              </li>
              <li @click="showUserView">
                <span>
                    <box-icon type='solid' name='user' class="mr-2"></box-icon>
                    Utilisateurs
                </span>
              </li>
          </ul>
      </div>
      <div class="right">

          <router-view></router-view>

          <div v-if="showReservation" class="reservation">
              <div class="reservationContent">
                  <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg reservations">
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
                                    <td class="px-6 py-4 ">
                                        <a href="#"  @click="getResId(res._id) " class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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
                                    <td class="px-6 py-4  flex">
                                        <router-link to="/logement/calendar" @click="showCalendarView(log._id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Calendar</router-link>
                                        <li  @click="showEditLogement(log._id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-8" style="list-style-type:none">Edit</li>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                    <label for="" class="mb-2">Transport</label>
                    <input type="text" v-model="oneReservation.transport" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Type de transfert</label>
                    <input type="text" v-model="oneReservation.typeTransfert" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Montant Payé</label>
                    <input type="text" v-model="payed" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Montat à payé</label>
                    <input type="text" v-model="toPay" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Logement réservé</label>
                    <input type="text" v-model="userLogement" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
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
                </div>

          </div>
          <div v-if="showAddLog" class="edit-profile relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                <h3 class="mt-4 text-2xl mb-4 font-semibold">Ajouter un logement</h3>
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
                    <label for="" class="mb-2">Description</label>
                    <input type="text" v-model="logementDesc" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Surface</label>
                    <input type="text" v-model="logementSurface" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
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
                    <input type="file" @change="uploadFile" multiple id="file-input" accept="image/png, image/jpeg" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <div id="images">
                    </div>
                     <p class="mb-2">
                    <label for="" class="mb-2">Modalité</label>
                    </p>
                    <p>
                    </p>
                </form>
                
            </div>
              <div class="flex-col  mt-4">
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

              <button @click="addLogement" class="btn-valid mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Valider</button>
            </div>
          </div>

          <div v-if="showEditLog" class="edit-profile relative w-full overflow-x-auto shadow-md sm:rounded-lg">
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
                    <label for="" class="mb-2">Description</label>
                    <input type="text" v-model="oneLogementDesc" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Surface</label>
                    <input type="text" v-model="oneLogementSurface" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Loyer</label>
                    <input type="text" v-model="oneLogementPrice" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">Adresse</label>
                    <input type="text" v-model="oneLogementAddress" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p>
                    </p>
                      <p>
                    </p>
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

          <div v-if="showUser" class="edit-profile relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                 <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg reservations">
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
                                 
                                    <td class="px-6 py-4 ">
                                        <a href="#"  @click="deleteUser(user._id) " class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Supprimer</a>
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


            




      </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
    name : 'AdminView' ,
    data() {
        return {
            showLogement : false ,
            showReservation : false ,
            showValidate : false ,
            showEditLog : false ,
            showUser : false ,
            showCalendar : true ,
            reservation : '' ,
            oneLogementName : '' ,
            oneLogementType : '' ,
            oneLogementSurface : '' ,
            oneLogementDesc : '' ,
            oneLogementPrice : '' ,
            oneLogementAddress : '' ,
            oneReservation : '' ,
            oneLogement : '' ,
            logement : '' ,
            userLogement : '' ,
            payed : '',
            toPay : '' ,
            payedError : '',
            addLogError : '',
            editLogError : '',
            validError : '' ,
            showAddLog : true ,
            logementName : '' ,
            logementType : '' ,
            logementDesc : '' ,
            logementSurface : '' ,
            logementLoyer : '' ,
            logementAddress : '',
            files: null,
            users : '',
            userDeletedAlert : false
        }
    },
    async mounted() {
              
        await axios.get(process.env.VUE_APP_URL+'/reservation')
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

    },

    methods: {
       async getResId(id){
            this.showValidationView()
            localStorage.setItem('idRes' , id)
            const idRes = localStorage.getItem('idRes')
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
            this.showAddLog = false;
            this.showEditLog = false;
            this.showUser = false;
            this.showValidate = false;
            
        },
        showReservationView(){
            this.showReservation = true;
            this.showCalendar = false;
            this.showLogement = false;
            this.showAddLog = false;
            this.showEditLog = false;
            this.showUser = false;
            this.showValidate = false;
            
        },
        showValidationView(){
            this.showValidate = true;
            this.showReservation = false;
            this.showLogement = false;
            this.showAddLog = false;
            this.showEditLog = false;
            this.showUser = false;
            this.showCalendar = false;
        },
        showCalendarView(id){
            this.showCalendar = true;
            this.showValidate = false;
            this.showReservation = false;
            this.showLogement = false;
            this.showEditLog = false;
            this.showAddLog = false;
            this.showUser = false;
            this.$store.commit('setIdLog' , id)
        } ,
        showAddLogement(){
            this.showAddLog = true;
            this.showCalendar = false;
            this.showValidate = false;
            this.showReservation = false;
            this.showLogement = false;
            this.showEditLog = false;
            this.showUser = false;
            window.location.reload()
        } ,
        async showUserView(){
            this.showUser = true;
            this.showAddLog = false;
            this.showCalendar = false;
            this.showValidate = false;
            this.showReservation = false;
            this.showLogement = false;
            this.showEditLog = false;

            await axios.get(process.env.VUE_APP_URL+'/user')
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
            this.showReservation = false;
            this.showLogement = false;
            this.$store.commit('setIdLog' , id)
           await axios.get(process.env.VUE_APP_URL+'/logement/getOneLogement/'+id)
           .then((res) => {
            this.oneLogementName = res.data.name
            this.oneLogementType = res.data.type
            this.oneLogementDesc = res.data.description
            this.oneLogementSurface = res.data.surface
            this.oneLogementPrice = res.data.price[0].date.value
            this.oneLogementAddress = res.data.address
           }).catch(error => {
            console.log(error);
           })
           
        } ,
       
         uploadFile(event) {
            this.files = event.target.files;
        },
        async addLogement(){
        
            const formData = new FormData();
            formData.append('name' , this.logementName)
            formData.append('type' , this.logementType)
            formData.append('description' , this.logementDesc)
            formData.append('surface' , this.logementSurface)
            formData.append('address' , this.logementAddress)
            formData.append('modalite' , this.$store.state.modalite)
            formData.append('price' , this.logementLoyer)
            if(this.files){
               for (const i of Object.keys(this.files)) {
               formData.append("images", this.files[i]);
               }
            }
            await axios.post(process.env.VUE_APP_URL+'/logement/add' , formData)
            .then(() => {
                this.addLogError = false
            }).catch((error) => {
                this.addLogError = true
                console.log(error);
            })
        } ,
        
        async editLogement(){
            const idLog = this.$store.state.idLog;
            await axios.put(process.env.VUE_APP_URL+'/logement/'+idLog , {
                name : this.oneLogementName,
                type : this.oneLogementType,
                description : this.oneLogementDesc,
                surface : this.oneLogementSurface,
                address : this.oneLogementAddress,
                price : this.oneLogementPrice,
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
justify-content: center;
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
</style>