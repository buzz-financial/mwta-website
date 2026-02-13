<template>
  <!-- Full-width hero -->
  <Hero title="Contact Us" :backgroundImage="heroImg" />

  <div class="contact-section">
    <div class="container">
      <div class="contact-grid">
        <!-- Contact Form -->
        <div class="contact-form-container">
          <div class="form-header">
            <h2>Send Us a Message</h2>
            <p>Ready to start your tennis journey? We'd love to hear from you!</p>
          </div>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input type="text" id="firstName" v-model="form.firstName" required class="form-input" />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input type="text" id="lastName" v-model="form.lastName" required class="form-input" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" v-model="form.email" required class="form-input" />
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" v-model="form.phone" class="form-input" />
              </div>
            </div>

            <div class="form-group">
              <label for="subject">Subject *</label>
              <select id="subject" v-model="form.subject" required class="form-select">
                <option value="">Select a subject</option>
                <option value="lessons">Tennis Lessons</option>
                <option value="camps">Tennis Camps</option>
                <option value="private">Private Coaching</option>
                <option value="clinics">Group Clinics</option>
                <option value="membership">Membership Info</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea id="message" v-model="form.message" required rows="5" class="form-textarea" placeholder="Tell us about your tennis goals, experience level, or any questions you have..."></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </button>

            <div v-if="submitMessage" class="submit-message" :class="submitMessageType">
              {{ submitMessage }}
            </div>
          </form>
        </div>

        <!-- Contact Info Sidebar -->
        <div class="contact-info">
          <div class="info-card">
            <div class="info-header">
              <h3>Contact Information</h3>
            </div>

            <a href="tel:(801)735-9434" class="info-item clickable">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div class="info-content">
                <h4>Phone</h4>
                <p>(801) 735-9434</p>
                <p class="info-note">Call or text for quick responses</p>
              </div>
            </a>

            <a href="mailto:mwta.stgeorge@gmail.com" class="info-item clickable">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div class="info-content">
                <h4>Email</h4>
                <p>mwta.stgeorge@gmail.com</p>
                <p class="info-note">We respond within 24 hours</p>
              </div>
            </a>

            <a href="https://maps.app.goo.gl/LoPxi5CfqF8LRbp66" target="_blank" class="info-item clickable">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div class="info-content">
                <h4>Location</h4>
                <p>
                  3174 South Bloomington Drive East
                  <br />
                  St. George, Utah 84790
                </p>
                <p class="info-note">Easy parking and drop off available</p>
              </div>
            </a>
          </div>

          <div class="hours-card">
            <div class="info-header">
              <h3>Hours of Operation</h3>
            </div>

            <div class="hours-list">
              <div class="hours-item">
                <span class="day">Monday - Friday</span>
                <span class="time">9:00 AM - 5:00 PM</span>
              </div>
              <div class="hours-item">
                <span class="day">Saturday</span>
                <span class="time">9:00 AM - 12:30 PM</span>
              </div>
              <div class="hours-item">
                <span class="day">Sunday</span>
                <span class="time">CLOSED</span>
              </div>
            </div>

            <div class="hours-note">
              <p><strong>Note:</strong> Court availability may vary during tournaments and special events. Please call ahead to confirm.</p>
            </div>
          </div>

          <div class="quick-links-card">
            <div class="info-header">
              <h3>Quick Actions</h3>
            </div>

            <div class="quick-links">
              <a href="tel:(801) 735-9434" class="quick-link phone">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Call Now
              </a>

              <a href="mailto:mwta.stgeorge@gmail.com" class="quick-link email">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Send Email
              </a>

              <a href="https://maps.app.goo.gl/LoPxi5CfqF8LRbp66" target="_blank" class="quick-link directions">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Hero from "../components/Hero.vue";
import heroImg from "../assets/tennisball_closeup_hero.jpg";

// Form state
const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const submitMessage = ref("");
const submitMessageType = ref("");

const submitForm = async () => {
  isSubmitting.value = true;
  submitMessage.value = "";

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || "Failed to send message.");

    Object.keys(form).forEach((key) => (form[key] = ""));
    submitMessage.value = "Thank you for your message! We'll get back to you within 24 hours.";
    submitMessageType.value = "success";
  } catch (error) {
    submitMessage.value = error?.message || "There was an error sending your message. Please try again.";
    submitMessageType.value = "error";
  } finally {
    isSubmitting.value = false;
    setTimeout(() => (submitMessage.value = ""), 5000);
  }
};
</script>

<style scoped>
.contact-section {
  padding: 4.5rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  min-height: 100vh;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: left;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.55fr 0.9fr;
  gap: 2rem;
  margin-top: 0.5rem;
}

