<template>
  <div class="flex items-center space-x-4">
    <select
      v-model="selectedCategory"
      @change="filterProducts"
      class="p-2 border rounded"
    >
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
    <input
      type="text"
      v-model="searchQuery"
      @input="filterProducts"
      placeholder="Search products..."
      class="p-2 border rounded"
    />
  </div>
</template>
