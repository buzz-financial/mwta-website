<template>
  <!-- Simplified hero section -->
  <section class="hero" :style="{ backgroundImage: `url(${heroBg})` }">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-copy">
        <h1 class="hero-title">Elevate Your Game at Mike White's Tennis Academy</h1>
        <p class="hero-subtitle">
        Expert coaching for players of all ages and skill levels. From beginners to competitive athletes, we provide personalized training to help you reach your full potential.

        </p>

        <div class="hero-actions">
          <button class="hero-btn hero-btn--primary" @click="$router.push('/contact')">
            GET STARTED TODAY
          </button>
          <button class="hero-btn hero-btn--secondary" @click="$router.push('/programs')">
            VIEW PROGRAMS
          </button>
        </div>
      </div>
      <div class="hero-logo">
        <img :src="heroLogo" alt="MWTA Logo" />
      </div>
    </div>
  </section>

  <section class="offerings">
    <div class="container">
      
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
          <button class="hero-btn hero-btn--primary" @click="$router.push('#programs')">View All Programs</button>
        </div>
  
        <div class="about-carousel">
          <div class="carousel-wrapper">
            <vueper-slides :visible-slides="1" :slide-ratio="4 / 4" autoplay bullets loop dragging-distance="50" height="400px">
              <vueper-slide v-for="(img, idx) in carouselImages" :key="idx" :image="img" />
            </vueper-slides>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="about-section">
    <div class="container">
      <div class="about-grid-2">
        <div class="about-right">
          <div class="about-media">
            <img src="../assets/tennisballoncourt.png" alt="Tennis ball on court" />
            <div class="about-media-card">
              <div class="about-stat">
                <div class="about-stat-number">All Levels</div>
                <div class="about-stat-label">Beginner → Competitive</div>
              </div>
              <div class="about-stat">
                <div class="about-stat-number">St. George, UT</div>
                <div class="about-stat-label">Year-round conditions</div>
              </div>
            </div>
          </div>
        </div>
        <div class="about-left">
          <div class="section-badge">Get to know us</div>
          <h2 class="section-title">About Mike White Tennis Academy</h2>

          <p class="about-lead">
            Founded by former collegiate All-American Mike White, MWTA delivers expert coaching in a welcoming,
            high-energy environment.
          </p>

          <div class="about-highlights">
            <div class="about-highlight">
              <span class="about-dot" aria-hidden="true"></span>
              <div>
                <h3>Year-round training</h3>
                <p>St. George weather + consistent programming to keep players improving.</p>
              </div>
            </div>

            <div class="about-highlight">
              <span class="about-dot" aria-hidden="true"></span>
              <div>
                <h3>Player-first coaching</h3>
                <p>Clear feedback, strong fundamentals, and match-ready development.</p>
              </div>
            </div>

            <div class="about-highlight">
              <span class="about-dot" aria-hidden="true"></span>
              <div>
                <h3>Character & confidence</h3>
                <p>Competitive spirit and sportsmanship—on and off the court.</p>
              </div>
            </div>
          </div>

          <div class="about-actions">
            <button class="hero-btn hero-btn--primary" @click="$router.push('/contact')">
              Talk With a Coach
            </button>
            <button class="hero-btn hero-btn--secondary" @click="$router.push('/programs')">
              Explore Programs
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>


  <section class="programs" id="programs">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">Our Programs</div>
        <h2 class="section-title">Choose Your Path to Excellence</h2>
        <p class="section-description">
          From junior development to adult recreation, we have the perfect program for every player.
        </p>
      </div>

      <div class="programs-grid">
        <article class="program-card">
          <div class="program-media">
            <img :src="juniorImg" alt="Junior Clinics" />
          </div>
          <div class="program-body">
            <div class="program-pill">
              <span class="program-icon" aria-hidden="true">🏆</span>
              <span class="program-label">Junior</span>
            </div>
            <h3 class="program-title">Junior Clinics (K–12)</h3>
            <p class="program-desc">Age-grouped training focused on fundamentals and competitive development.</p>
          </div>
          <div class="program-footer">
            <router-link class="program-cta" to="/junior">View Junior Programs</router-link>
          </div>
        </article>

        <article class="program-card">
          <div class="program-media">
            <img :src="adultImg" alt="Adult Clinics" />
          </div>
          <div class="program-body">
            <div class="program-pill">
              <span class="program-icon" aria-hidden="true">🎾</span>
              <span class="program-label">Adult</span>
            </div>
            <h3 class="program-title">Adult Clinics</h3>
            <p class="program-desc">Drills & match play for beginners through advanced adults.</p>
          </div>
          <div class="program-footer">
            <router-link class="program-cta" to="/adult">View Adult Programs</router-link>
          </div>
        </article>

        <article class="program-card">
          <div class="program-media">
            <img :src="privateImg" alt="Private Lessons" />
          </div>
          <div class="program-body">
            <div class="program-pill">
              <span class="program-icon" aria-hidden="true">⭐</span>
              <span class="program-label">Private</span>
            </div>
            <h3 class="program-title">Private Lessons</h3>
            <p class="program-desc">One-on-one coaching to fine-tune technique and strategy.</p>
          </div>
          <div class="program-footer">
            <router-link class="program-cta" to="/privatelessons">View Private Lessons</router-link>
          </div>
        </article>

        <article class="program-card">
          <div class="program-media">
            <img :src="tournamentImg" alt="Tournaments" />
          </div>
          <div class="program-body">
            <div class="program-pill">
              <span class="program-icon" aria-hidden="true">🏅</span>
              <span class="program-label">Events</span>
            </div>
            <h3 class="program-title">Tournaments</h3>
            <p class="program-desc">Multi-day competitive tournaments for all skill levels.</p>
          </div>
          <div class="program-footer">
            <router-link class="program-cta" to="/tournaments">View Tournaments</router-link>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Simplified team section -->
  <section class="team">
    <div class="container">

      <div class="section-header">
        <div class="section-badge">Our Team</div>
        <h2 class="section-title">Meet Our Expert Coaches</h2>
        <p class="section-description">Learn from experienced professionals dedicated to your tennis journey.</p>
      </div>
  
      <div class="team-grid">
        <div class="coach-card">
          <div class="coach-media">
            <img src="../assets/mikeportrait.png" alt="Coach Mike White" />
          </div>
          <div class="coach-body">
            <h3 class="coach-name">Mike White</h3>
            <p class="coach-role">Head Pro & Owner</p>
            <p class="coach-bio">Former collegiate All-American with 15+ years of coaching experience.</p>
            
          </div>
          <router-link class="program-cta" to="/privatelessons">Book A Private Lesson</router-link>
        </div>
  
        <div class="coach-card">
          <div class="coach-media">
            <img src="../assets/beccaportrait.png" alt="Coach Becca Little" />
          </div>
          <div class="coach-body">
            <h3 class="coach-name">Becca Little</h3>
            <p class="coach-role">Assistant Coach</p>
            <p class="coach-bio">Specialized in youth development and beginner instruction.</p>
           
          </div>
          <router-link class="program-cta" to="/privatelessons">Book A Private Lesson</router-link>
        </div>
  
        <div class="coach-card placeholder-card">
          <div class="coach-media placeholder-image">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div class="coach-body">
            <h3 class="coach-name">Coming Soon</h3>
            <p class="coach-role">New Coach</p>
            <p class="coach-bio">We're expanding our team with another expert coach.</p>
          </div>
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
          <div class="testimonial-author">
            <div class="author-avatar">JA</div>

            <div class="author-details">
              <div class="author-meta">
                <cite>John Anderson</cite>
                <span>Adult Program Member</span>
              </div>

            </div>
          </div>
          <div class="rating">⭐⭐⭐⭐⭐</div>

          <blockquote>"I had a great time at the Mike White Tennis Academy. The staff was welcoming and knowledgeable, and I saw immediate improvement in my game."</blockquote>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-author">
            <div class="author-avatar">JA</div>

            <div class="author-details">
              <div class="author-meta">
                <cite>Sarah Martinez</cite>
                <span>Parent - Junior Program</span>
              </div>

            </div>
          </div>
          
          <div class="rating">⭐⭐⭐⭐⭐</div>

          <blockquote>"The junior program has been amazing for my daughter. She's not only improved her tennis skills but also gained confidence and made great friends."</blockquote>
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
import heroLogo from "../assets/mwta-new-logo.webp";
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

