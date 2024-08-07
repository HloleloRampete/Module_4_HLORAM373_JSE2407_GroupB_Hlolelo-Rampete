<template>
  <div>
    <div class="grid lg:flex gap-y-4 gap-x-48 lg:items-start mt-3 mx-auto justify-center">
      <FilterComponent @filter="handleFilter" @search="handleSearch" />
      <SortComponent @sort="handleSort" />
    </div>
    <div v-if="loading">
      <p>Loading products...</p>
    </div>
    <div v-if="error">
      <ErrorComponent :error="error" />
    </div>
    <ProductList v-else :products="filteredProducts" />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useProductStore } from '@/composables/useProducts';
import { useFilterAndSort } from '@/composables/useFilterAndSort';
import FilterComponent from '@/components/FilterComponent.vue';
import SortComponent from '@/components/SortComponent.vue';
import ProductList from '@/components/ProductList.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';

export default {
  components: {
    FilterComponent,
    SortComponent,
    ProductList,
    ErrorComponent
  },
  setup() {
    const { products, loading, error, fetchProducts, filteredProducts, setFilterItem, setSearchTerm, setSorting } = useProductStore();
    const { state: filterSortState } = useFilterAndSort();

    onMounted(async () => {
      await fetchProducts();
      setFilterItem(filterSortState.filter);
      setSorting(filterSortState.sorting);
    });

    const handleSort = (sortOption) => {
      setSorting(sortOption);
      filterSortState.sorting = sortOption; // Update global state
    };

    const handleFilter = (filterOption) => {
      setFilterItem(filterOption);
      filterSortState.filter = filterOption; // Update global state
    };

    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
    };

    return {
      products,
      loading,
      error,
      filteredProducts,
      handleSort,
      handleFilter,
      handleSearch
    };
  },
};
</script>
