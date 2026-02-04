<template>
  <div class="form-wrapper">
    <button class="btn-back" @click="$router.push('/dashboard')">
      ← Back to Dashboard
    </button>

    <div class="card">
      <div class="card-header">
        <h2>Create New Task</h2>
        <p>Fill in the details to add a new item to your list.</p>
      </div>

      <div class="card-body">
        <!-- Title -->
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
        </div>        <!-- Description -->
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="description"
            placeholder="Task details..."
          ></textarea>
        </div>

        <!-- Due Date -->
        <div class="form-group">
          <label for="date">Due Date</label>
          <input
            id="date"
            v-model="dueDate"
            type="date"
          />
        </div>

        <!-- Priority -->
        <div class="form-group">
          <label for="priority">Priority</label>
          <select id="priority" v-model="priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <!-- Status -->
        <div class="form-group">
          <label for="status">Status</label>
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
      description: '',
      dueDate: '',
      priority: 'Medium',
      status: 'Pending',
      error: null,
      user: null
    }
  },

  methods: {
    saveTodo() {
      this.error = null

      if (!this.title.trim()) {
        this.error = 'Task title is required'
        return
      }

      // Load existing todos from localStorage
      const todos = JSON.parse(localStorage.getItem('todos')) || []

      // Create new todo object
      const newTodo = {
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        status: this.status
      }

      // Add new todo to the list
      todos.push(newTodo)

      // Save back to localStorage
      localStorage.setItem('todos', JSON.stringify(todos))

      // Redirect back to dashboard
      this.$router.push('/dashboard')
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
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');

.form-wrapper {
  min-height: 100vh;
  padding: 2rem 1rem;
  background-color: #fff5f8; /* Soft blush background */
  background-image: radial-gradient(#ffcad4 0.5px, transparent 0.5px);
  background-size: 20px 20px;
  font-family: 'Quicksand', sans-serif;
  color: #590d22; /* Deep wine text */
}

/* Back Button Styling */
.btn-back {
  background: white;
  border: 2px solid #ffe5ec;
  color: #ff758f;
  padding: 8px 18px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: all 0.2s;
  font-family: inherit;
  box-shadow: 0 4px 0px #ffcad4;
}

.btn-back:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0px #ffcad4;
}

/* The Card */
.card {
  background: white;
  max-width: 500px;
  margin: 0 auto;
  padding: 2.5rem;
  border-radius: 30px;
  border: 4px solid #ffe5ec;
  box-shadow: 0 12px 0px #ffcad4;
}

.card-header {
  text-align: center;
  margin-bottom: 2rem;
}

.card-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #c9184a;
  margin-bottom: 0.5rem;
}

.card-header p {
  color: #a44a5f;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Form Elements */
.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: 700;
  color: #590d22;
  margin-bottom: 0.5rem;
  margin-left: 5px;
  font-size: 0.9rem;
}

input, textarea, select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #ffe5ec;
  border-radius: 15px;
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  background: #fff0f3;
  transition: all 0.3s;
  box-sizing: border-box;
  color: #590d22;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #ff758f;
  background: white;
  box-shadow: 0 0 0 4px rgba(255, 117, 143, 0.1);
}

input::placeholder, textarea::placeholder {
  color: #ffb3c1;
}

textarea {
  min-height: 100px;
  resize: none;
}

/* Errors */
.input-error {
  border-color: #ff4d6d !important;
  background-color: #fff5f5;
}

.error-text {
  color: #ff4d6d;
  font-size: 0.8rem;
  font-weight: 700;
  margin-top: 5px;
  display: block;
  margin-left: 5px;
}

/* Action Buttons */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-cancel {
  flex: 1;
  padding: 12px;
  background: #fff0f3;
  color: #a44a5f;
  border: none;
  border-radius: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save {
  flex: 2;
  padding: 12px;
  background-color: #ff758f;
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px 0px #c9184a;
  transition: all 0.2s;
}

.btn-save:hover {
  background-color: #ff859d;
  transform: translateY(-2px);
  box-shadow: 0 7px 0px #c9184a;
}

.btn-save:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0px #c9184a;
}

.btn-cancel:hover {
  background: #ffe5ec;
}
</style>
