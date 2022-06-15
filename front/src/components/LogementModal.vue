<template>
  <div class="logementModal">
      <h3>Détails</h3>
      <div class="logement-content">
            <div class="logement-img">
                <img src="../assets/img(1).jpg" alt="">
            </div>
            <div class="logement-detail">
                <h3>150000 Ar / jour</h3>
                <input type="date">
                <p>RC </p>
                <a class="btn-primary" @click="showDetail">Reserver</a>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name : 'LogementModal'
}
</script>

<style scoped>
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
</style>