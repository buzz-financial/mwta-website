<template>
  <footer class="footer">
    <div class="footer__container">
      <!-- Hours of Operation -->
      <div class="footer__hours">
        <h3>Business Hours</h3>
        <ul>
          <li><strong>Monday - Friday:</strong> 9:00 AM – 5:00 PM</li>
          <li><strong>Saturday:</strong> 9:00 AM – 12:30 PM</li>
          <li><strong>Sunday:</strong> CLOSED</li>
        </ul>
      </div>

      <!-- Embedded Google Map -->
      <div class="footer__map">
        <iframe src="https://www.google.com/maps?q=3174+South+Bloomington+Drive+East+St+George+Utah+84790&output=embed" width="100%" height="100%" frameborder="0" style="border: 0" allowfullscreen="" loading="lazy"></iframe>
      </div>

      <!-- Location & Contact Info -->
      <div class="footer__info">
        <h3>Location & Hours</h3>
        <p>Mike White Tennis Academy</p>
        <p>
          3174 South Bloomington Drive East
          <br />
          St. George, Utah 84790
        </p>
        <p>
          <a href="tel:8017359434">(801) 735-9434</a><br />
          <a href="mailto:MWTA.Tennis@gmail.com">MWTA.Tennis@gmail.com</a>
        </p>
        <p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=3174+South+Bloomington+Drive+East+St+George+Utah+84790" target="_blank" rel="noopener" class="footer__directions"> Get Directions </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No script needed for static footer
</script>

<style scoped>
.full_logo {
  width: 200px;
  height: auto;
  margin: 0 auto 1rem;
}

.footer {
  position: relative;
  left: 50%;
  width: 100vw;
  margin-left: -50vw;
  background-color: #222;
  color: #eee;
  padding: 2rem 0;
}

.footer__container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.footer__info,
.footer__hours {
  color: #ccc;
}

.footer__info h3,
.footer__hours h3 {
  color: #dfff4f;
  margin-bottom: 1rem;
}

.footer__info a,
.footer__directions {
  color: #dfff4f;
  text-decoration: none;
  font-weight: bold;
}

.footer__info a:hover,
.footer__directions:hover {
  text-decoration: underline;
}

.footer__hours ul {
  list-style: none;
  padding: 0;
}

.footer__hours li {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.footer__map {
  width: 100%;
  height: 350px;
  border-radius: 0.5rem;
  overflow: hidden;
}

.footer__map iframe {
  border: 0;
  width: 100%;
  height: 100%;
}

.full_logo {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}
</style>
