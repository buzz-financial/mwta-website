<template>
  <div class="admin-staff">
    <div class="container">
      <!-- Header -->
      <div class="admin-header">
        <div class="header-content">
          <router-link to="/admin" class="back-btn">← Back to Dashboard</router-link>
          <h1>👥 Manage Staff</h1>
          <p>Add, edit, and manage your coaching staff</p>
        </div>
        <button @click="openAddForm" class="btn btn-primary">➕ Add New Coach</button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading coaches...</p>
      </div>

      <!-- Coaches List -->
      <div v-else class="coaches-container">
        <div class="sort-instructions">
          <p>💡 <strong>Tip:</strong> Drag coaches to reorder them. The order here will be reflected on the public staff page.</p>
        </div>

        <div class="coaches-grid" @dragover.prevent @drop="handleDrop">
          <div v-for="(coach, index) in coaches" :key="coach.id" class="coach-card" draggable="true" @dragstart="handleDragStart(coach, index)" @dragend="handleDragEnd" @dragover.prevent :class="{ dragging: draggedCoach?.id === coach.id }">
            <div class="drag-handle">⋮⋮</div>

            <div class="coach-image">
              <img v-if="getImageUrl(coach.image, coach.image_url)" :src="getImageUrl(coach.image, coach.image_url)" :alt="coach.name" />
              <div v-else class="image-placeholder">
                {{ coach.name ? coach.name.charAt(0) : "?" }}
              </div>
              <div class="status-badge" :class="{ active: coach.active, inactive: !coach.active }">
                {{ coach.active ? "Active" : "Inactive" }}
              </div>
            </div>

            <div class="coach-content">
              <h3>{{ coach.name || "Unnamed Coach" }}</h3>
              <p class="coach-title">{{ coach.title || "No title" }}</p>
              <p class="coach-contact">{{ coach.email || "No email" }}</p>
              <p class="coach-contact">{{ coach.phone || "No phone" }}</p>

              <div class="coach-meta">
                <span class="experience">{{ coach.years_experience || 0 }} years experience</span>
                <div class="specialties">
                  <span v-for="specialty in coach.key_specialties || []" :key="specialty" class="specialty-tag">
                    {{ specialty }}
                  </span>
                </div>
              </div>
            </div>

            <div class="coach-actions">
              <button @click="editCoach(coach)" class="btn btn-outline btn-sm">✏️ Edit</button>
              <button @click="openAvailability(coach)" class="btn btn-info btn-sm">📅 Availability</button>
              <button @click="toggleCoachStatus(coach)" class="btn btn-sm" :class="coach.active ? 'btn-warning' : 'btn-success'">
                {{ coach.active ? "🚫 Deactivate" : "✅ Activate" }}
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="coaches.length === 0" class="empty-state">
            <div class="empty-icon">👤</div>
            <h3>No coaches found</h3>
            <p>Seed the database with the default coaches, or add one manually.</p>
            <div style="display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap;margin-top:0.5rem;">
              <button @click="seedDefaultCoaches" :disabled="seedingCoaches" class="btn btn-success">
                {{ seedingCoaches ? 'Seeding…' : '🌱 Seed Default Coaches' }}
              </button>
              <button @click="openAddForm" class="btn btn-primary">➕ Add Manually</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Availability Modal -->
      <div v-if="showAvailability" class="modal-overlay" @click="closeAvailability">
        <div class="modal-content modal-availability" @click.stop>
          <div class="modal-header">
            <h2>📅 {{ availabilityCoach?.name }}'s Availability</h2>
            <button @click="closeAvailability" class="close-btn">×</button>
          </div>
          <div class="availability-body">
            <p class="avail-note">Set the days and times this coach is available for private lesson bookings.</p>

            <div class="availability-grid">
              <div v-for="day in availWeekDays" :key="day.id" class="day-block">
                <div class="day-block__header">
                  <h3>{{ day.label }}</h3>
                  <label class="avail-toggle">
                    <input type="checkbox" v-model="day.enabled" />
                    <span class="toggle-track"></span>
                    <span class="toggle-label">{{ day.enabled ? "Available" : "Off" }}</span>
                  </label>
                </div>

                <div v-if="day.enabled" class="time-slots">
                  <div v-for="(slot, idx) in day.slots" :key="idx" class="slot-row">
                    <select v-model="slot.start" class="time-select">
                      <option v-for="t in availTimeOptions" :key="t" :value="t">{{ t }}</option>
                    </select>
                    <span class="slot-dash">–</span>
                    <select v-model="slot.end" class="time-select">
                      <option v-for="t in availTimeOptions" :key="t" :value="t">{{ t }}</option>
                    </select>
                    <button class="slot-remove" @click="availRemoveSlot(day, idx)" title="Remove">×</button>
                  </div>
                  <button class="btn-add-slot" @click="availAddSlot(day)">+ Add time slot</button>
                </div>
                <div v-else class="day-off-note">Not available</div>
              </div>
            </div>

            <div class="avail-footer">
              <button class="btn btn-primary" @click="saveAvailability" :disabled="availSaving">
                {{ availSaving ? "Saving…" : "Save Availability" }}
              </button>
              <span v-if="availSaveSuccess" class="save-success">✓ Saved!</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ editingCoach ? "Edit Coach" : "Add New Coach" }}</h2>
            <button @click="closeModal" class="close-btn">×</button>
          </div>

          <form @submit.prevent="saveCoach" class="coach-form">
            <div class="form-group">
              <label>Name *</label>
              <input v-model="formData.name" type="text" required placeholder="Enter coach name" />
            </div>

            <div class="form-group">
              <label>Title *</label>
              <input v-model="formData.title" type="text" required placeholder="e.g., Head Pro, Assistant Coach" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Email</label>
                <input v-model="formData.email" type="email" placeholder="coach@mwtennis.com" />
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input v-model="formData.phone" type="tel" placeholder="(801) 555-0123" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Years Experience</label>
                <input v-model.number="formData.years_experience" type="number" min="0" placeholder="0" />
              </div>
              <div class="form-group">
                <label>Image Filename</label>
                <input v-model="formData.image" type="text" placeholder="e.g., coach-photo.png" />
                <small>Use existing filenames like 'mikeportrait.png' or 'beccaportrait.png'</small>
              </div>
            </div>

            <div class="form-group">
              <label>Main Certification</label>
              <input v-model="formData.main_certification" type="text" placeholder="e.g., USPTA Certified Professional" />
            </div>

            <div class="form-group">
              <label>Key Specialties</label>
              <textarea v-model="specialtiesText" rows="3" placeholder="Enter specialties separated by commas&#10;e.g., Junior Development, Match Strategy, Beginner Instruction"></textarea>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.active" type="checkbox" />
                <span class="checkmark"></span>
                Active Coach
              </label>
            </div>

            <div class="form-actions">
              <button type="button" @click="closeModal" class="btn btn-outline">Cancel</button>
              <button type="submit" :disabled="saving" class="btn btn-primary">
                {{ saving ? "Saving..." : editingCoach ? "Update Coach" : "Add Coach" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "../lib/supabase";
import mikePortrait from "../assets/mikeportrait.png";
import beccaPortrait from "../assets/beccaportrait.png";

// Data
const coaches = ref([]);
const loading = ref(true);
const showModal = ref(false);
const editingCoach = ref(null);
const saving = ref(false);
const draggedCoach = ref(null);
const draggedIndex = ref(null);

// Form data
const formData = ref({
  name: "",
  title: "",
  email: "",
  phone: "",
  image: "",
  years_experience: 0,
  main_certification: "",
  key_specialties: [],
  active: true,
});

// Image mapping for existing assets
const imageMap = {
  "mikeportrait.png": mikePortrait,
  "beccaportrait.png": beccaPortrait,
};

// Computed
const specialtiesText = computed({
  get: () => formData.value.key_specialties.join(", "),
  set: (value) => {
    formData.value.key_specialties = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
  },
});

// Helper function to get image URL (matches your Staff.vue)
const getImageUrl = (imageName, imageUrl) => {
  if (imageUrl) {
    return imageUrl; // Base64 or URL
  }
  if (imageName && imageMap[imageName]) {
    return imageMap[imageName];
  }
  return null;
};

// Methods
const fetchCoaches = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.from("coaches").select("*").order("sort_order").order("name"); // Secondary sort by name

    if (error) throw error;
    coaches.value = data || [];
  } catch (error) {
    console.error("Error fetching coaches:", error);
    // You could add a toast notification here
  } finally {
    loading.value = false;
  }
};

