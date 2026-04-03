<template>
  <div class="book-page">
    <!-- Success Screen -->
    <div v-if="submitted" class="success-screen">
      <div class="success-card">
        <div class="success-icon">✓</div>
        <h2>Booking Request Received!</h2>
        <p>
          Thanks, <strong>{{ form.firstName }} {{ form.lastName }}</strong>! Your lesson request with
          <strong>{{ selectedCoach?.name }}</strong> has been submitted.
        </p>
        <div class="success-summary">
          <div class="summary-row">
            <span>Coach</span>
            <strong>{{ selectedCoach?.name }}</strong>
          </div>
          <div class="summary-row">
            <span>Preferred Date</span>
            <strong>{{ form.preferredDate }}</strong>
          </div>
          <div class="summary-row">
            <span>Preferred Time</span>
            <strong>{{ form.preferredTime }}</strong>
          </div>
          <div class="summary-row">
            <span>Lesson Type</span>
            <strong>{{ lessonTypeLabel }}</strong>
          </div>
        </div>
        <p class="success-note">
          We'll reach out within 24 hours to confirm your session details and pricing.
          Questions? <RouterLink to="/contact">Contact us</RouterLink>.
        </p>
        <div class="success-actions">
          <RouterLink class="btn-primary-lg" to="/">Back to Home</RouterLink>
          <button class="btn-ghost-lg" @click="resetForm">Book Another</button>
        </div>
      </div>
    </div>

    <!-- Booking form -->
    <template v-else>
      <div class="page-header">
        <div class="page-header__inner">
          <RouterLink to="/privatelessons" class="back-link">← Back to Private Lessons</RouterLink>
          <h1 class="page-title">Book a Private Lesson</h1>
          <p class="page-subtitle">Fill out the form below and we'll confirm your session within 24 hours.</p>
        </div>
      </div>

      <div class="book-body">
        <!-- Coach selection -->
        <section class="book-section">
          <h2 class="section-heading">Choose a Coach</h2>
          <div v-if="loadingCoaches" class="loading-row">Loading coaches…</div>
          <div v-else class="coach-grid">
            <button
              v-for="coach in coaches"
              :key="coach.id"
              class="coach-card"
              :class="{ selected: form.coachId === coach.id }"
              @click="form.coachId = coach.id"
            >
              <div class="coach-avatar">
                <img v-if="getCoachImage(coach)" :src="getCoachImage(coach)" :alt="coach.name" />
                <div v-else class="coach-initial">{{ coach.name?.charAt(0) }}</div>
              </div>
              <div class="coach-info">
                <h3>{{ coach.name }}</h3>
                <p>{{ coach.title }}</p>
                <div v-if="coach.key_specialties?.length" class="specialty-row">
                  <span v-for="s in coach.key_specialties.slice(0, 3)" :key="s" class="specialty-chip">{{ s }}</span>
                </div>
              </div>
            </button>
          </div>
        </section>

        <!-- Lesson details -->
        <section class="book-section">
          <h2 class="section-heading">Lesson Details</h2>
          <div class="form-grid">
            <div class="form-group">
              <label>Lesson Type *</label>
              <select v-model="form.lessonType" required>
                <option value="">Select type</option>
                <option value="junior_private">Junior Private (1-on-1)</option>
                <option value="adult_private">Adult Private (1-on-1)</option>
                <option value="semi_private">Semi-Private (2 players)</option>
                <option value="evaluation">Evaluation / First Lesson</option>
              </select>
            </div>
            <div class="form-group">
              <label>Lesson Duration *</label>
              <select v-model="form.duration" required>
                <option value="">Select duration</option>
                <option value="30min">30 minutes</option>
                <option value="60min">60 minutes</option>
                <option value="90min">90 minutes</option>
              </select>
            </div>
            <div class="form-group">
              <label>Preferred Date *</label>
              <input v-model="form.preferredDate" type="date" :min="minDate" required />
            </div>
            <div class="form-group">
              <label>Preferred Time *</label>
              <select v-model="form.preferredTime" required>
                <option value="">Select time</option>
                <option v-for="t in timeSlots" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
            <div class="form-group full">
              <label>Alternate Date / Time (optional)</label>
              <input v-model="form.alternateDateTime" type="text" placeholder="e.g. Any weekday morning, or Thu afternoon" />
            </div>
          </div>
        </section>

        <!-- Personal info -->
        <section class="book-section">
          <h2 class="section-heading">Your Information</h2>
          <div class="form-grid">
            <div class="form-group">
              <label>First Name *</label>
              <input v-model="form.firstName" type="text" required placeholder="First name" />
            </div>
            <div class="form-group">
              <label>Last Name *</label>
              <input v-model="form.lastName" type="text" required placeholder="Last name" />
            </div>
            <div class="form-group">
              <label>Email *</label>
              <input v-model="form.email" type="email" required placeholder="email@example.com" />
            </div>
            <div class="form-group">
              <label>Phone *</label>
              <input v-model="form.phone" type="tel" required placeholder="(555) 555-5555" />
            </div>
            <div class="form-group full">
              <label>Player Name (if different from above)</label>
              <input v-model="form.playerName" type="text" placeholder="Name of the player receiving the lesson" />
            </div>
            <div class="form-group full">
              <label>Goals / Notes</label>
              <textarea v-model="form.notes" rows="3" placeholder="What do you want to focus on? Any specific goals or areas to improve?"></textarea>
            </div>
          </div>
        </section>

        <div v-if="submitError" class="error-banner">{{ submitError }}</div>

        <div class="submit-row">
          <button class="btn-submit" @click="submitBooking" :disabled="!canSubmit || submitting">
            {{ submitting ? "Submitting…" : "Request Lesson" }}
          </button>
          <p class="submit-note">We'll confirm availability and pricing within 24 hours.</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { supabase } from "../lib/supabase";
