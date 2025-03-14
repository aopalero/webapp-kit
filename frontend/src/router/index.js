import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AdminLayout from '../components/layout/AdminLayout.vue'

// Dashboards
import DashboardView from '../views/admin/DashboardView.vue'

// Apps
import UsersView from '../views/admin/UsersView.vue'

// Auth Pages
import LoginView from '../views/auth/LoginView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import ResetPasswordView from '../views/auth/ResetPasswordView.vue'

// Error Pages
import Error403View from '../views/error/Error403View.vue'
import Error404View from '../views/error/Error404View.vue'
import Error500View from '../views/error/Error500View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/admin'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'auth', guest: true }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
      meta: { layout: 'auth', guest: true }
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: { layout: 'auth', guest: true }
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        // Dashboards
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
          meta: { title: 'Dashboard', requiresAuth: true }
        },
        
        // Apps
        {
          path: 'users',
          name: 'users',
          component: UsersView,
          meta: { title: 'Users', requiresAuth: true }
        }
      ]
    },
    
    // Error pages
    {
      path: '/403',
      name: 'forbidden',
      component: Error403View,
      meta: { layout: 'error' }
    },
    {
      path: '/404',
      name: 'not-found',
      component: Error404View,
      meta: { layout: 'error' }
    },
    {
      path: '/500',
      name: 'server-error',
      component: Error500View,
      meta: { layout: 'error' }
    },
    
    // Catch all route for 404
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isAuthenticated) {
      // Store the intended path in localStorage
      localStorage.setItem('intended_redirect', to.fullPath)
      auth.requireAuth()
      return router.replace({ name: 'login' })
    }
  }
  
  // Check if route is for guests only (like login page)
  if (to.matched.some(record => record.meta.guest)) {
    if (auth.isAuthenticated) {
      return router.replace({ name: 'dashboard' })
    }
  }
  
  next()
})

export default router
