<template>
  <div>
    <div class="grid lg:flex gap-y-4 gap-x-48 lg:items-start mt-3 mx-auto justify-center">
      <FilterComponent :categories="categories" @filter="handleFilter" />
      <SortComponent @sort="handleSort" />
    </div>
    <div v-if="loading">
      <p>Loading products...</p>
    </div>
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
    <ProductList v-else :products="filteredProducts" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useProductStore } from "@/composables/useProducts";
import FilterComponent from "@/components/FilterComponent.vue";
import SortComponent from "@/components/SortComponent.vue";
import ProductList from "@/components/ProductList.vue";

export default {
  components: {
    FilterComponent,
    SortComponent,
    ProductList,
  },
  setup() {
    const {
      products,
      categories,
      loading,
      error,
      fetchProducts,
      fetchCategories,
    } = useProductStore();
    
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
      loading,
      error,
      handleFilter,
      handleSort,
    };
  },
};
</script>
