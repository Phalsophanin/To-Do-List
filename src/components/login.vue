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
          <label for="username">Username</label>
          <input 
            id="username"
            v-model="username" 
            type="text" 
            placeholder="enter your username" 
            required
          />
        </div>

        <div class="form-group">
          <div class="label-row">
            <label for="password">Password</label>
          </div>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="••••••••" 
            required
          />
        </div>

        <button type="submit" :disabled="isLoading" class="btn-login">
          <span v-if="!isLoading">Sign In</span>
          <span v-else class="loader">Logging in...</span>
        </button>
      </form>

      <div class="login-footer">
         <p>don't have an account? <a @click.prevent="$router.push('/register')" href="#">Create Account</a></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      errorMessage: '' // for showing errors
    }
  },
  methods: {
    handleLogin() {
      this.isLoading = true
      this.errorMessage = ''

      // Simulated users (you can add more)
      const users = [
        { username: 'phalsophanin', password: 'chanlyna' },
        { username: 'kanchanborey', password: 'borey' },
        { username: 'vathanaZin', password: 'vathana' }
      ]

      // Check credentials
      const user = users.find(
        u => u.username === this.username && u.password === this.password
      )

      setTimeout(() => { // simulate loading
        if (user) {
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('user', JSON.stringify(user))
          this.$router.push('/dashboard')
        } else {
          this.errorMessage = 'Invalid username or password'
        }
        this.isLoading = false
      }, 800)
    }
  }
}
</script>


<style scoped>
/* Import a rounded, friendly font */
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');

.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff5f8; /* Soft blush background */
  background-image: radial-gradient(#ffcad4 0.5px, transparent 0.5px);
  background-size: 20px 20px; /* Subtle polka dot pattern */
  font-family: 'Quicksand', sans-serif;
  padding: 20px;
}

.login-card {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 30px; /* Extra rounded for that "cute" feel */
  border: 4px solid #ffe5ec;
  box-shadow: 0 15px 0px #ffcad4; /* Flat "pop" shadow */
  width: 100%;
  max-width: 380px;
  transition: transform 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
}

/* Brand/Logo Section */
.brand-section {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-circle {
  background: #ff758f;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 20px; /* Squircle logo */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 0px #c9184a;
}

.brand-section h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #590d22;
  margin-bottom: 0.2rem;
}

.brand-section p {
  color: #a44a5f;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Form Styles */
.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #590d22;
  margin-left: 5px;
  margin-bottom: 0.4rem;
}

input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #ffe5ec;
  border-radius: 15px;
  background: #fff0f3;
  font-family: inherit;
  font-size: 1rem;
  color: #590d22;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #ff758f;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(255, 117, 143, 0.1);
}

input::placeholder {
  color: #ffb3c1;
}

/* Button */
.btn-login {
  width: 100%;
  padding: 1rem;
  background-color: #ff758f;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px 0px #c9184a;
  transition: all 0.1s active;
  margin-top: 1rem;
  position: relative;
}

.btn-login:hover {
  background-color: #ff859d;
  transform: translateY(-2px);
  box-shadow: 0 7px 0px #c9184a;
}

.btn-login:active {
  transform: translateY(3px);
  box-shadow: 0 2px 0px #c9184a;
}

.btn-login:disabled {
  background-color: #ffb3c1;
  box-shadow: 0 5px 0px #ff859d;
  cursor: not-allowed;
}

/* Footer & Links */
.label-row .forgot-link, 
.login-footer a {
  color: #ff4d6d;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.85rem;
}

.login-footer a:hover, 
.forgot-link:hover {
  text-decoration: underline;
}

.login-footer {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #a44a5f;
}

/* Loading Animation */
.loader {
  display: inline-block;
  animation: bounce 0.6s infinite alternate;
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-5px); }
}
</style>