const openAddForm = () => {
  editingCoach.value = null;
  resetForm();
  showModal.value = true;
};

const editCoach = (coach) => {
  editingCoach.value = coach;
  formData.value = { ...coach };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingCoach.value = null;
  resetForm();
};

const resetForm = () => {
  formData.value = {
    name: "",
    title: "",
    email: "",
    phone: "",
    image: "",
    years_experience: 0,
    main_certification: "",
    key_specialties: [],
    active: true,
  };
};

const saveCoach = async () => {
  try {
    saving.value = true;

    if (editingCoach.value) {
      // Update existing coach
      const { error } = await supabase.from("coaches").update(formData.value).eq("id", editingCoach.value.id);

      if (error) throw error;

      // Update local data
      const index = coaches.value.findIndex((c) => c.id === editingCoach.value.id);
      if (index !== -1) {
        coaches.value[index] = { ...editingCoach.value, ...formData.value };
      }
    } else {
      // Add new coach - set sort_order to be last
      const maxSortOrder = Math.max(...coaches.value.map((c) => c.sort_order || 0), 0);
      const coachData = { ...formData.value, sort_order: maxSortOrder + 1 };

      const { data, error } = await supabase.from("coaches").insert([coachData]).select();

      if (error) throw error;

      // Add to local data
      if (data && data[0]) {
        coaches.value.push(data[0]);
      }
    }

    closeModal();
    // You could add a success toast here
  } catch (error) {
    console.error("Error saving coach:", error);
    alert(`Failed to save coach: ${error.message}`);
  } finally {
    saving.value = false;
  }
};

