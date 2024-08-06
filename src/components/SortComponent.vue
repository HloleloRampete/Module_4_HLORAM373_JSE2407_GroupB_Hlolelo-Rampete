<template>
  <div class="flex sm:w-[95%] max-w-[21rem] md:w-full">
    <label for="sort" class="w-20 my-auto font-semibold">Sort by: </label>
    <select
      @change="handleSort"
      v-model="sorting"
      id="sort"
      class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="default">Default</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </select>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    initialSort: {
      type: String,
      default: 'default',
    },
  },
  setup(_, { emit }) {
    const sorting = ref('default');

    watch(sorting, (newValue) => {
      emit('sort', newValue);
    });

    const handleSort = (event) => {
      sorting.value = event.target.value;
    };

    return { sorting, handleSort };
  },
};
</script>
