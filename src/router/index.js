import { createRouter, createWebHistory } from 'vue-router'
// Importamos los componentes directamente para evitar errores de carga
import LoginView from '../views/LoginView.vue'
import ClienteDashboard from '../views/ClienteDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/cliente',
      name: 'cliente',
      component: ClienteDashboard,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard,
    },
  ],
})

export default router
