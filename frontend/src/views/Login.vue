<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>🎾 MWTA Admin Login</h1>
          <p>Please sign in to access the admin dashboard</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" required placeholder="Enter your email" :disabled="loading" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" required placeholder="Enter your password" :disabled="loading" />
          </div>

          <button type="submit" class="login-btn" :disabled="loading">
            {{ loading ? "Signing in..." : "Sign In" }}
          </button>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>

        <div class="login-footer">
          <router-link to="/" class="back-link">← Back to Website</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabase";

const router = useRouter();

// Form data
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = "";

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (authError) {
      throw authError;
    }

    // Success! Redirect to admin dashboard
    router.push("/admin");
  } catch (err) {
    error.value = err.message || "Failed to sign in";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem 2rem 2rem; /* Added top padding for navbar */
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 2rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #6c757d;
  font-size: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.form-group input {
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #3452a3;
  box-shadow: 0 0 0 3px rgba(52, 82, 163, 0.1);
}

.form-group input:disabled {
  background: #f8f9fa;
  cursor: not-allowed;
}

.login-btn {
  padding: 0.875rem;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 82, 163, 0.4);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  padding: 0.75rem;
  background: #f8d7da;
  color: #721c24;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}

.login-footer {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.back-link {
  color: #6c757d;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #3452a3;
}

@media (max-width: 480px) {
  .login-page {
    padding: 1rem;
  }

  .login-card {
    padding: 1.5rem;
  }

  .login-header h1 {
    font-size: 1.5rem;
  }
}
</style>
