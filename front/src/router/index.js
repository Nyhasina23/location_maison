
import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue'
import LogementDetail from '../components/LogementDetail.vue'

const routes = [
    { name: 'Home', path: '/', component: MainView, },
    { name : 'LogementDetail' , path : '/logement/detail' , component : LogementDetail}
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;