<template>
  <!-- Enhanced full-bleed hero -->
  <section class="hero" :style="{ backgroundImage: `url(${heroBg})` }">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">Get It Mikes Way</h1>
      <p class="hero-subtitle">Elite tennis training in the heart of St. George's red rock country</p>
      <button class="cta-button hero-cta" @click="$router.push('/programs')">
        <span>Register Today</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
    <div class="hero-decorative-elements">
      <div class="floating-element element-1"></div>
      <div class="floating-element element-2"></div>
      <div class="floating-element element-3"></div>
    </div>
  </section>

  <!-- Enhanced About Section with Side Carousel -->
  <section class="about container" id="about">
    <div class="about-grid">
      <!-- Left: About text -->
      <div class="about-text">
        <div class="section-badge">What We Offer</div>
        <h2 class="section-title">Excellence in Every Swing</h2>
        <p class="section-description">Transform your game with our comprehensive tennis programs designed for players of all levels.</p>

        <div class="features">
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <img class="feature-icon" src="../assets/trophyicon.png" alt="Trophy icon" />
            </div>
            <div class="feature-content">
              <h3>Competitive Clinics</h3>
              <p>Age grouped training for all skill levels with personalized attention.</p>
            </div>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <img class="feature-icon" src="../assets/raqueticon.png" alt="Racquet icon" />
            </div>
            <div class="feature-content">
              <h3>Private Lessons</h3>
              <p>One-on-one training tailored specifically to your needs and goals.</p>
            </div>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <img class="feature-icon" src="../assets/calendaricon.png" alt="Calendar icon" />
            </div>
            <div class="feature-content">
              <h3>Flexible Scheduling</h3>
              <p>Morning, evening and weekend sessions to fit your busy lifestyle.</p>
            </div>
          </div>
        </div>
        <button class="cta-button" @click="$router.push('/programs')">
          <span>View All Programs</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <!-- Right: About carousel -->
      <div class="about-carousel">
        <div class="carousel-wrapper">
          <vueper-slides :visible-slides="1" :slide-ratio="4 / 4" autoplay bullets loop dragging-distance="50" height="400px">
            <vueper-slide v-for="(img, idx) in carouselImages" :key="idx" :image="img" />
          </vueper-slides>
        </div>
      </div>
    </div>
  </section>

  <!-- Enhanced About MWTA -->
  <section class="about-section">
    <div class="container">
      <div class="about-content">
        <p class="section-badge">Get to know us</p>
        <h2 class="section-title">About Mike White Tennis Academy</h2>
        <div class="about-text-content">
          <p class="lead-text">Founded by former collegiate All-American Mike White, our academy provides expert coaching in a welcoming, high-energy environment.</p>
          <p>Located in St. George, Utah, MWTA offers ideal conditions for year-round tennis training with a scenic red rock backdrop. We focus on building strong fundamentals, competitive spirit, and character—on and off the court.</p>
          <p>Whether you're a beginner or a seasoned player, our programs are designed to help you grow with purpose and passion for the game.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Enhanced Programs -->
  <section class="programs container">
    <div class="section-header">
      <p class="section-badge">Our Programs</p>
      <h2 class="section-title">Choose Your Path to Excellence</h2>
      <p class="section-description">From junior development to adult recreation, we have the perfect program for every player.</p>
    </div>

    <div class="programs-grid">
      <div class="program-card" :style="{ backgroundImage: `url(${juniorImg})` }" @click="$router.push('/junior')">
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-icon">🏆</div>
          <h3>Junior Clinics (K-12)</h3>
          <p>Age-grouped training focused on fundamentals and competitive development.</p>
          <div class="card-arrow">→</div>
        </div>
      </div>

      <div class="program-card" :style="{ backgroundImage: `url(${adultImg})` }" @click="$router.push('/adult')">
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-icon">🎾</div>
          <h3>Adult Clinics</h3>
          <p>Drills & match play for beginners through advanced adults.</p>
          <div class="card-arrow">→</div>
        </div>
      </div>

      <div class="program-card" :style="{ backgroundImage: `url(${privateImg})` }" @click="$router.push('/privatelessons')">
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-icon">⭐</div>
          <h3>Private Lessons</h3>
          <p>One-on-one coaching to fine-tune technique and strategy.</p>
          <div class="card-arrow">→</div>
        </div>
      </div>

      <div class="program-card" :style="{ backgroundImage: `url(${tournamentImg})` }" @click="$router.push('/tournaments')">
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-icon">🏅</div>
          <h3>Tournaments</h3>
          <p>Multi-day competitive tournaments for all skill levels.</p>
          <div class="card-arrow">→</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Enhanced Meet the Team -->
  <section class="team container">
    <div class="section-header">
      <p class="section-badge">Our Team</p>
      <h2 class="section-title">Meet Our Expert Coaches</h2>
      <p class="section-description">Learn from experienced professionals dedicated to your tennis journey.</p>
    </div>

    <div class="team-grid">
      <div class="coach-card">
        <div class="coach-image">
          <img src="../assets/mikeportrait.png" alt="Coach Mike White" />
        </div>
        <div class="coach-info">
          <h3>Mike White</h3>
          <p class="coach-title">Head Pro & Owner</p>
          <p class="coach-bio">Former collegiate All-American with 15+ years of coaching experience.</p>
        </div>
      </div>

      <div class="coach-card">
        <div class="coach-image">
          <img src="../assets/beccaportrait.png" alt="Coach Sara Lee" />
        </div>
        <div class="coach-info">
          <h3>Sara Lee</h3>
          <p class="coach-title">Assistant Coach</p>
          <p class="coach-bio">Specialized in youth development and beginner instruction.</p>
        </div>
      </div>

      <div class="coach-card placeholder-card">
        <div class="empty-coach-content">
          <div class="empty-coach-image">
            <div class="placeholder-icon">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <div class="empty-coach-info">
            <h3 class="placeholder-name">Coming Soon</h3>
            <p class="placeholder-title">New Coach</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Enhanced Testimonials -->
  <section class="testimonials">
    <div class="container">
      <div class="section-header">
        <p class="section-badge">Testimonials</p>
        <h2 class="section-title">What Players Are Saying</h2>
      </div>

      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="quote-icon">"</div>
          <blockquote>"I had a great time at the Mike White Tennis Academy. The staff was welcoming and knowledgeable, and I saw immediate improvement in my game."</blockquote>
          <div class="testimonial-author">
            <div class="author-avatar">JA</div>
            <div class="author-info">
              <cite>John Anderson</cite>
              <span>Adult Program Member</span>
            </div>
            <div class="rating">⭐⭐⭐⭐⭐</div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="quote-icon">"</div>
          <blockquote>"The junior program has been amazing for my daughter. She's not only improved her tennis skills but also gained confidence and made great friends."</blockquote>
          <div class="testimonial-author">
            <div class="author-avatar">SM</div>
            <div class="author-info">
              <cite>Sarah Martinez</cite>
              <span>Parent - Junior Program</span>
            </div>
            <div class="rating">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Hero background
