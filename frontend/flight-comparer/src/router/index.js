import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/trip',
      name: 'trip',
      component: () => import('../views/TripView.vue')
    },
    {
      path: '/airport/:airportId',
      name: 'airport',
      component: () => import('../views/AirportView.vue')
    }
  ]
});

export default router;
