import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import WishList from '../views/WishList.vue';
import Login from '../views/LoginPage.vue';
import Cart from '../views/CartPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/wishList', name: 'WishList', component: WishList },
  { path: '/login', name: 'Login', component: Login },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/products/:id', name: 'ProductDetail', component: ProductDetailPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
