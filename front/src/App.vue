<template>
  <NavBar />
  <router-view></router-view>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar ,
  }
}
</script>

<style>
*{
  margin : 0;
  padding : 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
:root {
  --font: "Ubuntu";
  --main-white: #fff;
  --main-black: #000;
  --primary-color-0: #eaf0f5;
  --primary-color-1: #dbe2e8;
  --primary-color-2: #95bbdc;
  --primary-color-3: #448bca;
  --primary-color-3-transp: rgba(68, 139, 202, 0.247);
  --primary-color-4: #0974d4;
  --primary-color-5: #045299;
  --primary-color-6: #012c55;
  --primary-color-6-transp: #01213f10;

  --secondary-color-yellow-1: #fff1dc;
  --secondary-color-yellow-2: #fff1dc;
  --secondary-color-yellow-3: #fbb03b;
  --secondary-color-yellow-4: #e08900;
  --secondary-color-yellow-5: #b87000;

  --secondary-color-red-1: #fff1ef;
  --secondary-color-red-2: #ffafa7;
  --secondary-color-red-3: #ff5a49;
  --secondary-color-red-4: #ff1800;
  --secondary-color-red-5: #ec1600;

  --complementary-color-1: #fff8ef;
  --complementary-color-2: #ffdaa7;
  --complementary-color-3: #ffb449;
  --complementary-color-4: #ff9500;
  --complementary-color-5: #ec8a00;

  --primary-gradient-1: -webkit-linear-gradient(
    141.18deg,
    #045299 14.65%,
    #012c55 82.43%
  );
  --primary-gradient-2: -webkit-linear-gradient(
    141.18deg,
    #003261 5%,
    #070b31 95%
  );
  --primary-gradient-3: -webkit-linear-gradient(
    141.18deg,
    #045299 1%,
    #012c55 99%
  );
  --soft-shadow :  0 2px 12px 0 rgb(0 0 0 / 10%);
  --hard-shadow :  2px 4px 14px 2px #0974d433;
}
</style>
