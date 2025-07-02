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
          <div class="coach-overlay">
            <div class="coach-social">
              <button class="social-btn">📧</button>
              <button class="social-btn">📞</button>
            </div>
          </div>
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
          <div class="coach-overlay">
            <div class="coach-social">
              <button class="social-btn">📧</button>
              <button class="social-btn">📞</button>
            </div>
          </div>
        </div>
        <div class="coach-info">
          <h3>Sara Lee</h3>
          <p class="coach-title">Assistant Coach</p>
          <p class="coach-bio">Specialized in youth development and beginner instruction.</p>
        </div>
      </div>

      <div class="coach-card coming-soon">
        <div class="coming-soon-content">
          <div class="coming-soon-icon">👋</div>
          <h3>Join Our Team</h3>
          <p>We're always looking for passionate tennis professionals.</p>
          <button class="apply-btn">Apply Now</button>
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

/* Enhanced Hero Section */
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
  background-attachment: fixed;
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

.floating-element {
  position: absolute;
  background: rgba(223, 255, 79, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
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

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
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
  transition: all 0.3s ease;
  border: 1px solid rgba(223, 255, 79, 0.2);
}

.feature-card:hover {
  transform: translateY(-5px);
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

/* Enhanced Programs Section */
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
  transition: all 0.4s ease;
  transform-style: preserve-3d;
}

.program-card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(52, 82, 163, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  transition: all 0.3s ease;
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

/* Enhanced Team Section */
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
  transition: all 0.3s ease;
  border: 1px solid rgba(223, 255, 79, 0.2);
}

.coach-card:hover {
  transform: translateY(-8px);
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

.coach-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.coach-card:hover .coach-overlay {
  opacity: 1;
}

.coach-social {
  display: flex;
  gap: 1rem;
}

.social-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
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

.coming-soon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: white;
  text-align: center;
}

.coming-soon-content {
  padding: 2rem;
}

.coming-soon-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.apply-btn {
  background: #dfff4f;
  color: #2c3e50;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.apply-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(223, 255, 79, 0.4);
}

/* Enhanced Testimonials Section */
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
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
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

/* Enhanced Call-to-action button */
.cta-button {
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  color: #2c3e50;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 5px 15px rgba(223, 255, 79, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(223, 255, 79, 0.5);
  background: linear-gradient(135deg, #c8e526, #dfff4f);
}

.cta-button svg {
  transition: transform 0.3s ease;
}

.cta-button:hover svg {
  transform: translateX(3px);
}

/* Mobile Responsiveness */
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
</style>
