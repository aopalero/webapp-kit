<template>
  <div
    class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    @click="closeDropdown"
  >
    <slot />
  </div>
</template>

<script setup>
import { inject } from 'vue'

const open = inject('dropdown-open')

const closeDropdown = () => {
  open.value = false
}
</script> 