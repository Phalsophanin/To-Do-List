<template>
  <div class="auth-wrapper">
    <div class="login-card">
      <div class="brand-section">
        <div class="logo-circle">✓</div>
        <h1>TaskMaster</h1>
        <p>Sign in to manage your productivity</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            placeholder="enter your email" 
            required
          />
        </div>

        <div class="form-group">
          <div class="label-row">
            <label for="password">Password</label>
            <a href="#" class="forgot-link">Forgot?</a>
          </div>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="•••••" 
            required
          />
        </div>

        <button type="submit" :disabled="isLoading" class="btn-login">
          <span v-if="!isLoading">Sign In</span>
          <span v-else class="loader">Logging in...</span>
        </button>
      </form>

      <div class="login-footer">
        <p>Don't have an account? <a href="#">Create one</a></p>
      </div>
    </div>
  </div>
</template>

<script>
   
export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
  handleLogin() {
    if (this.email === "phalsophanin@gmail.com" && this.password === "12345") {
      this.isLoading = true;

      setTimeout(() => {
        localStorage.setItem('isAuthenticated', 'true');
        this.$router.push('/dashboard');
        this.isLoading = false;
      }, 1000);

    } else {
      alert("Invalid email or password");
    }
  }
}

}
</script>

<style scoped>
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6; /* Light gray background */
  font-family: 'Inter', sans-serif;
}

.login-card {
  background: white;
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.brand-section {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-circle {
  width: 48px;
  height: 48px;
  background: #6366f1;
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.brand-section h1 {
  font-size: 1.5rem;
  color: #111827;
  margin: 0;
}

.brand-section p {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.forgot-link {
  font-size: 0.75rem;
  color: #6366f1;
  text-decoration: none;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.btn-login {
  width: 100%;
  background: #6366f1;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 1rem;
}

.btn-login:hover:not(:disabled) {
  background: #4f46e5;
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.login-footer a {
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
}
</style>