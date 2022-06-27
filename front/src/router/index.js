
import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue'
import ReservationDetail from '../components/ReservationDetail.vue'
import UserReservation from '../components/reservation/UserReservation.vue'
import UserProfile from '../views/user/UserProfile.vue'
import AdminView from '../views/admin/AdminView.vue'
import CalendarView from '../views/CalendarView.vue'
import LogementDetail from '../views/LogementDetail.vue'
const routes = [
    { name: 'Home', path: '/', component: MainView, },
    { name : 'ReservationDetail' , path : '/reservation/detail' , component : ReservationDetail},
    { name : 'UserReservation' , path : '/reservation/list' , component : UserReservation},
    { name : 'UserProfile' , path : '/user/account' , component : UserProfile},
    { name : 'AdminView' , path : '/admin/reservation' , component : AdminView},
    { name : 'CalendarView' , path : '/logement/calendar' , component : CalendarView},
    { name : 'LogementDetail' , path : '/logement' , component : LogementDetail},
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;