import { createRouter, createWebHistory } from 'vue-router'
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
      meta: { layout: 'auth' }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
      meta: { layout: 'auth' }
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: { layout: 'auth' }
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        // Dashboards
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
          meta: { title: 'Dashboard' }
        },
        
        // Apps
        {
          path: 'users',
          name: 'users',
          component: UsersView,
          meta: { title: 'Users' }
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

// Navigation guard to set document title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - WebApp Kit` : 'WebApp Kit'
  next()
})

export default router
