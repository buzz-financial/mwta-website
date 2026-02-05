<template>
  <section class="program-page">
    <Hero
      title="Junior Programs"
      subtitle="Age-grouped training built to develop fundamentals, confidence, and match-ready skills."
      :backgroundImage="heroImg"
      ctaText="Contact Us"
      ctaLink="/contact"
      height="55vh"
    />

    <main class="main-content">
      <section class="page-section">
        <div class="container split">
          <div class="left">
            <div class="section-badge">“The more balls you hit the better you get”</div>

            <h2 class="page-title">Train 4 days a week. Improve faster.</h2>
            <p class="page-subtitle">
              All classes are offered 4 days a week to maximize your opportunity to play.
              Click below to view pricing / register. If you have any questions, reach out anytime.
            </p>

            <div class="info-card">
              <div class="info-card__header">
                <h3>Fall Schedule</h3>
                <span class="info-pill">4 days/week</span>
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
              <img
                class="media-img"
                :src="fallScheduleImg"
                alt="MWTA fall junior program schedule"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">Programs</div>
            <h2 class="section-title">Choose the right training level</h2>
            <p class="section-description">
              From first-time players to tournament athletes, our groups are designed to challenge and support each player.
            </p>
          </div>

          <div class="cards-grid">
            <article v-for="p in programs" :key="p.id" class="program-card">
              <div class="program-card__topbar"></div>

              <header class="program-card__header">
                <h3 class="program-name">{{ p.name }}</h3>
                <span class="time-pill">{{ p.time }}</span>
              </header>

              <p class="program-desc">{{ p.description }}</p>

              <div class="program-card__footer">
                <a class="card-cta" :href="juniorProgramURL" target="_blank" rel="noopener">
                  Register
                </a>
                <RouterLink class="card-cta card-cta--ghost" to="/contact">
                  Ask a Coach
                </RouterLink>
              </div>
            </article>
          </div>

          <div class="cta-banner">
            <div class="cta-banner__text">
              <h3>Ready to register?</h3>
              <p>Secure your spot and get started with the right group.</p>
            </div>
            <a class="cta-banner__btn" :href="juniorProgramURL" target="_blank" rel="noopener">
              Register Now →
            </a>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script setup>
import Hero from "../components/Hero.vue";
import heroImg from "../assets/tennisball_closeup_hero.jpg";
import fallScheduleImg from "../assets/fall-schedule.png";

const juniorProgramURL =
  "https://docs.google.com/forms/d/e/1FAIpQLScx8bYMCL5frZuZvRrgc_U_n2uAOqKKGJRQKpsc-0jr_kEITQ/viewform";

const programs = [
  {
    id: 1,
    name: "Pee-Wees",
    time: "Mon & Wed 4:30–5:30pm",
    description:
      "Perfect for beginners ages 5–10. We focus on fun fundamentals, coordination, and learning how to rally with confidence. Emphasis on core fundamentals.",
  },
  {
    id: 2,
    name: "Champions",
    time: "Mon–Thurs 4:30–6:00pm",
    description:
      "Designed for the younger beginner up to Age 12. For developing players ready to train consistently. Emphasis on technique, movement, and match-style drills.",
  },
  {
    id: 3,
    name: "Elite",
    time: "Mon–Thurs 5:00–7:00pm",
    description:
      "Highschool aged or near highschool aged players looking to make varsity or play varsity. High-intensity training for competitive juniors, focusing on strategy, fitness, and match play.",
  },
  {
    id: 4,
    name: "College Prep",
    time: "Mon–Fri 3:00–5:00pm",
    description:
      "Players must get permission to register for this class. All participants must be actively participating in tournaments. Includes strategy, video-style feedback, fitness, and structured match play.",
  },
];

const schedule = [
  { name: "Pee-Wees", time: "Mon & Wed 4:30–5:30pm" },
  { name: "Champions", time: "Mon–Thurs 4:30–6:00pm" },
  { name: "Elite", time: "Mon–Thurs 5:00–7:00pm" },
  { name: "College Prep", time: "Mon–Fri 3:00–5:00pm" },
];
</script>

<style scoped>
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
  height: 660px;
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
  transform: translateY(-2px);
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

.card-cta--ghost {
  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.10);
}

.card-cta:hover {
  transform: translateY(-2px);

 
}

.card-cta--ghost:hover {
  transform: translateY(-2px);
  
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

  .media-img{ height: auto;}
}
</style>