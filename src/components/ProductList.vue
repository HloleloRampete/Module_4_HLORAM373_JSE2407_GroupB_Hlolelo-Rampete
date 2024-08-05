<template>
    <div class="grid justify-center">
      <div
        class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4"
      >
        <div v-if="products.length" class="grid grid-cols-4 gap-4">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
        <div v-else>
          <p>No products found</p>
        </div>
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