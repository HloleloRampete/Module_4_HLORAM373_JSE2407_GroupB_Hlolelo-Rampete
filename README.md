# SwiftCart E-Commerce Store - Built in Vue3

## Project Description: Refactoring an E-Commerce Store to Vue + Vite
In this project, we are undertaking the task of refactoring an existing E-Commerce application initially developed in React into a new structure using Vue and Vite. The goal is to leverage Vue's Composition API and Vite's fast build and hot module replacement capabilities to create a modern, responsive, and efficient E-Commerce store. The refactoring process involves setting up a new Vue project, integrating Tailwind CSS for styling, configuring routing, and ensuring data fetching from the fakeStoreApi is seamlessly integrated into the application. Below is a comprehensive overview of the steps we have taken so far in this refactoring process.

## Table of Contents

1. [Installation](#installation)
2. [Project Structure](#project-structure)
3. [Dependencies](#dependencies)
4. [Components](#components)
    - [NavBar.vue](#navbarvue)
    - [HomePage.vue](#homepagevue)
    - [ProductList.vue](#productlistvue)
    - [ProductCard.vue](#productcardvue)
    - [FilterComponent.vue](#filtercomponentvue)
    - [SortComponent.vue](#sortcomponentvue)
5. [Composables](#composables)
    - [useProducts.js](#useproductsjs)
6. [Routing](#routing)
7. [Styling](#styling)
8. [Error Handling and Loading State](#error-handling-and-loading-state)
9. [Future Enhancements](#future-enhancements)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

Here's an overview of the project's directory structure:

```
src/
├── assets/
├── components/
│   ├── FilterComponent.vue
│   ├── NavBar.vue
│   ├── ProductCard.vue
│   ├── ProductList.vue
│   └── SortComponent.vue
├── composables/
│   └── useProducts.js
├── router/
│   └── index.js
├── views/
│   └── HomePage.vue
├── App.vue
└── main.js
```

## Dependencies

The main dependencies for this project include:

- **Vue 3:** The progressive JavaScript framework used for building user interfaces.
- **Vite:** A build tool that provides a fast development environment.
- **Axios:** A promise-based HTTP client for making requests to the FakeStore API.
- **Tailwind CSS:** A utility-first CSS framework for styling the components.

## Components

### NavBar.vue

The `NavBar` component is responsible for rendering the navigation bar that persists across all pages. It includes the logo, website title, and links to the Wishlist, Cart, and Login pages.

```vue
<template>
  <nav class="bg-gray-500 border-gray-200">
    <!-- Navbar content -->
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    toggleNavbar() {
      const dropDown = document.getElementById("navbar-dropdown");
      dropDown.classList.toggle("hidden");
    },
  },
};
</script>
```

### HomePage.vue

The `HomePage` component serves as the main view for displaying products. It includes filter and sort features, which are implemented using separate components.

```vue
<template>
  <div>
    <div class="flex justify-between mb-4">
      <FilterComponent :categories="categories" @filter="handleFilter" />
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
import { ref, computed } from "vue";
import useProducts from "@/composables/useProducts";
import FilterComponent from "@/components/FilterComponent.vue";
import SortComponent from "@/components/SortComponent.vue";
import ProductList from "@/components/ProductList.vue";

export default {
  components: {
    FilterComponent,
    SortComponent,
    ProductList,
  },
  setup() {
    const { products, categories, loading, error } = useProducts();
    const selectedCategory = ref("");
    const searchQuery = ref("");
    const selectedSort = ref("");

    const filteredProducts = computed(() => {
      let filtered = products.value;

      if (selectedCategory.value) {
        filtered = filtered.filter(product => product.category === selectedCategory.value);
      }

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(query)
        );
      }

      if (selectedSort.value) {
        if (selectedSort.value === "priceAsc") {
          filtered.sort((a, b) => a.price - b.price);
        } else if (selectedSort.value === "priceDesc") {
          filtered.sort((a, b) => b.price - a.price);
        }
      }

      return filtered;
    });

    const handleFilter = (category, query) => {
      selectedCategory.value = category;
      searchQuery.value = query;
    };

    const handleSort = (sortOption) => {
      selectedSort.value = sortOption;
    };

    return {
      products,
      categories,
      filteredProducts,
      loading,
      error,
      handleFilter,
      handleSort,
    };
  },
};
</script>
```

### ProductList.vue

The `ProductList` component renders a list of products using the `ProductCard` component.

```vue
<template>
  <div class="grid justify-center">
    <div
      class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4"
    >
      <div v-if="products.length" class="grid grid-cols-4 gap-4">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
      <div v-else>
        <p>No products found</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>
```

### ProductCard.vue

The `ProductCard` component is responsible for styling and rendering individual product cards.

```vue
<template>
  <div class="border p-4">
    <h2 class="text-lg">{{ product.title }}</h2>
    <p>{{ product.price }}</p>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
```

### FilterComponent.vue

The `FilterComponent` provides dropdown filtering by categories and a search option for fuzzy searches.

```vue
<template>
  <div>
    <select @change="updateFilter">
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
    <input type="text" placeholder="Search..." v-model="searchQuery" @input="updateFilter" />
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedCategory: "",
      searchQuery: "",
    };
  },
  methods: {
    updateFilter() {
      this.$emit("filter", this.selectedCategory, this.searchQuery);
    },
  },
};
</script>
```

### SortComponent.vue

The `SortComponent` provides sorting functionality by price.

```vue
<template>
  <div>
    <select @change="updateSort">
      <option value="">Sort by</option>
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSort: "",
    };
  },
  methods: {
    updateSort() {
      this.$emit("sort", this.selectedSort);
    },
  },
};
</script>
```

## Composables

### useProducts.js

The `useProducts` composable fetches product data and categories from the FakeStore API, and manages loading and error states.

```javascript
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
      products.value = response.data;
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
      categories.value = response.data;
    } catch (err) {
      error.value = "Failed to

 fetch categories.";
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
```

## Routing

The project uses Vue Router to handle navigation between pages. Here's an example of the router configuration:

```javascript
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import WishlistPage from "@/views/WishlistPage.vue";
import CartPage from "@/views/CartPage.vue";
import LoginPage from "@/views/LoginPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/wishlist", component: WishlistPage },
  { path: "/cart", component: CartPage },
  { path: "/login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

## Styling

The project uses Tailwind CSS for styling. Tailwind is a utility-first CSS framework that allows you to style components directly in the template. 

To use Tailwind CSS, you need to install it and configure it in your project. Here are the installation steps:

1. **Install Tailwind CSS:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

2. **Configure Tailwind CSS:**
   Update your `tailwind.config.js` file:
   ```javascript
   module.exports = {
     purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
     darkMode: false, // or 'media' or 'class'
     theme: {
       extend: {},
     },
     variants: {
       extend: {},
     },
     plugins: [],
   };
   ```

3. **Add Tailwind to CSS:**
   Add the following to your `src/index.css` file:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## Error Handling and Loading State

Error handling and loading states are managed within the `useProducts.js` composable. This ensures that users receive feedback during data fetching and are notified of any issues.

### Example:

```javascript
const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    products.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch products.";
    console.error("Error fetching products:", err);
  } finally {
    loading.value = false;
  }
};
```

## Future Enhancements

Here are some potential enhancements that could be made to the project:

1. **User Authentication:** Add user authentication using Firebase or another authentication provider.
2. **Wishlist and Cart Functionality:** Implement full functionality for the Wishlist and Cart pages.
3. **Product Reviews:** Allow users to leave reviews and ratings for products.
4. **Responsive Design:** Ensure the application is fully responsive across all device sizes.
5. **Unit Tests:** Add unit tests for components and composables to ensure reliability and maintainability.
6. **Pagination:** Implement pagination for product lists to improve performance and user experience.

---

This documentation provides an overview of the project's setup, structure, and key components, as well as suggestions for future enhancements. By following these guidelines, you can maintain a clean and manageable codebase as you continue to develop the application.
