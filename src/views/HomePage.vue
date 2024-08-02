<template>
  <div>
    <div class="flex justify-between mb-4">
      <FilterComponent :categories="categories" @filter="handleFilter" />
      <SortComponent @sort="handleSort" />
    </div>
    <div v-if="products.length" class="grid grid-cols-4 gap-4">
      <div v-for="product in products" :key="product.id" class="border p-4">
        <h2 class="text-lg">{{ product.title }}</h2>
        <p>{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import useProducts from "@/composables/useProducts";
import FilterComponent from "@/components/FilterComponent.vue";
import SortComponent from "@/components/SortComponent.vue";

export default {
  components: {
    FilterComponent,
    SortComponent,
  },
  setup() {
    const { products, categories } = useProducts();
    const selectedCategory = ref("");
    const searchQuery = ref("");
    const selectedSort = ref("");

    const filteredProducts = computed(() => {
      let filtered = products.value;

      if (selectedCategory.value) {
        filtered = filtered.filter(product => product.category === selectedCategory.value);
      }

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(query)
        );
      }

      if (selectedSort.value) {
        if (selectedSort.value === "priceAsc") {
          filtered.sort((a, b) => a.price - b.price);
        } else if (selectedSort.value === "priceDesc") {
          filtered.sort((a, b) => b.price - a.price);
        }
      }

      return filtered;
    });

    const handleFilter = (category, query) => {
      selectedCategory.value = category;
      searchQuery.value = query;
    };

    const handleSort = (sortOption) => {
      selectedSort.value = sortOption;
    };

    return {
      products,
      categories,
      filteredProducts,
      handleFilter,
      handleSort,
    };
  },
};
</script>
