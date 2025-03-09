<template>
  <div @click="toggleDropdown">
    <slot />
  </div>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  asChild: {
    type: Boolean,
    default: false
  }
})

const open = inject('dropdown-open')

const toggleDropdown = () => {
  open.value = !open.value
}
</script> 