html {
  scroll-behavior: smooth;
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
  background-attachment: scroll;

  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.hero-overlay {
  position: absolute;
  inset: 0;

  background: linear-gradient(
    90deg,
    rgba(8, 37, 78, 0.92) 0%,
    rgba(8, 37, 78, 0.78) 42%,
    rgba(8, 37, 78, 0.35) 68%,
    rgba(8, 37, 78, 0.00) 88%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  text-align: left;
  color: #fff;
}

.hero-copy {
  max-width: 900px;
  flex: 1;
}

.hero-logo img {
  flex: 0 0 auto;
}

.hero-logo img {
  width: min(420px, 35vw);
  height: auto;
  filter: drop-shadow(0 12px 30px rgba(0,0,0,0.35));
}

.hero-title {
  font-size: clamp(2.6rem, 5.5vw, 4.6rem);
  font-weight: 900;
  margin: 0 0 1rem;
  line-height: 1.05;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  color: #ffffff;
}

.hero-subtitle {
  font-size: clamp(1.05rem, 1.8vw, 1.25rem);
  margin: 0 0 2rem;
  color: #c9c9c9;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-btn {
  border: none;
  cursor: pointer;
  font-weight: 800;
  padding: 0.95rem 1.5rem;
  border-radius: 12px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, color 0.18s ease;
}

.hero-btn--primary {
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  color: #2c3e50;;
  box-shadow: 0 14px 30px rgba(34, 197, 94, 0.25);
}

.hero-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(34, 197, 94, 0.32);
}

.hero-btn--secondary {
  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.18);
}

