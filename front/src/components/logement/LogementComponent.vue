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
                <a class="btn-primary" href="#">Details</a>
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

    </div>
    <a class="btn-primary" href="#">Voir tous les logements</a>
   
  </div>
</template>

<script>
export default {
    name : 'LogementComponent'
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