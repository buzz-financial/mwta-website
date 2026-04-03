<template>
  <div class="admin-regs">
    <div class="page-header">
      <div class="page-header__inner">
        <RouterLink to="/admin" class="back-link">← Admin Dashboard</RouterLink>
        <div class="header-row">
          <div>
            <h1 class="page-title">Registrations</h1>
            <p class="page-subtitle">Manage all program enrollments and subscriptions.</p>
          </div>
          <div class="header-stats">
            <div class="stat-pill">
              <span class="stat-num">{{ stats.total }}</span>
              <span class="stat-label">Total</span>
            </div>
            <div class="stat-pill active-pill">
              <span class="stat-num">{{ stats.active }}</span>
              <span class="stat-label">Active</span>
            </div>
            <div class="stat-pill revenue-pill">
              <span class="stat-num">${{ stats.monthlyRevenue.toFixed(0) }}</span>
              <span class="stat-label">Monthly MRR</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="body">
      <!-- Filters -->
      <div class="filters-bar">
        <div class="search-wrap">
          <input v-model="search" type="search" placeholder="Search by name, email, or program…" class="search-input" />
        </div>
        <div class="filter-group">
          <select v-model="filterType" class="filter-select">
            <option value="">All Types</option>
            <option value="junior">Junior</option>
            <option value="adult">Adult</option>
          </select>
          <select v-model="filterProgram" class="filter-select">
            <option value="">All Programs</option>
            <option value="peewees">Pee-Wees</option>
            <option value="champions">Champions</option>
            <option value="elite">Elite</option>
            <option value="collegeprep">College Prep</option>
          </select>
          <select v-model="filterStatus" class="filter-select">
            <option value="">All Statuses</option>
            <option value="pending_payment">Pending Payment</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
            <option value="on_hold">On Hold</option>
          </select>
        </div>
      </div>

      <!-- Loading / empty -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading registrations…</p>
      </div>

      <div v-else-if="filteredRegistrations.length === 0" class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>No registrations found</h3>
        <p>{{ search || filterType || filterProgram || filterStatus ? "Try adjusting your filters." : "Registrations will appear here once students sign up." }}</p>
      </div>

      <!-- Table -->
      <div v-else class="table-wrap">
        <table class="reg-table">
          <thead>
            <tr>
              <th>Student / Account</th>
              <th>Program</th>
              <th>Days</th>
              <th>Monthly</th>
              <th>First Payment</th>
              <th>Status</th>
              <th>Registered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reg in filteredRegistrations" :key="reg.id" class="reg-row" @click="openDetail(reg)">
              <td>
                <div class="student-cell">
                  <span class="student-name">{{ reg.participant_name || reg.first_name + " " + reg.last_name }}</span>
                  <span class="account-name" v-if="reg.participant_name">{{ reg.first_name }} {{ reg.last_name }}</span>
                  <a :href="`mailto:${reg.email}`" class="student-email" @click.stop>{{ reg.email }}</a>
                </div>
              </td>
              <td>
                <div class="program-cell">
                  <span class="program-name">{{ reg.program_display_name || reg.program_name }}</span>
                  <span class="type-badge" :class="`type-${reg.program_type}`">{{ reg.program_type }}</span>
                </div>
              </td>
              <td>
                <div class="days-cell">
                  <span v-for="d in reg.days_selected || []" :key="d" class="day-chip">{{ d.slice(0, 3) }}</span>
                </div>
              </td>
              <td class="price-cell">${{ reg.monthly_price?.toFixed(2) }}</td>
              <td class="price-cell">${{ reg.prorated_first_payment?.toFixed(2) }}</td>
              <td>
                <select
                  class="status-select"
                  :value="reg.status"
                  @change="updateStatus(reg, $event.target.value)"
                  @click.stop
                >
                  <option value="pending_payment">Pending Payment</option>
                  <option value="active">Active</option>
                  <option value="on_hold">On Hold</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td class="date-cell">{{ formatDate(reg.created_at) }}</td>
              <td @click.stop>
                <div class="action-btns">
                  <button class="btn-icon" title="View details" @click="openDetail(reg)">👁</button>
                  <a :href="`mailto:${reg.email}`" class="btn-icon" title="Email">✉️</a>
                  <button class="btn-icon btn-danger" title="Delete" @click="confirmDelete(reg)">🗑</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Detail modal -->
      <div v-if="detailReg" class="modal-overlay" @click="detailReg = null">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>Registration Detail</h2>
            <button class="close-btn" @click="detailReg = null">×</button>
          </div>
          <div class="modal-body">
            <div class="detail-section">
              <h3>Program</h3>
              <div class="detail-grid">
                <div class="detail-item"><span>Type</span><strong>{{ detailReg.program_type }}</strong></div>
                <div class="detail-item"><span>Program</span><strong>{{ detailReg.program_display_name || detailReg.program_name }}</strong></div>
                <div class="detail-item"><span>Days</span><strong>{{ (detailReg.days_selected || []).join(", ") }}</strong></div>
                <div class="detail-item"><span>Monthly Rate</span><strong>${{ detailReg.monthly_price?.toFixed(2) }}/mo</strong></div>
                <div class="detail-item"><span>First Payment</span><strong>${{ detailReg.prorated_first_payment?.toFixed(2) }}</strong></div>
                <div class="detail-item"><span>Status</span>
                  <select class="status-select" :value="detailReg.status" @change="updateStatus(detailReg, $event.target.value)">
                    <option value="pending_payment">Pending Payment</option>
                    <option value="active">Active</option>
                    <option value="on_hold">On Hold</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h3>Participant</h3>
              <div class="detail-grid">
                <div class="detail-item"><span>Player Name</span><strong>{{ detailReg.participant_name }}</strong></div>
                <div class="detail-item"><span>Responsible Party</span><strong>{{ detailReg.responsible_party }}</strong></div>
                <div class="detail-item"><span>Email</span><a :href="`mailto:${detailReg.email}`">{{ detailReg.email }}</a></div>
                <div class="detail-item"><span>Phone</span><a :href="`tel:${detailReg.phone}`">{{ detailReg.phone }}</a></div>
              </div>
            </div>

            <div class="detail-section">
              <h3>Address</h3>
              <p class="address-block">
                {{ detailReg.address }}<br />
                {{ detailReg.city }}, {{ detailReg.state }} {{ detailReg.zip }}<br />
                {{ detailReg.country }}
              </p>
            </div>

            <div class="detail-section">
              <h3>Notes</h3>
              <div class="detail-grid">
                <div class="detail-item"><span>Cancellation Policy Agreed</span><strong>{{ detailReg.cancellation_policy_agreed ? "Yes" : "No" }}</strong></div>
                <div class="detail-item"><span>Registered On</span><strong>{{ formatDateTime(detailReg.created_at) }}</strong></div>
              </div>
            </div>

            <div class="modal-actions">
              <a :href="`mailto:${detailReg.email}`" class="btn-email-lg">Send Email</a>
              <button class="btn-close-modal" @click="detailReg = null">Close</button>
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

