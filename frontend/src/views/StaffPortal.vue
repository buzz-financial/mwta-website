<template>
  <div class="staff-portal">
    <!-- Login Gate -->
    <div v-if="!session" class="login-screen">
      <div class="login-card">
        <div class="login-header">
          <h1>Staff Portal</h1>
          <p>Sign in to manage your availability and view lesson bookings.</p>
        </div>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label>Email</label>
            <input v-model="loginEmail" type="email" required placeholder="your@email.com" :disabled="loggingIn" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="loginPassword" type="password" required placeholder="Password" :disabled="loggingIn" />
          </div>
          <div v-if="loginError" class="error-msg">{{ loginError }}</div>
          <button type="submit" class="btn-login" :disabled="loggingIn">
            {{ loggingIn ? "Signing in…" : "Sign In" }}
          </button>
        </form>
        <RouterLink to="/" class="back-link">← Back to website</RouterLink>
      </div>
    </div>

    <!-- Portal Content -->
    <div v-else class="portal-content">
      <div class="portal-header">
        <div class="portal-header__inner">
          <div>
            <h1 class="portal-title">Staff Portal</h1>
            <p class="portal-subtitle">Welcome back, {{ coachProfile?.name || session.user.email }}</p>
          </div>
          <div class="header-actions">
            <RouterLink to="/admin" class="btn-outline-sm" v-if="isAdmin">Admin Dashboard</RouterLink>
            <button class="btn-logout" @click="handleLogout">Sign Out</button>
          </div>
        </div>
      </div>

      <div class="portal-body">
        <!-- Tab nav -->
        <div class="tab-nav">
          <button class="tab-btn" :class="{ active: activeTab === 'availability' }" @click="activeTab = 'availability'">
            Availability
          </button>
          <button class="tab-btn" :class="{ active: activeTab === 'bookings' }" @click="activeTab = 'bookings'">
            Lesson Requests
            <span v-if="pendingBookings.length" class="badge">{{ pendingBookings.length }}</span>
          </button>
        </div>

        <!-- Availability Tab -->
        <div v-if="activeTab === 'availability'" class="tab-panel">
          <div class="panel-header">
            <h2>Weekly Availability</h2>
            <p>Set the days and times you're available for private lessons. Students will see these when booking.</p>
          </div>

          <div class="availability-grid">
            <div v-for="day in weekDays" :key="day.id" class="day-block">
              <div class="day-block__header">
                <h3>{{ day.label }}</h3>
                <label class="toggle">
                  <input type="checkbox" v-model="day.enabled" @change="saveDayAvailability(day)" />
                  <span class="toggle-track"></span>
                  <span class="toggle-label">{{ day.enabled ? "Available" : "Unavailable" }}</span>
                </label>
              </div>

              <div v-if="day.enabled" class="time-slots">
                <div v-for="(slot, idx) in day.slots" :key="idx" class="slot-row">
                  <select v-model="slot.start" @change="saveDayAvailability(day)" class="time-select">
                    <option v-for="t in timeOptions" :key="t" :value="t">{{ t }}</option>
                  </select>
                  <span class="slot-dash">–</span>
                  <select v-model="slot.end" @change="saveDayAvailability(day)" class="time-select">
                    <option v-for="t in timeOptions" :key="t" :value="t">{{ t }}</option>
                  </select>
                  <button class="slot-remove" @click="removeSlot(day, idx)" title="Remove slot">×</button>
                </div>
                <button class="btn-add-slot" @click="addSlot(day)">+ Add time slot</button>
              </div>

              <div v-else class="day-off-note">No lessons scheduled</div>
            </div>
          </div>

          <div class="save-row">
            <button class="btn-save" @click="saveAllAvailability" :disabled="saving">
              {{ saving ? "Saving…" : "Save Availability" }}
            </button>
            <span v-if="saveSuccess" class="save-success">Saved!</span>
          </div>
        </div>

        <!-- Bookings Tab -->
        <div v-if="activeTab === 'bookings'" class="tab-panel">
          <div class="panel-header">
            <h2>Lesson Requests</h2>
            <p>Review and respond to incoming private lesson booking requests.</p>
          </div>

          <div v-if="loadingBookings" class="loading-state">Loading bookings…</div>

          <div v-else-if="bookings.length === 0" class="empty-state">
            <div class="empty-icon">📋</div>
            <h3>No booking requests yet</h3>
            <p>When students request a lesson with you, they'll appear here.</p>
          </div>

          <div v-else class="bookings-list">
            <div v-for="b in bookings" :key="b.id" class="booking-card" :class="`status-${b.status}`">
              <div class="booking-card__top">
                <div>
                  <h3 class="booking-name">{{ b.first_name }} {{ b.last_name }}</h3>
                  <p class="booking-player">Player: {{ b.player_name || b.first_name + " " + b.last_name }}</p>
                </div>
                <span class="status-badge" :class="`badge-${b.status}`">{{ statusLabel(b.status) }}</span>
              </div>

              <div class="booking-details">
                <div class="detail-item">
                  <span class="detail-label">Date</span>
                  <span>{{ formatDate(b.preferred_date) }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Time</span>
                  <span>{{ b.preferred_time }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Type</span>
                  <span>{{ lessonTypeLabel(b.lesson_type) }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Duration</span>
                  <span>{{ b.duration }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Email</span>
                  <a :href="`mailto:${b.email}`">{{ b.email }}</a>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Phone</span>
                  <a :href="`tel:${b.phone}`">{{ b.phone }}</a>
                </div>
                <div v-if="b.notes" class="detail-item full">
                  <span class="detail-label">Notes</span>
                  <span>{{ b.notes }}</span>
                </div>
                <div v-if="b.alternate_datetime" class="detail-item full">
                  <span class="detail-label">Alternate Time</span>
                  <span>{{ b.alternate_datetime }}</span>
                </div>
              </div>

              <div class="booking-actions">
                <button
                  v-if="b.status === 'pending'"
                  class="btn-confirm"
                  @click="updateBookingStatus(b.id, 'confirmed')"
                >Confirm</button>
                <button
                  v-if="b.status === 'pending'"
                  class="btn-decline"
                  @click="updateBookingStatus(b.id, 'declined')"
                >Decline</button>
                <a :href="`mailto:${b.email}?subject=Your Lesson Request&body=Hi ${b.first_name},`" class="btn-email">
                  Reply by Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { supabase } from "../lib/supabase";

// ── Auth ──────────────────────────────────────────────────────────────────────
const session = ref(null);
const loggingIn = ref(false);
const loginEmail = ref("");
const loginPassword = ref("");
const loginError = ref("");

const handleLogin = async () => {
  loggingIn.value = true;
  loginError.value = "";
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail.value,
      password: loginPassword.value,
    });
    if (error) throw error;
    session.value = data.session;
    await loadPortalData();
  } catch (err) {
    loginError.value = err.message || "Failed to sign in.";
  } finally {
    loggingIn.value = false;
  }
};

const handleLogout = async () => {
  await supabase.auth.signOut();
  session.value = null;
  coachProfile.value = null;
};

// ── Portal state ──────────────────────────────────────────────────────────────
const activeTab = ref("availability");
const coachProfile = ref(null);
const isAdmin = ref(false);
const saving = ref(false);
const saveSuccess = ref(false);
const loadingBookings = ref(false);
const bookings = ref([]);

const pendingBookings = computed(() => bookings.value.filter((b) => b.status === "pending"));

// ── Availability ──────────────────────────────────────────────────────────────
const timeOptions = [];
for (let h = 6; h <= 21; h++) {
  for (let m = 0; m < 60; m += 30) {
    const hh = h % 12 === 0 ? 12 : h % 12;
    const ampm = h < 12 ? "am" : "pm";
    const mm = m === 0 ? "00" : "30";
    timeOptions.push(`${hh}:${mm}${ampm}`);
  }
}

const weekDays = ref([
  { id: "monday", label: "Monday", enabled: false, slots: [] },
  { id: "tuesday", label: "Tuesday", enabled: false, slots: [] },
  { id: "wednesday", label: "Wednesday", enabled: false, slots: [] },
  { id: "thursday", label: "Thursday", enabled: false, slots: [] },
  { id: "friday", label: "Friday", enabled: false, slots: [] },
  { id: "saturday", label: "Saturday", enabled: false, slots: [] },
  { id: "sunday", label: "Sunday", enabled: false, slots: [] },
]);

const addSlot = (day) => {
  day.slots.push({ start: "9:00am", end: "5:00pm" });
};

const removeSlot = (day, idx) => {
  day.slots.splice(idx, 1);
};

const saveDayAvailability = async () => {
  // Debounced save — full save happens on "Save Availability" button
};

const saveAllAvailability = async () => {
  saving.value = true;
  saveSuccess.value = false;
  try {
    const coachId = coachProfile.value?.id;
    if (!coachId) throw new Error("Coach profile not found.");

    // Delete existing availability for this coach
    await supabase.from("staff_availability").delete().eq("coach_id", coachId);

    // Insert new availability
    const rows = [];
    for (const day of weekDays.value) {
      if (day.enabled && day.slots.length > 0) {
        for (const slot of day.slots) {
          rows.push({ coach_id: coachId, day_of_week: day.id, start_time: slot.start, end_time: slot.end });
        }
      }
    }

    if (rows.length > 0) {
      const { error } = await supabase.from("staff_availability").insert(rows);
      if (error) throw error;
    }

    saveSuccess.value = true;
    setTimeout(() => { saveSuccess.value = false; }, 3000);
  } catch (err) {
    console.error("Save availability error:", err);
    alert("Failed to save availability: " + err.message);
  } finally {
    saving.value = false;
  }
};

const loadAvailability = async (coachId) => {
  try {
    const { data, error } = await supabase.from("staff_availability").select("*").eq("coach_id", coachId);
    if (error) throw error;

    // Reset all days
    weekDays.value.forEach((d) => { d.enabled = false; d.slots = []; });

    // Populate from DB
    for (const row of data || []) {
      const day = weekDays.value.find((d) => d.id === row.day_of_week);
      if (day) {
        day.enabled = true;
        day.slots.push({ start: row.start_time, end: row.end_time });
      }
    }
  } catch (err) {
    console.error("Load availability error:", err);
  }
};

// ── Bookings ──────────────────────────────────────────────────────────────────
const loadBookings = async (coachId) => {
  loadingBookings.value = true;
  try {
    const { data, error } = await supabase
      .from("lesson_bookings")
      .select("*")
      .eq("coach_id", coachId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    bookings.value = data || [];
  } catch (err) {
    console.error("Load bookings error:", err);
  } finally {
    loadingBookings.value = false;
  }
};

const updateBookingStatus = async (bookingId, status) => {
  try {
    const { error } = await supabase.from("lesson_bookings").update({ status }).eq("id", bookingId);
    if (error) throw error;
    const b = bookings.value.find((x) => x.id === bookingId);
    if (b) b.status = status;
  } catch (err) {
    alert("Failed to update status: " + err.message);
  }
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const statusLabel = (s) => ({ pending: "Pending", confirmed: "Confirmed", declined: "Declined", completed: "Completed" }[s] || s);

const lessonTypeLabel = (t) => ({
  junior_private: "Junior Private",
  adult_private: "Adult Private",
  semi_private: "Semi-Private",
  evaluation: "Evaluation",
}[t] || t || "—");

const formatDate = (d) => d ? new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }) : "—";

// ── Load on mount ─────────────────────────────────────────────────────────────
const loadPortalData = async () => {
  const userId = session.value?.user?.id;
  if (!userId) return;

  try {
    // Find coach by user email
    const { data: coaches } = await supabase
      .from("coaches")
      .select("*")
      .eq("email", session.value.user.email)
      .single();

    if (coaches) {
      coachProfile.value = coaches;
      await loadAvailability(coaches.id);
      await loadBookings(coaches.id);
    }
  } catch (err) {
    console.error("Load portal data error:", err);
  }
};

onMounted(async () => {
  const { data } = await supabase.auth.getSession();
  if (data?.session) {
    session.value = data.session;
    await loadPortalData();
  }
});
</script>

<style scoped>
.staff-portal {
  min-height: 100vh;
  background: #f8fafc;
}

/* Login */
.login-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #3452a3 0%, #4a63b3 100%);
}

