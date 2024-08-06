import { ref, computed } from 'vue';
import axios from 'axios';

export function useProductStore() {
  const products = ref([]);
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const filterItem = ref('All categories');
  const searchTerm = ref('');
  const sorting = ref('default');

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      products.value = response.data;
      categories.value = Array.from(new Set(products.value.map(product => product.category)));
      loading.value = false;
    } catch (err) {
      error.value = 'Failed to fetch products';
      loading.value = false;
    }
  };

  const setFilterItem = (item) => {
    filterItem.value = item;
  };

  const setSearchTerm = (term) => {
    searchTerm.value = term;
  };

  const setSorting = (sortOption) => {
    sorting.value = sortOption;
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
    categories,
    loading,
    error,
    filterItem,
    searchTerm,
    fetchProducts,
    setFilterItem,
    setSearchTerm,
    setSorting,
    sorting,
    filteredProducts,
  };
}
