<template>
  <div class="main">
    <div class="header">
        <div class="header-container">
            <h2>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500</h2>
            <div class="header-btn">
                <a class="btn-primary" href="#" @click="showLogin()">LANCEZ-VOUS</a>
                <a class="btn-second" href="#">RESERVER</a>
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
  <transition name="fades" appear>
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
    

    <div class="logement">
        <LogementComponent class="left" />
        <LogementSearchComponent class="right"/>
    </div>
    
    <div  class="main-text">
        <h2>Lorem ipsum</h2>
        <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500
        Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500
        Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500 
        </p>
    </div>
  </div>
</template>

<script>
import LogementComponent from '../components/logement/LogementComponent.vue'
import LogementSearchComponent from '../components/logement/LogementSearchComponent.vue'
export default {
    name : 'MainView' , 
    components : {
        LogementComponent,
        LogementSearchComponent,
    } ,
    
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
        }
    },
}
</script>

<style>
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
  background: red;
  color :white;
  border : red;
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
    color : white ;
    padding : 1rem;
    background: red;
    border: 2px solid red;

}
.header-btn .btn-second{
    margin-right: 1rem;
    text-decoration: none;
    color : white ;
    padding : 1rem;
    border: 2px solid red;
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
.main{
    margin : 1rem;
}
.main-text p , h2{
    text-align: left;
}
</style>