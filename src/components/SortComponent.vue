<template>
  <div class="flex items-center space-x-4">
    <select
      v-model="selectedSort"
      @change="sortProducts"
      class="p-2 border rounded"
    >
      <option value="">Sort by</option>
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    onSort: Function,
  },
  data() {
    return {
      selectedSort: "",
    };
  },
  methods: {
    sortProducts() {
      this.onSort(this.selectedSort);
    },
  },
};
</script>
