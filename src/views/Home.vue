<template>
  <!-- full-bleed hero -->
  <section class="hero" :style="{ backgroundImage: `url(${heroBg})` }">
    <div class="hero-content">
      <h1>Get it mikes way</h1>
      <button class="cta-button" @click="$router.push('/programs')">Register Today</button>
    </div>
  </section>

  <!-- About Section with Side Carousel -->
  <section class="about container" id="about">
    <div class="about-grid">
      <!-- Left: About text -->
      <div class="about-text">
        <h2>What We Offer</h2>
        <!-- <p>Founded by former collegiate All-American Mike White, our academy combines world-class instruction with Southern Utah’s unbeatable climate and stunning red-rock backdrop.</p> -->
        <div class="features">
          <div class="feature-card">
            <img class="feature-icon" src="../assets/trophyicon.png" alt="Icon of a trophy" />
            <h3>Competitive Clinics</h3>
            <p>Age grouped training for all skill levels.</p>
          </div>
          <div class="feature-card">
            <img class="feature-icon" src="../assets/raqueticon.png" alt="Icon of a trophy" />
            <h3>Private Lessons</h3>
            <p>One on one training tailored to you.</p>
          </div>
          <div class="feature-card">
            <img class="feature-icon" src="../assets/calendaricon.png" alt="Icon of a trophy" />
            <h3>Flexible Scheduling</h3>
            <p>Morning evening and weekend sessions.</p>
          </div>
        </div>
        <button class="cta-button" @click="$router.push('/programs')">Register Today</button>
      </div>
      <!-- Right: About carousel -->
      <div class="about-carousel">
        <vueper-slides :visible-slides="1" :slide-ratio="4 / 4" autoplay bullets loop dragging-distance="50" height="200px">
          <vueper-slide v-for="(img, idx) in carouselImages" :key="idx" :image="img" />
        </vueper-slides>
      </div>
    </div>
  </section>

  <!-- About MWTA -->
  <section class="about-section">
    <div class="container">
      <p class="section-lead">Get to know us</p>
      <h2>About Mike White Tennis Academy</h2>
      <p>Founded by former collegiate All-American Mike White, our academy provides expert coaching in a welcoming, high-energy environment. Located in St. George, Utah, MWTA offers ideal conditions for year-round tennis training with a scenic red rock backdrop.</p>
      <p>We focus on building strong fundamentals, competitive spirit, and character—on and off the court. Whether you're a beginner or a seasoned player, our programs are designed to help you grow with purpose and passion for the game.</p>
    </div>
  </section>

  <!-- 2. Programs -->
  <section class="programs container">
    <h2>Our Programs</h2>
    <div class="cards">
      <div class="card" :style="{ backgroundImage: `url(${juniorImg})` }">
        <h3>Junior Clinics (K-12)</h3>
        <p>Age-grouped training focused on fundamentals.</p>
      </div>

      <div class="card" :style="{ backgroundImage: `url(${adultImg})` }">
        <h3>Adult Clinics</h3>
        <p>Drills & match play for beginners through advanced adults.</p>
      </div>
      <div class="card" :style="{ backgroundImage: `url(${privateImg})` }">
        <h3>Private Lessons</h3>
        <p>One-on-one coaching to fine-tune technique and strategy.</p>
      </div>
      <div class="card" :style="{ backgroundImage: `url(${tournamentImg})` }">
        <h3>Tournaments</h3>
        <p>Multi-day tournaments.</p>
      </div>
    </div>
  </section>

  <!-- 3. Meet the Team -->
  <section class="team container">
    <h2>Meet Our Coaches</h2>
    <div class="cards">
      <div class="card coach">
        <img src="../assets/mikeportrait.png" alt="Coach Mike White" />
        <h3>Mike White</h3>
        <p>Head Pro & Owner</p>
      </div>
      <div class="card coach">
        <img src="../assets/beccaportrait.png" alt="Coach Sara Lee" />
        <h3>Sara Lee</h3>
        <p>Coach</p>
      </div>
      <div class="card coach"></div>
    </div>
  </section>

  <!-- 4. Testimonials -->
  <section class="testimonials container">
    <h2>What Players Are Saying</h2>
    <div class="cards">
      <blockquote>
        “I had a great time at the Mike White Tennis Academy. The staff was welcoming and knowledgeable.”<br />
        <cite>— John A</cite>
      </blockquote>
      <blockquote></blockquote>
    </div>
  </section>

  <!-- 5. Location & Contact -->
  <section class="location container">
    <h2>Find Us in St. George</h2>
    <p>
      3082 S Bloomington Dr East<br />
      St. George, UT 84790
    </p>
    <button class="cta-button" @click="$router.push('/contact')">Register Today</button>
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
/* containers */
.container {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 1rem;
}

/* Section headings */
h2 {
  font-size: 2.25rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #213547;
}

/* /////// Features Content /////////// */
.about-grid {
  display: grid;
  grid-template-columns: 2fr 1fr; /* text gets 2×, carousel 1× */
  gap: 2rem;
  align-items: center;
}

.about-text {
  padding-right: 1rem;
}

.features {
  display: flex;
  flex-direction: row;
}

.features .feature-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 0.5rem;
}

.features .feature-icon {
  width: 50px;
  height: 50px;
}

.about-text button {
  margin-top: 1.5rem;
}

/* ////////// About MWTA //////////// */
.about-section {
  background-color: #f8f8f8;
  padding: 5rem 1rem;
}

.about-section .container {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.about-section .section-lead {
  font-size: 0.95rem;
  text-transform: uppercase;
  color: #888;
  letter-spacing: 1px;
  margin-bottom: 0.75rem;
}

.about-section h2 {
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  color: #213547;
}

.about-section p {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #444;
  margin-bottom: 1.25rem;
}

/* cards grid */
.cards {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin-top: 2rem;
}

/* generic card */
.card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  /* add transition for hover effect */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* hover effect on program cards */
.programs .card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.programs .cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.programs .card {
  position: relative;
  background-size: cover;
  background-position: center;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}
.programs .card::before {
  /* dark overlay */
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
}
.programs .card > * {
  position: relative; /* lift text above the overlay */
  z-index: 1;
}

@media (max-width: 768px) {
  .programs .cards {
    grid-template-columns: 1fr;
  }

  .about-grid {
    grid-template-columns: 1fr; /* single column on mobile */
  }
}

/* coach cards: image + name */
.card.coach img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
}
.card.coach h3 {
  margin: 0.75rem 0 0.25rem;
}
.card.coach p {
  color: #666;
  font-size: 0.95rem;
}

/* testimonials */
.testimonials .cards {
  grid-template-columns: 1fr 1fr;
}
blockquote {
  background: #f9f9f9;
  padding: 1.5rem;
  border-left: 4px solid #dfff4f;
}
cite {
  display: block;
  margin-top: 0.75rem;
  text-align: right;
  font-style: normal;
  color: #333;
}

/* location */
.location p {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

/* Call-to-action button */
.cta-button {
  background-color: #dfff4f;
  color: #213547;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: transform 0.2s;
  display: inline-block;
}
.cta-button:hover {
  transform: translateY(-2px);
}

/* make hero full-bleed */
.hero {
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  margin-top: -2rem;
  height: 80vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}
.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
}
.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
</style>
