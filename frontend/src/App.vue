<template>
  <Navbar />

  <!-- this <main> will expand to push the footer down -->
  <main class="content">
    <RouterView />
  </main>

  <Footer />
</template>

<script setup>
import Navbar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import "vueperslides/dist/vueperslides.css";
</script>
