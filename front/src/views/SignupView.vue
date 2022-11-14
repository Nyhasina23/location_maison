<template>
    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="py-6 px-6 lg:px-8">
                    <h3 class="mb-4 text-xl text-center font-medium text-gray-900 dark:text-white"> {{$t('inscrire')}} </h3>
                    <form class="space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{$t('firstname')}} </label>
                            <input type="text" v-model="firstname" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required>
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{$t('lastname')}} </label>
                            <input type="text" v-model="lastname" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required>
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{$t('gender')}} </label>
                            <select name="" id="" v-model="isMale" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                <option value="true">{{$t('male')}} </option>
                                <option value="false">{{$t('female')}} </option>
                            </select>
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{$t('address')}} </label>
                            <input type="text" v-model="address" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required>
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{$t('phone')}} </label>
                            <input type="text" v-model="phoneNumber" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required>
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{$t('email')}} </label>
                            <input type="email" v-model="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="rakoto@gmail.com" required>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{$t('password')}} </label>
                            <input type="password" v-model="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                        </div>
                       
                        <button type="button" @click="signup" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{$t('inscrire')}} </button>
                        <p v-if="signupError" class="error p-4 mt-2 text-sm text-red-700 bg-red-100 rounded dark:bg-red-200 dark:text-red-800" role="alert">{{ signupError }}</p>

                        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                           {{$t('have_account')}}  <a href="/signin" class="text-blue-700 hover:underline dark:text-blue-500">{{$t('se_connecter')}} </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
export default {
    name : 'SigninView' ,
    data() {
        return {
            signupError : '',
            email : '' ,
            password : '' , 
            firstname : '' ,
            lastname : '' ,
            isMale : '' ,
            address : '' ,
            phoneNumber : ''
        }
    }, 
    methods: {
    
      async login(){
        await axios.post(process.env.VUE_APP_URL+'/signin' , {
          identity : this.email ,
          password : this.password
        }).then(() => {
          this.$store.commit('isAuthenticated' , true)
          this.$router.push('/')
        }).catch(() => {
          this.loginError = 'email ou mot de passe incorrecte'
        })
      },
      
      async signup(){
        await axios.post(process.env.VUE_APP_URL+'/signup' , {
            firstname : this.firstname,
            lastname : this.lastname ,
            email : this.email ,
            isMale : this.isMale ,
            password : this.password ,
            address : this.address ,
            phoneNumber : this.phoneNumber
        }).then(() => {
            this.$router.push('/signin')
        }).catch(() => {
            this.signupError = 'Veuillez vérifier tous les champs'
        })
      }
    },
}
</script>

<style scoped>
#authentication-modal{
    margin-top:1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>