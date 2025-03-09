<template>
  <div class="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 py-12 dark:bg-gray-900">
    <div class="w-full max-w-md px-4">
      <div class="flex flex-col justify-center rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 lg:p-10">
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-50">Forgot your password?</h1>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        
        <form @submit.prevent="handleForgotPassword" class="grid gap-4">
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
          
          <button
            type="submit"
            class="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-400 dark:focus-visible:ring-offset-gray-900"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Sending reset link...' : 'Send reset link' }}
          </button>
          
          <div class="mt-4 text-center text-sm">
            Remember your password?
            <router-link to="/login" class="font-medium text-gray-900 hover:underline dark:text-gray-50">
              Back to login
            </router-link>
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
const isLoading = ref(false)
const resetSent = ref(false)

const handleForgotPassword = async () => {
  try {
    isLoading.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // TODO: Implement actual password reset logic
    console.log('Password reset requested for:', email.value)
    
    // Show success message
    resetSent.value = true
    alert('Password reset link has been sent to your email')
    
    // Redirect to login after a delay
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    console.error('Password reset request failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script> 