<template>
  <div id="app">
    <!-- The Navbar will persist across all pages -->
    <NavBar />
    <!-- The router-view will display the component corresponding to the current route -->
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
