<template>
  <section class="hero" :style="heroStyle">
    <div class="overlay">
      <h1 class="hero-title">{{ title }}</h1>
      <p v-if="subtitle" class="hero-subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  backgroundImage: {
    type: String,
    default: "",
  },
});

const heroStyle = computed(() => ({
  backgroundImage: props.backgroundImage ? `url('${props.backgroundImage}')` : "none",
}));
</script>

<style scoped>
.hero {
  position: relative;
  width: 100vw;
  left: 50%;
  margin-left: -50vw;
  margin-top: -64px; /* navbar height */
  height: calc(60vh + 64px);

  background-size: cover;
  background-position: right center;

  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.overlay {
  margin-left: 10%; /* shift text about one-third across */
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  text-align: left;
  border-radius: 0.5rem;
}

.hero-title {
  color: #fff;
  font-size: 2.5rem;
  margin: 0;
}

.hero-subtitle {
  color: #fff;
  font-size: 1.25rem;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .hero {
    margin-top: -56px;
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
