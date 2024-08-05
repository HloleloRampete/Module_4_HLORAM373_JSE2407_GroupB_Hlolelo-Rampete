<template>
    <div>
      <ProductDetail :product="product" v-if="product" />
      <div v-else>Loading...</div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import ProductDetail from '@/components/ProductDetail.vue';
  
  export default {
    components: { ProductDetail },
    setup() {
      const product = ref(null);
      const route = useRoute();
      const productId = route.params.id;
  
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
          product.value = response.data;
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        }
      };
  
      onMounted(fetchProduct);
  
      return { product };
    },
  };
  </script>
  