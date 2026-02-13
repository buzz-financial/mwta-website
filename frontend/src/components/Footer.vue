<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-main">
        <!-- Location & Contact Info -->
        <div class="footer-contact">
          <h3 class="footer-title">
            <span class="location-icon">📍</span>
            Visit Our Academy
          </h3>
          <div class="contact-details">
            <div class="address">
              <p class="academy-name">Mike White Tennis Academy</p>
              <p class="address-line">3174 South Bloomington Drive East</p>
              <p class="address-line">St. George, Utah 84790</p>
            </div>

            <div class="contact-methods">
              <a href="tel:8017359434" class="contact-link">
                <span class="contact-icon">📞</span>
                (801) 735-9434
              </a>
              <a href="mailto:mwta.stgeorge@gmail.com" class="contact-link">
                <span class="contact-icon">📧</span>
                mwta.stgeorge@gmail.com
              </a>
            </div>

            <a href="https://www.google.com/maps/dir/?api=1&destination=3174+South+Bloomington+Drive+East+St+George+Utah+84790" target="_blank" rel="noopener" class="directions-btn">
              <span>Get Directions</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Hours of Operation -->
        <div class="footer-hours">
          <h3 class="footer-title">
            <span class="hours-icon">🕒</span>
            Business Hours
          </h3>
          <div class="hours-grid">
            <div class="hours-item">
              <span class="day">Monday - Friday</span>
              <span class="time">9:00 AM – 5:00 PM</span>
            </div>
            <div class="hours-item">
              <span class="day">Saturday</span>
              <span class="time">9:00 AM – 12:30 PM</span>
            </div>
            <div class="hours-item closed">
              <span class="day">Sunday</span>
              <span class="time">Closed</span>
            </div>
          </div>
        </div>

        <!-- Embedded Google Map -->
        <div class="footer-map">
          <div class="map-wrapper">
            <iframe src="https://www.google.com/maps?q=3174+South+Bloomington+Drive+East+St+George+Utah+84790&output=embed" width="100%" height="100%" frameborder="0" style="border: 0" allowfullscreen="" loading="lazy" title="Mike White Tennis Academy Location"> </iframe>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="footer-branding">
            <img src="../assets/logo-full.png" alt="Mike White Tennis Academy" class="footer-logo" />
          </div>
          <div class="footer-meta">
            <p class="copyright">© 2026 Mike White Tennis Academy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No script needed for static footer
</script>

<style scoped>
/* Enhanced Footer Styles */
.footer {
  width: 100vw;
  position: relative;
  left: 50%;
  margin-left: -50vw;
  background: linear-gradient(135deg, #2c3e50 0%, #1a252f 100%);
  color: #ffffff;
  overflow: hidden;
}

.footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #dfff4f, transparent);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Main Footer Content */
.footer-main {
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  gap: 3rem;
  padding: 4rem 0 3rem;
  align-items: start;
}

/* Footer Titles */
.footer-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #dfff4f;
  margin-bottom: 2rem;
  position: relative;
}

.footer-title::after {
  content: "";
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, #dfff4f, transparent);
}

.location-icon,
.hours-icon {
  font-size: 1.1rem;
}

/* Contact Section */
.footer-contact {
  padding-right: 1rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.address {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(223, 255, 79, 0.2);
}

.academy-name {
  font-weight: 700;
  color: #dfff4f;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.address-line {
  color: #e2e8f0;
  margin-bottom: 0.25rem;
  line-height: 1.5;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #e2e8f0;
  text-decoration: none;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-link:hover {
  background: rgba(223, 255, 79, 0.1);
  border-color: rgba(223, 255, 79, 0.3);
  transform: translateX(5px);
}

.contact-icon {
  font-size: 1rem;
  color: #dfff4f;
}

.directions-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  color: #2c3e50;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  align-self: flex-start;
}

.directions-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(223, 255, 79, 0.3);
}

.directions-btn svg {
  transition: transform 0.3s ease;
}

.directions-btn:hover svg {
  transform: translateX(3px);
}

/* Hours Section */
.footer-hours {
  padding: 0 1rem;
}

.hours-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hours-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.hours-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(223, 255, 79, 0.2);
}

.hours-item.closed {
  opacity: 0.7;
}

.day {
  font-weight: 600;
  color: #e2e8f0;
}

.time {
  color: #dfff4f;
  font-weight: 500;
}

.hours-item.closed .time {
  color: #94a3b8;
}

/* Map Section */
.footer-map {
  padding-left: 1rem;
}

.map-wrapper {
  position: relative;
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(223, 255, 79, 0.2);
  transition: all 0.3s ease;
}

.map-wrapper:hover {
  border-color: rgba(223, 255, 79, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.map-wrapper iframe {
  filter: grayscale(20%) contrast(1.1);
  transition: filter 0.3s ease;
}

.map-wrapper:hover iframe {
  filter: grayscale(0%) contrast(1.2);
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  background: rgba(0, 0, 0, 0.2);
  /* Make this section also span full width */
  width: 100vw;
  position: relative;
  left: 50%;
  margin-left: -50vw;
}

.footer-bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-branding {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.footer-logo {
  height: 60px;
  width: auto;
  transition: transform 0.3s ease;
}

.footer-logo:hover {
  transform: scale(1.05);
}

.brand-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.brand-text {
  font-weight: 700;
  color: #dfff4f;
  font-size: 1.1rem;
  margin: 0;
}

.tagline {
  color: #94a3b8;
  font-size: 0.9rem;
  margin: 0;
  font-style: italic;
}

.footer-meta {
  text-align: right;
}

.copyright {
  color: #94a3b8;
  font-size: 0.85rem;
  margin: 0;
}

/* Mobile Responsiveness */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer-map {
    grid-column: 1 / -1;
    padding-left: 0;
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 0 1rem;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 3rem 0 2rem;
  }

  .footer-contact,
  .footer-hours,
  .footer-map {
    padding: 0;
  }

  .map-wrapper {
    height: 250px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    padding: 1.5rem 0;
  }

  .footer-bottom-content {
    padding: 0 1rem;
  }

  .footer-branding {
    flex-direction: column;
    gap: 1rem;
  }

  .footer-logo {
    height: 50px;
  }

  .footer-meta {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-title {
    font-size: 1.1rem;
  }

  .hours-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    text-align: left;
  }

  .contact-methods {
    gap: 0.75rem;
  }

  .contact-link {
    padding: 0.6rem 0.8rem;
  }

  .map-wrapper {
    height: 220px;
  }

  .footer-logo {
    height: 45px;
  }

  .brand-info {
    text-align: center;
  }
}
</style>
