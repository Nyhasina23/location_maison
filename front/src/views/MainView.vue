<template>
  <div class="main">
    <div class="header">
        <div class="header-container">
          <p class="siteName">Site de location</p>
            <h2>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500</h2>
            <div class="header-btn">
                <a class="btn-primary" href="#" @click="showLogin()">LANCEZ-VOUS</a>
                <a class="btn-second" href="#">RESERVER</a>
            </div>
        </div>
    </div>
  <div class="logementList">
    <div class="oneLogement">
      <img class="Logementmage" src="../../public/img(8).jpg" alt="">
      <div class="secondSide">
        <p class="logementName">Villa Tsarasoa Avaradoha</p>
        <p class="logementType">Villa</p>
        <p class="price">A partir de<span> 200.000 ariary </span>/J </p>
        <div class="duo">
          <router-link to="/" class="detail btn">Détails</router-link>
          <router-link to="/" class="reserver btn">Réserver</router-link>
        </div>
      </div>
    </div>
  </div>
  <transition name="fade" appear>
    <div class="modal-overlay" 
         v-if="showLoginModal" 
         @click="showLoginModal = false ">
    </div>
  </transition>
  <transition name="pop" appear>
    <div class="modal" role="dialog" v-if="showLoginModal">
        <div class="login">

            <h3>Créer votre compte </h3>
            <p>Vous avez déjà un compte? <a href="#" @click="showSignup">Se connecter</a> </p>
            <div class="input-field">
            <input type="email" placeholder="email...">
            <input type="password" placeholder="Mot de passe">
            <input type="password" placeholder="Confirmer...">
            <button class="btn-submit">S'inscrire</button>
            </div>
        </div>
    </div>
  </transition>
  <transition name="fade" appear>
    <div class="modal-overlay" 
         v-if="showSignupModal" 
         @click="showSignupModal = false ">
    </div>
  </transition>  
  <transition name="pop" appear>
    <div class="modal" role="dialog" v-if="showSignupModal">
        <div class="signup">

            <h3>Se connecter </h3>
            <p>Vous n'avez pas de compte? <a href="#" @click="showLogin">S'inscrire</a> </p>
            <div class="input-field">
            <input type="email" placeholder="email...">
            <input type="password" placeholder="Mot de passe">
            <button class="btn-submit">Connexion</button>
            </div>
        </div>
    </div>
  </transition>
    
<div class="mainLogement">

    <div class="logement">
    </div>

          

          <h2>Quelques photos du Logement</h2>

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
export default {
    name : 'MainView' , 
    components : {
        Swiper,
        SwiperSlide,
        FooterComponent
    } ,
    setup() {
    return {
      modules: [Pagination],
    };
  },
    data() {
        return {
            showLoginModal: false,
            showSignupModal: false,
        
        }
    },
    methods: {
        showLogin(){
            this.showLoginModal = !this.showLoginModal
            this.showSignupModal = false
        },
        showSignup(){
            this.showSignupModal = !this.showSignupModal
            this.showLoginModal = false
        },
        handleDateClick(){
            this.price = this.calendarOptions.events[0].price
        },
        handleSelect(arg){
          console.log(arg)
        }
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

.modal {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: fit-content;
  height: fit-content;
  padding: 2rem;
  border-radius: 0.2rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
  background: #FFF;
  z-index: 999;
  transform: none;
}
.modal h1 {
  margin: 0 0 1rem;
}

.modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}


.pop-enter-active{
  opacity: 1;
  transition: transform 0.4s cubic-bezier(1, 0, 1, 1), opacity 0.4s linear;
}
.pop-leave-active{
  opacity: 1;
  transition: transform 0.4s cubic-bezier(1, 0, 1, 1), opacity 0.4s linear;
  transform: scale(0.3) translateY(-50%);
}

.header{
    background-image: url('../assets/img(4).jpg');
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
.secondSide .price span{
  color
}
.secondSide .btn{
  background: var(--primary-color-4);
  margin-right: 1rem;
  color: white;
  padding: .5rem 1rem;
  border-radius: .5rem;
}
.btn:hover{
  background: var(--primary-color-5);
  transition: ease .3s all
  
}
</style>