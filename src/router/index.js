import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Register from '../views/RegisterView.vue';
import WaitingView from '../views/WaitingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/waiting',
      name: 'waiting',
      component: WaitingView
    },
  ]
});

router.beforeEach((to, from, next) => {
  // Check if the user is navigating to the home route and 'antrianData' is present in localStorage
  if (to.name === 'home' && localStorage.getItem('antrianData')) {
    // Redirect to the waiting route
    next({ name: 'waiting' });
  } else if (to.name === 'waiting' && !localStorage.getItem('antrianData')) {
    // Redirect to the home route if 'antrianData' is not present in localStorage
    next({ name: 'home' });
  } else {
    // Continue with the navigation
    next();
  }
});


export default router;
