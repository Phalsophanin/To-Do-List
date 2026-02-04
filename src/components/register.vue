<template>
  <div class="auth-wrapper">
    <div class="login-card">
      <div class="brand-section">
        <div class="logo-circle">+</div>
        <h1>Create Account</h1>
        <p>Start managing your tasks today</p>
      </div>

      <form @submit.prevent="handleRegister" class="login-form">
        <div class="form-group">
          <label>Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="enter your username"
            required
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" :disabled="isLoading" class="btn-login">
          Create Account
        </button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>

      <div class="login-footer">
        <p>
          Already have an account?
          <a @click.prevent="$router.push('/')" href="#">Sign in</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      error: ''
    }
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match'
        return
      }

      this.isLoading = true
      this.error = ''

      try {
        await axios.post(
          'https://nubbtodoapi.kode4u.tech/api/auth.php',
          {
            action: 'register',
            username: this.username,
            password: this.password
          }
        )

        alert('Registration successful! Please login.')
        this.$router.push('/')
      } catch (err) {
        this.error = 'Registration failed (user may already exist)'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');

.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff5f7;
  background-image: radial-gradient(#fed7e2 0.5px, transparent 0.5px);
  background-size: 20px 20px;
  font-family: 'Quicksand', sans-serif;
  padding: 20px;
}

.login-card {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 30px;
  border: 4px solid #fed7e2;
  box-shadow: 0 15px 0px #fbb6ce;
  width: 100%;
  max-width: 400px;
  transition: transform 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
}

.brand-section {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-circle {
  width: 60px;
  height: 60px;
  background: #d53f8c;
  color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 0px #97266d;
}

.brand-section h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #702459;
  margin-bottom: 0.2rem;
}

.brand-section p {
  color: #d53f8c;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1.2rem;
  text-align: left;
}

label {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #702459;
  margin-left: 5px;
  margin-bottom: 0.4rem;
}

input {
  width: 100%;
  padding: 0.9rem;
  border: 2px solid #fed7e2;
  border-radius: 15px;
  background: #fffafb;
  font-family: inherit;
  font-size: 1rem;
  color: #702459;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #d53f8c;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(213, 63, 140, 0.1);
}

.btn-login {
  width: 100%;
  padding: 1rem;
  background-color: #d53f8c;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px 0px #97266d;
  margin-top: 1rem;
}

.btn-login:hover {
  background-color: #b83280;
  transform: translateY(-2px);
  box-shadow: 0 7px 0px #702459;
}

.btn-login:active {
  transform: translateY(3px);
  box-shadow: 0 2px 0px #702459;
}

.btn-login:disabled {
  background-color: #fbb6ce;
  box-shadow: 0 5px 0px #f687b3;
  cursor: not-allowed;
}

.error {
  background: #fff5f5;
  color: #c53030;
  padding: 10px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.85rem;
  margin-top: 15px;
  text-align: center;
  border: 1px solid #fed7d7;
}

.login-footer {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #4a5568;
  text-align: center;
}

.login-footer a {
  color: #d53f8c;
  text-decoration: none;
  font-weight: 700;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>
