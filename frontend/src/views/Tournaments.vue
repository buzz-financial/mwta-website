<template>
  <section class="tournaments-page">
    <Hero title="Tournaments" :backgroundImage="heroImg" />

    <div class="main-content">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">Competition</div>
          <h1 class="section-title">Tournament Play</h1>
          <p class="section-subtitle">
            You don’t train just to practice — you train to compete.
            Tournaments turn training into confidence, toughness, and match-ready skills.
          </p>
        </div>

        <div class="utr-cta" :style="{ backgroundImage: `url(${utrBg})` }">
          <div class="utr-overlay"></div>

          <div class="utr-content">
            <h2>MWTA UTR Tournaments</h2>
            <p>
              Browse upcoming tournaments, event details, and registration all in one place on UTR.
            </p>

            <div class="utr-features" role="list">
              <div class="utr-feature" role="listitem">
                <div class="utr-feature-icon icon-yellow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                    <path d="M16 2v4M8 2v4M3 10h18"></path>
                  </svg>
                </div>
                <div class="utr-feature-body">
                  <h3>Live schedule + upcoming events</h3>
                  <p>See upcoming tournaments at a glance.</p>
                </div>
              </div>

              <div class="utr-feature" role="listitem">
                <div class="utr-feature-icon icon-mint" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9z"></path>
                  </svg>
                </div>
                <div class="utr-feature-body">
                  <h3>Quick registration through UTR</h3>
                  <p>Register fast on the official club page.</p>
                </div>
              </div>

              <div class="utr-feature" role="listitem">
                <div class="utr-feature-icon icon-lav" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </div>
                <div class="utr-feature-body">
                  <h3>Accurate event info maintained</h3>
                  <p>Latest details are kept up-to-date on UTR.</p>
                </div>
              </div>
            </div>

            <div class="utr-actions">
              <a class="btn-primary" :href="utrUrl" target="_blank" rel="noopener">
                View More
              </a>
              <a class="btn-outline" :href="utrUrl" target="_blank" rel="noopener">
                Open UTR Club Page
              </a>
            </div>

            
          </div>
        </div>


        <section class="details">
          <div class="details-grid">
            <div class="detail-card">
              <div class="detail-title">Who it’s for</div>
              <p>Juniors and adults who want real match experience and measurable progress.</p>
            </div>
            <div class="detail-card">
              <div class="detail-title">What you get</div>
              <p>Competitive matches, a clear schedule, and a tournament environment that builds confidence.</p>
            </div>
            <div class="detail-card">
              <div class="detail-title">How to register</div>
              <p>Tap “Open UTR Club Page” above to see upcoming events and complete registration on UTR.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import Hero from "../components/Hero.vue";
import heroImg from "../assets/tennisball_closeup_hero.jpg";

import utrBg from "../assets/mwa-urt.png";

const utrUrl = "https://app.utrsports.net/clubs/10928";
</script>

<style scoped>
.tournaments-page {
  min-height: 100vh;
}

.main-content {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 4rem 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: #fff;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 950;
  color: #0f172a;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.section-subtitle {
  margin: 0 auto;
  max-width: 70ch;
  color: #475569;
  line-height: 1.8;
  font-size: 1.1rem;
}

.details {
  margin-top: 2rem;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.detail-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  padding: 1.5rem;
  text-align: left;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.detail-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
  border-color: rgba(52, 82, 163, 0.25);
}

.detail-title {
  font-weight: 950;
  color: #0f172a;
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
}

.detail-card p {
  margin: 0;
  color: #475569;
  line-height: 1.7;
}

@media (max-width: 900px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
}
.section-header h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.utr-cta {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  min-height: 420px;
  background-size: cover;
  background-position: center;

  /* NEW: darken the image itself */
  background-color: rgba(0, 0, 0, 0.45);
  background-blend-mode: multiply;

  /* NEW: center the whole content block */
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.14);
  border: 2px solid rgba(52, 82, 163, 0.08);
}

.utr-overlay {
  position: absolute;
  inset: 0;

  /* NEW: darker overlay gradient */
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.82) 0%,
    rgba(20, 40, 110, 0.72) 55%,
    rgba(0, 0, 0, 0.62) 100%
  );
}

.utr-content {
  position: relative;
  z-index: 1;
  padding: 3rem;
  max-width: 720px;
  color: #fff;
}

.utr-content h2 {
  font-size: 2.6rem;
  margin: 0 0 1rem 0;
  font-weight: 800;
  color: var(--utr-accent)
}

.utr-content p {
  margin: 0 0 1.25rem 0;
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.92);
}

.utr-bullets {
  margin: 0 0 2rem 1.2rem;
  padding: 0;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.8;
}

.utr-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.btn-primary,
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  border-radius: 999px;
  padding: 0.95rem 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  color: #2c3e50;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(223, 255, 79, 0.35);
}

.btn-outline {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
}

.btn-outline:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
}

.utr-note {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.75);
}

.utr-cta {
  --utr-accent: #dfff4f;
}

.utr-features {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 0 0 2rem 0;
}

.utr-feature {
  gap: 0.9rem;
  align-items: flex-start;
  padding: 1.1rem 1.1rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.utr-feature:hover {
  transform: translateY(-2px);
  border-color: rgba(223, 255, 79, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.24);
}

.utr-feature-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.utr-feature-icon svg {
  width: 22px;
  height: 22px;
}

.icon-yellow {
  background: rgba(223, 255, 79, 0.16);
  color: #dfff4f;
  border: 1px solid rgba(223, 255, 79, 0.28);
}

.icon-mint {
  background: rgba(135, 255, 201, 0.16);
  color: #87ffc9;
  border: 1px solid rgba(135, 255, 201, 0.28);
}

.icon-lav {
  background: rgba(168, 144, 255, 0.16);
  color: #a890ff;
  border: 1px solid rgba(168, 144, 255, 0.28);
}

.utr-feature-body h3 {
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
  text-align: left;
  margin-top: 1rem;
}

.utr-feature-body p {
  margin-top: 1rem;
  font-size: 0.9rem;
  line-height: 1.45;
  color: #f8f9fa;
  text-align: left;
}

@media (max-width: 900px) {
  .utr-features {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .utr-features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 2rem 0;
  }
  .container {
    padding: 0 1rem;
  }
  .section-header h1 {
    font-size: 2.2rem;
  }
  .utr-content {
    padding: 2rem 1.5rem;
  }
  .utr-content h2 {
    font-size: 2rem;
  }
}
</style>