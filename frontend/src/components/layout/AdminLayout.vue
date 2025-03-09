<template>
  <div class="grid min-h-screen lg:grid-cols-[241px_1fr]">
    <div :class="{ 'hidden lg:block': !sidebarOpen }" class="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Sidebar />
    </div>
    
    <!-- Mobile sidebar backdrop -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden" 
      @click="sidebarOpen = false"
    />
    
    <!-- Mobile sidebar -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-y-0 left-0 z-50 w-[280px] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden"
    >
      <Sidebar />
    </div>
    
    <div class="flex min-h-screen flex-col">
      <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />
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
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

const sidebarOpen = ref(false)
</script>

<style scoped>
.container {
  max-width: 1400px;
}
</style> 