.hero-btn--secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.22);
}

@media (max-width: 768px) {
  .hero {
    justify-content: center;
    height: 70vh;
  }

  .hero-overlay {
    background: linear-gradient(
      135deg,
      rgba(8, 37, 78, 0.88) 0%,
      rgba(0, 0, 0, 0.55) 100%
    );
  }

  .hero-content {
    text-align: center;
    flex-direction: column;
  }

  .hero-copy {
    margin: 0 auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-logo img { display: none;} 

  .hero-title {
    font-size: clamp(2rem, 6vw, 3.5rem);
    margin-top: 2rem;
  }

  .hero-subtitle {
    font-size: clamp(0.9rem, 3vw, 1.25rem);
  }

}

.offerings {
  padding: 6rem 0;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  text-align: left; /* overrides global #app centering */
}

.offerings .section-title {
  color: #0f172a;
  margin-bottom: 1rem;
}

.offerings .section-description {
  margin: 0 0 2rem;
  max-width: 60ch;
  color: #475569;
}

.about-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3.5rem;
  align-items: center;
}

.about-text {
  padding-right: 0;
}

.features {
  display: grid;
  gap: 1rem;
  margin: 2rem 0 2.5rem;
}

.feature-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.25rem;
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.10);
  border-color: rgba(52, 82, 163, 0.25);
}

.feature-icon {
  width: 44px;
  height: 44px;
  padding: 10px;
  background: #dfff4f;
  border-radius: 10px;
  flex-shrink: 0;
}

.feature-content h3 {
  font-size: 1.1rem;
  font-weight: 750;
  color: #0f172a;
  margin: 0 0 0.35rem;
}

.feature-content p {
  margin: 0;
  color: #475569;
  line-height: 1.6;
}

.carousel-wrapper {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
  border: 1px solid rgba(15, 23, 42, 0.08);
}
/* About MWTA section */
.about-section {

  padding: 6rem 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.about-grid-2 {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3.5rem;
  align-items: center;
}

.about-left .section-title {
  margin-bottom: 1rem;
}

.about-left {
  text-align: left;
}


.about-lead {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #475569;
  margin: 0 0 2rem;
  max-width: 62ch;
}

.about-highlights {
  display: grid;
  gap: 1.1rem;
  margin-bottom: 2.25rem;
}

.about-highlight {
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 0.9rem;
  padding: 1rem 1rem;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.about-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #dfff4f;
  margin-top: 0.45rem;
  box-shadow: 0 0 0 4px rgba(223, 255, 79, 0.25);
}

.about-highlight h3 {
  margin: 0 0 0.25rem;
  font-size: 1.05rem;
  font-weight: 850;
  color: #0f172a;
}

.about-highlight p {
  margin: 0;
  color: #475569;
  line-height: 1.7;
}

.about-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.about-media {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
  background: #fff;
}

.about-media img {
  width: 100%;
  height: 650px;
  object-fit: cover;
  display: block;
}

.about-media-card {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 14px;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.about-stat-number {
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.about-stat-label {
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.95rem;
  margin-top: 2px;
}

@media (max-width: 1024px) {
  .about-grid-2 {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .about-media img {
    height: 340px;
  }

  .about-left {
    order: 1;
  }

  .about-right {
    order: 2;
  }
}


.programs {
  padding: 6rem 0;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.program-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.program-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
  border-color: rgba(52, 82, 163, 0.25);
}

.program-media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.program-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.00) 0%,
    rgba(0, 0, 0, 0.25) 100%
  );
  pointer-events: none;
}

.program-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
}

