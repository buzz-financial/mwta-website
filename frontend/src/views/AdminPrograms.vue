<template>
  <div class="admin-programs">
    <div class="container">
      <!-- Header -->
      <div class="admin-header">
        <div class="header-content">
          <router-link to="/admin" class="back-btn">← Back to Dashboard</router-link>
          <h1>🏆 Manage Programs</h1>
          <p>Enable/disable programs and update their schedules</p>
        </div>
        <button @click="openAddForm(null)" class="btn btn-primary">➕ Add Program</button>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading programs...</p>
      </div>

      <template v-else>
        <!-- Junior Programs -->
        <section class="program-section">
          <div class="section-header">
            <h2>Junior Programs</h2>
            <span class="count-badge">{{ juniorPrograms.length }} programs</span>
          </div>
          <div v-if="juniorPrograms.length === 0" class="empty-state">No junior programs yet.</div>
          <div class="programs-list">
            <div v-for="p in juniorPrograms" :key="p.id" class="program-row" :class="{ disabled: !p.active }">
              <div class="program-row__status">
                <label class="toggle">
                  <input type="checkbox" :checked="p.active" @change="toggleActive(p)" />
                  <span class="toggle-track"></span>
                </label>
                <span class="status-text" :class="p.active ? 'active' : 'inactive'">
                  {{ p.active ? 'Active' : 'Disabled' }}
                </span>
              </div>
              <div class="program-row__info">
                <h3>{{ p.name }}</h3>
                <p class="program-desc">{{ p.description }}</p>
              </div>
              <div class="program-row__time">
                <span class="time-label">Schedule</span>
                <span class="time-value">{{ p.time }}</span>
              </div>
              <div class="program-row__actions">
                <button class="btn btn-outline btn-sm" @click="openEditForm(p)">✏️ Edit</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Adult Programs -->
        <section class="program-section">
          <div class="section-header">
            <h2>Adult Programs</h2>
            <span class="count-badge">{{ adultPrograms.length }} programs</span>
          </div>
          <div v-if="adultPrograms.length === 0" class="empty-state">No adult programs yet.</div>
          <div class="programs-list">
            <div v-for="p in adultPrograms" :key="p.id" class="program-row" :class="{ disabled: !p.active }">
              <div class="program-row__status">
                <label class="toggle">
                  <input type="checkbox" :checked="p.active" @change="toggleActive(p)" />
                  <span class="toggle-track"></span>
                </label>
                <span class="status-text" :class="p.active ? 'active' : 'inactive'">
                  {{ p.active ? 'Active' : 'Disabled' }}
                </span>
              </div>
              <div class="program-row__info">
                <h3>{{ p.name }}</h3>
                <p class="program-desc">{{ p.description }}</p>
              </div>
              <div class="program-row__time">
                <span class="time-label">Schedule</span>
                <span class="time-value">{{ p.time }}</span>
              </div>
              <div class="program-row__actions">
                <button class="btn btn-outline btn-sm" @click="openEditForm(p)">✏️ Edit</button>
              </div>
            </div>
          </div>
        </section>
      </template>

      <!-- Seed notice -->
      <div v-if="needsSetup" class="setup-notice">
        <div class="setup-notice__text">
          <strong>No programs found.</strong> Click the button to populate the database with the default junior &amp; adult programs.
          Make sure you've run <code>supabase/seed.sql</code> first to create the <code>programs</code> table.
        </div>
        <button class="btn btn-primary" @click="seedDefaults" :disabled="seeding">
          {{ seeding ? 'Seeding…' : '🌱 Seed Default Programs' }}
        </button>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editingProgram ? 'Edit Program' : 'Add Program' }}</h2>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        <form @submit.prevent="saveProgram" class="program-form">
          <div class="form-row">
            <div class="form-group">
              <label>Program Type *</label>
              <select v-model="formData.type" required>
                <option value="">Select type</option>
                <option value="junior">Junior</option>
                <option value="adult">Adult</option>
              </select>
            </div>
            <div class="form-group">
              <label>Program ID</label>
              <input v-model="formData.program_id" type="text" placeholder="e.g. peewees, champions" />
              <small>Used for registration links (lowercase, no spaces)</small>
            </div>
          </div>

          <div class="form-group">
            <label>Name *</label>
            <input v-model="formData.name" type="text" required placeholder="e.g. Pee-Wees, Champions" />
          </div>

          <div class="form-group">
            <label>Schedule / Time *</label>
            <input v-model="formData.time" type="text" required placeholder="e.g. Mon–Thurs 4:30–6:00pm" />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea v-model="formData.description" rows="3" placeholder="Brief description of this program..."></textarea>
          </div>

          <div class="form-group">
            <label>Sort Order</label>
            <input v-model.number="formData.sort_order" type="number" min="0" placeholder="0" />
            <small>Lower numbers appear first</small>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="formData.active" type="checkbox" />
              <span>Active (visible on public pages)</span>
            </label>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-outline">Cancel</button>
            <button v-if="editingProgram" type="button" @click="deleteProgram" class="btn btn-danger">Delete</button>
            <button type="submit" :disabled="saving" class="btn btn-primary">
              {{ saving ? 'Saving...' : editingProgram ? 'Update' : 'Add Program' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { supabase } from "../lib/supabase";

const programs = ref([]);
const loading = ref(true);
const needsSetup = ref(false);
const showModal = ref(false);
const editingProgram = ref(null);
const saving = ref(false);
const seeding = ref(false);

const defaultProgramsData = [
  { type: "junior", program_id: "peewees",    name: "Pee-Wees",     time: "Mon & Wed 4:30–5:30pm",  description: "Perfect for beginners ages 5–10. We focus on fun fundamentals, coordination, and learning how to rally with confidence. Emphasis on core fundamentals.",                                                                                                              active: true, sort_order: 1 },
  { type: "junior", program_id: "champions",  name: "Champions",    time: "Mon–Thurs 4:30–6:00pm",  description: "Designed for the younger beginner up to Age 12. For developing players ready to train consistently. Emphasis on technique, movement, and match-style drills.",                                                                                                       active: true, sort_order: 2 },
  { type: "junior", program_id: "elite",      name: "Elite",        time: "Mon–Thurs 5:00–7:00pm",  description: "Highschool aged or near highschool aged players looking to make varsity or play varsity. High-intensity training for competitive juniors, focusing on strategy, fitness, and match play.",                                                                            active: true, sort_order: 3 },
  { type: "junior", program_id: "collegeprep",name: "College Prep", time: "Mon–Fri 3:00–5:00pm",    description: "Players must get permission to register for this class. All participants must be actively participating in tournaments. Includes strategy, video-style feedback, fitness, and structured match play.",                                                                active: true, sort_order: 4 },
  { type: "adult",  program_id: "feb9",       name: "Feb 9th - 11th",  time: "10:30am–12:30pm",     description: "Start the year strong with a fun, high-rep clinic focused on groundstrokes, volleys, and serves. Perfect for beginners and intermediate players who want to build consistency and confidence.",                                                                       active: true, sort_order: 1 },
  { type: "adult",  program_id: "feb16",      name: "Feb 16th - 20th", time: "10:30am–12:30pm",     description: "Take the next step with more live-ball drills, movement, and point play. Great for players who want to improve strategy for singles/doubles and get match-ready in a supportive group.",                                                                             active: true, sort_order: 2 },
];

const formData = ref({
  type: "",
  program_id: "",
  name: "",
  time: "",
  description: "",
  sort_order: 0,
  active: true,
});

const juniorPrograms = computed(() =>
  programs.value.filter((p) => p.type === "junior").sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
);
const adultPrograms = computed(() =>
  programs.value.filter((p) => p.type === "adult").sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
);

const seedDefaults = async () => {
  seeding.value = true;
  try {
    const { data, error } = await supabase.from("programs").insert(defaultProgramsData).select();
    if (error) throw error;
    programs.value = data || [];
    needsSetup.value = false;
  } catch (err) {
    alert("Seed failed: " + err.message + "\n\nMake sure you've created the programs table by running supabase/seed.sql in the Supabase SQL editor first.");
  } finally {
    seeding.value = false;
  }
};

const fetchPrograms = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase.from("programs").select("*").order("sort_order");
    if (error) throw error;
    programs.value = data || [];
    if (programs.value.length === 0) needsSetup.value = true;
  } catch {
    needsSetup.value = true;
    programs.value = [];
  } finally {
    loading.value = false;
  }
};

