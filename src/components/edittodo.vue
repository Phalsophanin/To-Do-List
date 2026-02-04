<template>
  <div class="form-wrapper">
    <!-- Back Button -->
    <button class="btn-back" @click="$router.push('/todolist')">
      ← Back to List
    </button>

    <!-- Edit Card -->
    <div class="card" v-if="todo">
      <div class="card-header">
        <h2>Edit Task #{{ taskId + 1 }}</h2>
        <p>Modify your task details below.</p>
      </div>

      <div class="card-body">
        <!-- Title -->
        <div class="form-group">
          <label>Title</label>
          <input v-model="todo.title" placeholder="Enter task title..." />
        </div>

        <!-- Description -->
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="todo.description" placeholder="Enter description..."></textarea>
        </div>

        <!-- Due Date -->
        <div class="form-group">
          <label>Due Date</label>
          <input type="date" v-model="todo.dueDate" />
        </div>

        <!-- Priority -->
        <div class="form-group">
          <label>Priority</label>
          <select v-model="todo.priority">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <!-- Status -->
        <div class="form-group">
          <label>Status</label>
          <select v-model="todo.status">
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="form-actions">
          <button class="btn-cancel" @click="$router.push('/todolist')">Cancel</button>
          <button class="btn-update" @click="updateTodo">Update Task</button>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="error-state">
      <p>Task not found.</p>
      <button @click="$router.push('/todolist')">Go Back</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      todo: null,
      taskId: null
    }
  },

  mounted() {
    // Load all todos from localStorage
    this.todos = JSON.parse(localStorage.getItem('todos')) || []

    // Get task index from route params
    this.taskId = Number(this.$route.params.id)

    // Check if task exists
    if (this.todos[this.taskId] !== undefined) {
      // Make a copy to edit safely
      this.todo = { ...this.todos[this.taskId] }
    } else {
      this.todo = null
    }
  },

  methods: {
    updateTodo() {
      if (!this.todo.title.trim()) {
        alert('Task title is required')
        return
      }

      // Update original array
      this.todos[this.taskId] = this.todo
      localStorage.setItem('todos', JSON.stringify(this.todos))

      // Navigate back to list
      this.$router.push('/todolist')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');

.form-wrapper {
  max-width: 520px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Quicksand', sans-serif;
  color: #590d22;
}

/* Back Button */
.btn-back {
  background: white;
  border: 2px solid #ffe5ec;
  color: #ff758f;
  padding: 8px 18px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 0px #ffcad4;
  transition: all 0.2s;
}

.btn-back:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0px #ffcad4;
}

/* Card */
.card {
  background: white;
  border-radius: 30px;
  border: 4px solid #ffe5ec;
  box-shadow: 0 12px 0px #ffcad4;
}

.card-header {
  padding: 2rem;
  background: #fff0f3;
  border-bottom: 3px solid #ffe5ec;
}

.card-header h2 {
  font-size: 1.6rem;
  font-weight: 800;
  color: #c9184a;
  margin: 0 0 0.5rem 0;
}

.card-header p {
  color: #a44a5f;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Form */
.card-body {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #590d22;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 15px;
  border: 2px solid #ffe5ec;
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  color: #590d22;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background: #fffafa;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #ff758f;
  background: white;
  box-shadow: 0 0 0 4px rgba(255, 117, 143, 0.1);
}

textarea {
  min-height: 100px;
  resize: vertical;
}

/* Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-update {
  background: #ff758f;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px 0px #c9184a;
  transition: all 0.1s;
}

.btn-update:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 0px #c9184a;
}

.btn-update:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0px #c9184a;
}

.btn-cancel {
  background: #fff0f3;
  border: none;
  color: #a44a5f;
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #ffe5ec;
}

/* Error State */
.error-state {
  padding: 4rem 2rem;
  text-align: center;
  color: #ff4d6d;
  font-weight: 700;
}
</style>
