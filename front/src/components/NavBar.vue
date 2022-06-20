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
                <li>
                    <a href="">
                        <box-icon type='regular' name='book-content' ></box-icon>
                        <span>
                            Réservations
                        </span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <box-icon type='regular' name='user-plus' ></box-icon>
                        <span>
                            Inscription
                        </span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <box-icon type='regular' name='user-circle' ></box-icon>
                        <span>
                            Connexion
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name : 'NavBar'
}
</script>

<style scoped>

.navBar{
    display: flex;
    width: 100vw;
    align-items: center;
    justify-content: space-between;
    box-shadow: 3px 1px 11px 1px;
    margin : -0.5rem;
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
.links ul li a:hover  {
    color : red;
}
.links ul li a span  {
       padding : 0.5rem;
}

box-icon:hover {
    fill : red;
}

</style>