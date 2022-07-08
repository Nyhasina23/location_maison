<template>
  <div class="admin">
       <div class="leftSideBar">
          <ul>
              <li class="cursor-pointer mr-4 ml-4" @click="showLogementView">
                 <span>
                    <box-icon type='solid' name='user' class="mr-2"></box-icon>
                       {{$t('profile')}}
                </span> 
              </li>
              <li class="cursor-pointer mr-4 ml-4" @click="showReservationView">
               <span>
                    <box-icon type='solid' name='food-menu' class="mr-2"></box-icon>
                    {{$t('reservations')}}
                </span>
              </li>
              <li class="cursor-pointer mr-4 ml-4" @click="showFeedbackView">
              <span>
                    <box-icon type='solid' name='smile' class="mr-2"></box-icon>
                    {{$t('feedback')}}
                </span>
              </li>
          </ul>
      </div>
      <div class="right">

          <router-view></router-view>

          <div v-if="showReservation" class="edit-profile relative w-full overflow-x-auto   sm:rounded-lg">
              <div class="form">
                        <h3 class=" mt-4 text-2xl mb-4 font-semibold w-fitC "> {{$t('reservations')}} </h3>

                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        {{$t('firstname')}} 
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        {{$t('entry_date')}}
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        {{$t('release_date')}}
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        {{$t('state')}}
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
                                        {{  res.state === 4  ?   $t('canceled') :  res.state === 3 ?  $t('notpayed') :  res.state === 2 ? $t('acompte') : $t('payeds') }}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <a href="#"  @click="getResId(res._id) " class="font-medium text-blue-600 dark:text-blue-500 hover:underline"> {{$t('detail')}} </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
              </div>
          </div>
          <div v-if="showLogement" class="edit-profile relative w-full overflow-x-auto   sm:rounded-lg">
            <div class="form">
                <h3 class=" mt-4 text-2xl mb-4 font-semibold w-fitC ">{{$t('modif_info')}}</h3>
                <form class="">
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('firstname')}}</label>
                    <input type="text" v-model="firstname" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('lastname')}}</label>
                    <input type="text" v-model="lastname" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('email')}}</label>
                    <input type="text" v-model="email" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('address')}}</label>
                    <input type="text" v-model="address" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('new_password')}}</label>
                    <input type="password" v-model="password" placeholder="******" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('phone')}}</label>
                    <input type="text" v-model="phoneNumber" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p>
                  
                    </p>
                    <p>
                    </p>
                </form>
            </div>
            <button v-if="!isWaitAddLogement" @click="update" type="button" class=" mb-4 w-fitC ml-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                {{$t('valid')}}
            </button>
            <button v-if="isWaitAddLogement" disabled type="button" class=" ml-8 w-fitC py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center cursor-not-allowed">
                <svg role="status" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
                Loading...
            </button>
            <div v-if="addLogError === true" class="ml-8 w-fitC flex alert p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
              <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <div>
                  <span class="font-medium"> {{$t('verify')}} </span> 
              </div>
            </div>
            <div v-if="addLogError === false" class="ml-8 w-fitC flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
              <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <div>
                  <span class="font-medium"> {{$t('info_success')}} </span>
              </div>
            </div>

          </div>
          <div v-if="showFeedback" class="edit-profile relative w-full overflow-x-auto   sm:rounded-lg">
            <div class="form">
                <h3 class=" mt-4 text-2xl mb-4 font-semibold w-fitC ">{{$t('feedback')}}</h3>
                <form class="">
                    <p class="mb-2">
                    <label for="" class="mb-2"> {{$t('send_feedback')}} </label>
                    <textarea v-model="feedback" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" name="" id="" cols="30" rows="5"></textarea>
                    <input id="default-range" type="range" v-model="range"  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                    </p>
                    <p class="mb-2" >{{$t('note')}} :   {{range / 10}} / 10</p>
                    <p>
                    </p>
                </form>
            </div>
            <button v-if="!isWaitAddLogement" @click="sendFeedback" type="button" class=" mb-4 w-fitC ml-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                {{$t('send')}}
            </button>
            <button v-if="isWaitAddLogement" disabled type="button" class=" ml-8 w-fitC py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center cursor-not-allowed">
                <svg role="status" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
                Loading...
            </button>
            <div v-if="feedBackError === true" class="ml-8 w-fitC flex alert p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
              <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <div>
                  <span class="font-medium"> {{$t('verify')}} </span> 
              </div>
            </div>
            <div v-if="feedBackError === false" class="ml-8 w-fitC flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
              <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <div>
                  <span class="font-medium"> {{$t('feedback_success')}} </span>
              </div>
            </div>

          </div>
          <div v-if="showValidate" class="edit-profile relative w-full overflow-x-auto   sm:rounded-lg">
            <div class="form">
                <h3 class="mt-4 text-2xl mb-4 font-semibold">{{$t('detail_reservation')}}</h3>
                <form class="">
                    <p class="mb-2">
                    <label for="" class="mb-2"> {{$t('firstname')}} </label>
                    <input type="text" disabled v-model="oneReservation.firstname" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2"> {{$t('lastname')}} </label>
                    <input type="text" disabled v-model="oneReservation.lastname" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2"> {{$t('email')}} </label>
                    <input type="text" disabled v-model="oneReservation.email" class="shadow-sm mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('address')}}</label>
                    <input type="text" disabled v-model="oneReservation.address" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('entry_date')}}</label>
                    <input type="text" disabled v-model="oneReservation.date_enter" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('release_date')}}</label>
                    <input type="text" disabled v-model="oneReservation.date_leave" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('entry_time')}}</label>
                    <input type="text" disabled v-model="oneReservation.hour_enter" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('exit_time')}}</label>
                    <input type="text" disabled v-model="oneReservation.hour_leave" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('people')}}</label>
                    <input type="text" disabled v-model="oneReservation.nbr_pers" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('transport')}}</label>
                    <input type="text" disabled v-model="oneReservation.transport" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('payed')}}</label>
                    <input type="text" disabled v-model="oneReservation.payed" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p class="mb-2">
                    <label for="" class="mb-2">{{$t('log_reserve')}}</label>
                    <input type="text" disabled v-model="userLogement" class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </p>
                    <p>
                  
                    </p>
                        <button v-if="!isWaitAddLogement && oneReservation.state != 4 " @click="cancelReservation" type="button" class=" mb-4 w-fitC text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 inline-flex items-center">
                            {{$t('cancel_res')}}
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
                            <span class="font-medium"> {{$t('invalid_password')}} </span> 
                        </div>
                        </div>
                        <div v-if="cancelError === false" class=" w-fitC flex alert p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                        <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div>
                            <span class="font-medium"> {{$t('cancel_success')}} </span>
                        </div>
                        </div>
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
            addLogError : '',
            isWaitAddLogement : false,
            feedBackError : '',
            cancelError : '',
            showLogement : true ,
            showReservation : false ,
            showFeedback : false,
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
            userLogement : '',
            range : 50,
            feedback : ''

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
            this.user = res.data;
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
        cancelReservation(){
            const cancel = document.querySelector('.cancel')
            const cancelField = document.createElement('input')
            const cancelBtn = document.createElement('button')
            cancelField.setAttribute('class' ,'shadow-sm mb-2 w-64 bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light')
            cancelField.setAttribute('placeholder' , this.$t('password')+'...')
            cancelBtn.setAttribute('class' , 'mb-4 w-fitC text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center')
            cancelBtn.innerText = this.$t('valid')
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
        async update(){
            this.isWaitAddLogement = true;
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
            this.addLogError = false;
            this.isWaitAddLogement = false;
            setTimeout(()=>{
                this.addLogError = ''
            },2000)
        }).catch(error => {
            this.addLogError = true
            this.isWaitAddLogement = false
            console.log(error);
            setTimeout(()=>{
                this.addLogError = ''
            },2000)
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

        async sendFeedback(){
            await axios.post(process.env.VUE_APP_URL+'/feedback/add' , {
                content : this.feedback,
                note : (this.range / 10)
            } , {
                headers : {
                    Authorization : 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {   
                this.feedBackError = false;
            }).catch(() => {
                this.feedBackError = true;
            })
        },

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
            this.showFeedback = false;

            
        },
        showReservationView(){
            this.showReservation = true;
            this.showCalendar = false;
            this.showLogement = false;
            this.showValidate = false;
            this.showFeedback = false;
            
        },
        showValidationView(){
            this.showValidate = true;
            this.showReservation = false;
            this.showLogement = false;
            this.showCalendar = false;
            this.showFeedback = false;
        },
        showFeedbackView(){
            this.showFeedback = true;
            this.showValidate = false;
            this.showReservation = false;
            this.showLogement = false;
            this.showCalendar = false;
        }
      
    }
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
    height: calc(100vh - 3.5rem);
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
    height: calc(100vh - 4.5rem);
    overflow-y : scroll;
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
.w-fitC{
    width: fit-content;
}
.edit-profile{
    display: flex;
    flex-direction: column;
    justify-content: start;
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

input[disabled]{
    background : #e5e5e5
}
li span {
    display: flex;
    align-items: center;
    justify-content: start;
}
li box-icon{
    fill : white;
}
.leftSideBar ul li:hover{
    background: rgba(255, 255, 255, 0.13);
}
</style>