.login-card {
  background: #fff;
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 1.8rem;
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem;
}

.login-header p {
  color: #475569;
  margin: 0;
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 800;
  color: #334155;
}

.form-group input {
  padding: 0.75rem 0.9rem;
  border: 1.5px solid rgba(15, 23, 42, 0.14);
  border-radius: 10px;
  font-size: 0.95rem;
  color: #0f172a;
}

.form-group input:focus {
  outline: none;
  border-color: #3452a3;
  box-shadow: 0 0 0 3px rgba(52, 82, 163, 0.1);
}

.error-msg {
  padding: 0.75rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 0.85rem;
  font-weight: 700;
}

.btn-login {
  padding: 0.9rem;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 950;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-login:hover:not(:disabled) { transform: translateY(-1px); }
.btn-login:disabled { opacity: 0.6; cursor: not-allowed; }

.back-link {
  display: block;
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
  text-decoration: none;
  font-weight: 700;
}

/* Portal header */
.portal-header {
  background: #fff;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  padding: 5rem 2rem 1.5rem;
}

.portal-header__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}

.portal-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0 0 0.3rem;
}

.portal-subtitle {
  color: #475569;
  margin: 0;
  font-size: 0.95rem;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.btn-outline-sm {
  padding: 0.6rem 1.1rem;
  border: 1.5px solid #3452a3;
  border-radius: 8px;
  color: #3452a3;
  font-weight: 800;
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.15s;
}

.btn-logout {
  padding: 0.6rem 1.1rem;
  background: #fff;
  border: 1.5px solid rgba(15, 23, 42, 0.14);
  border-radius: 8px;
  color: #475569;
  font-weight: 800;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-logout:hover { border-color: #dc2626; color: #dc2626; }

/* Portal body */
.portal-body {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
}

/* Tabs */
.tab-nav {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  padding-bottom: 0;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: none;
  border: none;
  border-bottom: 2.5px solid transparent;
  font-weight: 800;
  font-size: 0.95rem;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s;
  margin-bottom: -1px;
}

.tab-btn:hover { color: #0f172a; }
.tab-btn.active { color: #3452a3; border-bottom-color: #3452a3; }

.badge {
  background: #ef4444;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 900;
  border-radius: 999px;
  padding: 0.1rem 0.45rem;
  min-width: 18px;
  text-align: center;
}

.tab-panel {
  animation: fadeIn 0.18s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

.panel-header {
  margin-bottom: 2rem;
}

.panel-header h2 {
  font-size: 1.4rem;
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0 0 0.35rem;
}

.panel-header p {
  color: #475569;
  margin: 0;
  font-size: 0.95rem;
}

/* Availability grid */
.availability-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.day-block {
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 1.25rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
}

.day-block__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.day-block__header h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 950;
  color: #0f172a;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.toggle input[type="checkbox"] {
  display: none;
}

.toggle-track {
  width: 36px;
  height: 20px;
  background: #cbd5e1;
  border-radius: 999px;
  position: relative;
  transition: background 0.15s;
  flex-shrink: 0;
}

.toggle input:checked + .toggle-track {
  background: #3452a3;
}

.toggle-track::after {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  transition: left 0.15s;
}

.toggle input:checked ~ .toggle-track::after,
.toggle input:checked + .toggle-track::after {
  left: 19px;
}

.toggle-label {
  font-size: 0.8rem;
  font-weight: 800;
  color: #64748b;
}

.time-slots {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.slot-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-select {
  flex: 1;
  padding: 0.45rem 0.5rem;
  border: 1.5px solid rgba(15, 23, 42, 0.12);
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 700;
  color: #0f172a;
  background: #fff;
}

.time-select:focus {
  outline: none;
  border-color: #3452a3;
}

.slot-dash {
  color: #94a3b8;
  font-weight: 900;
}

.slot-remove {
  width: 24px;
  height: 24px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  transition: background 0.15s;
}

.slot-remove:hover { background: #fecaca; }

.btn-add-slot {
  padding: 0.45rem 0.75rem;
  background: rgba(52, 82, 163, 0.06);
  border: 1.5px dashed rgba(52, 82, 163, 0.25);
  border-radius: 8px;
  color: #3452a3;
  font-weight: 800;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
}

.btn-add-slot:hover { background: rgba(52, 82, 163, 0.1); }

.day-off-note {
  color: #94a3b8;
  font-size: 0.85rem;
  font-style: italic;
}

.save-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-save {
  padding: 0.85rem 2rem;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-weight: 950;
  cursor: pointer;
  transition: all 0.15s;
  box-shadow: 0 8px 20px rgba(52, 82, 163, 0.25);
}

.btn-save:hover:not(:disabled) { transform: translateY(-1px); }
.btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

.save-success {
  color: #16a34a;
  font-weight: 900;
  font-size: 0.9rem;
}

/* Bookings */
.loading-state, .empty-state {
  text-align: center;
  padding: 3rem;
  color: #64748b;
}

.empty-icon { font-size: 3.5rem; margin-bottom: 1rem; }
.empty-state h3 { margin: 0 0 0.5rem; font-weight: 950; color: #0f172a; }
.empty-state p { margin: 0; }

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.booking-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
}

.booking-card.status-confirmed {
  border-left: 4px solid #22c55e;
}

.booking-card.status-declined {
  border-left: 4px solid #ef4444;
  opacity: 0.7;
}

.booking-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.booking-name {
  margin: 0 0 0.2rem;
  font-size: 1.1rem;
  font-weight: 950;
  color: #0f172a;
}

.booking-player {
  margin: 0;
  color: #475569;
  font-size: 0.85rem;
}

.status-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.badge-pending { background: #fef3c7; color: #92400e; }
.badge-confirmed { background: #dcfce7; color: #15803d; }
.badge-declined { background: #fee2e2; color: #b91c1c; }
.badge-completed { background: #e0e7ff; color: #3730a3; }

.booking-details {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.detail-item.full {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
}

.detail-item span:not(.detail-label), .detail-item a {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0f172a;
  text-decoration: none;
}

.booking-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-confirm {
  padding: 0.55rem 1.1rem;
  background: #22c55e;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 800;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-confirm:hover { background: #16a34a; }

.btn-decline {
  padding: 0.55rem 1.1rem;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 8px;
  font-weight: 800;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-decline:hover { background: #fecaca; }

.btn-email {
  padding: 0.55rem 1.1rem;
  background: #fff;
  color: #3452a3;
  border: 1.5px solid #3452a3;
  border-radius: 8px;
  font-weight: 800;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.15s;
}

.btn-email:hover { background: rgba(52, 82, 163, 0.05); }

@media (max-width: 768px) {
  .portal-header { padding: 4.5rem 1rem 1.5rem; }
  .portal-body { padding: 1.5rem 1rem 3rem; }
  .availability-grid { grid-template-columns: 1fr; }
  .booking-details { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .portal-header__inner { flex-direction: column; align-items: flex-start; }
}
</style>
