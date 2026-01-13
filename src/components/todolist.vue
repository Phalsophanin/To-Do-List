<template>
  <div class="todo-app">
    <header class="todo-header">
      <div>
        <h1>Workspace</h1>
        <p>Manage your daily tasks and productivity</p>
      </div>
      <button class="btn-primary" @click="$router.push('/add')">
        <span class="plus-icon">+</span> Add New Todo
      </button>
    </header>

    <div class="stats-bar">
      <div class="stat-item">Total: {{ todos.length }}</div>
      <div class="stat-item">Completed: {{ completedCount }}</div>
    </div>

    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task Title</th>
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
            <td colspan="4" class="empty-state">
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
      todos: JSON.parse(localStorage.getItem('todos')) || []
    };
  },
  computed: {
    completedCount() {
      return this.todos.filter(t => t.status === 'Completed').length;
    }
  },
  methods: {
    deleteTodo(index) {
      if (confirm('Are you sure you want to delete this task?')) {
        this.todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    }
  }
};
</script>

<style scoped>
/* Container & Layout */
.todo-app {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Inter', -apple-system, sans-serif;
  color: #2d3748;
}

.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.todo-header h1 {
  font-size: 1.8rem;
  margin: 0;
  font-weight: 700;
}

.todo-header p {
  color: #718096;
  margin-top: 4px;
}

/* Buttons */
.btn-primary {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.btn-edit {
  background: #edf2f7;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
}

.btn-delete {
  background: #fff5f5;
  color: #c53030;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

/* Table Styling */
.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.styled-table th {
  background: #f8fafc;
  padding: 16px;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
}

.styled-table td {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
}

/* Badges */
.badge {
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.pending { background: #fef3c7; color: #92400e; }
.badge.completed { background: #dcfce7; color: #166534; }

.text-right { text-align: right; }
.empty-state { text-align: center; padding: 3rem; color: #a0aec0; }
</style>