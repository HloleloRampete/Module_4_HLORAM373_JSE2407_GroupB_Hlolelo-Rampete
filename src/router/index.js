import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import Wishlist from '../views/Wishlist.vue';
import Login from '../views/LoginPage.vue';
import Cart from '../views/CartPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/wishlist', name: 'Wishlist', component: Wishlist },
  { path: '/login', name: 'Login', component: Login },
  { path: '/cart', name: 'Cart', component: Cart },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
