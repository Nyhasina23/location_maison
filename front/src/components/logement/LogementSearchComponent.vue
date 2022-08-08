<template>
  <div class="search">
    <input type="text" class="search-input" placeholder="Recherche..." name="" value="">
   <div class="logement-container-search">
        <div class="logement-content-search">
            <div class="logement-img-search">
                <img src="../../assets/img(1).jpg" alt="">
            </div>
            <div class="logement-detail-search">
                <h5>150000 € / jour</h5>
                <p>Villa</p>
                <a class="btn-primary-search" href="#">Details</a>
            </div>
        </div>
        <div class="logement-content-search">
            <div class="logement-img-search">
                <img src="../../assets/img(3).jpg" alt="">
            </div>
            <div class="logement-detail-search">
                <h5>150000 € / jour</h5>
                <p>Villa</p>
                <a class="btn-primary-search" href="#">Details</a>
            </div>
        </div>
        <div class="logement-content-search">
            <div class="logement-img-search">
                <img src="../../assets/placeholder.jpg" alt="">
            </div>
            <div class="logement-detail-search">
                <h5>150000 € / jour</h5>
                <p>Villa</p>
                <a class="btn-primary-search" href="#">Details</a>
            </div>
        </div>
        <a class="btn-primary-search" href="#">Voir tous les logements</a>

    </div>
  </div>
</template>

<script>
export default {
    name : 'LogementSearchComponent' , 
    components : {
    }
}
</script>

<style scoped>
.search{
    display: flex;
    flex-direction: column;
    margin-top: 2.5rem;
    border : 1px solid rgb(199, 196, 196);
    border-top-color:  red;
    border-top-width: 3px;
    border-bottom-color:  red;
    border-bottom-width: 3px;
    
    padding : 1rem;
}
.logement-container-search{
    display: flex;
    flex-direction: column;

}
.logement-content-search{
    display: flex;
    border : 1px solid gray;
    width: fit-content;
    height: 8rem;
    margin-top: 1rem;

}
.logement-img-search img {
    width : 10rem ;
    height: 100%;
    object-fit: cover;
}
.logement-detail-search .btn-primary-search{
    text-decoration: none;
    color : white ;
    padding : 0.5rem 1rem 0.5rem 1rem;
    background: red;
    border: 2px solid red;
}
.logement-detail-search a{
    font-size: 0.5rem;
    margin : 1rem; 
}
.logement-detail-search p{
    font-size: 0.5rem;
}
.search-input{
    padding : 1rem;
    border-radius: 15rem ;
    border : 1px solid gray
}
.btn-primary-search{
    margin-top: 1rem;
    color : #000;
}
</style>