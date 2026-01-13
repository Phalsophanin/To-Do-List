<template>
  <div class="form-wrapper">
    <button class="btn-back" @click="$router.push('/')">
      ← Back to List
    </button>

    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <h2>Edit Task</h2>
          <span class="id-tag">Task #{{ $route.params.id }}</span>
        </div>
        <p>Modify the details of your existing task.</p>
      </div>

      <div class="card-body" v-if="todo">
        <div class="form-group">
          <label for="title">Task Title</label>
          <input 
            id="title"
            v-model="todo.title" 
            type="text" 
            placeholder="Update task title..."
          />
        </div>

        <div class="form-group">
          <label for="status">Change Status</label>
          <select id="status" v-model="todo.status">
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div class="form-actions">
          <button class="btn-cancel" @click="$router.push('/')">Discard Changes</button>
          <button class="btn-update" @click="updateTodo">Update Task</button>
        </div>
      </div>

      <div v-else class="error-state">
        <p>Task not found or has been removed.</p>
        <button class="btn-primary" @click="$router.push('/')">Return Home</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: null,
      todos: []
    }
  },
  mounted() {
    // Load all todos and find the specific one by ID (index)
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    const id = this.$route.params.id;
    
    if (this.todos[id]) {
      // Use spread operator to create a local copy so changes 
      // aren't saved to localStorage until the user clicks "Update"
      this.todo = { ...this.todos[id] };
    }
  },
  methods: {
    updateTodo() {
      if (!this.todo.title.trim()) return;

      const id = this.$route.params.id;
      this.todos[id] = this.todo;
      
      localStorage.setItem('todos', JSON.stringify(this.todos));
      
      // Optional: Add a success flag or notification here
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
/* Reusing core styles for professional consistency */
.form-wrapper {
  max-width: 500px;
  margin: 4rem auto;
  padding: 0 1rem;
  font-family: 'Inter', sans-serif;
}

.btn-back {
  background: none;
  border: none;
  color: #6366f1;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1.5rem;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  background: #f9fafb;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.id-tag {
  font-size: 0.75rem;
  background: #e0e7ff;
  color: #4338ca;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.card-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

input, select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-update {
  background: #059669; /* Green for update/success */
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-cancel {
  background: white;
  color: #6b7280;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
}

.error-state {
  padding: 3rem;
  text-align: center;
  color: #ef4444;
}
</style>
