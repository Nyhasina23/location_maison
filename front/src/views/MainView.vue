<template>
  <div class="main">
    <div class="header">
        <div class="header-container">
            <h2>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500</h2>
            <div class="header-btn">
                <a class="btn-primary" href="#">LANCEZ-VOUS</a>
                <a class="btn-second" href="#">RESERVER</a>
            </div>
        </div>
    </div>
    <div class="logement">
        <LogementComponent class="left" />
        <LogementSearchComponent class="right"/>
    </div>
    
    <div class="main-text">
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
        LogementSearchComponent
    }
}
</script>

<style>
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