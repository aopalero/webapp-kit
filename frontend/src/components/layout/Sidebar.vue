<template>
  <aside class="flex h-full w-full flex-col bg-background overflow-hidden">
    <!-- Header -->
    <div class="flex h-14 items-center gap-2 px-4 border-b">
      <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
        <span class="text-sm font-semibold text-primary">W</span>
      </div>
      <h2 class="text-lg font-semibold tracking-tight">WebApp Kit</h2>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-1 overflow-y-auto px-2 py-4">
      <div v-for="section in navigationSections" :key="section.title" class="py-2">
        <h3 class="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
          {{ section.title }}
        </h3>
        <div class="space-y-1">
          <router-link
            v-for="item in section.items"
            :key="item.path"
            :to="item.path"
            :class="[
              'group flex w-full items-center gap-x-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
              isActive(item.path)
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
            ]"
          >
            <component :is="item.icon" class="h-4 w-4 shrink-0" />
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  height: 100%;
}

nav {
  flex: 1 1 auto;
  overflow-y: auto;
}

.mt-auto {
  margin-top: auto;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { 
  LayoutDashboard,
  Users
} from 'lucide-vue-next'

const route = useRoute()

const navigationSections = [
  {
    title: 'Main',
    items: [
      { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
      { name: 'Users', path: '/admin/users', icon: Users }
    ]
  }
]

const isActive = (path) => {
  if (path === '/admin') {
    return route.path === path
  }
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script> 