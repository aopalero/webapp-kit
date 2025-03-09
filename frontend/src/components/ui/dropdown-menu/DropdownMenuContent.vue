<template>
  <Transition
    enter-active-class="transition ease-out duration-100"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div
      v-if="open"
      class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
      :class="[align === 'end' ? 'origin-top-right right-0' : 'origin-top-left left-0']"
      @click.stop
    >
      <slot />
    </div>
  </Transition>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  align: {
    type: String,
    default: 'start'
  }
})

const open = inject('dropdown-open')
</script> 