<template>
  <div>
    <Navbar />
    <div v-if="products.length" class="grid grid-cols-4 gap-4">
      <div v-for="product in products" :key="product.id" class="border p-4">
        <h2 class="text-lg">{{ product.title }}</h2>
        <p>{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import NavBar from "../components/NavBar.vue";
import useProducts from "@/composables/useProducts";

export default {
  components: {
    NavBar,
  },
  setup() {
    const { products } = useProducts();
    return { products };
  },
};
</script>
