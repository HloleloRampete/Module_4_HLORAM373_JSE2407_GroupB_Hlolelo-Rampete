<template>
    <div class="border p-4 flex flex-col items-center">
      <h2 class="text-lg">{{ product.title }}</h2>
      <p>{{ product.price }}</p>
    </div>
  </template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>