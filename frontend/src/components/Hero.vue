<template>
  <section class="hero" :style="heroStyle">
    <!-- Gradient overlay for better text readability -->
    <div class="gradient-overlay"></div>

    <div class="hero-content">
      <div class="text-container">
        <h1 class="hero-title">{{ title }}</h1>
        <p v-if="subtitle" class="hero-subtitle">{{ subtitle }}</p>

        <!-- Optional CTA button -->
        <div v-if="ctaText && ctaLink" class="cta-container">
          <RouterLink :to="ctaLink" class="cta-button">{{ ctaText }}</RouterLink>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <div class="scroll-arrow"></div>
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
  ctaText: {
    type: String,
    default: "",
  },
  ctaLink: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "60vh", // Allow customizable height
  },
  textPosition: {
    type: String,
    default: "left", // left, center, right
    validator: (value) => ["left", "center", "right"].includes(value),
  },
});

const heroStyle = computed(() => ({
  backgroundImage: props.backgroundImage ? `url('${props.backgroundImage}')` : "none",
  height: `calc(${props.height} + 64px)`,
}));
</script>

<style scoped>
.hero {
  position: relative;
  width: 100vw;
  left: 50%;
  margin-left: -50vw;
  margin-top: -64px; /* navbar height */

  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* Parallax effect */

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Gradient overlay for better text contrast */
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(52, 82, 163, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(52, 82, 163, 0.3) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  padding: 0 2rem;
}

.text-container {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 600px;
  margin-left: 10%; /* Default left positioning */
  animation: fadeInUp 1s ease-out;
}

/* Text positioning variants */
.hero[data-text-position="center"] .text-container {
  margin: 0 auto;
  text-align: center;
}

.hero[data-text-position="right"] .text-container {
  margin-left: auto;
  margin-right: 10%;
  text-align: right;
}

.hero-title {
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  color: #f0f0f0;
  font-size: 1.4rem;
  font-weight: 300;
  margin: 1rem 0 0 0;
  line-height: 1.4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.cta-container {
  margin-top: 2rem;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(45deg, #dfff4f, #b8e024);
  color: #333;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(223, 255, 79, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(223, 255, 79, 0.4);
  background: linear-gradient(45deg, #b8e024, #dfff4f);
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 30px;
  height: 30px;
  border: 2px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
  opacity: 0.7;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .hero {
    margin-top: -56px;
    background-attachment: scroll; /* Disable parallax on mobile */
  }

  .text-container {
    margin-left: 5vw;
    margin-right: 5vw;
    padding: 2rem;
    max-width: none;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .cta-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  .scroll-indicator {
    bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .text-container {
    padding: 1.5rem;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .hero {
    background-attachment: scroll;
  }

  .text-container {
    animation: none;
  }

  .scroll-indicator {
    animation: none;
  }

  .cta-button:hover {
    transform: none;
  }
}
</style>
