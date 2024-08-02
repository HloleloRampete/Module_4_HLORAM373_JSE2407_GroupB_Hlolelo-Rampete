import { ref, onMounted } from 'vue';
import axios from 'axios';

export default function useProducts() {
    const products = ref([]);
    const categories = ref([]);

    const fetchProducts = async () => {
        const response = await axios.get('https://fakestoreapi.com/products');
        products.value = await response.json();
    };

    const fetchCategories = async () => {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        categories.value = await response.json();
    };

    onMounted(() => {
        fetchProducts();
        fetchCategories();
    });

    return {
        products,
        categories
    };
}