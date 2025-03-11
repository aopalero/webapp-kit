<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

// Initialize theme store
const themeStore = useThemeStore()
</script>

<template>
  <router-view />
</template>

<style>
@import './assets/main.css';
</style>