// Drag and Drop Methods
const handleDragStart = (coach, index) => {
  draggedCoach.value = coach;
  draggedIndex.value = index;
};

const handleDragEnd = () => {
  draggedCoach.value = null;
  draggedIndex.value = null;
};

const handleDrop = (event) => {
  event.preventDefault();

  if (!draggedCoach.value) return;

  // Find the drop target
  const dropTarget = event.target.closest(".coach-card");
  if (!dropTarget) return;

  // Get the coach ID from the drop target
  const targetCoachId = dropTarget.querySelector("h3")?.textContent;
  const targetIndex = coaches.value.findIndex((c) => c.name === targetCoachId);

  if (targetIndex === -1 || targetIndex === draggedIndex.value) return;

  // Reorder the coaches array
  const newCoaches = [...coaches.value];
  const [draggedItem] = newCoaches.splice(draggedIndex.value, 1);
  newCoaches.splice(targetIndex, 0, draggedItem);

  // Update local state immediately for better UX
  coaches.value = newCoaches;

  // Update sort_order in database
  updateSortOrder(newCoaches);
};

const updateSortOrder = async (reorderedCoaches) => {
  try {
    // Update each coach's sort_order
    const updates = reorderedCoaches.map((coach, index) => ({
      id: coach.id,
      sort_order: index + 1,
    }));

    // Batch update the database
    for (const update of updates) {
      await supabase.from("coaches").update({ sort_order: update.sort_order }).eq("id", update.id);
    }

    console.log("Sort order updated successfully");
  } catch (error) {
    console.error("Error updating sort order:", error);
    // Revert local changes if database update fails
    fetchCoaches();
  }
};

