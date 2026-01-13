<template>
  <div class="dashboard-wrapper">
    <nav class="top-nav">
      <div class="nav-brand">TaskMaster <span>Pro</span></div>
      <button class="btn-logout" @click="logout">Logout</button>
    </nav>

    <main class="dashboard-content">
      <header class="welcome-section">
        <h1>Welcome Back!</h1>
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
          <button class="action-btn primary" @click="$router.push('/todos')">
            <span class="icon">👁️</span> View All Tasks
          </button>
          <button class="action-btn success" @click="$router.push('/add')">
            <span class="icon">➕</span> Create New Task
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    todos() {
      return JSON.parse(localStorage.getItem('todos')) || [];
    },
    completedCount() {
      return this.todos.filter(t => t.status === 'Completed' || t.status === 'Done').length;
    },
    pendingCount() {
      return this.todos.length - this.completedCount;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.dashboard-wrapper {
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: 'Inter', sans-serif;
}

/* Navbar */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.nav-brand {
  font-weight: 800;
  font-size: 1.25rem;
  color: #1e293b;
}

.nav-brand span { color: #6366f1; }

.btn-logout {
  background: #fee2e2;
  color: #ef4444;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

/* Content Layout */
.dashboard-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
}

.welcome-section h1 {
  font-size: 2rem;
  color: #0f172a;
  margin: 0;
}

.welcome-section p {
  color: #64748b;
  margin: 0.5rem 0 2rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  border: 1px solid #f1f5f9;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-icon.blue { background: #e0e7ff; }
.stat-icon.green { background: #dcfce7; }
.stat-icon.orange { background: #ffedd5; }

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

/* Quick Actions */
.quick-actions h3 {
  font-size: 1.1rem;
  color: #334155;
  margin-bottom: 1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 200px;
  padding: 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s;
}

.action-btn:hover { transform: translateY(-3px); }

.action-btn.primary { background: #6366f1; color: white; }
.action-btn.success { background: #10b981; color: white; }

.icon { font-size: 1.5rem; }
</style>