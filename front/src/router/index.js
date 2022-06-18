
import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue'
import LogementDetail from '../components/LogementDetail.vue'
import UserReservation from '../components/reservation/UserReservation.vue'
import UserProfile from '../views/user/UserProfile.vue'
import AdminView from '../views/admin/AdminView.vue'
const routes = [
    { name: 'Home', path: '/', component: MainView, },
    { name : 'LogementDetail' , path : '/logement/detail' , component : LogementDetail},
    { name : 'UserReservation' , path : '/reservation/list' , component : UserReservation},
    { name : 'UserProfile' , path : '/user/account' , component : UserProfile},
    { name : 'AdminView' , path : '/admin/reservation' , component : AdminView},
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;