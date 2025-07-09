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

            <a href="tel:(555)123-8366" class="info-item clickable">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div class="info-content">
                <h4>Phone</h4>
                <p>(555) 123-TENNIS</p>
                <p class="info-note">Call or text for quick responses</p>
              </div>
            </a>

            <a href="mailto:info@mwtennis.com" class="info-item clickable">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div class="info-content">
                <h4>Email</h4>
                <p>info@mwtennis.com</p>
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
              <a href="tel:(555)123-8366" class="quick-link phone">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Call Now
              </a>

              <a href="mailto:info@mwtennis.com" class="quick-link email">
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

// Form submission handler
const submitForm = async () => {
  isSubmitting.value = true;
  submitMessage.value = "";

  try {
    // Simulate form submission - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    Object.keys(form).forEach((key) => (form[key] = ""));

    submitMessage.value = "Thank you for your message! We'll get back to you within 24 hours.";
    submitMessageType.value = "success";
  } catch (error) {
    submitMessage.value = "There was an error sending your message. Please try again or call us directly.";
    submitMessageType.value = "error";
  } finally {
    isSubmitting.value = false;

    // Clear message after 5 seconds
    setTimeout(() => {
      submitMessage.value = "";
    }, 5000);
  }
};
</script>

<style scoped>
.contact-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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

.contact-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-top: 1rem;
}

/* Contact Form Styles */
.contact-form-container {
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.form-header {
  margin-bottom: 2rem;
}

.form-header h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-header p {
  color: #6c757d;
  line-height: 1.5;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fff;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3452a3;
  box-shadow: 0 0 0 3px rgba(52, 82, 163, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

.submit-btn {
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(52, 82, 163, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-message {
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  margin-top: 1rem;
}

.submit-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.submit-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Contact Info Styles */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card,
.hours-card,
.quick-links-card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.info-header {
  margin-bottom: 1.5rem;
}

.info-header h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  font-weight: 600;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item.clickable {
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  padding: 0.75rem;
  margin: 0 -0.75rem 1.5rem -0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.info-item.clickable:hover {
  background: rgba(52, 82, 163, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 82, 163, 0.1);
}

.info-item.clickable:active {
  transform: translateY(0);
}

.info-icon {
  color: #3452a3;
  flex-shrink: 0;
  padding: 0.5rem;
  background: rgba(52, 82, 163, 0.1);
  border-radius: 8px;
}

.info-content h4 {
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.info-content p {
  color: #6c757d;
  line-height: 1.5;
  margin-bottom: 0.25rem;
}

.info-note {
  font-size: 0.85rem;
  color: #adb5bd !important;
}

/* Hours Styles */
.hours-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.hours-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.hours-item:last-child {
  border-bottom: none;
}

.day {
  font-weight: 600;
  color: #2c3e50;
}

.time {
  color: #6c757d;
  font-weight: 500;
}

.hours-note {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.hours-note p {
  font-size: 0.85rem;
  color: #6c757d;
  line-height: 1.5;
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
