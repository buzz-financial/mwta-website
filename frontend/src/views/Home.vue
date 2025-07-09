<template>
  <!-- Simplified hero section -->
  <section class="hero" :style="{ backgroundImage: `url(${heroBg})` }">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">Get It Mikes Way</h1>
      <p class="hero-subtitle">Elite tennis training in the heart of St. George's red rock country</p>
      <button class="cta-button" @click="$router.push('/programs')">Register Today</button>
    </div>
  </section>

  <!-- Simplified about section -->
  <section class="about container">
    <div class="about-grid">
      <div class="about-text">
        <div class="section-badge">What We Offer</div>
        <h2 class="section-title">Excellence in Every Swing</h2>
        <p class="section-description">Transform your game with our comprehensive tennis programs designed for players of all levels.</p>

        <div class="features">
          <div class="feature-card">
            <img class="feature-icon" src="../assets/trophyicon.png" alt="Trophy icon" />
            <div class="feature-content">
              <h3>Competitive Clinics</h3>
              <p>Age grouped training for all skill levels with personalized attention.</p>
            </div>
          </div>
          <div class="feature-card">
            <img class="feature-icon" src="../assets/raqueticon.png" alt="Racquet icon" />
            <div class="feature-content">
              <h3>Private Lessons</h3>
              <p>One-on-one training tailored specifically to your needs and goals.</p>
            </div>
          </div>
          <div class="feature-card">
            <img class="feature-icon" src="../assets/calendaricon.png" alt="Calendar icon" />
            <div class="feature-content">
              <h3>Flexible Scheduling</h3>
              <p>Morning, evening and weekend sessions to fit your busy lifestyle.</p>
            </div>
          </div>
        </div>
        <button class="cta-button" @click="$router.push('/programs')">View All Programs</button>
      </div>

      <div class="about-carousel">
        <div class="carousel-wrapper">
          <vueper-slides :visible-slides="1" :slide-ratio="4 / 4" autoplay bullets loop dragging-distance="50" height="400px">
            <vueper-slide v-for="(img, idx) in carouselImages" :key="idx" :image="img" />
          </vueper-slides>
        </div>
      </div>
    </div>
  </section>

  <!-- Simplified about MWTA -->
  <section class="about-section">
    <div class="container">
      <div class="about-content">
        <div class="section-badge">Get to know us</div>
        <h2 class="section-title">About Mike White Tennis Academy</h2>
        <div class="about-text-content">
          <p class="lead-text">Founded by former collegiate All-American Mike White, our academy provides expert coaching in a welcoming, high-energy environment.</p>
          <p>Located in St. George, Utah, MWTA offers ideal conditions for year-round tennis training with a scenic red rock backdrop. We focus on building strong fundamentals, competitive spirit, and character—on and off the court.</p>
          <p>Whether you're a beginner or a seasoned player, our programs are designed to help you grow with purpose and passion for the game.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Simplified programs -->
  <section class="programs container">
    <div class="section-header">
      <div class="section-badge">Our Programs</div>
      <h2 class="section-title">Choose Your Path to Excellence</h2>
      <p class="section-description">From junior development to adult recreation, we have the perfect program for every player.</p>
    </div>

    <div class="programs-grid">
      <div class="program-card" @click="$router.push('/junior')">
        <img :src="juniorImg" alt="Junior Clinics" class="program-image" />
        <div class="program-content">
          <div class="program-icon">🏆</div>
          <h3>Junior Clinics (K-12)</h3>
          <p>Age-grouped training focused on fundamentals and competitive development.</p>
        </div>
      </div>

      <div class="program-card" @click="$router.push('/adult')">
        <img :src="adultImg" alt="Adult Clinics" class="program-image" />
        <div class="program-content">
          <div class="program-icon">🎾</div>
          <h3>Adult Clinics</h3>
          <p>Drills & match play for beginners through advanced adults.</p>
        </div>
      </div>

      <div class="program-card" @click="$router.push('/privatelessons')">
        <img :src="privateImg" alt="Private Lessons" class="program-image" />
        <div class="program-content">
          <div class="program-icon">⭐</div>
          <h3>Private Lessons</h3>
          <p>One-on-one coaching to fine-tune technique and strategy.</p>
        </div>
      </div>

      <div class="program-card" @click="$router.push('/tournaments')">
        <img :src="tournamentImg" alt="Tournaments" class="program-image" />
        <div class="program-content">
          <div class="program-icon">🏅</div>
          <h3>Tournaments</h3>
          <p>Multi-day competitive tournaments for all skill levels.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Simplified team section -->
  <section class="team container">
    <div class="section-header">
      <div class="section-badge">Our Team</div>
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
        <div class="coach-image placeholder-image">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div class="coach-info">
          <h3>Coming Soon</h3>
          <p class="coach-title">New Coach</p>
          <p class="coach-bio">We're expanding our team with another expert coach.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Simplified testimonials -->
  <section class="testimonials">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">Testimonials</div>
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
</script>

<style scoped>
/* Reset and base styles */
* {
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Typography */
.section-badge {
  display: inline-block;
  background: #3452a3;
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
  color: #2c3e50;
  margin-bottom: 1.5rem;
  line-height: 1.2;
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

/* Simplified hero section */
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
  background-attachment: scroll; /* Better performance than fixed */
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(52, 82, 163, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
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

/* Simplified about section */
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
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  transition: border-color 0.2s ease;
}

.feature-card:hover {
  border-color: #dfff4f;
}

.feature-icon {
  width: 48px;
  height: 48px;
  padding: 12px;
  background: #dfff4f;
  border-radius: 8px;
  flex-shrink: 0;
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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* About MWTA section */
.about-section {
  background: #f8f9fa;
  padding: 6rem 2rem;
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

/* Simplified programs section */
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
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.program-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.program-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.program-content {
  padding: 1.5rem;
}

.program-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.program-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.program-content p {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
}

/* Simplified team section */
.team {
  margin: 6rem auto;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.coach-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.coach-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.coach-image {
  height: 250px;
  overflow: hidden;
}

.coach-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-image {
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
}

.coach-info {
  padding: 1.5rem;
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

/* Simplified testimonials section */
.testimonials {
  background: #f8f9fa;
  padding: 6rem 2rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.testimonial-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.quote-icon {
  font-size: 3rem;
  color: #dfff4f;
  line-height: 1;
  margin-bottom: 1rem;
  font-family: serif;
}

.testimonial-card blockquote {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #495057;
  margin-bottom: 1.5rem;
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
  background: #3452a3;
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

/* Simplified CTA button */
.cta-button {
  background: #dfff4f;
  color: #2c3e50;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cta-button:hover {
  background: #c8e526;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
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
    padding: 1rem;
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
  .hero-content {
    padding: 0 1rem;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .feature-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style>