.program-body {
  padding: 1.4rem 1.5rem 1.25rem;
  text-align: left;
}

.program-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  background: rgba(52, 82, 163, 0.10);
  color: #1f2a44;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.9rem;
}

.program-icon {
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #dfff4f;
}

.program-title {
  margin: 0 0 0.6rem;
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.program-desc {
  margin: 0;
  color: #475569;
  line-height: 1.7;
}

.program-footer {
  margin-top: auto;
  padding: 0 1.5rem 1.5rem;
}

.program-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.95rem 1.1rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 800;
  color: #0f172a;
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  box-shadow: 0 14px 30px rgba(34, 197, 94, 0.18);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.program-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(34, 197, 94, 0.25);
}

.program-cta:focus-visible {
  outline: 3px solid rgba(52, 82, 163, 0.45);
  outline-offset: 3px;
}

@media (max-width: 1024px) {
  .programs-grid {
    grid-template-columns: 1fr;
  }
}

/* Simplified team section */
.team {
  padding: 6rem 0;
  background: #ffffff;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.coach-card {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.coach-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
  border-color: rgba(52, 82, 163, 0.25);
}

.coach-media {
  aspect-ratio: 4 / 3;   /* better for portraits than 16/9 */
  height: auto;
  background: #f1f5f9;
  overflow: hidden;
}

.coach-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.coach-body {
  padding: 1.4rem 1.5rem 1.6rem;
  text-align: left;
}

.coach-name {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 850;
  color: #1f2a44;
  letter-spacing: -0.02em;
}

.coach-role {
  display: inline-flex;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(52, 82, 163, 0.10);
  color: #1f2a44;
  font-weight: 800;
  font-size: 0.9rem;
  margin-bottom: 0.9rem;
}

.coach-bio {
  margin: 0;
  color: #475569;
  line-height: 1.7;
  font-size: 1rem;
}

.placeholder-image {
  width: 100%;
  height: 260px;
  background: linear-gradient(135deg, #f8fafc, #eef2ff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
}

@media (max-width: 1024px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}

/* testimonials */

.testimonials {
  padding: 6rem 0;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  position: relative;
  background: #fff;
  padding: 2.25rem 2rem 2rem;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.testimonial-card::before {
  content: "“";
  position: absolute;
  top: 10px;
  left: 18px;
  font-size: 72px;
  line-height: 1;
  color: rgba(52, 82, 163, 0.18);
  font-family: ui-serif, Georgia, serif;
}

.testimonial-card::after {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 5px;
  background: linear-gradient(135deg, #dfff4f, #c8e526);
}

.testimonial-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
  border-color: rgba(52, 82, 163, 0.25);
}

.testimonial-card blockquote {
  margin: 0 0 1.5rem;
  padding-top: 0.5rem;
  font-size: 1.05rem;
  line-height: 1.8;
  color: #334155;
  font-style: italic; 
}

.testimonial-author {
  display: flex;
  justify-content: center;   
  align-items: flex-start;
  gap: 0.5rem;               
  margin-bottom: 1.25rem;
  position: relative;
  z-index: 1;
  margin-top: 1.5rem;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  text-align: left;
}

.rating {
  margin: 0;
  color: #f59e0b;
  letter-spacing: 1px;
  line-height: 1;
  margin-bottom: 1rem;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: #3452a3;
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 900;
}

.author-meta cite {
  display: block;
  font-weight: 900;
  color: #0f172a;
  font-style: normal;
  line-height: 1.2;
  font-size: 1.3rem;
}

.author-meta span {
  display: block;
  margin-top: 0.25rem;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.2;
}

.author-info cite {
  font-weight: 900;
  color: #0f172a;
}

.author-info span {
  color: #64748b;
}

.rating {
  color: #f59e0b;
  letter-spacing: 1px;
  line-height: 1;
  font-size: 1.25rem; 
}



@media (max-width: 900px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .testimonial-card {
    padding: 1.5rem 1.25rem 1.25rem;
  }

  .testimonial-card blockquote {
    font-size: 1rem;
  }
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
    text-align: left;
    gap: 1rem;
  }
}
</style>