import heroBg from "../assets/tenniscourthero.png";

// Main carousel images
import { VueperSlides, VueperSlide } from "vueperslides";
import carousel1 from "../assets/carousel1.png";
import carousel2 from "../assets/carousel2.png";
import carousel3 from "../assets/carousel3.png";
import carousel4 from "../assets/carousel4.png";
import carousel5 from "../assets/carousel5.png";
import carousel6 from "../assets/carousel6.png";
import carousel7 from "../assets/carousel7.png";
import carousel8 from "../assets/carousel8.png";
const carouselImages = [carousel1, carousel2, carousel3, carousel4, carousel5, carousel6, carousel7, carousel8];

// Clinic section images
import juniorImg from "../assets/juniorclinic.jpg";
import adultImg from "../assets/adultclinic.jpg";
import privateImg from "../assets/privateclinic.jpg";
import tournamentImg from "../assets/tournament.jpg";

const clinicImages = [juniorImg, adultImg, privateImg, tournamentImg];
</script>

<style scoped>
/* Performance Optimizations */
* {
  /* Use hardware acceleration for transforms */
  will-change: auto;
}

/* Enhanced Global Styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Enhanced Typography */
.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(135deg, #2c3e50, #3452a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-description {
  font-size: 1.2rem;
  color: #6c757d;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

/* Enhanced Hero Section - Optimized */
.hero {
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  margin-top: -2rem;
  height: 90vh;
  background-size: cover;
  background-position: center;
  /* Remove background-attachment: fixed for better performance */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(52, 82, 163, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  max-width: 800px;
  padding: 0 2rem;
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin-bottom: 2.5rem;
  opacity: 0.95;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.hero-cta {
  padding: 1.25rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 10px 30px rgba(223, 255, 79, 0.4);
}

/* Optimized floating elements */
.floating-element {
  position: absolute;
  background: rgba(223, 255, 79, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  /* Use transform3d for hardware acceleration */
  transform: translate3d(0, 0, 0);
}

.element-1 {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.element-2 {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.element-3 {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

/* Optimized keyframe animation */
@keyframes float {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(0, -20px, 0) rotate(180deg);
  }
}

/* Enhanced About Section */
.about {
  margin: 6rem auto;
}

.about-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text {
  padding-right: 2rem;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2.5rem 0;
}

.feature-card {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(223, 255, 79, 0.2);
  /* Use transform3d for hardware acceleration */
  transform: translate3d(0, 0, 0);
}

.feature-card:hover {
  transform: translate3d(0, -5px, 0);
  box-shadow: 0 15px 40px rgba(52, 82, 163, 0.15);
  border-color: rgba(223, 255, 79, 0.4);
}

.feature-icon-wrapper {
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  padding: 1rem;
  border-radius: 12px;
  flex-shrink: 0;
}

.feature-icon {
  width: 32px;
  height: 32px;
  display: block;
}

.feature-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature-content p {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
}

.carousel-wrapper {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

/* Enhanced About MWTA Section */
.about-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 6rem 2rem;
  position: relative;
}

.about-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #dfff4f, transparent);
}

.about-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.lead-text {
  font-size: 1.4rem;
  font-weight: 600;
  color: #3452a3;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.about-text-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #495057;
  margin-bottom: 1.5rem;
}

/* Enhanced Programs Section - Optimized */
.programs {
  margin: 6rem auto;
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.program-card {
  position: relative;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  overflow: hidden;
  min-height: 300px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* Simplified 3D effect for better performance */
  transform: translate3d(0, 0, 0);
}

.program-card:hover {
  transform: translate3d(0, -10px, 0);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(52, 82, 163, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  transition: background 0.3s ease;
}

.program-card:hover .card-overlay {
  background: linear-gradient(135deg, rgba(52, 82, 163, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%);
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.card-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.card-content p {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.95;
  margin-bottom: 1.5rem;
}

.card-arrow {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: auto;
  transition: transform 0.3s ease;
}

.program-card:hover .card-arrow {
  transform: translateX(10px);
}

/* Enhanced Team Section - Optimized */
.team {
  margin: 6rem auto;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.coach-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(223, 255, 79, 0.2);
  transform: translate3d(0, 0, 0);
}

.coach-card:hover {
  transform: translate3d(0, -8px, 0);
  box-shadow: 0 20px 50px rgba(52, 82, 163, 0.15);
  border-color: rgba(223, 255, 79, 0.4);
}

.coach-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.coach-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.coach-card:hover .coach-image img {
  transform: scale(1.05);
}

.coach-info {
  padding: 2rem;
  text-align: center;
}

.coach-info h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.coach-title {
  color: #3452a3;
  font-weight: 600;
  margin-bottom: 1rem;
}

.coach-bio {
  color: #6c757d;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Empty Coach Card Styles */
.placeholder-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #6c757d;
  border: 2px dashed #dee2e6;
  position: relative;
  overflow: hidden;
}

.placeholder-card:hover {
  border-color: #3452a3;
  border-style: solid;
}

.empty-coach-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.empty-coach-image {
  position: relative;
  height: 250px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dee2e6;
  flex-shrink: 0;
}

.placeholder-icon {
  color: #adb5bd;
  opacity: 0.6;
}

.empty-coach-info {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
}

.placeholder-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.placeholder-title {
  font-size: 1rem;
  color: #adb5bd;
  font-weight: 600;
}

/* Enhanced Testimonials Section - Optimized */
.testimonials {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 6rem 2rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  border: 1px solid rgba(223, 255, 79, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform: translate3d(0, 0, 0);
}

.testimonial-card:hover {
  transform: translate3d(0, -5px, 0);
  box-shadow: 0 25px 60px rgba(52, 82, 163, 0.12);
  border-color: rgba(223, 255, 79, 0.4);
}

.quote-icon {
  font-size: 4rem;
  color: #dfff4f;
  line-height: 1;
  margin-bottom: 1rem;
  font-family: serif;
}

.testimonial-card blockquote {
  background: none;
  border: none;
  padding: 0;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #495057;
  margin-bottom: 2rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.author-info {
  flex: 1;
}

.author-info cite {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  font-style: normal;
  margin-bottom: 0.25rem;
}

.author-info span {
  color: #6c757d;
  font-size: 0.9rem;
}

.rating {
  font-size: 1.1rem;
}

/* Enhanced Call-to-action button - Optimized */
.cta-button {
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  color: #2c3e50;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 5px 15px rgba(223, 255, 79, 0.3);
  transform: translate3d(0, 0, 0);
}

.cta-button:hover {
  transform: translate3d(0, -2px, 0);
  box-shadow: 0 8px 25px rgba(223, 255, 79, 0.5);
  background: linear-gradient(135deg, #c8e526, #dfff4f);
}

.cta-button svg {
  transition: transform 0.3s ease;
}

.cta-button:hover svg {
  transform: translateX(3px);
}

/* Mobile Responsiveness - Optimized */
@media (max-width: 1024px) {
  /* Reduce animation complexity on tablets */
  .floating-element {
    animation: none;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .about-text {
    padding-right: 0;
  }

  .programs-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  /* Disable heavy animations on mobile for better performance */
  .floating-element {
    display: none;
  }

  /* Reduce 3D effects on mobile */
  .program-card:hover {
    transform: translate3d(0, -5px, 0);
  }

  .container {
    padding: 0 1rem;
  }

  .hero {
    height: 70vh;
  }

  .features {
    gap: 1rem;
  }

  .feature-card {
    padding: 1.5rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .about-section {
    padding: 4rem 1rem;
  }

  .testimonials {
    padding: 4rem 1rem;
  }
}

@media (max-width: 480px) {
  /* Minimal animations on small mobile devices */
  .coach-card:hover,
  .feature-card:hover,
  .testimonial-card:hover {
    transform: translate3d(0, -2px, 0);
  }

  .hero-content {
    padding: 0 1rem;
  }

  .hero-cta {
    padding: 1rem 2rem;
    font-size: 1rem;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .feature-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .feature-icon-wrapper {
    align-self: center;
  }
}

/* Performance optimizations for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .floating-element {
    animation: none;
  }

  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}

/* GPU acceleration hints */
@supports (will-change: transform) {
  .feature-card,
  .program-card,
  .coach-card,
  .testimonial-card,
  .cta-button,
  .social-btn,
  .apply-btn {
    will-change: transform;
  }
}
</style>
