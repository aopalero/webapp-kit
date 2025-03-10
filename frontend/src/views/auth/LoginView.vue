<template>
  <div class="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 py-12 dark:bg-gray-900">
    <div class="grid w-full max-w-md gap-6 px-4 sm:max-w-lg md:max-w-xl lg:max-w-[1024px] lg:grid-cols-2 lg:gap-0 lg:px-2 xl:max-w-[1200px]">
      <!-- Left side - Image/Branding -->
      <div class="hidden lg:flex lg:items-center lg:justify-center lg:rounded-lg lg:bg-gray-100 dark:lg:bg-gray-800/50">
        <div class="mx-auto flex max-w-md flex-col items-center justify-center space-y-6 px-4 py-12 text-center lg:px-8">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white dark:text-gray-900">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-50">Secure Authentication</h2>
          <p class="text-gray-500 dark:text-gray-400">
            Our authentication system uses industry-standard security practices to keep your data safe and secure.
          </p>
        </div>
      </div>
      
      <!-- Right side - Form -->
      <div class="flex flex-col justify-center rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 lg:p-10">
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-50">Welcome back</h1>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter your email below to login to your account
          </p>
        </div>
        
        <form @submit.prevent="handleLogin" class="grid gap-4">
          <!-- Show error message if exists -->
          <div v-if="authStore.error" class="rounded-md bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/50 dark:text-red-400">
            {{ authStore.error }}
          </div>
          
          <div class="grid gap-2">
            <label for="email" class="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="name@example.com"
              class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              required
            />
          </div>
          
          <div class="grid gap-2">
            <div class="flex items-center justify-between">
              <label for="password" class="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <router-link to="/forgot-password" class="text-sm font-medium text-gray-700 hover:underline dark:text-gray-300">Forgot password?</router-link>
            </div>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              required
            />
          </div>
          
          <div class="flex items-center space-x-2">
            <input
              id="remember"
              v-model="rememberMe"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-800"
            />
            <label for="remember" class="text-sm font-medium text-gray-700 dark:text-gray-300">Remember me</label>
          </div>
          
          <button
            type="submit"
            class="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-400 dark:focus-visible:ring-offset-gray-900"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Signing in...' : 'Login' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  try {
    isLoading.value = true
    const success = await authStore.login({
      email: email.value,
      password: password.value
    })
    
    if (success) {
      // Use the redirect parameter if it exists, otherwise go to /admin
      const redirectPath = route.query.redirect || '/admin'
      router.push(redirectPath)
    }
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    isLoading.value = false
  }
}

// Clear any existing errors when component mounts
onMounted(() => {
  authStore.error = null
})
</script> 