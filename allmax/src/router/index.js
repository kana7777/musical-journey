import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeP.vue';
 
const routes = [
    {
    path: '/',
    name: 'Home',
    component: Home,
    },
    {
    path: `/homework`,
    name: 'homework',
    
    children: [
        { 
            path: '/drinkMenu',
            name: 'drinkMenu',
            component: () => import('../views/DrinkMenu.vue'), 
          },
          { 
            path: '/login',
            name: 'login',
            component: () => import('../views/LogIn.vue'), 
          },
        ]
    }
 
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;