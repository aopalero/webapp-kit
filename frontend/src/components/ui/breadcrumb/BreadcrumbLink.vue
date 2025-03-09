<template>
  <component
    :is="href ? 'router-link' : 'span'"
    :to="href"
    :class="[
      'text-sm transition-colors hover:text-foreground',
      current ? 'font-medium text-foreground' : 'text-muted-foreground'
    ]"
    :aria-current="current ? 'page' : undefined"
  >
    <slot />
  </component>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    default: ''
  },
  current: {
    type: Boolean,
    default: false
  }
})
</script> 