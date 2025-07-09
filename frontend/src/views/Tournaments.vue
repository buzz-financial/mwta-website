<template>
  <section class="tournaments-page">
    <!-- Fixed Hero to match Staff page -->
    <Hero title="Tournaments" :backgroundImage="heroImg" />

    <div class="main-content">
      <div class="container">
        <div class="section-header">
          <h1>Tournaments</h1>
          <p class="section-subtitle">Join our competitive tournaments and connect with players at your skill level</p>
        </div>
      </div>

      <!-- Tournament Grid -->
      <div class="container tournament-grid">
        <div v-for="t in tournaments" :key="t.id" class="tournament-card">
          <div class="card-header">
            <h3>{{ t.name }}</h3>
            <span class="tournament-date">{{ formatDate(t.date) }}</span>
          </div>
          <p class="card-text">{{ t.description }}</p>
          <div class="card-footer">
            <button class="register-button">Learn More & Register</button>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="container cta-wrap">
        <h2>Ready to Register?</h2>
        <p>Visit our tournament registration portal to secure your spot</p>
        <button class="cta-button" @click="$router.push('/contact')">Contact Us to Register →</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Hero from "../components/Hero.vue";
import heroImg from "../assets/tennisball_closeup_hero.jpg";

// Simple tournament data that's realistic to maintain
const tournaments = ref([
  {
    id: 1,
    name: "Spring Open",
    date: "2025-04-15",
    description: "All levels welcome! Kick off the season with our most popular tournament featuring separate brackets for fair competition.",
  },
  {
    id: 2,
    name: "Summer Smash",
    date: "2025-06-20",
    description: "Beat the heat with evening matches under the lights. Doubles tournament with prizes for winners.",
  },
  {
    id: 3,
    name: "Fall Finale",
    date: "2025-09-10",
    description: "End the season strong with our championship tournament. Perfect weather and fierce competition await.",
  },
]);

// Format date for display
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
</script>

<style scoped>
.tournaments-page {
  min-height: 100vh;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.main-content {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 4rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-intro {
  text-align: center;
  margin-bottom: 3rem;
}

.page-intro h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
}

.page-description {
  text-align: center;
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.tournament-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  padding: 2rem;
}

.tournament-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.tournament-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #3452a3, #dfff4f);
}

.tournament-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(52, 82, 163, 0.2);
  border-color: rgba(223, 255, 79, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card-header h3 {
  font-size: 1.5rem;
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.tournament-date {
  font-size: 0.95rem;
  color: #3452a3;
  font-weight: 600;
  background: rgba(52, 82, 163, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.card-text {
  margin: 1rem 0 2rem 0;
  flex-grow: 1;
  color: #495057;
  line-height: 1.7;
  font-size: 1rem;
}

.card-footer {
  margin-top: auto;
}

.register-button {
  width: 100%;
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  color: #2c3e50;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.register-button:hover {
  background: linear-gradient(135deg, #c8e526, #b8d419);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(223, 255, 79, 0.4);
}

.cta-wrap {
  text-align: center;
  margin-top: 4rem;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  border-radius: 20px;
  color: white;
}

.cta-wrap h2 {
  margin-bottom: 1rem;
  font-size: 2.2rem;
  font-weight: 700;
}

.cta-wrap p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.cta-button {
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  color: #2c3e50;
  border: none;
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cta-button:hover {
  background: linear-gradient(135deg, #c8e526, #b8d419);
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(223, 255, 79, 0.4);
}

/* Hero styles - copied from Staff page */
.hero {
  position: relative;
  width: 100vw;
  left: 50%;
  margin-left: -50vw;
  margin-top: -80px;
  height: calc(60vh + 80px);
  background-size: cover;
  background-position: right center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

@media (max-width: 768px) {
  .hero {
    margin-top: -80px;
    height: calc(40vh + 80px);
  }

  .main-content {
    padding: 2rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .page-intro h1 {
    font-size: 2rem;
  }

  .tournament-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1.5rem;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .tournament-card {
    padding: 1.5rem;
  }

  .cta-wrap {
    padding: 2rem 1.5rem;
  }

  .cta-wrap h2 {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .page-intro h1 {
    font-size: 1.6rem;
  }

  .page-description {
    font-size: 1rem;
  }

  .tournament-card {
    padding: 1.25rem;
  }

  .card-header h3 {
    font-size: 1.3rem;
  }
}
</style>