.contact-form-container,
.info-card,
.hours-card,
.quick-links-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.contact-form-container {
  padding: 2rem;
}

.form-header {
  margin-bottom: 1.5rem;
}

.form-header h2 {
  margin: 0 0 0.4rem;
  font-size: 1.75rem;
  font-weight: 950;
  letter-spacing: -0.02em;
  color: #0f172a;
}

.form-header p {
  margin: 0;
  color: #475569;
  line-height: 1.7;
  max-width: 70ch;
}

.contact-form {
  display: grid;
  gap: 1.1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  font-weight: 850;
  color: #0f172a;
  margin-bottom: 0.45rem;
  font-size: 0.92rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.85rem 1rem;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  background: #fff;
  color: #0f172a;
}

.form-textarea {
  resize: vertical;
  min-height: 140px;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: rgba(52, 82, 163, 0.45);
  box-shadow: 0 0 0 4px rgba(52, 82, 163, 0.12);
}

.submit-btn {
  margin-top: 0.5rem;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  padding: 1rem 1.2rem;
  font-size: 1.05rem;
  font-weight: 950;
  color: #0f172a;
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  box-shadow: 0 14px 30px rgba(34, 197, 94, 0.18);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(34, 197, 94, 0.25);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-message {
  padding: 0.9rem 1rem;
  border-radius: 12px;
  font-weight: 800;
}

.submit-message.success {
  background: rgba(34, 197, 94, 0.12);
  color: #166534;
  border: 1px solid rgba(34, 197, 94, 0.25);
}

.submit-message.error {
  background: rgba(239, 68, 68, 0.12);
  color: #991b1b;
  border: 1px solid rgba(239, 68, 68, 0.25);
}

/* Sidebar */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-card,
.hours-card,
.quick-links-card {
  padding: 1.5rem;
}

.info-header h3 {
  margin: 0 0 1rem;
  font-size: 1.15rem;
  font-weight: 950;
  color: #0f172a;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  margin-bottom: 0.9rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item.clickable {
  text-decoration: none;
  color: inherit;
  border-radius: 14px;
  padding: 0.9rem;
  margin: 0 -0.9rem 0.75rem -0.9rem;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.info-item.clickable:hover {
  background: rgba(52, 82, 163, 0.06);
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.10);
}

.info-icon {
  color: #3452a3;
  flex-shrink: 0;
  padding: 0.55rem;
  background: rgba(52, 82, 163, 0.10);
  border: 1px solid rgba(52, 82, 163, 0.14);
  border-radius: 12px;
}

.info-content h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 950;
  color: #0f172a;
}

.info-content p {
  margin: 0.15rem 0 0;
  color: #475569;
  line-height: 1.5;
}

.info-note {
  font-size: 0.9rem;
  color: rgba(71, 85, 105, 0.85) !important;
}

/* Hours */
.hours-list {
  display: grid;
  gap: 0.75rem;
}

.hours-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0.9rem;
  border-radius: 14px;
  background: rgba(52, 82, 163, 0.06);
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.day {
  font-weight: 950;
  color: #0f172a;
}

.time {
  color: #3452a3;
  font-weight: 900;
}

.hours-note {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.hours-note p {
  margin: 0;
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.6;
}


/* Quick Links Styles */
.quick-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.quick-link.phone {
  background: #e3f2fd;
  color: #1976d2;
}

.quick-link.phone:hover {
  background: #1976d2;
  color: white;
}

.quick-link.email {
  background: #f3e5f5;
  color: #7b1fa2;
}

.quick-link.email:hover {
  background: #7b1fa2;
  color: white;
}

.quick-link.directions {
  background: #e8f5e8;
  color: #388e3c;
}

.quick-link.directions:hover {
  background: #388e3c;
  color: white;
}
/* Responsive */
@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  .contact-section {
    padding: 3.5rem 0;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
  .contact-form-container,
  .info-card,
  .hours-card,
  .quick-links-card {
    padding: 1.25rem;
  }
}


/* Mobile Responsiveness */
@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-form-container {
    order: 1;
  }

  .contact-info {
    order: 2;
  }
}

@media (max-width: 768px) {
  .section-header h1 {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .contact-form-container,
  .info-card,
  .hours-card,
  .quick-links-card {
    padding: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 0 1rem;
  }

  .contact-section {
    padding: 2rem 0;
  }
}

@media (max-width: 480px) {
  .form-header h2 {
    font-size: 1.5rem;
  }

  .info-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .hours-item {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
}
</style>
