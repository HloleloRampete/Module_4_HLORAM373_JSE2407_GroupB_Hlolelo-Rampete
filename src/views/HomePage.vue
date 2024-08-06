<template>
  <div>
    <div class="grid lg:flex gap-y-4 gap-x-48 lg:items-start mt-3 mx-auto justify-center">
      <FilterComponent />
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
import { onMounted, computed } from 'vue';
import { useProductStore } from '@/composables/useProducts';
import FilterComponent from '@/components/FilterComponent.vue';
import SortComponent from '@/components/SortComponent.vue';
import ProductList from '@/components/ProductList.vue';

export default {
  components: {
    FilterComponent,
    SortComponent,
    ProductList,
  },
  setup() {
    const { products, loading, error, fetchProducts, filterItem, searchTerm, sorting, setSorting } = useProductStore();

    onMounted(async () => {
      await fetchProducts();
    });

    const handleSort = (sortOption) => {
      setSorting(sortOption);
    };

    const filteredProducts = computed(() => {
      let filtered = products.value;

      if (filterItem.value !== 'All categories') {
        filtered = filtered.filter(product => product.category === filterItem.value);
      }

      if (searchTerm.value) {
        const query = searchTerm.value.toLowerCase();
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(query)
        );
      }

      if (sorting.value === 'low') {
        filtered = filtered.slice().sort((a, b) => a.price - b.price);
      } else if (sorting.value === 'high') {
        filtered = filtered.slice().sort((a, b) => b.price - a.price);
      }

      return filtered;
    });

    return {
      products,
      loading,
      error,
      filteredProducts,
      handleSort,
    };
  },
};
</script>
