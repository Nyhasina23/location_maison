<template>
    <div class="navBar">
        <div class="logo">
            <h1>Site Location</h1>
        </div>
        <div class="links">
            <ul class="nav-menu">
                <li>
                    <router-link to="/"  class="nav-link">  
                        <span class="navText">
                            {{$t("home")}}
                        </span>
                    </router-link>
                </li>
                <li  v-if=" adminStatus > 0 && $store.state.isAuth">
                    <a href="/admin"  class="nav-link">
                        <span class="navText">
                             {{$t("administration")}}
                        </span>
                    </a>
                </li>
                <li v-if="!$store.state.isAuth">
                    <a href="/signup"  class="nav-link">
                        <span class="navText">
                             {{$t("signup")}}
                        </span>
                    </a>
                </li>
                <li v-if="!$store.state.isAuth" >
                    <a href="/signin"  class="nav-link">
                        <span class="navText">
                             {{$t("signin")}}
                        </span>
                    </a>
                </li>
                <li v-if="$store.state.isAuth">
                    <a href="/user/account"  class="nav-link">
                        <span class="navText">
                             {{$t("profile")}}
                        </span>
                    </a>
                </li>
                <li v-if="$store.state.isAuth" @click="logout">
                    <a href="/"  class="nav-link">
                        <span class="navText">
                             {{$t("logout")}}
                        </span>
                    </a>
                </li>
                 <!-- Language -->
                <div id="lang-switch">
                    <img src="../assets/32271_madagascar_flag_icon.png" alt="" class="mg" @click="switchMg">
                    <img src="https://cdn3.iconfinder.com/data/icons/finalflags/256/France-Flag.png" class="fr" @click="switchFr">
                    <img src="https://cdn3.iconfinder.com/data/icons/finalflags/256/United-Kingdom-flag.png" class="en" @click="switchEn">
                </div>
            </ul>
        </div>
        <div class="menu" @click="showMenu" >
            <!-- <img @click="showMenu" src="../assets/bx-menu.svg" alt=""> -->
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
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
    async mounted(){
        await this.getAdminStatus();
        
        document.querySelector('.mg').classList.add(localStorage.getItem('mg-lang-class'))
        document.querySelector('.fr').classList.add(localStorage.getItem('fr-lang-class'))
        document.querySelector('.en').classList.add(localStorage.getItem('en-lang-class'))
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
        },
        switchMg(){
            document.querySelector('.mg').classList.add("active-flag");
            document.querySelector('.en').classList.remove("active-flag");
            localStorage.setItem("lang", "mg");
            localStorage.setItem('mg-lang-class' , 'active-flag' )
            localStorage.removeItem('en-lang-class')
            localStorage.removeItem('fr-lang-class')
            window.location.reload();
         
        },
        switchFr(){
            document.querySelector('.fr').classList.add("active-flag");
            document.querySelector('.en').classList.remove("active-flag");
            localStorage.setItem("lang", "fr");
            localStorage.setItem('fr-lang-class' , 'active-flag' )
            localStorage.removeItem('en-lang-class')
            localStorage.removeItem('mg-lang-class')
            window.location.reload();
         
        },
        switchEn(){
            document.querySelector('.en').classList.add("active-flag");
            document.querySelector('.fr').classList.remove("active-flag");
            localStorage.setItem("lang", "en");
            localStorage.setItem('en-lang-class' , 'active-flag' )
            localStorage.removeItem('fr-lang-class')
            localStorage.removeItem('mg-lang-class')
            window.location.reload();
        },

        showMenu(){
            const hamburger = document.querySelector(".menu");
            const navMenu = document.querySelector(".nav-menu");

            function mobileMenu() {
                hamburger.classList.toggle("active");
                navMenu.classList.toggle("active");
            }
            mobileMenu()

            const navLink = document.querySelectorAll(".nav-link");

            navLink.forEach(n => n.addEventListener("click", closeMenu));

            function closeMenu() {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        }
    },
}
</script>

<style scoped>
#lang-switch img {
  width: 24px;
  height: 24px;
  opacity: 0.5;
  transition: all .5s;
  margin: auto 3px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#lang-switch{
  display: flex;
}
#lang-switch img:hover {
  cursor: pointer;
  opacity: 1;
}

.fr_lang,
.en_lang {
  display: none;
  transition: display .5s;
}

/* Language */
.active-lang {
  display: flex !important;
  transition: display .5s;
}

.active-flag {
  transition: all .5s;
  opacity: 1 !important;
}


.navBar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: var(--soft-shadow);
    padding : .5rem 1.5rem;
    max-width: 100vw;
    min-width: 100vw;
    overflow: hidden;
    position: fixed;
    top: 0;
    left:0;
    z-index:20;
    background: white;
    
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
    margin-left : .45rem;
    margin-right: .45rem;
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
    font-weight: 400;
}
.links ul li :hover,
.links ul li :focus,
.links ul li.active  {
    background:var(--primary-color-3-transp);
    border-radius: .5rem;
    transition: ease all .2s;

}
.links ul li a span  {
    padding : 0.5rem;
}

.menu{
    display : none;
}
.bar {
    display: block;
    width: 20px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: #101010;
}
/* responsivity */


@media only screen and (max-width: 768px) {
    .navBar{
        padding : 1rem 1.5rem;
    }
    .links ul {
        position: fixed;
        left: -100%;
        top:3.8rem;
        flex-direction: column;
        background: rgb(26, 33, 41);
        width: 100%;
        height: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow:
            0 10px 27px rgba(0, 0, 0, 0.05);
    }

    .links ul.active {
        left: 0;
    }

    .links ul li {
        margin: 1rem 0;
        color:white;
    }

    .menu {
        display: block;
        cursor: pointer;
    }

    #lang-switch{
        display: flex;
        justify-content: center;
    }
    
    .menu.active .bar:nth-child(2) {
        opacity: 0;
    }

    .menu.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .menu.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

}

</style>