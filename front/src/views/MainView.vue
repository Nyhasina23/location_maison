<template>
  <div class="main">
    <div class="header">
        <div class="header-container">
          <p class="siteName">Site de location</p>
            <h2 class="font-light" >Vous êtes à la recherche d’une maison à louer ? Venez découvrir sur notre site les annonces immobilières de maisons en location. De nombreux logements pourront répondre à vos besoins et exigences </h2>
            <div v-if="!$store.state.isAuth"  class="header-btn">
                <router-link class="btn-primary" to="/signin">LANCEZ-VOUS</router-link>
                <router-link class="btn-second" to="/signup">RESERVER</router-link>
            </div>
        </div>
    </div>
    <p class="mb-4 text-sm mt-4 l-dispo font-semibold uppercase text-gray-500 dark:text-white text-center">Logement disponibles</p>
  <div class="logementList">
  
    <div v-for="logement in logements" v-bind:key="logement._id" class="flex flex-col oneLogement items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-full one-log rounded-t-lg  md:w-64 md:rounded-none md:rounded-l-lg" src="../assets/img(2).jpg" alt="">
        <div class="flex flex-col w-full justify-start items-start p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-white">{{logement.name}}</h5>
            <p class="mb-3 font-normal text-gray-400 dark:text-gray-400">{{logement.type}}</p>
            <div class="flex justify-start  w-full mb-2 mt-5">
              <p class="flex items-center mr-2 text-sm" ><box-icon type='solid' class="mr-1" name='bed'></box-icon>{{logement.chambre}} chambres</p>
              <p class="flex items-center ml-2 text-sm" ><box-icon type='solid' class="mr-1" name='group'></box-icon>{{logement.pers_max}} personnes</p>
            </div>
            <p class="mb-3 text-xl font-medium  text-blue-600 dark:text-gray-400">{{logement.price[0].date.value}} Ar <span class="text-sm font-normal text-gray-500">/ jour</span> </p>
             <div class="duo flex justify-start w-full">
              <a href="/logement" class="detail btn " @click="getLogementId(logement._id)" >Détails</a>
              <a v-if="$store.state.isAuth" :href=" $store.state.isAuth ? '/reservation/detail' : '/signin' " class="reserver btn" @click="getLogementId(logement._id)"  >Réserver</a>
            </div>
        </div>
    </div>
  </div>
  
    
<div class="mainLogement">
    <div class="logement justify-center">
    <h2 class="mb-4 text-sm mt-4 font-semibold uppercase text-gray-500 dark:text-white text-center">Quelques photos du Logement</h2>
    </div>
          <swiper
          :slidesPerView="3" :spaceBetween="30" :pagination="{ clickable: true, }" :modules="modules" class="mySwiper">
          <swiper-slide><img src="../assets/img(1).jpg" alt=""></swiper-slide>
          <swiper-slide><img src="../assets/img(3).jpg" alt=""></swiper-slide>
          <swiper-slide><img src="../assets/img(4).jpg" alt=""></swiper-slide>
          <swiper-slide><img src="../assets/img(6).jpg" alt=""></swiper-slide>
        </swiper>
        <FooterComponent />
</div>

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import FooterComponent from '../components/FooterComponent.vue'
import axios from 'axios'
export default {
    name : 'MainView' , 
    components : {
        Swiper,
        SwiperSlide,
        FooterComponent ,
    } ,
    setup() {
    return {
      modules: [Pagination],
    };
  },
    data() {
        return {
            logements : '',
            email : '' ,
            password : '' , 
            firstname : '' ,
            lastname : '' ,
            isMale : '' ,
            address : '' ,
            phoneNumber : ''
        
        }
    },
    async mounted() {
      await axios.get(process.env.VUE_APP_URL + '/logement/list')
      .then(res => {
        this.logements = res.data
        console.log(res.data)
      }).catch(error => {
        console.log(error);
      })
    },
    methods: {
      getLogementId(id){
        this.$store.commit('setIdLog' , id)
      },
    },
}
</script>

<style>
.mainLogement{
  margin : 1rem;
}
.calendar{
  width:40% ;
  margin : 1rem 0rem 0rem 1rem;
}
.login{
  height : 50vh;
}
.signup{
  height : 50vh;
}
.input-field{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.input-field input{
  padding : 0.7rem;
  margin : 0.5rem;
  width: 90%;
}
.input-field .btn-submit{
  width : 100%;
  padding : 0.7rem;
  background: var(--primary-color-4);
  color :white;
  border : var(--primary-color-4);
  margin-top: 0.5rem;
}

.header{
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.404), rgba(0, 0, 0, 0.418)), url('../assets/img(4).jpg');
    width: 100%;
    height: 30rem;
    background-size: cover;
    background-position-y: center;
}
.header-container h2 {
    width: 35rem;
    text-align: left;
    color : white;
    margin-bottom: 1rem;
}
.header .header-container{
    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 8rem;
}
.header-btn{
    margin-top: 1rem;
}
.header-btn .btn-primary{
    margin-right: 1rem;
    text-decoration: none;
    color: white;
    padding: 1rem;
    border-radius: .5rem;
    background: var(--primary-color-4);
    border: 2px solid var(--primary-color-4);
}
.header-btn .btn-primary:hover{
    background: var(--primary-color-5);
    border: 2px solid var(--primary-color-5);
    transition:ease all .3s;
}

.header-btn .btn-second{
    margin-right: 1rem;
    text-decoration: none;
    color: white;
    padding: 1rem;
    border-radius: .5rem;
    border: 2px solid var(--primary-color-4);
}
.logement{
    display: flex;
}

.logement .left{
    display: flex;
    flex-direction: column;
    flex : 7
}
.logement .right{
    display: flex;
    flex : 1
}
.main-text p , h2{
    text-align: left;
    margin-bottom : 1rem;
    cursor: context-menu;
}
.logementType{
  text-align: start;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.logementList{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.oneLogement{
  border-radius: .5rem;
  border: solid 1px #eee;
  width:50%;
  height: 20rem;
  margin: 1rem;
  overflow: hidden;
  display: flex;
}
.Logementmage{
  height: 100%;
  width: 40%;
  object-fit: cover;
}
.secondSide{
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.secondSide .logementName{
  font-weight: 600;
  text-align: left;
}
.siteName{
  color: var(--primary-color-4);
  font-size: 3rem;
  font-weight: 600;
  cursor: unset;
  
}
.duo{
  display: flex;
}
.secondSide .price{
  text-align: left;
}
.btn{
  margin-right: 1rem;
  border-radius: .5rem;
  background-color : var(--primary-color-4);
  padding : 0.5rem 1rem 0.5rem 1rem;
  color:white;
  font-size: 0.9rem;
}
.btn:hover{
  transition: ease .3s all;
  background-color : var(--primary-color-5);
}
.l-dispo{
  margin : 1rem;
  text-align: left;
}
.one-log{
  height : 100%;
}
.oneLogement{
  max-height : 18rem;
  width : 100%;
}
</style>