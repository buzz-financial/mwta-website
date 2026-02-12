<template>
  <Hero
    title="Private Lessons"
    subtitle="1-on-1 coaching for juniors and adults. Build consistency, confidence, and match-ready skills with a plan tailored to you."
    :backgroundImage="heroImg"
    ctaText="Schedule a Lesson"
    ctaLink="/contact"
    height="clamp(560px, 55vh, 860px)"
  />

  <section class="pl-section pl-intro">
    <div class="container">
      <div class="section-badge">One-on-One Training</div>
      <h2 class="section-title">Personalized coaching, measurable progress</h2>
      <p class="section-description">
        Whether you're learning the basics, preparing for tryouts, or sharpening tactics for match play, we build a plan
        around your goals and keep you accountable.
      </p>

      <div class="pl-highlights">
        <div class="pl-card">
          <div class="pl-card-icon" aria-hidden="true">🎯</div>
          <h3>Built for your goals</h3>
          <p>Technique, footwork, strategy, or confidence under pressure—we focus where it matters most.</p>
        </div>

        <div class="pl-card">
          <div class="pl-card-icon" aria-hidden="true">📈</div>
          <h3>Faster improvement</h3>
          <p>More reps, clearer feedback, and a structured progression so you can see results sooner.</p>
        </div>

        <div class="pl-card">
          <div class="pl-card-icon" aria-hidden="true">🧠</div>
          <h3>Match-ready coaching</h3>
          <p>Learn patterns, shot selection, and competitive routines you can use immediately in matches.</p>
        </div>
      </div>

      <div class="pl-split">
        <div class="pl-panel">
          <h3 class="pl-panel-title">What we work on</h3>
          <div class="pl-pill-row">
            <span class="pl-pill">Forehand & backhand fundamentals</span>
            <span class="pl-pill">Serve & return</span>
            <span class="pl-pill">Footwork & spacing</span>
            <span class="pl-pill">Consistency & rally tolerance</span>
            <span class="pl-pill">Singles & doubles tactics</span>
            <span class="pl-pill">Mental game & routines</span>
          </div>
          <p class="pl-note">Not sure what you need? We’ll start with a quick evaluation and recommend a simple plan.</p>
        </div>

        <div class="pl-panel pl-panel--accent">
          <h3 class="pl-panel-title">Great for</h3>
          <ul class="pl-list">
            <li>Beginners who want a strong foundation</li>
            <li>Junior players working toward tournaments or varsity</li>
            <li>Adults improving technique or building match confidence</li>
            <li>Players returning after a break and rebuilding rhythm</li>
          </ul>

          <div class="pl-cta-row">
            <RouterLink class="pl-cta pl-cta--primary" to="/contact">Request a Lesson</RouterLink>
            <a class="pl-cta pl-cta--secondary" href="#faq">Common Questions</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="pl-section pl-steps">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">How It Works</div>
        <h2 class="section-title">Simple, flexible scheduling</h2>
        <p class="section-description">Tell us your availability and goals—we’ll take it from there.</p>
      </div>

      <div class="pl-steps-grid">
        <div class="pl-step">
          <div class="pl-step-num">1</div>
          <h3>Set A Time</h3>
          <p>Choose a day and time that works for you that is flexible with our coaches.</p>
        </div>

        <div class="pl-step">
          <div class="pl-step-num">2</div>
          <h3>Pick Your Coach</h3>
          <p>Select the coach that best fits your needs and schedule.</p>
        </div>

        <div class="pl-step">
          <div class="pl-step-num">3</div>
          <h3>Train & track</h3>
          <p>Structured sessions with feedback so you keep improving each week.</p>
        </div>
      </div>
      
      <iframe src="https://booky.buzz/widget/book/mike-white-tennis-academy" style="border: none; width: 100%; height: 650px;"></iframe>
      <div class="pl-banner" id="faq">
        <div class="pl-banner-text">
          <h3>Questions about lesson length, pricing, or availability?</h3>
          <p>We’ll confirm details based on coach availability and court time. Contact us and we’ll respond quickly.</p>
        </div>
        <RouterLink class="pl-banner-cta" to="/contact">Contact Us →</RouterLink>
      </div>


    </div>
  </section>
</template>

<script setup>
import Hero from "../components/Hero.vue";
import heroImg from "../assets/tennisball_closeup_hero.jpg";
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.pl-section {
  padding: 5.5rem 0;
}

.pl-intro {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  text-align: left;
}

.pl-steps {
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.section-badge {
  display: inline-block;
  background: #3452a3;
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 1rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.section-description {
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.8;
  max-width: 72ch;
  margin: 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header .section-description {
  margin: 0 auto;
}

.pl-highlights {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 2.25rem;
}

.pl-card {
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  padding: 1.5rem;
}

.pl-card-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(52, 82, 163, 0.1);
  border: 1px solid rgba(52, 82, 163, 0.15);
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.pl-card h3 {
  margin: 0 0 0.4rem;
  color: #0f172a;
  font-weight: 900;
  letter-spacing: -0.01em;
}

.pl-card p {
  margin: 0;
  color: #475569;
  line-height: 1.7;
}

.pl-split {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.5rem;
  margin-top: 1.75rem;
  align-items: start;
}

.pl-panel {
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  padding: 1.5rem;
}

.pl-panel--accent {
  background: linear-gradient(135deg, rgba(52, 82, 163, 0.08), rgba(223, 255, 79, 0.18));
}

.pl-panel-title {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.pl-pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.pl-pill {
  display: inline-flex;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.08);
  color: #0f172a;
  font-weight: 800;
  font-size: 0.95rem;
}

.pl-note {
  margin: 1rem 0 0;
  color: #475569;
  line-height: 1.7;
}

.pl-list {
  margin: 0.75rem 0 0;
  padding-left: 1.1rem;
  color: #334155;
  line-height: 1.8;
}

.pl-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.pl-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.1rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 900;
}

.pl-cta--primary {
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  color: #0f172a;
  box-shadow: 0 14px 30px rgba(34, 197, 94, 0.18);
}

.pl-cta--secondary {
  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.12);
}

.pl-steps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 2rem;
}

.pl-step {
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  padding: 1.6rem;
  text-align: left;
}

.pl-step-num {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: #dfff4f;
  color: #0f172a;
  font-weight: 950;
  margin-bottom: 0.9rem;
}

.pl-step h3 {
  margin: 0 0 0.35rem;
  font-weight: 950;
  color: #0f172a;
}

.pl-step p {
  margin: 0;
  color: #475569;
  line-height: 1.7;
}

.pl-banner {
  margin-top: 2.5rem;
  padding: 1.8rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
}

.pl-banner-text h3 {
  margin: 0 0 0.4rem;
  font-weight: 950;
  letter-spacing: -0.01em;
}

.pl-banner-text p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.pl-banner-cta {
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

iframe {
  margin-top: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
}

@media (max-width: 1024px) {
  .pl-highlights {
    grid-template-columns: 1fr;
  }

  .pl-split {
    grid-template-columns: 1fr;
  }

  .pl-steps-grid {
    grid-template-columns: 1fr;
  }

  .pl-banner {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .pl-section {
    padding: 4rem 0;
  }
}
</style>