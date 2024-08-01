<template>
  <div id="app">
    <!-- The Navbar will persist across all pages -->
    <Navbar />
    <!-- The router-view will display the component corresponding to the current route -->
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>
