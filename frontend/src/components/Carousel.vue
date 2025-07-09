<template>
  <div class="carousel" :style="{ height }" ref="carouselRef">
    <!-- Slides container -->
    <div class="carousel__track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
      <div v-for="(img, idx) in images" :key="idx" class="carousel__slide">
        <img :src="img" alt="Slide image" class="carousel__image" />
      </div>
    </div>

    <!-- Controls -->
    <button v-if="showControls" class="carousel__control prev" @click="prevSlide" aria-label="Previous slide">‹</button>
    <button v-if="showControls" class="carousel__control next" @click="nextSlide" aria-label="Next slide">›</button>

    <!-- Indicators -->
    <div v-if="showIndicators" class="carousel__indicators">
      <span v-for="(_, idx) in images" :key="idx" :class="{ active: idx === currentIndex }" @click="goToSlide(idx)" aria-label="Go to slide {{ idx + 1 }}"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  interval: {
    type: Number,
    default: 5000,
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
  showControls: {
    type: Boolean,
    default: true,
  },
  showIndicators: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
    default: "400px",
  },
  swipe: {
    type: Boolean,
    default: true,
  },
});

const currentIndex = ref(0);
let timer = null;
const carouselRef = ref(null);
let startX = 0;
let deltaX = 0;

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
}

function goToSlide(idx) {
  currentIndex.value = idx;
}

function startAutoPlay() {
  if (props.autoPlay && props.images.length > 1) {
    timer = setInterval(nextSlide, props.interval);
  }
}

function stopAutoPlay() {
  if (timer) clearInterval(timer);
}

function onTouchStart(e) {
  if (!props.swipe) return;
  stopAutoPlay();
  startX = e.touches[0].clientX;
}

function onTouchMove(e) {
  if (!props.swipe) return;
  deltaX = e.touches[0].clientX - startX;
}

function onTouchEnd() {
  if (!props.swipe) return;
  if (Math.abs(deltaX) > 50) {
    deltaX < 0 ? nextSlide() : prevSlide();
  }
  deltaX = 0;
  startAutoPlay();
}

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.carousel__track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel__slide {
  flex: 0 0 100%;
  width: 100%;
}

.carousel__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel__control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  font-size: 2rem;
  padding: 0.5rem;
  cursor: pointer;
  z-index: 10;
}

.carousel__control.prev {
  left: 1rem;
}

.carousel__control.next {
  right: 1rem;
}

.carousel__indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.carousel__indicators span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.carousel__indicators span.active {
  background: #dfff4f;
}
</style>
