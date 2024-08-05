import { ref, onMounted } from "vue";
import axios from "axios";

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
    error.value = null;
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      products.value = response.data; // axios automatically parses JSON
      applyFilterAndSort();
    } catch (err) {
      error.value = "Failed to fetch products.";
      console.error("Error fetching products:", err);
    } finally {
      loading.value = false;
    }
  };

  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get("https://fakestoreapi.com/products/categories");
      categories.value = response.data; // axios automatically parses JSON
    } catch (err) {
      error.value = "Failed to fetch categories.";
      console.error("Error fetching categories:", err);
    } finally {
      loading.value = false;
    }
  };

  const applyFilterAndSort = () => {
    let filteredProducts = [...products.value];

    if (filterItem.value !== 'All categories') {
      filteredProducts = filteredProducts.filter(product => product.category === filterItem.value);
    }

    if (searchTerm.value) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    }

    if (sorting.value === 'low') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sorting.value === 'high') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    products.value = filteredProducts;
  };

  const setFilterItem = (category) => {
    filterItem.value = category;
    applyFilterAndSort();
  };

  const setSearchTerm = (term) => {
    searchTerm.value = term;
    applyFilterAndSort();
  };

  const setSorting = (newSorting) => {
    sorting.value = newSorting;
    applyFilterAndSort();
  };

  onMounted(() => {
    fetchProducts();
    fetchCategories();
  });

  return {
    products,
    categories,
    loading,
    error,
    filterItem,
    searchTerm,
    sorting,
    fetchProducts,
    fetchCategories,
    setFilterItem,
    setSearchTerm,
    setSorting,
  };
}
