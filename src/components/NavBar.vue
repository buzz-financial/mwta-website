<template>
  <nav :class="['navbar', { 'navbar-hidden': isHidden }]">
    <!-- Logo -->
    <div class="navbar_logo">
      <RouterLink to="/" active-class="" exact-active-class="">
        <img src="../assets/navLogo.png" alt="MWTA Logo" />
      </RouterLink>
    </div>

    <!-- Hamburger toggle (mobile) -->
    <button class="navbar_toggle" @click="isOpen = !isOpen" aria-label="Toggle menu">
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
    </button>

    <!-- Navigation links -->
    <ul :class="['navbar_links', { 'is-open': isOpen }]">
      <li class="navbar_item"><RouterLink to="/">Home</RouterLink></li>
      <li class="navbar_item"><RouterLink to="/clinics">Clinics</RouterLink></li>
      <li class="navbar_item"><RouterLink to="/privatelessons">Private Lessons</RouterLink></li>
      <li class="navbar_item"><RouterLink to="/tournaments">Tournaments</RouterLink></li>
      <li class="navbar_item"><RouterLink to="/staff">Staff</RouterLink></li>
      <li class="navbar_item"><RouterLink to="/contact">Contact</RouterLink></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
const isHidden = ref(false);
let lastScrollY = window.scrollY;

function onScroll() {
  const currentY = window.scrollY;
  // Hide when scrolling down past 100px, show when scrolling up
  isHidden.value = currentY > lastScrollY && currentY > 100;
  lastScrollY = currentY;
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 2rem;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #3452a3ab;
  color: #fff;
  z-index: 1000;
  transition: transform 0.3s ease;
}

/* Slide navbar out of view when hidden */
.navbar-hidden {
  transform: translateY(-100%);
}

/* Logo */
.navbar_logo img {
  height: 50px;
}

/* Links container */
.navbar_links {
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0 2rem; /* ensure padding from right edge */
  list-style: none;
  transition: max-height 0.3s ease;
}

/* 1) Make all links positioning relative */
.navbar_links a {
  position: relative;
  padding: 0.5rem;
  color: inherit;
  text-decoration: none;
}

.navbar_links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px; /* same height */
  width: 0;
  background: #dfff4f;
  transition: width 0.3s ease;
}

.navbar_links a:hover::after,
.navbar_links a.router-link-active::after {
  width: 100%;
}

/* Hamburger toggle hidden on desktop */
.navbar_toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
}
.navbar_toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background: #fff;
  transition: transform 0.3s, opacity 0.3s;
}
.navbar_toggle span.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.navbar_toggle span.open:nth-child(2) {
  opacity: 0;
}
.navbar_toggle span.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile styles */
@media (max-width: 768px) {
  .navbar {
    padding: 0 1rem;
  }

  .navbar_toggle {
    display: flex;
  }

  .navbar_links {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    background: #3452a3ab;
    flex-direction: column;
    align-items: center;
    max-height: 0;
    overflow: hidden;
  }

  .navbar_links.is-open {
    max-height: 300px;
  }

  .navbar_links li {
    width: 100%;
    text-align: center;
    margin: 0.5rem 0;
  }
}
</style>
