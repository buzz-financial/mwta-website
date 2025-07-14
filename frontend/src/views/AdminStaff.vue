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
              <button @click="toggleCoachStatus(coach)" class="btn btn-sm" :class="coach.active ? 'btn-warning' : 'btn-success'">
                {{ coach.active ? "🚫 Deactivate" : "✅ Activate" }}
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="coaches.length === 0" class="empty-state">
            <div class="empty-icon">👤</div>
            <h3>No coaches found</h3>
            <p>Add your first coach to get started!</p>
            <button @click="openAddForm" class="btn btn-primary">➕ Add Your First Coach</button>
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
}
</style>
