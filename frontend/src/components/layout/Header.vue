<template>
  <header class="sticky top-0 z-40 border-b bg-background w-full">
    <div class="flex h-14 items-center justify-between px-4">
      <!-- Left Section -->
      <div class="flex items-center gap-4">
        <button 
          class="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent" 
          @click="toggleSidebar"
          aria-label="Toggle sidebar"
        >
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle sidebar</span>
        </button>
      </div>

      <!-- Search Bar -->
      <div class="flex max-w-md flex-1 px-4">
        <div class="flex h-9 w-full items-center rounded-md border bg-background px-3 text-sm text-muted-foreground">
          <input 
            type="text" 
            placeholder="Search..." 
            class="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/70" 
            v-model="searchQuery" 
            @input="handleSearch"
          />
          <kbd class="ml-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">⌘K</kbd>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-2">
        <button 
          class="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
          @click="isNotificationsOpen = !isNotificationsOpen"
          aria-label="Toggle notifications"
        >
          <Bell class="h-5 w-5" />
          <span class="absolute h-2 w-2 rounded-full bg-primary translate-x-2 -translate-y-2"></span>
        </button>
        
        <button 
          class="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
          @click="toggleTheme"
          aria-label="Toggle theme"
        >
          <Sun v-if="theme === 'dark'" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </button>

        <button 
          class="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent overflow-hidden"
          @click="isUserMenuOpen = !isUserMenuOpen"
          aria-label="User menu"
        >
          <img
            src="https://avatars.githubusercontent.com/u/1?v=4"
            alt="User avatar"
            class="h-7 w-7 rounded-full"
          />
        </button>

        <!-- User Menu Dropdown -->
        <div 
          v-if="isUserMenuOpen" 
          class="user-menu-dropdown absolute right-2 top-[3.5rem] w-56 rounded-lg border bg-popover p-1.5 text-popover-foreground shadow-md z-50"
        >
          <div class="flex items-center gap-3 px-2 py-3">
            <img
              src="https://avatars.githubusercontent.com/u/1?v=4"
              alt="User avatar"
              class="h-10 w-10 rounded-full"
            />
            <div class="flex flex-col">
              <span class="text-sm font-medium">John Doe</span>
              <span class="text-xs text-muted-foreground">john@example.com</span>
            </div>
          </div>
          <div class="h-px bg-muted my-1"></div>
          <button 
            @click="handleProfile"
            class="w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground text-left"
          >
            <User class="h-4 w-4" />
            Profile
          </button>
          <button 
            @click="handleSettings"
            class="w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground text-left"
          >
            <Settings class="h-4 w-4" />
            Settings
          </button>
          <div class="h-px bg-muted my-1"></div>
          <button 
            @click="handleLogout"
            class="w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground text-left text-red-500 hover:text-red-500"
          >
            <LogOut class="h-4 w-4" />
            Log out
          </button>
        </div>

        <!-- Notifications Dropdown -->
        <div 
          v-if="isNotificationsOpen" 
          class="notifications-dropdown absolute right-2 top-[3.5rem] w-[380px] rounded-lg border bg-popover p-4 text-popover-foreground shadow-md z-50"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold">Notifications</h3>
            <button class="text-xs text-muted-foreground hover:text-foreground">Mark all as read</button>
          </div>
          <div class="space-y-4 max-h-[300px] overflow-y-auto">
            <div v-for="(notification, index) in notifications" :key="index" class="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
              <div class="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <component :is="notification.icon" class="h-4 w-4" />
              </div>
              <div>
                <p class="text-sm font-medium">{{ notification.title }}</p>
                <p class="text-sm text-muted-foreground">{{ notification.message }}</p>
                <p class="text-xs text-muted-foreground mt-1">{{ notification.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  Menu, 
  Bell, 
  Sun, 
  Moon, 
  User,
  Settings, 
  LogOut,
  MessageSquare,
  AlertCircle,
  ShoppingCart
} from 'lucide-vue-next'

// Define emits
const emit = defineEmits(['toggle-sidebar'])
const router = useRouter()

// Function to toggle sidebar
const toggleSidebar = () => {
  emit('toggle-sidebar')
}

const route = useRoute()
const theme = ref(localStorage.getItem('theme') || 'light')

// Initialize theme
const initializeTheme = () => {
  // Check if theme is in localStorage
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.value = savedTheme
  } else {
    // Check system preference
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    theme.value = systemTheme
  }
  applyTheme(theme.value)
}

// Apply theme to document
const applyTheme = (newTheme) => {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', newTheme)
}

const toggleTheme = () => {
  const newTheme = theme.value === 'light' ? 'dark' : 'light'
  theme.value = newTheme
  applyTheme(newTheme)
}

const isNotificationsOpen = ref(false)
const isUserMenuOpen = ref(false)
const searchQuery = ref('')

// Mock user data - replace with real user data from your auth system
const user = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://avatars.githubusercontent.com/u/1?v=4'
}

const handleSearch = () => {
  // Implement search functionality here
  console.log('Searching for:', searchQuery.value)
}

const handleProfile = () => {
  router.push('/profile')
  isUserMenuOpen.value = false
}

const handleSettings = () => {
  router.push('/settings')
  isUserMenuOpen.value = false
}

const handleLogout = () => {
  // Implement your logout logic here
  console.log('Logging out...')
  isUserMenuOpen.value = false
}

// Mock notifications data
const notifications = [
  {
    icon: MessageSquare,
    title: 'New Message',
    message: 'You have a new message from Sofia Davis',
    time: '3 min ago'
  },
  {
    icon: AlertCircle,
    title: 'System Alert',
    message: 'Your storage is almost full (85%)',
    time: '2 hours ago'
  },
  {
    icon: User,
    title: 'New User',
    message: 'Jackson Lee joined the platform',
    time: 'Yesterday'
  }
]

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  const target = event.target
  if (isNotificationsOpen.value && 
      !target.closest('.notifications-dropdown') && 
      !target.closest('[aria-label="Toggle notifications"]')) {
    isNotificationsOpen.value = false
  }
  if (isUserMenuOpen.value && 
      !target.closest('.user-menu-dropdown') && 
      !target.closest('[aria-label="User menu"]')) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  initializeTheme()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 