<template>
  <div class="dashboard-wrapper">
    <nav class="top-nav">
      <div class="nav-brand">TaskMaster <span>Pro</span></div>
      <button class="btn-logout" @click="logout">Logout</button>
    </nav>

    <main class="dashboard-content">
      <header class="welcome-section">
        <h1>Welcome To ToDo Web</h1>
        <p>Here is what's happening with your projects today.</p>
      </header>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue">📋</div>
          <div class="stat-info">
            <span class="stat-label">Total Tasks</span>
            <span class="stat-value">{{ todos.length }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon green">✅</div>
          <div class="stat-info">
            <span class="stat-label">Completed</span>
            <span class="stat-value">{{ completedCount }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon orange">⏳</div>
          <div class="stat-info">
            <span class="stat-label">Pending</span>
            <span class="stat-value">{{ pendingCount }}</span>
          </div>
        </div>
      </div>

      <section class="quick-actions">
        <h3>Quick Actions</h3>
        <div class="action-buttons">
          <button class="action-btn primary" @click="$router.push('/todolist')">
            <span class="icon">👁️</span> View All Tasks
          </button>
          <button class="action-btn success" @click="$router.push('/addtodo')">
            <span class="icon">➕</span> Create New Task
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      user: null
    }
  },

  computed: {
    completedCount() {
      return this.todos.filter(
        t => t.status === 'Completed' || t.status === 'Done'
      ).length
    },
    pendingCount() {
      return this.todos.length - this.completedCount
    }
  },

  methods: {
    fetchTodos() {
      // Get todos from localStorage if available
      const savedTodos = localStorage.getItem('todos')
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos)
      } else {
        // If no todos saved, create some demo tasks
        this.todos = [
          { id: 1, title: 'Demo Task 1', status: 'Pending' },
          { id: 2, title: 'Demo Task 2', status: 'Completed' },
          { id: 3, title: 'Demo Task 3', status: 'Pending' }
        ]
        localStorage.setItem('todos', JSON.stringify(this.todos))
      }
    },

    logout() {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
      this.$router.push('/')
    }
  },

  mounted() {
    const isAuth = localStorage.getItem('isAuthenticated')
    const userData = localStorage.getItem('user')

    if (!isAuth || !userData) {
      this.$router.push('/')
      return
    }

    this.user = JSON.parse(userData)
    this.fetchTodos()
  }
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');

.dashboard-wrapper {
  min-height: 100vh;
  background-color: #fff5f8;
  background-image: radial-gradient(#ffcad4 0.5px, transparent 0.5px);
  background-size: 20px 20px;
  font-family: 'Quicksand', sans-serif;
  color: #590d22;
}

/* Navbar */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: white;
  border-bottom: 4px solid #ffe5ec;
}

.nav-brand {
  font-weight: 700;
  font-size: 1.4rem;
  color: #590d22;
}

.nav-brand span { 
  color: #ff758f;
  background: #fff0f3;
  padding: 2px 8px;
  border-radius: 8px;
}

.btn-logout {
  background: #ffb3c1;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 3px 0px #c9184a;
  transition: all 0.2s;
}

.btn-logout:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 0px #c9184a;
}

/* Content Layout */
.dashboard-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.welcome-section h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #590d22;
}

.welcome-section p {
  color: #a44a5f;
  font-weight: 600;
  margin-bottom: 2.5rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-bottom: 3.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  border: 3px solid #ffe5ec;
  box-shadow: 0 8px 0px #ffcad4;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: scale(1.02);
}

.stat-icon {
  width: 55px;
  height: 55px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}

/* Matching the "Cute" Palette */
.stat-icon.blue { background: #e0f2fe; border: 2px solid #bae6fd; }
.stat-icon.green { background: #dcfce7; border: 2px solid #bbf7d0; }
.stat-icon.orange { background: #fef3c7; border: 2px solid #fde68a; }

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #a44a5f;
  font-weight: 700;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #590d22;
}

/* Quick Actions */
.quick-actions h3 {
  font-size: 1.2rem;
  color: #590d22;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.action-buttons {
  display: flex;
  gap: 1.5rem;
}

.action-btn {
  flex: 1;
  padding: 2rem;
  border: none;
  border-radius: 24px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: all 0.2s;
  font-family: inherit;
}

.action-btn.primary { 
  background: #ff758f; 
  color: white;
  box-shadow: 0 6px 0px #c9184a;
}

.action-btn.success { 
  background: #cc93c7; 
  color: #1b4332;
  box-shadow: 0 6px 0px #b130a0;
}

.action-btn:hover {
  transform: translateY(-4px);
}

.action-btn:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0px inherit;
}

.icon {
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.2);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

@media (max-width: 600px) {
  .action-buttons {
    flex-direction: column;
  }
}
</style>