const toggleCoachStatus = async (coach) => {
  try {
    const newStatus = !coach.active;
    const { error } = await supabase.from("coaches").update({ active: newStatus }).eq("id", coach.id);

    if (error) throw error;

    coach.active = newStatus;
    // You could add a success toast here
  } catch (error) {
    console.error("Error updating coach status:", error);
    alert("Failed to update coach status.");
  }
};

// ── Seed default coaches ──────────────────────────────────────────────────────
const seedingCoaches = ref(false);

const defaultCoachesData = [
  {
    name: "Mike White",
    title: "Head Pro & Owner",
    image: "mikeportrait.png",
    years_experience: 10,
    main_certification: "USPTA Certified Professional",
    key_specialties: ["Junior Development", "Competitive Training", "Match Strategy"],
    active: true,
    sort_order: 1,
  },
  {
    name: "Becca Little",
    title: "Assistant Coach",
    image: "beccaportrait.png",
    years_experience: 5,
    main_certification: "USPTA Certified",
    key_specialties: ["Beginner Instruction", "Youth Programs", "Group Clinics"],
    active: true,
    sort_order: 2,
  },
];

const seedDefaultCoaches = async () => {
  seedingCoaches.value = true;
  try {
    const { data, error } = await supabase.from("coaches").insert(defaultCoachesData).select();
    if (error) throw error;
    coaches.value = data || [];
  } catch (err) {
    alert("Seed failed: " + err.message);
  } finally {
    seedingCoaches.value = false;
  }
};

// ── Availability ──────────────────────────────────────────────────────────────
const showAvailability = ref(false);
const availabilityCoach = ref(null);
const availSaving = ref(false);
const availSaveSuccess = ref(false);

const availTimeOptions = (() => {
  const opts = [];
  for (let h = 6; h <= 21; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hh = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? "am" : "pm";
      const mm = m === 0 ? "00" : "30";
      opts.push(`${hh}:${mm}${ampm}`);
    }
  }
  return opts;
})();

const availWeekDays = ref([
  { id: "monday", label: "Monday", enabled: false, slots: [] },
  { id: "tuesday", label: "Tuesday", enabled: false, slots: [] },
  { id: "wednesday", label: "Wednesday", enabled: false, slots: [] },
  { id: "thursday", label: "Thursday", enabled: false, slots: [] },
  { id: "friday", label: "Friday", enabled: false, slots: [] },
  { id: "saturday", label: "Saturday", enabled: false, slots: [] },
  { id: "sunday", label: "Sunday", enabled: false, slots: [] },
]);

const openAvailability = async (coach) => {
  availabilityCoach.value = coach;
  availSaveSuccess.value = false;
  // Reset days
  availWeekDays.value.forEach((d) => { d.enabled = false; d.slots = []; });
  // Load existing availability from DB
  try {
    const { data, error } = await supabase.from("staff_availability").select("*").eq("coach_id", coach.id);
    if (!error && data) {
      for (const row of data) {
        const day = availWeekDays.value.find((d) => d.id === row.day_of_week);
        if (day) {
          day.enabled = true;
          day.slots.push({ start: row.start_time, end: row.end_time });
        }
      }
    }
  } catch {
    // show empty schedule
  }
  showAvailability.value = true;
};

const closeAvailability = () => {
  showAvailability.value = false;
  availabilityCoach.value = null;
};

const availAddSlot = (day) => {
  day.slots.push({ start: "9:00am", end: "5:00pm" });
};

const availRemoveSlot = (day, idx) => {
  day.slots.splice(idx, 1);
};

