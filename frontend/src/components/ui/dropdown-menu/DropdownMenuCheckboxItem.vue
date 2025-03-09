<template>
  <div
    class="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    @click="toggleChecked"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check v-if="checked" class="h-4 w-4" />
    </span>
    <slot />
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { Check } from 'lucide-vue-next'

const props = defineProps({
  defaultChecked: {
    type: Boolean,
    default: false
  }
})

const checked = ref(props.defaultChecked)
const open = inject('dropdown-open')

const toggleChecked = () => {
  checked.value = !checked.value
}
</script> 