<template>
    <div class="navBar">
        <div class="logo">
            <h1>Site Location</h1>
        </div>
        <div class="links">
            <ul>
                <li>
                    <a href="">  
                        <box-icon type='solid' name='home'></box-icon>
                        <span>
                            Accueil
                        </span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <box-icon type='solid' name='book-content' ></box-icon>
                        <span>
                            Réservations
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
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin : -1rem 1rem -1rem 1rem;
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