const saveAvailability = async () => {
  availSaving.value = true;
  availSaveSuccess.value = false;
  try {
    const coachId = availabilityCoach.value?.id;
    if (!coachId) throw new Error("No coach selected.");

    await supabase.from("staff_availability").delete().eq("coach_id", coachId);

    const rows = [];
    for (const day of availWeekDays.value) {
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

    availSaveSuccess.value = true;
    setTimeout(() => { availSaveSuccess.value = false; }, 3000);
  } catch (err) {
    alert("Failed to save availability: " + err.message);
  } finally {
    availSaving.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchCoaches();
});
</script>

<style scoped>
.admin-staff {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 6rem 0 2rem 0; /* Added top padding for navbar */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.header-content p {
  color: #6c757d;
  font-size: 1.1rem;
}

.back-btn {
  color: #3452a3;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
}

.back-btn:hover {
  text-decoration: underline;
}

.coaches-container {
  margin-top: 1rem;
}

.sort-instructions {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border: 1px solid #90caf9;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: center;
}

.sort-instructions p {
  margin: 0;
  color: #1565c0;
}

.coaches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.coach-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: move;
  position: relative;
  border: 2px solid transparent;
}

.coach-card:hover {
  transform: translateY(-5px);
  border-color: #3452a3;
}

.coach-card.dragging {
  opacity: 0.5;
  transform: rotate(5deg);
  z-index: 1000;
}

.drag-handle {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  color: #6c757d;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: grab;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.drag-handle:hover {
  background: rgba(52, 82, 163, 0.1);
  color: #3452a3;
}

.coach-card:active .drag-handle {
  cursor: grabbing;
}

.coach-image {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
}

.coach-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 2rem;
}

.status-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
}

.status-badge.inactive {
  background: #f8d7da;
  color: #721c24;
}

.coach-content {
  text-align: center;
  margin-bottom: 1.5rem;
}

.coach-content h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-weight: 700;
  font-size: 1.3rem;
}

.coach-title {
  color: #3452a3;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.coach-contact {
  color: #6c757d;
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
}

.coach-meta {
  margin-top: 1rem;
}

.experience {
  display: block;
  color: #495057;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.specialty-tag {
  background: linear-gradient(135deg, #e9ecef, #f8f9fa);
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 500;
}

.coach-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
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

.btn-success {
  background: #28a745;
  color: white;
}

.btn-warning {
  background: #ffc107;
  color: #212529;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
  grid-column: 1 / -1;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3452a3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
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
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.coach-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3452a3;
  box-shadow: 0 0 0 2px rgba(52, 82, 163, 0.25);
}

.form-group small {
  color: #6c757d;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}

.checkbox-label {
  display: flex !important;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.btn-info {
  background: #17a2b8;
  color: white;
}

/* Availability Modal */
.modal-availability {
  max-width: 780px;
}

.availability-body {
  padding: 1.5rem;
}

.avail-note {
  color: #6c757d;
  margin: 0 0 1.5rem;
  font-size: 0.95rem;
}

.availability-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.day-block {
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  padding: 1rem;
}

.day-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.day-block__header h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #2c3e50;
}

.avail-toggle {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
}

.avail-toggle input[type="checkbox"] {
  display: none;
}

.toggle-track {
  width: 36px;
  height: 20px;
  background: #cbd5e1;
  border-radius: 999px;
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}

.toggle-track::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.avail-toggle input:checked + .toggle-track {
  background: #22c55e;
}

.avail-toggle input:checked + .toggle-track::after {
  transform: translateX(16px);
}

.toggle-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6c757d;
}

.time-slots {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.slot-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.time-select {
  flex: 1;
  padding: 0.35rem 0.4rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #2c3e50;
  min-width: 0;
}

.slot-dash {
  color: #6c757d;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.slot-remove {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  padding: 0 0.2rem;
  flex-shrink: 0;
}

.btn-add-slot {
  background: none;
  border: 1px dashed #3452a3;
  color: #3452a3;
  border-radius: 6px;
  padding: 0.35rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-add-slot:hover {
  background: rgba(52, 82, 163, 0.06);
}

.day-off-note {
  font-size: 0.8rem;
  color: #adb5bd;
  font-style: italic;
}

.avail-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.save-success {
  color: #28a745;
  font-weight: 700;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    align-items: stretch;
  }

  .coaches-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .availability-grid {
    grid-template-columns: 1fr 1fr;
  }

  .coach-actions {
    flex-wrap: wrap;
  }
}
</style>
