import { ref, onMounted } from "vue";
import axios from "axios";

export default function useProducts() {
  const products = ref([]);
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      products.value = response.data; // axios automatically parses JSON
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

  onMounted(() => {
    fetchProducts();
    fetchCategories();
  });

  return {
    products,
    categories,
    loading,
    error,
  };
}
