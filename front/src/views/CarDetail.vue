<template>
  <div class="logements">
    <div class="logement-containers relative  overflow-x-auto  sm:rounded-lg">
    <div id="allImages">
      <img  class="singleImage" v-for="(imageData,i) in imagesData" v-bind:key="i" @click="swipper(i)" :src="imageData" alt=""/>
    </div>
        <h1 class="mt-4 mb-4">{{ $t('marque') }} : {{car.marque}} </h1>
        <p class="mb-4"> <strong> {{ $t('type') }} :</strong>   {{car.type}} </p>  
        <p class="mb-4"> <strong>{{ $t('nbr_place') }} :</strong>   {{car.nbr_place}} </p>  
        <h1 class="mt-4 mb-4">{{ $t('description') }}</h1>
        <p class="mb-4"> {{car.description}} </p>  

    </div>
    <div class="logement-footers relative  overflow-x-auto sm:rounded-lg">
        <div class="flex-col">
            <p>{{price}} € / {{ $t('day') }}</p>
        </div>

        <a href="/car/reservation/" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "  @click="getLogementId(logement._id)">Réserver</a>
    </div>
  </div>
  <div class="sliderBody inactive">
    <div class="slider-container">
        <div class="slide" v-for="(imageData,i) in imagesData" v-bind:key="i">
            <img class="singleImageSlide" :src="imageData" alt=""/> 
        </div>
    </div>
    <i id="close"  @click="closeSlider" class='bx  bx-x'></i>
  </div>
  
  <div class=""></div>
   
</template>

<script>
import axios from 'axios';
import getImage from '../services/getImages'
export default {
    name : 'CarDetail' ,
    data() {
        return {
            car : '' ,
            price : '',
            imagesList:[],
            imagesData:[],
            imagesBlur:[],
        }
    },
    async mounted () {
        const idCar = this.$store.state.idCar;
        await axios.get(process.env.VUE_APP_URL+'/car/getOneCar/'+idCar)
        .then(async res => {
            this.car = res.data;
            this.imagesList = res.data.images;
            this.price = res.data.price;
            for(let i = 0; i<this.imagesList.length;i++){
                this.imagesData.push(await getImage.get(this.imagesList[i]));
                this.imagesBlur.push(await getImage.blur(this.imagesList[i]));
            }
        }).catch(error => {
            console.log(error);
        })
        const slider = document.querySelector('#allImages');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
        });
    } , 
    methods: {
      getCartId(id){
        this.$store.commit('setIdCar' , id);
      },
      closeSlider(){
          document.querySelector('.sliderBody').classList.remove('active');
        document.querySelector('.sliderBody').classList.add('inactive');
      },
      swipper(pos){
          
          
          

        // get our elements
        const slider = document.querySelector('.slider-container');
        const slides = Array.from(document.querySelectorAll('.slide'));
        // set up our state
        let isDragging = false;
        let startPos = pos;
        let currentTranslate = pos;
        let prevTranslate = pos;
        let animationID;
        let currentIndex = pos;
        slider.style.transition = "none"
        slider.style.transform = `translateX(${currentIndex * -window.innerWidth}px)`;
        setTimeout(() => {
            slider.style.transition = "transform 0.3s ease-out"
        }, 400);
        
        // add our event listeners
        slides.forEach((slide, index) => {
            const slideImage = slide.querySelector('img');
            // disable default image drag
            slideImage.addEventListener('dragstart', (e) => e.preventDefault());
            // touch events
            slide.addEventListener('touchstart', touchStart(index));
            slide.addEventListener('touchend', touchEnd);
            slide.addEventListener('touchmove', touchMove);
            // mouse events
            slide.addEventListener('mousedown', touchStart(index));
            slide.addEventListener('mouseup', touchEnd);
            slide.addEventListener('mousemove', touchMove);
            slide.addEventListener('mouseleave', touchEnd);
        })
        document.querySelector('.sliderBody').classList.remove('inactive');
        document.querySelector('.sliderBody').classList.add('active');

        // make responsive to viewport changes
        window.addEventListener('resize', setPositionByIndex);

        // prevent menu popup on long press
        window.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }

        // use a HOF so we have index in a closure
        function touchStart(index) {
            return function (event) {
                currentIndex = index;
                startPos = getPositionX(event);
                isDragging = true;
                animationID = requestAnimationFrame(animation);
                slider.classList.add('grabbing');
            };
        }

        function touchMove(event) {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                currentTranslate = prevTranslate + currentPosition - startPos;
            }
        }

        function touchEnd() {
            cancelAnimationFrame(animationID);
            isDragging = false;
            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
            if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;
            setPositionByIndex();

            slider.classList.remove('grabbing');
        }

        function animation() {
            setSliderPosition()
            if (isDragging) requestAnimationFrame(animation);
        }

        function setPositionByIndex() {
            currentTranslate = currentIndex * -window.innerWidth;
            prevTranslate = currentTranslate;
            setSliderPosition();
        }

        function setSliderPosition() {
            slider.style.transform = `translateX(${currentTranslate}px)`;
        }

      }
    },
}
</script>

