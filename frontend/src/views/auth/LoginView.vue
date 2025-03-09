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
          
          <div class="relative my-2">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t border-gray-300 dark:border-gray-600"></span>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">Or continue with</span>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              class="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-400 dark:focus-visible:ring-offset-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              class="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-400 dark:focus-visible:ring-offset-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              GitHub
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  try {
    isLoading.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // TODO: Implement actual authentication logic
    console.log('Login attempt with:', {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    })
    
    // Redirect to dashboard on success
    router.push('/admin')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script> 