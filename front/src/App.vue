<template>
  <NavBar />
  <MainView />
  <FooterComponent />
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterComponent from './components/FooterComponent.vue'
import MainView from './views/MainView.vue'
export default {
  name: 'App',
  components: {
    NavBar ,
    MainView ,
    FooterComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