<style scoped>
.logements{
    display: flex;
    flex-direction: column;
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
.hide{
    display:none
}

.logement-footers{
    display: flex;
    flex-direction: row;
    align-items:center;
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
 .inactives{
    display:none;
  }
  
    #allImages{
      overflow-x:scroll;
      height: 14rem;
      display:flex;
      cursor:grab;
      
    }
    #allImages.active {
    background: rgba(255,255,255,0.3);
    cursor: grabbing;
    cursor: -webkit-grabbing;
    transform: scale(1);
  }
    .singleImage{
      border-radius:.5rem;
      box-shadow:var(--soft-shadow);
      height:13rem;
      width:auto;
      transition: ease all .2s;
      margin-right:1rem;
      
    }
    .singleImage:hover{
      transition: ease all .2s;
    }

    /* swipper */
    
.slider-container {
  height: 100vh;
  display: inline-flex;
  overflow: hidden;
  scrollbar-width: none;
  transform: translateX(0);
  will-change: transform;
  transition: transform 0.3s ease-out;
  cursor: grab;
}

.slide{
  max-height: 100vh;
  max-width: 100vw;
  min-width:100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

@media(min-width: 1200px){
  .slide {
    padding: 3rem;
  }
}

.slide img{
  max-height: 100%;
  width: fit-content;
  max-width: 100%;
  transition: transform 0.3s ease-in-out;
  user-select: none;
}

.grabbing {
  cursor: grabbing;
}

.grabbing .slide img{
  transform: scale(0.9);
  box-shadow: 5px 5px 40px -1px var(--shadow);
}

.sliderBody{
    width: 100vw;
    height:100vh;
    z-index:999999;
    position:fixed;
    top:0;
    left:0;
    background:white;
}
#close{
    transition:ease all .2s;
    position:fixed;
    font-size:2rem;
    top: 0rem;
    right:0rem;
    cursor:pointer;
    border-radius:100%;
    color:#555;
    display:flex;
    align-items:center;
    justify-content:center;
    border: solid 2rem transparent;
}

.sliderBody.active{
    visibility: visible;

}
.sliderBody.inactive{
    visibility: hidden; 

}
@media 
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {
    .singleImage{
        object-fit: cover;
    }
	/* Force table to not be like tables anymore */
	table, thead, tbody, th, td, tr { 
		display: block; 
	}
	
	/* Hide table headers (but not display: none;, for accessibility) */
	thead tr { 
		position: absolute;
		top: -9999px;
		left: -9999px;
	}
	
	tr { border: 1px solid #ccc; }
	
	td { 
		/* Behave  like a "row" */
		border: none;
		border-bottom: 1px solid #eee; 
		position: relative;
	}
	
	td:before { 
		/* Now like a table header */
		position: absolute;
		/* Top/left values mimic padding */
		top: 6px;
		left: 6px;
		width: 45%; 
		padding-right: 10px; 
		white-space: nowrap;
	}
}
</style>