<template>
    <div class="navBar">
        <div class="logo">
            <h1>Site Location</h1>
        </div>
        <div class="links">
            <ul>
                <li>
                    <router-link to="/">  
                        <box-icon type='regular' name='home'></box-icon>
                        <span>
                            Accueil
                        </span>
                    </router-link>
                </li>
                <li v-if="!$store.state.isAuth">
                    <a href="/signup">
                        <box-icon type='regular' name='user-plus' ></box-icon>
                        <span>
                            Inscription
                        </span>
                    </a>
                </li>
                <li v-if="!$store.state.isAuth"  >
                    <a href="/signin">
                        <box-icon type='regular' name='user-circle' ></box-icon>
                        <span>
                            Connexion
                        </span>
                    </a>
                </li>
                <li v-if="$store.state.isAuth">
                    <a href="/user/account">
                        <box-icon type='regular' name='user-circle' ></box-icon>
                        <span>
                            Profile
                        </span>
                    </a>
                </li>
                <li v-if="$store.state.isAuth" @click="logout">
                    <a href="/">
                        <box-icon type='regular' name='user-circle' ></box-icon>
                        <span>
                            Deconnexion
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name : 'NavBar',
    components : {
    } ,
    methods: {
        logout(){
            this.$store.commit('isAuthenticated' , false)
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
.links{
    margin-right: 1rem;
}
.links ul li a {
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    text-decoration: none;
    color : #000;
}
.links ul li :hover  {
    color : var(--primary-color-4);
    fill : var(--primary-color-4);

}
.links ul li a span  {
    padding : 0.5rem;
}

</style>