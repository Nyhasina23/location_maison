<template>
  <div class="logement">
    <h2>Logements libre</h2>
    <div class="logement-container">
        <div class="logement-content">
            <div class="logement-img">
                <img src="../../assets/img(1).jpg" alt="">
            </div>
            <div class="logement-detail">
                <h3>150000 Ar / jour</h3>
                <input type="date">
                <p>RC </p>
                <a class="btn-primary" @click="showDetail">Details</a>
            </div>
        </div>
        <div class="logement-content">
            <div class="logement-img">
                <img src="../../assets/img(3).jpg" alt="">
            </div>
            <div class="logement-detail">
                <h3>150000 Ar / jour</h3>
                <input type="date">
                <p>RC </p>
                <a class="btn-primary" href="#">Details</a>
            </div>
        </div>
        <div class="logement-content">
            <div class="logement-img">
                <img src="../../assets/img(2).jpg" alt="">
            </div>
            <div class="logement-detail">
                <h3>150000 Ar / jour</h3>
                <input type="date">
                <p>RC </p>
                <a class="btn-primary" href="#">Details</a>
            </div>
        </div>
        <div class="logement-content">
            <div class="logement-img">
                <img src="../../assets/img(6).jpg" alt="">
            </div>
            <div class="logement-detail">
                <h3>150000 Ar / jour</h3>
                <input type="date">
                <p>RC </p>
                <a class="btn-primary" href="#">Details</a>
            </div>
        </div>

        <transition name="fade" appear>
    <div class="modal-overlay" 
         v-if="detail" 
         @click="detail = false ">
    </div>
  </transition>
  <transition name="pop" appear>
    <div class="modal" role="dialog" v-if="detail">
        <div class="logement-modal">
            <LogementModal />
        </div>
    </div>
  </transition>

    </div>
    <a class="btn-primary" href="#">Voir tous les logements</a>
   
  </div>
</template>

<script>
import LogementModal from '../LogementModal'
export default {
    name : 'LogementComponent' , 
    components : {
        LogementModal
    } , 
    data() {
        return {
            detail : false
        }
    },

    methods: {
        showDetail(){
            this.detail = !this.detail
        }
    },
}
</script>

<style scoped>
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

.logement-container{
    display: flex;
    flex-wrap: wrap;
}
.logement-content{
    display: flex;
    border : 1px solid gray;
    width: fit-content;
    height: 12rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
}
.logement-img img {
    width : 15rem ;
    height: 100%;
    object-fit: cover;
}
.logement-detail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 1.2rem;
    margin-right: 1.2rem;
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
.btn-primary{
    padding: 2rem;
    text-decoration: none;
    color : white ;
    padding : 0.5rem 1rem 0.5rem 1rem;
    background: red;
    border: 2px solid red;
    width: 20%;
}
</style>