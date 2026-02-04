<template>
  <div class="todo-app">
    <!-- Header -->
    <header class="todo-header">
      <div>
        <h1>Workspace</h1>
        <p>Manage your daily tasks and productivity</p>
      </div>
      <button class="btn-primary" @click="$router.push('/addtodo')">
        <span class="plus-icon">+</span> Add New Todo
      </button>
    </header>

    <!-- Stats -->
    <div class="stats-bar">
      <div class="stat-item">Total: {{ todos.length }}</div>
      <div class="stat-item">Completed: {{ completedCount }}</div>
    </div>

    <!-- Table -->
    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th class="text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(todo, index) in todos" :key="index">
            <td class="id-cell">#{{ index + 1 }}</td>

            <td class="title-cell">
              <strong>{{ todo.title }}</strong>
            </td>

            <td class="desc-cell">
              {{ todo.description || '—' }}
            </td>

            <td class="date-cell">
              {{ todo.dueDate || '—' }}
            </td>

            <td>
              <span :class="['priority', todo.priority?.toLowerCase()]">
                {{ todo.priority }}
              </span>
            </td>

            <td>
              <span :class="['badge', todo.status.toLowerCase()]">
                {{ todo.status }}
              </span>
            </td>

            <td class="text-right">
              <button class="btn-edit" @click="$router.push(`/edit/${index}`)">
                Edit
              </button>
              <button class="btn-delete" @click="deleteTodo(index)">
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="todos.length === 0">
            <td colspan="7" class="empty-state">
              No tasks found. Click "Add New Todo" to get started.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
        todo => todo.status === 'Completed' || todo.status === 'Done'
      ).length
    }
  },

  methods: {
    loadTodos() {
      // Load todos from localStorage
      const savedTodos = localStorage.getItem('todos')
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos)
      } else {
        // If none exist, create sample todos
        this.todos = [
          { title: 'Demo Task 1', description: 'Example task', dueDate: '2026-02-10', priority: 'High', status: 'Pending' },
          { title: 'Demo Task 2', description: 'Example task', dueDate: '2026-02-12', priority: 'Medium', status: 'Completed' }
        ]
        localStorage.setItem('todos', JSON.stringify(this.todos))
      }
    },

    deleteTodo(index) {
      if (!confirm('Are you sure you want to delete this task?')) return

      this.todos.splice(index, 1)
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },

    logout() {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  },

  mounted() {
    const isAuth = localStorage.getItem('isAuthenticated')
    const userData = localStorage.getItem('user')

    if (!isAuth || !userData) {
      this.$router.push('/login')
      return
    }

    this.user = JSON.parse(userData)
    this.loadTodos()
  }
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');

.todo-app {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  font-family: 'Quicksand', sans-serif;
  color: #590d22;
  min-height: 100vh;
}

/* Header */
.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  gap: 20px;
}

.todo-header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
}

.todo-header p {
  color: #a44a5f;
  font-weight: 600;
  margin-top: 5px;
}

/* Button */
.btn-primary {
  background-color: #ff758f;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px 0px #c9184a;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 0px #c9184a;
}

/* Stats */
.stats-bar {
  display: flex;
  gap: 15px;
  margin-bottom: 2rem;
}

.stat-item {
  background: white;
  padding: 8px 18px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  border: 2px solid #ffe5ec;
  color: #a44a5f;
}

/* Table */
.table-container {
  background: white;
  border-radius: 30px;
  border: 4px solid #ffe5ec;
  box-shadow: 0 12px 0px #ffcad4;
  overflow: hidden;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th {
  background: #fff0f3;
  padding: 18px;
  font-weight: 700;
  color: #a44a5f;
}

.styled-table td {
  padding: 18px;
  border-bottom: 2px solid #fff5f8;
}

/* Cells */
.id-cell {
  color: #ffb3c1;
  font-weight: 700;
}

.desc-cell {
  max-width: 220px;
  font-size: 0.9rem;
  color: #6b7280;
}

.date-cell {
  font-weight: 600;
  color: #a44a5f;
}

/* Status Badge */
.badge {
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.badge.pending {
  background: #fef3c7;
  color: #92400e;
  border: 2px solid #fde68a;
}

.badge.completed {
  background: #dcfce7;
  color: #166534;
  border: 2px solid #bbf7d0;
}

/* Priority */
.priority {
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.priority.low {
  background: #e0f2fe;
  color: #0369a1;
}

.priority.medium {
  background: #fef3c7;
  color: #92400e;
}

.priority.high {
  background: #fee2e2;
  color: #991b1b;
}

/* Actions */
.btn-edit {
  background: #e0f2fe;
  color: #0369a1;
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 700;
  margin-right: 8px;
  cursor: pointer;
}

.btn-delete {
  background: #fff0f3;
  color: #ff4d6d;
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  padding: 4rem;
  color: #ffb3c1;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .todo-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