import mikePortrait from "../assets/mikeportrait.png";
import beccaPortrait from "../assets/beccaportrait.png";

const imageMap = { "mikeportrait.png": mikePortrait, "beccaportrait.png": beccaPortrait };

const coaches = ref([]);
const loadingCoaches = ref(true);
const submitted = ref(false);
const submitting = ref(false);
const submitError = ref("");

const form = ref({
  coachId: null,
  lessonType: "",
  duration: "",
  preferredDate: "",
  preferredTime: "",
  alternateDateTime: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  playerName: "",
  notes: "",
});

const timeSlots = [
  "7:00am", "7:30am", "8:00am", "8:30am", "9:00am", "9:30am",
  "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm",
  "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm",
  "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm",
];

const minDate = computed(() => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
});

const selectedCoach = computed(() => coaches.value.find((c) => c.id === form.value.coachId));

const lessonTypeLabel = computed(() => {
  const map = {
    junior_private: "Junior Private (1-on-1)",
    adult_private: "Adult Private (1-on-1)",
    semi_private: "Semi-Private (2 players)",
    evaluation: "Evaluation / First Lesson",
  };
  return map[form.value.lessonType] || "";
});

const canSubmit = computed(() => {
  const f = form.value;
  return f.coachId && f.lessonType && f.duration && f.preferredDate && f.preferredTime && f.firstName && f.lastName && f.email && f.phone;
});

const getCoachImage = (coach) => {
  if (coach.image_url) return coach.image_url;
  if (coach.image && imageMap[coach.image]) return imageMap[coach.image];
  return null;
};

const fetchCoaches = async () => {
  try {
    const { data, error } = await supabase.from("coaches").select("*").eq("active", true).order("sort_order");
    if (error) throw error;
    coaches.value = data || [];
  } catch {
    // fallback to hardcoded coaches if Supabase table doesn't exist yet
    coaches.value = [
      { id: 1, name: "Mike White", title: "Head Pro & Owner", image: "mikeportrait.png", key_specialties: ["Junior Development", "Competitive Training", "Match Strategy"] },
      { id: 2, name: "Becca Little", title: "Assistant Coach", image: "beccaportrait.png", key_specialties: ["Beginner Instruction", "Youth Programs", "Group Clinics"] },
    ];
  } finally {
    loadingCoaches.value = false;
  }
};

const submitBooking = async () => {
  submitting.value = true;
  submitError.value = "";
  try {
    const payload = {
      coach_id: form.value.coachId,
      coach_name: selectedCoach.value?.name,
      lesson_type: form.value.lessonType,
      duration: form.value.duration,
      preferred_date: form.value.preferredDate,
      preferred_time: form.value.preferredTime,
      alternate_datetime: form.value.alternateDateTime,
      first_name: form.value.firstName,
      last_name: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      player_name: form.value.playerName || `${form.value.firstName} ${form.value.lastName}`,
      notes: form.value.notes,
      status: "pending",
    };
    const { error } = await supabase.from("lesson_bookings").insert([payload]);
    if (error) throw error;
    submitted.value = true;
  } catch (err) {
    submitError.value = err.message || "Failed to submit. Please try again or contact us directly.";
  } finally {
    submitting.value = false;
  }
};

const resetForm = () => {
  form.value = { coachId: null, lessonType: "", duration: "", preferredDate: "", preferredTime: "", alternateDateTime: "", firstName: "", lastName: "", email: "", phone: "", playerName: "", notes: "" };
  submitted.value = false;
  submitError.value = "";
};

