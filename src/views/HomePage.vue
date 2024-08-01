<template>
    <div>
        <Navbar />
        <h1>Home</h1>
        <div v-if="products.length" class="grid grid-cols-4 gap-4">
      <div v-for="product in products" :key="product.id" class="border p-4">
        <h2 class="text-lg">{{ product.title }}</h2>
        <p>{{ product.price }}</p>
      </div>
    </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
    components: {
        Navbar,
    },
};
</script>