const toggleActive = async (program) => {
  const newVal = !program.active;
  try {
    const { error } = await supabase.from("programs").update({ active: newVal }).eq("id", program.id);
    if (error) throw error;
    program.active = newVal;
  } catch (err) {
    alert("Failed to update: " + err.message);
  }
};

const openAddForm = (type) => {
  editingProgram.value = null;
  formData.value = { type: type || "", program_id: "", name: "", time: "", description: "", sort_order: programs.value.length, active: true };
  showModal.value = true;
};

const openEditForm = (program) => {
  editingProgram.value = program;
  formData.value = { ...program };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingProgram.value = null;
};

const saveProgram = async () => {
  saving.value = true;
  try {
    if (editingProgram.value) {
      const { error } = await supabase.from("programs").update(formData.value).eq("id", editingProgram.value.id);
      if (error) throw error;
      const idx = programs.value.findIndex((p) => p.id === editingProgram.value.id);
      if (idx !== -1) programs.value[idx] = { ...editingProgram.value, ...formData.value };
    } else {
      const { data, error } = await supabase.from("programs").insert([formData.value]).select();
      if (error) throw error;
      if (data?.[0]) programs.value.push(data[0]);
      needsSetup.value = false;
    }
    closeModal();
  } catch (err) {
    alert("Failed to save: " + err.message);
  } finally {
    saving.value = false;
  }
};

