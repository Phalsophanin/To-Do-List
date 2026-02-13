import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login.vue';
import Dashboard from '../components/dashboard.vue';
import Todolist from '../components/todolist.vue';
import AddTodo from '../components/addtodo.vue';
import EditTodo from '../components/edittodo.vue';
import Valentain from '../components/Valentain.vue';





// Define your routes here
const routes = [
  {
    path: '/',
    name: 'Valentine',
    component: Valentain,
  },
   {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/todolist',
    name: 'TodoList',
    component: Todolist,
  },
  {
    path: '/addtodo',
    name: 'AddTodo',
    component: AddTodo,
  },
   {
    path: '/edittodo',
    name: 'EditTodo',
    component: EditTodo,
  },
 

]

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
