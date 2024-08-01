import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Wishlist from '../views/Wishlist.vue';
import Login from '../views/Login.vue';
import Cart from '../views/Cart.vue';

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