const deleteProgram = async () => {
  if (!confirm(`Delete "${editingProgram.value.name}"? This cannot be undone.`)) return;
  try {
    const { error } = await supabase.from("programs").delete().eq("id", editingProgram.value.id);
    if (error) throw error;
    programs.value = programs.value.filter((p) => p.id !== editingProgram.value.id);
    closeModal();
  } catch (err) {
    alert("Failed to delete: " + err.message);
  }
};

onMounted(fetchPrograms);
</script>

<style scoped>
.admin-programs {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 6rem 0 3rem;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.header-content p {
  color: #6c757d;
}

.back-btn {
  color: #3452a3;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: inline-block;
}

.back-btn:hover {
  text-decoration: underline;
}

.program-section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e9ecef;
}

.section-header h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
  color: #2c3e50;
}

.count-badge {
  background: #3452a3;
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.programs-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.program-row {
  display: grid;
  grid-template-columns: 140px 1fr auto auto;
  align-items: center;
  gap: 1.5rem;
  background: white;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(15, 23, 42, 0.08);
  transition: opacity 0.2s;
}

.program-row.disabled {
  opacity: 0.55;
}

.program-row__status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.status-text {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.status-text.active { color: #16a34a; }
.status-text.inactive { color: #dc2626; }

.program-row__info h3 {
  margin: 0 0 0.25rem;
  font-weight: 800;
  color: #0f172a;
}

.program-desc {
  margin: 0;
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.program-row__time {
  text-align: right;
  min-width: 180px;
}

.time-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  margin-bottom: 0.2rem;
}

.time-value {
  font-weight: 800;
  color: #3452a3;
  font-size: 0.9rem;
}

/* Toggle */
.toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
}

.toggle input[type="checkbox"] {
  display: none;
}

.toggle-track {
  width: 42px;
  height: 24px;
  background: #cbd5e1;
  border-radius: 999px;
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}

.toggle-track::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.toggle input:checked + .toggle-track {
  background: #22c55e;
}

.toggle input:checked + .toggle-track::after {
  transform: translateX(18px);
}

/* Buttons */
.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
}

.btn-primary {
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: white;
}

.btn-outline {
  background: transparent;
  color: #3452a3;
  border: 1px solid #3452a3;
}

.btn-danger {
  background: #dc2626;
  color: white;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(0,0,0,0.15);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 14px;
  width: 90%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #6c757d;
  line-height: 1;
}

.program-form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-weight: 700;
  font-size: 0.875rem;
  color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.7rem 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #0f172a;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3452a3;
  box-shadow: 0 0 0 2px rgba(52, 82, 163, 0.15);
}

.form-group small {
  font-size: 0.78rem;
  color: #6b7280;
}

.checkbox-label {
  display: flex !important;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex-direction: row !important;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  padding: 0;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding-top: 0.75rem;
  border-top: 1px solid #e9ecef;
  margin-top: 0.5rem;
}

/* Setup notice */
.setup-notice {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 12px;
  padding: 1.5rem;
  color: #78350f;
  font-size: 0.9rem;
  line-height: 1.7;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.setup-notice__text {
  flex: 1;
}

.setup-notice code {
  background: rgba(0,0,0,0.06);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-family: monospace;
}

/* Loading / empty */
.loading-state,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3452a3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .program-row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .program-row__status {
    flex-direction: row;
    justify-content: flex-start;
  }

  .program-row__time {
    text-align: left;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .admin-header {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
