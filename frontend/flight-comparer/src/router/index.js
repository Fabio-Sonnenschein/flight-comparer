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
      path: '/preferences',
      name: 'preferences',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/trip/:tripId',
      name: 'trip',
      component: () => import('../views/TripView.vue')
    },
    {
      path: '/airport/:airportId',
      name: 'airport',
      component: () => import('../views/AirportView.vue')
    },
    {
      path: '/flight/:flightId',
      name: 'flight',
      component: () => import('../views/FlightView.vue')
    },
    {
      path: '/inputs',
      name: 'inputs',
      component: () => import('../components/inputs/componentOverview.vue')
    }
  ]
});

export default router;
