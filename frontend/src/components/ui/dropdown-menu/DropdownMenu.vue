<template>
  <Teleport to="body">
    <div>
      <slot />
    </div>
  </Teleport>
</template>

<script setup>
import { provide, ref } from 'vue'

const open = ref(false)

provide('dropdown-open', open)
</script> 