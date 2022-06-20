<template>
  <div class="userProfile">
      <div class="leftSideBar">
          <ul>
              <li>Profile</li>
              <li>Réservations</li>
          </ul>
      </div>
      <div class="right">
          <h3>Vos réservations</h3>
          <div class="reservation">
              <div class="reservationContent">
                  <div class="left">
                        <p> Nom : Ny Hasina</p>
                        <p> Prix : 150000 Ar</p>
                        <p> Prénoms : Finaritra</p>
                        <p> Logement réservé: RC</p>
                        <p> Date d'arrivée : 10-05-2022</p>
                        <p> Date de depart : 15-05-2022</p>
                  </div>
                  <div class="right">
                        <p>Non Confirmé</p>
                  </div>
                  
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name : 'UserProfile'
}
</script>

<style scoped>
.userProfile{
    display: flex;
    margin : -1rem;
}
.leftSideBar{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex : 2;
    background: rgb(26, 33, 41);
    margin-top : 1rem;
    height : 100vh;
    width : 100%;

}
.leftSideBar ul{
    width : 100%;
    height: 100%;
    margin-right : 3rem;

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
    align-items: flex-start;
    margin-left: 1rem;
    margin-top: 1rem;
    flex : 7;
}
.reservation{
    display : flex ;
    align-items: flex-start;
    flex-direction : column;
    width : 100%;
    background : rgba(223, 222, 222, 0.308);
}
.reservationContent{
    display: flex;
    width : 100%;
}
.reservationContent .left{
    flex : 4;
    padding : 1rem;
    column-count: 3;

}
.reservationContent .right{
    display: flex;
    flex : 1;
    align-items: flex-end;
}
.reservationContent .right p{
    background: red;
    padding : 1rem;
    border-radius : 0.4rem;
    color : white;
    font-weight: 600;
    margin-right:1rem;
}
</style>