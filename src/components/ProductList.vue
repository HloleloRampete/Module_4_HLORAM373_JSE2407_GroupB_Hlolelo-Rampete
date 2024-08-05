<template>
    <div class="grid justify-center">
      <div class="max-w-7xl w-full mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </template>
  
  <script>
  import ProductCard from "@/components/ProductCard.vue";
  
  export default {
    components: {
      ProductCard,
    },
    props: {
      products: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  