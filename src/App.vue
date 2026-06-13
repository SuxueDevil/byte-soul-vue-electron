<template>
  <div class="app" :data-theme="theme">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from './stores/config'

const configStore = useConfigStore()
const theme = computed(() => configStore.theme)
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #F8FAFC;
  color: #0F172A;
}

.app {
  width: 100vw;
  height: 100vh;
  background-color: #F8FAFC;
  color: #0F172A;
  font-family: 'IBM Plex Sans', sans-serif;
}

[data-theme="dark"] .app {
  background-color: #0F172A;
  color: #F8FAFC;
}
</style>
