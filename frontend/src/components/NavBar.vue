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
      <li class="navbar_item"><RouterLink to="/" @click="closeMenu">Home</RouterLink></li>

      <!-- Clinics dropdown -->
      <li class="navbar_item dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
        <a href="#" @click.prevent="toggleDropdown" class="dropdown-trigger">
          Clinics & Programs
          <span class="dropdown-arrow" :class="{ rotated: showDropdown || mobileDropdownOpen }">▼</span>
        </a>
        <ul :class="['dropdown-menu', { show: showDropdown || mobileDropdownOpen }]">
          <li><RouterLink to="/junior" @click="closeMenu">Junior Program</RouterLink></li>
          <li><RouterLink to="/adult" @click="closeMenu">Adult Clinic</RouterLink></li>
          <li class="navbar_item"><RouterLink to="/privatelessons" @click="closeMenu">Private Lessons</RouterLink></li>
        </ul>
      </li>

      <li class="navbar_item"><RouterLink to="/tournaments" @click="closeMenu">Tournaments</RouterLink></li>
      <li class="navbar_item"><RouterLink to="/staff" @click="closeMenu">Staff</RouterLink></li>
      <li class="navbar_item"><RouterLink to="/contact" @click="closeMenu">Contact</RouterLink></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const closeMenu = () => {
  isOpen.value = false;
  mobileDropdownOpen.value = false;
  showDropdown.value = false;
};

watch(() => route.fullPath, () => closeMenu());
const isOpen = ref(false);
const isHidden = ref(false);
const showDropdown = ref(false);
const mobileDropdownOpen = ref(false);
let lastScrollY = window.scrollY;

function onScroll() {
  const currentY = window.scrollY;
  // Hide when scrolling down past 100px, show when scrolling up
  isHidden.value = currentY > lastScrollY && currentY > 100;
  lastScrollY = currentY;
}

function toggleDropdown() {
  // Only toggle on mobile (when hamburger menu is visible)
  if (window.innerWidth <= 768) {
    mobileDropdownOpen.value = !mobileDropdownOpen.value;
  }
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
  padding: 0 2rem;
  list-style: none;
  transition: max-height 0.3s ease;
}

/* Make all links positioning relative */
.navbar_links a {
  position: relative;
  padding: 0.5rem;
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.navbar_links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background: #dfff4f;
  transition: width 0.3s ease;
}

.navbar_links a:hover::after,
.navbar_links a.router-link-active::after {
  width: 100%;
}

/* Dropdown styles */
.dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.dropdown-arrow {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #3452a3;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  padding: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu li {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.dropdown-menu li:last-child {
  border-bottom: none;
}

.dropdown-menu a {
  display: block;
  padding: 0.75rem 1rem;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.dropdown-menu a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Remove the yellow underline from dropdown items */
.dropdown-menu a::after {
  display: none;
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
    max-height: 400px;
  }

  .navbar_links li {
    width: 100%;
    text-align: center;
  }

  /* Mobile dropdown styles */
  .dropdown {
    width: 100%;
  }

  .dropdown-trigger {
    justify-content: center;
    width: 100%;
    cursor: pointer;
    padding: 0.5rem 0;
  }

  .dropdown-menu {
    position: static;
    background: rgba(52, 82, 163, 0.9);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0;
    min-width: auto;
    width: 100%;
    margin-top: 0;
    transform: none;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
  }

  .dropdown-menu.show {
    transform: none;
    max-height: 120px;
  }

  .dropdown-menu li {
    width: 100%;
    margin: 0;
  }

  .dropdown-menu a {
    text-align: center;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  /* Add consistent spacing for all mobile nav items */
  .navbar_links > li > a {
    padding: 0.5rem 0;
    display: block;
  }
}
</style>