onMounted(fetchCoaches);
</script>

<style scoped>
.book-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
}

.page-header {
  background: #fff;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  padding: 5rem 2rem 1.75rem;
}

.page-header__inner {
  max-width: 860px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  color: #3452a3;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.page-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem;
}

.page-subtitle {
  color: #475569;
  font-size: 1rem;
  margin: 0;
  line-height: 1.6;
}

.book-body {
  max-width: 860px;
  margin: 0 auto;
  padding: 2.5rem 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.book-section {
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 1.75rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
}

.section-heading {
  margin: 0 0 1.5rem;
  font-size: 1rem;
  font-weight: 950;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.85rem;
}

.loading-row {
  color: #64748b;
  font-size: 0.9rem;
}

/* Coach grid */
.coach-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.coach-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8fafc;
  border: 2px solid rgba(15, 23, 42, 0.08);
  border-radius: 14px;
  padding: 1rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
}

.coach-card:hover {
  border-color: #3452a3;
}

.coach-card.selected {
  border-color: #3452a3;
  background: rgba(52, 82, 163, 0.04);
}

.coach-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.coach-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.coach-initial {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 950;
  font-size: 1.4rem;
}

.coach-info h3 {
  margin: 0 0 0.2rem;
  font-size: 1rem;
  font-weight: 950;
  color: #0f172a;
}

.coach-info p {
  margin: 0 0 0.5rem;
  font-size: 0.82rem;
  color: #3452a3;
  font-weight: 700;
}

.specialty-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.specialty-chip {
  font-size: 0.72rem;
  font-weight: 800;
  background: rgba(52, 82, 163, 0.08);
  color: #334155;
  border-radius: 999px;
  padding: 0.2rem 0.5rem;
}

/* Form */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group.full {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 800;
  color: #334155;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem 0.9rem;
  border: 1.5px solid rgba(15, 23, 42, 0.14);
  border-radius: 10px;
  font-size: 0.95rem;
  color: #0f172a;
  background: #fff;
  transition: border-color 0.15s;
  width: 100%;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3452a3;
  box-shadow: 0 0 0 3px rgba(52, 82, 163, 0.1);
}

/* Submit */
.error-banner {
  padding: 0.9rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  color: #dc2626;
  font-size: 0.9rem;
  font-weight: 700;
}

.submit-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.btn-submit {
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  border: none;
  border-radius: 12px;
  font-weight: 950;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.15s;
  box-shadow: 0 10px 28px rgba(52, 82, 163, 0.3);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.submit-note {
  color: #64748b;
  font-size: 0.85rem;
  margin: 0;
}

/* Success */
.success-screen {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 6rem 2rem 4rem;
}

.success-card {
  max-width: 560px;
  width: 100%;
  background: #fff;
  border-radius: 24px;
  padding: 2.5rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.1);
}

.success-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  font-size: 1.8rem;
  font-weight: 900;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin-bottom: 1.25rem;
}

.success-card h2 {
  font-size: 1.8rem;
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
}

.success-card > p {
  color: #475569;
  line-height: 1.7;
  margin: 0 0 1.5rem;
}

.success-summary {
  background: rgba(52, 82, 163, 0.04);
  border: 1px solid rgba(52, 82, 163, 0.12);
  border-radius: 14px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.45rem 0;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}

.summary-row:last-child { border-bottom: none; }
.summary-row span { color: #64748b; font-weight: 700; }
.summary-row strong { color: #0f172a; font-weight: 900; }

.success-note {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.7;
  margin: 0 0 1.75rem;
}

.success-note a { color: #3452a3; font-weight: 700; }

.success-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary-lg {
  flex: 1;
  min-width: 160px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.4rem;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: #fff;
  border-radius: 12px;
  font-weight: 950;
  text-decoration: none;
  transition: transform 0.15s;
}

.btn-primary-lg:hover { transform: translateY(-1px); }

.btn-ghost-lg {
  flex: 1;
  min-width: 160px;
  padding: 0.95rem 1.4rem;
  background: #fff;
  border: 1.5px solid rgba(15, 23, 42, 0.14);
  border-radius: 12px;
  font-weight: 950;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-ghost-lg:hover { border-color: #3452a3; color: #3452a3; }

@media (max-width: 768px) {
  .page-header { padding: 4.5rem 1rem 1.5rem; }
  .book-body { padding: 1.75rem 1rem 3rem; }
  .form-grid { grid-template-columns: 1fr; }
  .coach-grid { grid-template-columns: 1fr; }
}
</style>
