<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
    <div class="max-w-md w-full text-center space-y-6">
      <div class="space-y-2">
        <h1 class="text-9xl font-bold text-primary">404</h1>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Page Not Found</h2>
        <p class="text-gray-500 dark:text-gray-400">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-2 justify-center">
        <router-link 
          to="/" 
          class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Go Home
        </router-link>
        <button 
          @click="goBack" 
          class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script> 