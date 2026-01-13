<template>
  <div class="form-wrapper">
    <button class="btn-back" @click="$router.push('/')">
      ← Back to Dashboard
    </button>

    <div class="card">
      <div class="card-header">
        <h2>Create New Task</h2>
        <p>Fill in the details to add a new item to your list.</p>
      </div>

      <div class="card-body">
        <div class="form-group">
          <label for="title">Task Title</label>
          <input 
            id="title"
            v-model="title" 
            type="text" 
            placeholder="e.g. Design landing page"
            :class="{ 'input-error': error }"
          />
          <span v-if="error" class="error-text">{{ error }}</span>
        </div>

        <div class="form-group">
          <label for="status">Assign Status</label>
          <select id="status" v-model="status">
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div class="form-actions">
          <button class="btn-cancel" @click="$router.push('/')">Cancel</button>
          <button class="btn-save" @click="saveTodo">Create Task</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      status: 'Pending',
      error: null
    }
  },
  methods: {
    saveTodo() {
      // Basic Validation
      if (!this.title.trim()) {
        this.error = "Task title is required";
        return;
      }

      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.push({ 
        title: this.title, 
        status: this.status,
        createdAt: new Date().toISOString() // Added a timestamp for better data
      });
      
      localStorage.setItem('todos', JSON.stringify(todos));
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  background: #f9fafb;
}

.card-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #111827;
}

.card-header p {
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  color: #6b7280;
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
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box; /* Ensures padding doesn't break width */
}

input:focus, select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input-error {
  border-color: #ef4444;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-save {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-cancel {
  background: white;
  color: #4b5563;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
}

.btn-save:hover { background: #4338ca; }
.btn-cancel:hover { background: #f9fafb; }
</style>
