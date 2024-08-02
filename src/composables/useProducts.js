import { ref, onMounted } from "vue";
import axios from "axios";

export default function useProducts() {
  const products = ref([]);
  const categories = ref([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      products.value = response.data; // axios automatically parses JSON
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products/categories");
      categories.value = response.data; // axios automatically parses JSON
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  onMounted(() => {
    fetchProducts();
    fetchCategories();
  });

  return {
    products,
    categories,
  };
}
