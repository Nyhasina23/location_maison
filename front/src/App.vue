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
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  --tw-ring-color:none
}
[type='text']:focus, [type='email']:focus, [type='url']:focus, [type='password']:focus, [type='number']:focus, [type='date']:focus, [type='datetime-local']:focus, [type='month']:focus, [type='search']:focus, [type='tel']:focus, [type='time']:focus, [type='week']:focus, [multiple]:focus, textarea:focus, select:focus {
  --tw-ring-color:none;
  --tw-ring-shadow:none;
}
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
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

::-webkit-scrollbar {
  width: 0.8em;
  display:none;
}
::-webkit-scrollbar-track {
  background: var(--primary-color-1);
  border-radius: 100vw;
  margin-block: 0.5em;
}
::-webkit-scrollbar-thumb {
  background: var(--primary-color-4);
  border-radius: 100vw;
  border: 0.2em solid var(--primary-color-2);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color-5);
  border: 0.2em solid var(--primary-color-3);
}

@supports (scrollbar-color: var(--primary-color-4) var(--primary-color-1)) {
  * {
    scrollbar-color: var(--primary-color-4) var(--primary-color-1);
    scrollbar-width: thin;
  }
}

* {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none; 
}
input,
textarea,
button,
select,
a {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-touch-callout:none;                /* prevent callout to copy image, etc when tap to hold */
    -webkit-text-size-adjust:none;             /* prevent webkit from resizing text to fit */
    -webkit-tap-highlight-color:rgba(0,0,0,0); /* prevent tap highlight color / shadow */
    -webkit-user-select:none;
}
body {
  margin: 0;
  padding: 0;
  text-decoration: none;
  max-width: 100vw;
  overflow-x: hidden;
}
.shadowed{
  box-shadow: var(--soft-shadow)
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* overflow: hidden; */
}
.text-gradient-small {
  background: var(--primary-gradient-2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.text-gradient-big {
  background: var(--primary-gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
