<template>
  <div class="grid justify-center">
    <div
      class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4"
    >
      <div v-if="products.length" class="grid grid-cols-4 gap-4">
        <div v-for="product in products" :key="product.id" class="border p-4">
          <h2 class="text-lg">{{ product.title }}</h2>
          <p>{{ product.price }}</p>
        </div>
      </div>
      <div v-else>
        <p>No products found</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>