const registrations = ref([]);
const loading = ref(true);
const search = ref("");
const filterType = ref("");
const filterProgram = ref("");
const filterStatus = ref("");
const detailReg = ref(null);

const stats = computed(() => {
  const total = registrations.value.length;
  const active = registrations.value.filter((r) => r.status === "active").length;
  const monthlyRevenue = registrations.value
    .filter((r) => r.status === "active")
    .reduce((sum, r) => sum + (r.monthly_price || 0), 0);
  return { total, active, monthlyRevenue };
});

const filteredRegistrations = computed(() => {
  let list = registrations.value;
  const q = search.value.toLowerCase();
  if (q) {
    list = list.filter((r) =>
      [r.first_name, r.last_name, r.email, r.participant_name, r.program_display_name, r.program_name]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }
  if (filterType.value) list = list.filter((r) => r.program_type === filterType.value);
  if (filterProgram.value) list = list.filter((r) => r.program_name === filterProgram.value);
  if (filterStatus.value) list = list.filter((r) => r.status === filterStatus.value);
  return list;
});

const fetchRegistrations = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    registrations.value = data || [];
  } catch (err) {
    console.error("Error fetching registrations:", err);
  } finally {
    loading.value = false;
  }
};

const updateStatus = async (reg, newStatus) => {
  try {
    const { error } = await supabase.from("registrations").update({ status: newStatus }).eq("id", reg.id);
    if (error) throw error;
    reg.status = newStatus;
    if (detailReg.value?.id === reg.id) detailReg.value.status = newStatus;
  } catch (err) {
    alert("Failed to update status: " + err.message);
  }
};

const confirmDelete = async (reg) => {
  if (!confirm(`Delete registration for ${reg.first_name} ${reg.last_name}? This cannot be undone.`)) return;
  try {
    const { error } = await supabase.from("registrations").delete().eq("id", reg.id);
    if (error) throw error;
    registrations.value = registrations.value.filter((r) => r.id !== reg.id);
  } catch (err) {
    alert("Failed to delete: " + err.message);
  }
};

const openDetail = (reg) => {
  detailReg.value = reg;
};

const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
const formatDateTime = (d) => d ? new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }) : "—";

onMounted(fetchRegistrations);
</script>

<style scoped>
.admin-regs {
  min-height: 100vh;
  background: #f8fafc;
}

.page-header {
  background: #fff;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  padding: 5rem 2rem 1.5rem;
}

.page-header__inner {
  max-width: 1300px;
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

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.page-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0 0 0.3rem;
}

