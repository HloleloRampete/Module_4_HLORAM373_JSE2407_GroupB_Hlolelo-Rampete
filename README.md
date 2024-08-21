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
   git clone <[repository-url](https://github.com/HloleloRampete/Module_4_HLORAM373_JSE2407_GroupB_Hlolelo-Rampete.git)>
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
***Updated Navbar.vue***
1. *Use **v-show** to Toggle Navbar Visibility*: We need to conditionally display the mobile menu based on the isNavbarOpen state.

2. *Bind **v-show** to the Navbar Container*: Apply v-show or v-if to the container that holds the mobile menu to show/hide it based on the isNavbarOpen state.

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
1. **State Management**: The filterItem state now relies on the query parameter filter. The component reads the initial filter value from route.query.filter and updates it in the URL whenever the user selects a different filter.

2. **Dropdown Handling**: The dropdown visibility is controlled with a local isDropdownVisible ref, allowing the user to toggle the visibility of filter options.

3. **Filter Change**: When a filter is selected, handleFilter updates the filterItem and emits the new filter value. It also updates the query parameter in the URL using router.replace.

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
1. **State Management**: The sorting state is now synchronized with the sort query parameter. The component reads the initial sorting value from route.query.sort and updates it in the URL whenever the user selects a different sorting option.

2. **Sorting Change**: When the sorting option is changed, handleSort updates the sorting state and emits the new sort value. It also updates the query parameter in the URL using router.replace.

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

## Challenges Faced and Solutions
Maintaining State Between Navigations

**Challenge**: Ensuring that applied filters and sorting persisted when navigating to and from the product detail view.
**Solution**: Implemented a global state management using Vue's Composition API within a composable (useProductStore). This ensured that the state (filters, sorting, search term) was preserved across different views without using local storage.
Updating UI Components Based on Global State

**Challenge**: The filter dropdown and sort selection would revert to their default states upon returning to the main view from the detail view.
**Solution**: Modified the FilterComponent and SortComponent to use the state from the useProductStore composable. This ensured that the components reflected the current global state, maintaining user-selected filters and sorting options.
Component Communication and State Management

**Challenge**: Managing communication between components to ensure they were synchronized with the global state.
**Solution**: Used Vue's emit to communicate changes from the components to the parent, and updated the global state within the useProductStore composable. This approach kept the components decoupled while maintaining consistent state.
Fetching and Displaying Products

**Challenge**: Efficiently fetching and displaying products while applying filters and sorting, and handling potential errors.
**Solution**: Implemented a fetchProducts function within the useProductStore composable to handle data fetching. Utilized computed properties to dynamically apply filters and sorting to the fetched products, ensuring efficient and responsive data handling.
Error Handling

**Challenge**: Managing potential errors during the data fetch process and ensuring a smooth user experience.
**Solution**: Added error handling within the fetchProducts function and displayed error messages using an ErrorComponent. This provided clear feedback to the user in case of issues.
Dropdown and Search Functionality

**Challenge**: Creating an interactive and user-friendly dropdown for category selection and a search bar.
**Solution**: Developed a toggleable dropdown for categories and a search input within the FilterComponent. Ensured these interacted seamlessly with the global state for consistent behavior across the application.

## Future Enhancements

Here are some potential enhancements that could be made to the project:

1. **User Authentication:** Add user authentication using Firebase or another authentication provider.
2. **Wishlist and Cart Functionality:** Implement full functionality for the Wishlist and Cart pages.
3. **Product Reviews:** Allow users to leave reviews and ratings for products.
4. **Responsive Design:** Ensure the application is fully responsive across all device sizes.
5. **Unit Tests:** Add unit tests for components and composables to ensure reliability and maintainability.
6. **Pagination:** Implement pagination for product lists to improve performance and user experience.

## Summary
Throughout the project, I encountered several challenges related to state management, component communication, and user interface consistency. By leveraging Vue's Composition API and creating a centralized state management solution, I successfully addressed these challenges. The final solution ensured that filters, sorting, and search functionality were preserved across navigations, providing a smooth and intuitive user experience. The approach of using a composable for state management proved to be effective in maintaining application-wide consistency and reactivity.


