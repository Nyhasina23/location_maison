<template>
  <div class="logement">
    <h2>Résidence</h2>
    <div class="logement-container">
        <div class="logement-content">
            <div class="logement-img">
                <img src="../../assets/img(1).jpg" alt="">
            </div>
            <div class="logement-detail">
                <h3> {{price}} Ar / jour</h3>
                <input type="date">
                <h3>Logement libre</h3>
                <p>RC /1er / 2EME/ 3EME </p>
                <p>Villa</p>
                <router-link to="/logement/detail" class="btn-primary" @click="showDetail">Details</router-link>
            </div>
        </div>
    </div>
   
  </div>
</template>

<script>
export default {
    name : 'LogementComponent' , 
    props : {
        price : Number
    },
    components : {
    } , 

    methods: {
       
    },
}
</script>

<style scoped>
.logement-container{
    display: flex;
    flex-wrap: wrap;
}
.logement-content{
    display: flex;
    border : 1px solid gray;
    width: fit-content;
    margin-right: 1rem;
    margin-bottom: 1rem;
}
h3{
    margin : 0.5rem;
}
.logement-img img {
    width : 30rem ;
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
.logement-detail .btn-primary:hover{
    background: rgb(211, 2, 2);
}
.logement-detail p{
    text-align: left;
    margin : 0.5rem;
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