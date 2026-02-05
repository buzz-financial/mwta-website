<template>
  <section class="program-page">
    <Hero
      title="Adult Clinics"
      subtitle="Structured coaching, lots of reps, and a welcoming group environment—perfect for beginners through advanced."
      :backgroundImage="heroImg"
      ctaText="Contact Us"
      ctaLink="/contact"
      height="55vh"
    />

    <main class="main-content">
      <section class="page-section">
        <div class="container split">
          <div class="left">
            <div class="section-badge">All Levels Welcome</div>

            <h2 class="page-title">Improve consistency and play better matches</h2>
            <p class="page-subtitle">
              Whether you’re brand new or getting back into tennis, our adult clinics provide clear instruction, live-ball
              drills, and point play to build confidence fast.
            </p>

            <div class="info-card">
              <div class="info-card__header">
                <h3>Clinic Schedule</h3>
                <span class="info-pill">Seasonal sessions</span>
              </div>

              <ul class="schedule-list">
                <li v-for="item in schedule" :key="item.name" class="schedule-item">
                  <span class="schedule-name">{{ item.name }}</span>
                  <span class="schedule-time">{{ item.time }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="right">
            <div class="media-card">
              <img class="media-img" :src="adultClinicImg" alt="MWTA adult clinic schedule" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">Sessions</div>
            <h2 class="section-title">Upcoming adult clinic options</h2>
            <p class="section-description">
              Pick a session that fits your schedule. Each one focuses on fundamentals, movement, and practical point play.
            </p>
          </div>

          <div class="cards-grid">
            <article v-for="t in tournaments" :key="t.id" class="program-card">
              <div class="program-card__topbar"></div>

              <header class="program-card__header">
                <h3 class="program-name">{{ t.name }}</h3>
                <span class="time-pill">{{ t.time }}</span>
              </header>

              <p class="program-desc">{{ t.description }}</p>

              <div class="program-card__footer">
                <a class="card-cta" :href="t.url" target="_blank" rel="noopener">Register</a>
                <RouterLink class="card-cta card-cta--ghost" to="/contact">Questions?</RouterLink>
              </div>
            </article>
          </div>

          <div class="cta-banner">
            <div class="cta-banner__text">
              <h3>Not sure which session is right?</h3>
              <p>Message us and we’ll recommend the best fit.</p>
            </div>
            <RouterLink class="cta-banner__btn" to="/contact">Contact Us →</RouterLink>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script setup>
import Hero from "../components/Hero.vue";
import heroImg from "../assets/tennisball_closeup_hero.jpg";
import adultClinicImg from "../assets/adult-clinic.png";

const janAdultProgramURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSec986onBdo_7gXenNBZHKzcQ2cEx9g1dPO9Y5v-kpLKg99XQ/viewform";
const febAdultProgramURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdGUInnAF1xN85BNMuGQtWYfMODC0HXJwIY4WXaRRt3XYDaDA/viewform";

const tournaments = [
  {
    id: 1,
    name: "Jan 26th - 29th",
    time: "10:30am–12:30pm",
    description:
      "Start the year strong with a fun, high-rep clinic focused on groundstrokes, volleys, and serves. Perfect for beginners and intermediate players who want to build consistency and confidence.",
    url: janAdultProgramURL,
  },
  {
    id: 2,
    name: "Feb 2nd - 6th",
    time: "10:30am–12:30pm",
    description:
      "Take the next step with more live-ball drills, movement, and point play. Great for players who want to improve strategy for singles/doubles and get match-ready in a supportive group.",
    url: febAdultProgramURL,
  },
];

const schedule = [
  { name: "Jan 26th - 29th", time: "10:30am–12:30pm" },
  { name: "Feb 2nd - 6th", time: "10:30am–12:30pm" },
];
</script>

<style scoped>
/* Same styling as Junior page for consistency */
.program-page {
  min-height: 100vh;
}

.main-content {
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  padding: 4.5rem 0;
}

.page-section {
  padding: 0 0 4.5rem;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: left;
}

.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: #fff;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.page-title {
  margin: 0 0 0.85rem;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.page-subtitle {
  margin: 0 0 1.75rem;
  color: #475569;
  line-height: 1.8;
  font-size: 1.1rem;
  max-width: 62ch;
}

.split {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  align-items: start;
}

.info-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  padding: 1.5rem;
}

.info-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-card__header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 950;
  color: #0f172a;
}

.info-pill {
  display: inline-flex;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-weight: 900;
  font-size: 0.9rem;
  background: rgba(52, 82, 163, 0.1);
  color: #1f2a44;
}

.schedule-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem;
  display: grid;
  gap: 0.75rem;
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  background: rgba(52, 82, 163, 0.06);
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.schedule-name {
  font-weight: 900;
  color: #0f172a;
}

.schedule-time {
  font-weight: 800;
  color: #3452a3;
  text-align: right;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.1rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 950;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  color: #0f172a;
  box-shadow: 0 14px 30px rgba(34, 197, 94, 0.18);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.12);
}

.btn:hover {
  transform: translateY(-2px);
}

.media-card {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
  background: #fff;
}

.media-img {
  width: 100%;
  height: 550px;
  display: block;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  margin: 0 0 0.75rem;
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.section-description {
  margin: 0 auto;
  max-width: 72ch;
  color: #475569;
  line-height: 1.8;
  font-size: 1.1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.program-card {
  position: relative;
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  padding: 1.5rem;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.program-card__topbar {
  position: absolute;
  inset: 0 0 auto 0;
  height: 5px;
  background: linear-gradient(135deg, #dfff4f, #c8e526);
}

.program-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
  border-color: rgba(52, 82, 163, 0.25);
}

.program-card__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.program-name {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.time-pill {
  display: inline-flex;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-weight: 900;
  font-size: 0.9rem;
  background: rgba(52, 82, 163, 0.08);
  color: #3452a3;
  border: 1px solid rgba(52, 82, 163, 0.14);
}

.program-desc {
  margin: 0 0 1.25rem;
  color: #475569;
  line-height: 1.8;
}

.program-card__footer {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.card-cta {
  flex: 1;
  min-width: 160px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.1rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 950;
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  color: #0f172a;
  box-shadow: 0 14px 30px rgba(34, 197, 94, 0.16);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

}

.card-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 50px rgba(34, 197, 94, 0.2);
}

.card-cta--ghost {
  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.10);
}

.cta-banner {
  margin-top: 2.5rem;
  padding: 1.8rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
}

.cta-banner__text h3 {
  margin: 0 0 0.35rem;
  font-weight: 950;
  letter-spacing: -0.01em;
}

.cta-banner__text p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
}

.cta-banner__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.2rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 950;
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  color: #0f172a;
  white-space: nowrap;
}

@media (max-width: 1024px) {
  .split {
    grid-template-columns: 1fr;
  }
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  .main-content {
    padding: 3rem 0;
  }
  .page-section {
    padding-bottom: 3.5rem;
  }
  .cta-banner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>