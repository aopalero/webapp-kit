<template>
  <div class="flex h-screen w-full overflow-hidden">
    <!-- Desktop sidebar -->
    <div 
      :class="[
        'border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300',
        sidebarOpen ? 'w-[241px]' : 'w-0',
        'lg:block flex-shrink-0 overflow-hidden'
      ]"
    >
      <div class="w-[241px]">
        <Sidebar v-if="sidebarOpen" />
      </div>
    </div>
    
    <!-- Mobile sidebar backdrop -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" 
      @click="toggleSidebar"
    />
    
    <!-- Mobile sidebar -->
    <div 
      v-show="sidebarOpen" 
      class="fixed inset-y-0 left-0 z-50 w-[280px] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden transition-all duration-300"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <Sidebar />
    </div>
    
    <!-- Main content -->
    <div class="flex flex-col flex-1 w-full overflow-hidden">
      <Header @toggle-sidebar="toggleSidebar" :sidebar-open="sidebarOpen" />
      <main class="flex-1 overflow-y-auto">
        <div class="container relative mx-auto space-y-4 p-8">
          <router-view v-slot="{ Component }">
            <transition 
              name="fade" 
              mode="out-in"
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

// Initialize sidebar state
const sidebarOpen = ref(false)

// Function to toggle sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  console.log('Sidebar toggled:', sidebarOpen.value)
}

// Set initial state and add resize listener after component is mounted
onMounted(() => {
  // Set initial state based on screen width
  sidebarOpen.value = window.innerWidth >= 1024
  console.log('Initial sidebar state:', sidebarOpen.value)
  
  // Add resize event listener
  window.addEventListener('resize', handleResize)
})

// Remove event listener when component is unmounted
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Handle window resize
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    sidebarOpen.value = true
  } else {
    sidebarOpen.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 1400px;
}
</style> 