<template>
    <div class="navBar">
        <div class="logo">
            <h1>Site Location</h1>
        </div>
        <div class="links">
            <ul>
                <li>
                    <router-link to="/">  
                        <span class="navText">
                            Accueil
                        </span>
                    </router-link>
                </li>
                <li  v-if=" adminStatus > 1 && $store.state.isAuth">
                    <a href="/admin">
                        <span class="navText">
                            Administration
                        </span>
                    </a>
                </li>
                <li v-if="!$store.state.isAuth">
                    <a href="/signup">
                        <span class="navText">
                            Inscription
                        </span>
                    </a>
                </li>
                <li v-if="!$store.state.isAuth"  >
                    <a href="/signin">
                        <span class="navText">
                            Connexion
                        </span>
                    </a>
                </li>
                <li v-if="$store.state.isAuth">
                    <a href="/user/account">
                        <span class="navText">
                            Profile
                        </span>
                    </a>
                </li>
                <li v-if="$store.state.isAuth" @click="logout">
                    <a href="/">
                        <span class="navText">
                            Deconnexion
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'NavBar',
    components : {
    } ,
    data() {
        return{
           adminStatus : 0 
        }
    },
    mounted(){
        this.getAdminStatus();
    },
    methods: {
        logout(){
            this.$store.commit('isAuthenticated' , false)
        },
        async getAdminStatus(){
            await axios.get(process.env.VUE_APP_URL+'/user/getOneUser' , {
                headers : {
                    Authorization : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(async (res) => {
                this.adminStatus = res.data.role;
            }).catch(error => {
                console.log(error);
            })
        }
    },
}
</script>

<style scoped>

.navBar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: var(--soft-shadow);
    padding : .5rem 1.5rem;
    
}
.navBar .logo{
    margin-left : 1rem;
}
.links ul {
    list-style-type: none;
    display: flex;
}
.links ul li{
    color : var(--primary-color-5);
    border-radius: .5rem;
    margin-left : .25rem;
    margin-right: .25rem;
}
.links{
    margin-right: 1rem;
}
.links ul li a {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    text-decoration: none;
}
.navText{
    font-weight: 600;
}
.links ul li :hover,
.links ul li.active  {
    background:var(--primary-color-3-transp);
    border-radius: .5rem;
    transition: ease all .2s;
}
.links ul li a span  {
    padding : 0.5rem;
}

</style>