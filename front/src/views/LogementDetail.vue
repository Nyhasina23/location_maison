<template>
  <div class="logements">
    <div class="logement-headers">
        <img src="../assets/img(2).jpg" alt="">
    </div>
    <div class="logement-containers relative  overflow-x-auto shadow-md sm:rounded-lg">
        <h1 class="mt-4 mb-4">{{logement.name}}</h1>
        <p class="mb-4"> {{logement.description}} </p>

        
        <div class="relative mb-8 overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Détails du logement
                        </th>
                        <th scope="col" class="px-6 py-3">
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                            Type
                        </th>
                        <td class="px-6 py-4">
                            {{logement.type}}
                        </td>
                      
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                            Surface
                        </th>
                        <td class="px-6 py-4">
                            {{logement.surface}}
                        </td>
                       
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                            Modalité
                        </th>
                        <td class="px-6 py-4">
                            {{logement.modalite}}
                        </td>
                     
                    </tr>
                </tbody>
            </table>
        </div>



        <div class="flex">
            <img src="../assets/img(3).jpg" alt="">
            <img src="../assets/img(4).jpg" alt="">
            <img src="../assets/img(6).jpg" alt="">
        </div>
    </div>
    <div class="logement-footers relative  overflow-x-auto shadow-md sm:rounded-lg">
        <div class="flex-col">
            <p>350000 Ar / jour</p>
        </div>

        <a href="/reservation/detail" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "  @click="getLogementId(logement._id)">Réserver</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'LogementDetail' ,
    data() {
        return {
            logement : ''
        }
    },
    async mounted () {
        const idLog = this.$store.state.idLog;
        await axios.get(process.env.VUE_APP_URL+'/logement/getOneLogement/'+idLog)
        .then(res => {
            this.logement = res.data
        }).catch(error => {
            console.log(error);
        })
    } , 
    methods: {
        getLogementId(id){
        this.$store.commit('setIdLog' , id)
      },
    },
}
</script>

<style scoped>
.logements{
    display: flex;
    flex-direction: column;
}
.logement-headers img{
    width : 100%;
    height : 25rem;
    object-fit: cover;
    object-position: center;
}
.logement-containers , .logement-footers{
    display: flex;
    flex-direction: column;
    width : 100;
    margin: 1rem;
    padding : 1rem;
    align-items: flex-start;
}
.logement-containers h1{
    font-size : 1.5rem;
    font-weight: 600;
}
.logement-containers p{
    text-align: left;
}

.logement-containers img{
    width : 15rem;
}
.logement-footers{
    display: flex;
    flex-direction: row;
}
.logement-footers div{
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}
.logement-footers button{
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}
.logement-footers div p{
    font-size : 1.2rem;
    font-weight: 600;
}
</style>