.page-subtitle { color: #475569; margin: 0; font-size: 0.95rem; }

.header-stats {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.stat-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 0.6rem 1rem;
  min-width: 70px;
}

.active-pill { background: #dcfce7; }
.revenue-pill { background: rgba(52, 82, 163, 0.08); }

.stat-num {
  font-size: 1.4rem;
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1;
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
  margin-top: 0.2rem;
}

/* Body */
.body {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
}

/* Filters */
.filters-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.search-wrap {
  flex: 1;
  min-width: 220px;
}

.search-input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1.5px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  font-size: 0.9rem;
  color: #0f172a;
  background: #fff;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #3452a3;
  box-shadow: 0 0 0 3px rgba(52, 82, 163, 0.1);
}

.filter-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.65rem 0.75rem;
  border: 1.5px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f172a;
  background: #fff;
  cursor: pointer;
}

/* Loading / empty */
.loading-state {
  text-align: center;
  padding: 3rem;
  color: #64748b;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #e2e8f0;
  border-top-color: #3452a3;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin { to { transform: rotate(360deg); } }

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
}

.empty-icon { font-size: 3.5rem; margin-bottom: 1rem; }
.empty-state h3 { margin: 0 0 0.5rem; font-weight: 950; color: #0f172a; }
.empty-state p { margin: 0; }

/* Table */
.table-wrap {
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  overflow-x: auto;
}

.reg-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.reg-table th {
  padding: 0.9rem 1rem;
  background: #f8fafc;
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
  text-align: left;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  white-space: nowrap;
}

.reg-row {
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  cursor: pointer;
  transition: background 0.1s;
}

.reg-row:hover { background: rgba(52, 82, 163, 0.025); }
.reg-row:last-child { border-bottom: none; }

.reg-table td {
  padding: 0.9rem 1rem;
  vertical-align: top;
}

.student-cell {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.student-name { font-weight: 900; color: #0f172a; }
.account-name { font-size: 0.78rem; color: #64748b; font-weight: 700; }
.student-email { font-size: 0.8rem; color: #3452a3; text-decoration: none; font-weight: 700; }

.program-cell {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.program-name { font-weight: 900; color: #0f172a; }

.type-badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  width: fit-content;
}

.type-junior { background: rgba(52, 82, 163, 0.1); color: #1e3a8a; }
.type-adult { background: rgba(223, 255, 79, 0.3); color: #3d5a00; }

.days-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.day-chip {
  background: rgba(52, 82, 163, 0.08);
  color: #3452a3;
  font-size: 0.7rem;
  font-weight: 900;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  text-transform: capitalize;
}

.price-cell { font-weight: 900; color: #0f172a; }
.date-cell { font-size: 0.82rem; color: #64748b; white-space: nowrap; }

.status-select {
  padding: 0.35rem 0.5rem;
  border: 1.5px solid rgba(15, 23, 42, 0.12);
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 800;
  color: #0f172a;
  background: #fff;
  cursor: pointer;
}

.action-btns {
  display: flex;
  gap: 0.35rem;
}

.btn-icon {
  width: 30px;
  height: 30px;
  background: #f1f5f9;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.85rem;
  display: grid;
  place-items: center;
  text-decoration: none;
  transition: background 0.12s;
}

.btn-icon:hover { background: #e2e8f0; }
.btn-danger:hover { background: #fee2e2; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.modal-content {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 950;
  color: #0f172a;
}

.close-btn {
  width: 32px;
  height: 32px;
  background: #f1f5f9;
  border: none;
  border-radius: 8px;
  font-size: 1.3rem;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #64748b;
  line-height: 1;
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section h3 {
  margin: 0 0 0.75rem;
  font-size: 0.78rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.detail-item span:first-child {
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #94a3b8;
}

.detail-item strong, .detail-item a {
  font-size: 0.9rem;
  font-weight: 800;
  color: #0f172a;
}

.detail-item a { color: #3452a3; text-decoration: none; }

.address-block {
  margin: 0;
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.7;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(15, 23, 42, 0.07);
}

.btn-email-lg {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: #fff;
  border-radius: 10px;
  font-weight: 950;
  text-decoration: none;
  transition: transform 0.15s;
}

.btn-email-lg:hover { transform: translateY(-1px); }

.btn-close-modal {
  flex: 1;
  padding: 0.85rem;
  background: #fff;
  border: 1.5px solid rgba(15, 23, 42, 0.14);
  border-radius: 10px;
  font-weight: 950;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-close-modal:hover { border-color: #3452a3; color: #3452a3; }

@media (max-width: 768px) {
  .page-header { padding: 4.5rem 1rem 1.5rem; }
  .body { padding: 1.5rem 1rem 3rem; }
  .header-row { flex-direction: column; align-items: flex-start; }
  .filters-bar { flex-direction: column; }
  .search-wrap { min-width: 0; }
  .detail-grid { grid-template-columns: 1fr; }
}
</style>
