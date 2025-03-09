<template>
  <span class="mx-1 text-muted-foreground">
    <slot>
      <ChevronRight class="h-4 w-4" />
    </slot>
  </span>
</template>

<script setup>
import { ChevronRight } from 'lucide-vue-next'
</script> 