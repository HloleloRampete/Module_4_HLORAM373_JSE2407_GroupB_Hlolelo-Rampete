<template>
    <nav class="bg-gray-800 p-4 flex justify-between items-center">
      <div class="text-white font-bold text-xl">
        <router-link to="/">MyStore</router-link>
      </div>
      <div class="flex space-x-4">
        <router-link to="/wishlist" class="text-white">Wishlist</router-link>
        <router-link to="/cart" class="text-white">
          <i class="fas fa-shopping-cart"></i>
        </router-link>
        <router-link to="/login" class="text-white">Login</router-link>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
  };
  </script>
  
 
  