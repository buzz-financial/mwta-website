<template>
  <div class="admin-dashboard">
    <div class="container">
      <!-- Header -->
      <div class="admin-header">
        <div class="header-content">
          <h1>🎾 MWTA Admin Dashboard</h1>
          <p>Manage your tennis academy content</p>
        </div>
        <button @click="handleLogout" class="logout-btn">🚪 Logout</button>
      </div>

      <!-- Quick Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3>Active Coaches</h3>
            <p class="stat-number">{{ stats.coaches }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📋</div>
          <div class="stat-content">
            <h3>Registrations</h3>
            <p class="stat-number">{{ stats.registrations }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <h3>Active Members</h3>
            <p class="stat-number">{{ stats.activeMembers }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <h3>Monthly Revenue</h3>
            <p class="stat-number">${{ stats.monthlyRevenue }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <div class="stat-content">
            <h3>Lesson Requests</h3>
            <p class="stat-number">{{ stats.pendingLessons }} pending</p>
          </div>
        </div>
      </div>

      <!-- Management Cards -->
      <div class="management-grid">
        <div class="management-card">
          <div class="card-header">
            <div class="card-icon">📋</div>
            <h3>Registrations</h3>
          </div>
          <p>View and manage all program enrollments. Update statuses, view billing details, and contact members.</p>
          <div class="card-actions">
            <button class="btn btn-primary" @click="goTo('/admin/registrations')">Manage Registrations</button>
            <button class="btn btn-outline" @click="goTo('/register')">Registration Form</button>
          </div>
        </div>

        <div class="management-card">
          <div class="card-header">
            <div class="card-icon">🎯</div>
            <h3>Private Lessons</h3>
          </div>
          <p>View incoming lesson booking requests and manage coach availability for private sessions.</p>
          <div class="card-actions">
            <button class="btn btn-primary" @click="goTo('/staff-portal')">Staff Portal</button>
            <button class="btn btn-outline" @click="goTo('/privatelessons')">View Lessons Page</button>
          </div>
        </div>

        <div class="management-card">
          <div class="card-header">
            <div class="card-icon">👥</div>
            <h3>Manage Staff</h3>
          </div>
          <p>Add, edit, and manage your coaching staff members and their profile information.</p>
          <div class="card-actions">
            <button class="btn btn-primary" @click="goTo('/admin/staff')">Manage Staff</button>
            <button class="btn btn-outline" @click="goTo('/staff')">View Public Page</button>
          </div>
        </div>

        <div class="management-card">
          <div class="card-header">
            <div class="card-icon">🏆</div>
            <h3>Programs & Schedules</h3>
          </div>
          <p>Enable/disable programs, update schedules, and manage junior & adult clinic listings.</p>
          <div class="card-actions">
            <button class="btn btn-primary" @click="goTo('/admin/programs')">Manage Programs</button>
            <button class="btn btn-outline" @click="goTo('/junior')">View Junior Page</button>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-buttons">
          <button class="btn btn-success" @click="goTo('/')">🏠 View Website</button>
          <button class="btn btn-info" @click="goTo('/contact')">📧 Contact Page</button>
          <button class="btn btn-warning" disabled>📊 Analytics (Coming Soon)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabase";

const router = useRouter();

const stats = ref({
  coaches: 0,
  registrations: 0,
  activeMembers: 0,
  monthlyRevenue: "0",
  pendingLessons: 0,
});

const loadStats = async () => {
  try {
    const [coachesRes, regsRes, lessonsRes] = await Promise.all([
      supabase.from("coaches").select("id", { count: "exact" }).eq("active", true),
      supabase.from("registrations").select("status, monthly_price"),
      supabase.from("lesson_bookings").select("status").eq("status", "pending"),
    ]);

    const regs = regsRes.data || [];
    const active = regs.filter((r) => r.status === "active");
    const mrr = active.reduce((sum, r) => sum + (r.monthly_price || 0), 0);

    stats.value = {
      coaches: coachesRes.count || 0,
      registrations: regs.length,
      activeMembers: active.length,
      monthlyRevenue: mrr.toFixed(0),
      pendingLessons: lessonsRes.data?.length || 0,
    };
  } catch {
    // leave defaults
  }
};

onMounted(loadStats);

// Navigation helper
const goTo = (path) => {
  router.push(path);
};

// Logout function
const handleLogout = async () => {
  try {
    await supabase.auth.signOut();
    router.push("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 6rem 0 2rem 0; /* Added top padding for navbar */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header */
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  color: white;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-content {
  text-align: left;
}

.header-content h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.header-content p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.logout-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
}

.stat-content h3 {
  margin: 0 0 0.5rem 0;
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-number {
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  color: #2c3e50;
}

/* Management Grid */
.management-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.management-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.management-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: white;
  border-radius: 12px;
}

.card-header h3 {
  margin: 0;
  color: #2c3e50;
  font-weight: 700;
}

.management-card p {
  color: #6c757d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Quick Actions */
.quick-actions {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.quick-actions h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 700;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: white;
}

.btn-outline {
  background: transparent;
  color: #3452a3;
  border: 2px solid #3452a3;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-info {
  background: #17a2b8;
  color: white;
}

.btn-warning {
  background: #ffc107;
  color: #212529;
}

.btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    text-align: center;
  }

  .header-content {
    text-align: center;
  }

  .header-content h1 {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .management-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .management-card {
    padding: 1.5rem;
  }

  .card-actions {
    flex-direction: column;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
