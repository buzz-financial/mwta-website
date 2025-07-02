<template>
  <!-- full-width hero -->
  <Hero title="Adult Clinics" :backgroundImage="heroImg" />

  <h1>Adult Clinics</h1>
</template>

<script setup>
import Hero from "../components/Hero.vue";
import heroImg from "../assets/tennisball_closeup_hero.jpg";
</script>

<style scoped>
.hero {
  position: relative;

  /* full-bleed under the navbar */
  width: 100vw;
  left: 50%;
  margin-left: -50vw;
  margin-top: -64px; /* ← set this to your navbar’s exact height */
  height: calc(60vh + 64px); /* ← same navbar height added back in */

  background-size: cover;
  background-position: right center; /* tennis ball on the right, centered vertically */

  display: flex;
  align-items: center; /* center overlay vertically */
  justify-content: flex-start; /* push overlay to the left */
}

.overlay {
  /* shift overlay about 1/3 of the way in */
  margin-left: 33vw;

  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  text-align: left;
  border-radius: 0.5rem;
}

/* Optional: adjust title font sizing as needed */
.hero-title {
  font-size: 2.5rem;
  color: #fff;
  margin: 0;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #fff;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .hero {
    margin-top: -56px; /* if navbar height changes on mobile */
    height: calc(40vh + 56px);
  }
  .overlay {
    margin-left: 5vw;
    padding: 1.5rem;
  }
  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>
