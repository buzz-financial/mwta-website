<template>
  <!-- Full-width hero -->
  <Hero title="Staff" :backgroundImage="heroImg" />

  <div class="staff-section">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">Our Team</div>
        <h1 class="section-title">Meet Our Expert Coaches</h1>
        <p class="section-subtitle">Our experienced team of tennis professionals are dedicated to helping you reach your full potential</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading our amazing coaches...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p>Sorry, we couldn't load our coaches right now. Please try again later.</p>
      </div>

      <!-- Staff Grid -->
      <div v-else class="staff-grid">
        <!-- Active Coaches -->
        <div v-for="member in activeCoaches" :key="member.id" class="staff-card">
          <div class="staff-image">
            <img :src="getImageUrl(member.image, member.image_url)" :alt="member.name" />
            <div class="image-overlay">
              <div class="coach-contact">
                <a v-if="member.email" :href="`mailto:${member.email}`" class="contact-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
                <a v-if="member.phone" :href="`tel:${member.phone}`" class="contact-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </a>
              </div>
            </div>
            <div class="experience-badge">{{ member.years_experience }} Years</div>
          </div>

          <div class="staff-content">
            <h3 class="staff-name">{{ member.name }}</h3>
            <p class="staff-title">{{ member.title }}</p>

            <div class="key-specialties">
              <span v-for="specialty in member.key_specialties" :key="specialty" class="specialty-tag">
                {{ specialty }}
              </span>
            </div>

            <div class="certification-summary" v-if="member.main_certification">
              <span class="cert-icon">📜</span>
              {{ member.main_certification }}
            </div>
          </div>
        </div>

        <!-- Empty Placeholder Cards (show remaining slots up to 4 total) -->
        <div v-for="n in Math.max(0, 4 - activeCoaches.length)" :key="`empty-${n}`" class="staff-card placeholder-card">
          <div class="empty-coach-content">
            <div class="empty-coach-image">
              <div class="placeholder-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div class="coming-soon-badge">Coming Soon</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabase";
import Hero from "../components/Hero.vue";
import heroImg from "../assets/tennisball_closeup_hero.jpg";
import mikePortrait from "../assets/mikeportrait.png";
import beccaPortrait from "../assets/beccaportrait.png";

// Reactive data
const activeCoaches = ref([]);
const loading = ref(true);
const error = ref(null);

// Image mapping for existing assets
const imageMap = {
  "mikeportrait.png": mikePortrait,
  "beccaportrait.png": beccaPortrait,
};

// Helper function to get image URL
const getImageUrl = (imageName, imageUrl) => {
  // Priority: Base64 image_url > Local assets > Placeholder
  if (imageUrl) {
    return imageUrl; // This will be the Base64 string
  }
  return imageMap[imageName] || `https://via.placeholder.com/300x400/3452a3/ffffff?text=Photo+Coming+Soon`;
};

// Fetch coaches from Supabase
const fetchCoaches = async () => {
  try {
    loading.value = true;
    error.value = null;

    const { data, error: supabaseError } = await supabase.from("coaches").select("*").eq("active", true).order("name");

    if (supabaseError) {
      throw supabaseError;
    }

    activeCoaches.value = data || [];
  } catch (err) {
    console.error("Error fetching coaches:", err);
    error.value = err.message;

    // Fallback to your existing data if Supabase fails
    activeCoaches.value = [
      {
        id: 1,
        name: "Mike White",
        title: "Head Pro & Owner",
        image: "mikeportrait.png",
        email: "mike@mwtennis.com",
        phone: "(801) 735-9434",
        years_experience: 15,
        main_certification: "USPTA Certified Professional",
        key_specialties: ["Junior Development", "Competitive Training", "Match Strategy"],
      },
      {
        id: 2,
        name: "Becca Little",
        title: "Assistant Coach",
        image: "beccaportrait.png",
        email: "becca@mwtennis.com",
        phone: "(801) 735-9435",
        years_experience: 8,
        main_certification: "USPTA Certified Professional",
        key_specialties: ["Beginner Instruction", "Youth Programs", "Group Clinics"],
      },
    ];
  } finally {
    loading.value = false;
  }
};

// Load data when component mounts
onMounted(() => {
  fetchCoaches();
});
</script>

<style scoped>
/* All your existing styles remain the same */

/* Loading and Error States */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  color: #6c757d;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3452a3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-state p {
  font-size: 1.1rem;
  max-width: 400px;
}

/* Coming Soon Badge */
.coming-soon-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #6c757d, #495057);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  box-shadow: 0 3px 10px rgba(108, 117, 125, 0.3);
}

/* Enhanced Global Styles */
.staff-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  min-height: 80vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Enhanced Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
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
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(135deg, #2c3e50, #3452a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Simplified Staff Grid */
.staff-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  margin-top: 3rem;
}

/* Simplified Staff Cards */
.staff-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(223, 255, 79, 0.2);
  height: 420px;
}

.staff-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(52, 82, 163, 0.15);
  border-color: rgba(223, 255, 79, 0.4);
}

/* Simplified Staff Image */
.staff-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.staff-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.staff-card:hover .staff-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.staff-card:hover .image-overlay {
  opacity: 1;
}

.coach-contact {
  display: flex;
  gap: 0.75rem;
}

.contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.contact-btn:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.experience-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  color: #2c3e50;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  box-shadow: 0 3px 10px rgba(223, 255, 79, 0.3);
}

/* Simplified Staff Content */
.staff-content {
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  height: 170px;
  overflow: hidden;
}

.staff-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.staff-title {
  font-size: 1rem;
  color: #3452a3;
  font-weight: 600;
  margin-bottom: 1rem;
}

.key-specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.specialty-tag {
  background: linear-gradient(135deg, #e9ecef, #f8f9fa);
  color: #495057;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(52, 82, 163, 0.1);
}

.certification-summary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #6c757d;
  font-weight: 500;
}

.cert-icon {
  font-size: 1rem;
}

/* Simplified Empty Coach Cards */
.placeholder-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #6c757d;
  border: 2px dashed #dee2e6;
  position: relative;
  overflow: hidden;
}

.placeholder-card:hover {
  border-color: #3452a3;
  border-style: solid;
}

.empty-coach-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.empty-coach-image {
  position: relative;
  height: 250px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dee2e6;
}

.placeholder-icon {
  color: #adb5bd;
  opacity: 0.6;
}

/* Mobile Responsiveness */
@media (max-width: 1024px) {
  .staff-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .staff-card {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .staff-section {
    padding: 3rem 0;
  }

  .section-header {
    margin-bottom: 2.5rem;
  }

  .staff-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .staff-card {
    height: 380px;
  }

  .staff-image,
  .empty-coach-image {
    height: 220px;
  }

  .staff-content {
    padding: 1.25rem 1.25rem 1.75rem 1.25rem;
    height: 160px;
  }
}

@media (max-width: 480px) {
  .staff-card {
    border-radius: 16px;
    height: 360px;
  }

  .staff-image,
  .empty-coach-image {
    height: 200px;
  }

  .staff-content {
    padding: 1rem 1rem 1.5rem 1rem;
    height: 160px;
  }

  .staff-name {
    font-size: 1.2rem;
  }

  .experience-badge,
  .coming-soon-badge {
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }

  .key-specialties {
    gap: 0.4rem;
  }

  .specialty-tag {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>
